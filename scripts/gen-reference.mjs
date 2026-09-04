#!/usr/bin/env node
// Generate docs/reference/ from reference/api.json: an index, then one page
// per component, asset type and script module, cross-linked. The engine
// writes api.json with scripts/gen_docs.py; scripts/sync-docs.sh fetches it.
// Everything under docs/reference/ is replaced on every run.
import {mkdirSync, readFileSync, rmSync, writeFileSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const api = JSON.parse(readFileSync(join(root, 'reference', 'api.json'), 'utf8'));
const out = join(root, 'docs', 'reference');

const components = api.components ?? {};
const tags = api.component_tags ?? {};
const componentDocs = api.component_docs ?? {};
const assetTypes = api.asset_types ?? {};
const modules = [...(api.modules ?? [])].sort((a, b) => a.name.localeCompare(b.name));

// Section order on the index; a component lands in the first group whose
// tag it carries.
const GROUPS = [
  ['2d', '2D'],
  ['3d', '3D'],
  ['physics', 'Physics'],
  ['render', 'Rendering'],
  ['animation', 'Animation'],
  ['audio', 'Audio'],
  ['ui', 'UI'],
];
const groupOf = (name) =>
  (GROUPS.find(([tag]) => (tags[name] ?? []).includes(tag)) ?? [null, 'Other'])[1];

const code = (s) => '`' + s + '`';
const cell = (s) => String(s ?? '').replace(/\|/g, '\\|').replace(/\s*\n\s*/g, ' ');
const plural = (n, word) => `${n} ${word}${n === 1 ? '' : 's'}`;
const properties = (n) => `${n} ${n === 1 ? 'property' : 'properties'}`;

// Signatures arrive as Rust types (`(NodeId, f32, f32) -> ()`); scripts see
// the neutral value kinds, so spell those.
const SCRIPT_TYPES = {
  f32: 'float', f64: 'float',
  i8: 'int', i16: 'int', i32: 'int', i64: 'int', isize: 'int',
  u8: 'int', u16: 'int', u32: 'int', u64: 'int', usize: 'int',
  bool: 'bool', String: 'string', '&str': 'string', str: 'string',
  NodeId: 'node', Value: 'any', CallbackId: 'fn',
};
function splitTop(s) {
  const parts = [];
  let depth = 0;
  let cur = '';
  for (const ch of s) {
    if (ch === '<' || ch === '(' || ch === '[') depth++;
    if (ch === '>' || ch === ')' || ch === ']') depth--;
    if (ch === ',' && depth === 0) {
      parts.push(cur);
      cur = '';
    } else cur += ch;
  }
  if (cur.trim()) parts.push(cur);
  return parts.map((p) => p.trim());
}
function scriptType(t) {
  t = t.trim();
  if (t === '()' || t === '') return '';
  if (t.startsWith('(') && t.endsWith(')')) return splitTop(t.slice(1, -1)).map(scriptType).join(', ');
  const wrapped = t.match(/^(Option|Vec|Box|Rc)<(.*)>$/);
  if (wrapped) {
    const inner = scriptType(wrapped[2]);
    return wrapped[1] === 'Option' ? `${inner}?` : wrapped[1] === 'Vec' ? `[${inner}]` : inner;
  }
  const array = t.match(/^\[(.*); *\d+\]$/);
  if (array) return `[${scriptType(array[1])}]`;
  return SCRIPT_TYPES[t] ?? t;
}
// `name(arg kinds) -> result`. A signature is either recorded by the typed
// seam (Rust types, node included) or spelled out by the module (script
// types, node included); `dropFirst` takes the node off for a component
// handle's method, where the handle supplies it.
function signatureOf(m, f, {prefix = '', dropFirst = false} = {}) {
  const sig = m.signatures?.[f];
  if (!sig) return code(prefix + f);
  const [args, ret] = sig.split(' -> ');
  let list = splitTop(args.startsWith('(') ? args.slice(1, -1) : args);
  if (dropFirst) list = list.slice(1);
  const r = scriptType(ret ?? '');
  return code(`${prefix}${f}(${list.map(scriptType).join(', ')})${r ? ' -> ' + r : ''}`);
}
const actsOn = (m, f) => m.acts_on?.[f] ?? [];
const docOf = (m, f) => m.docs?.[f] ?? '';
const modulesActingOn = (component) =>
  modules.filter((m) => Object.values(m.acts_on ?? {}).some((list) => list.includes(component)));

// A page's description is its search snippet: the first paragraph of its
// prose as plain text, cut at a word if it runs long, or the fallback when
// the prose starts with a table or a heading.
const plain = (s) =>
  String(s ?? '')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[`*]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
function snippet(text, fallback, max = 155) {
  const first = String(text ?? '').trim().split(/\n\s*\n/)[0] ?? '';
  let out = /^[|#<]/.test(first) ? '' : plain(first);
  if (!out) out = plain(fallback);
  if (out.length > max) {
    const cut = out.slice(0, max - 1);
    out = cut.slice(0, Math.max(cut.lastIndexOf(' '), 80)).replace(/[\s,;:—-]+$/, '') + '…';
  }
  return out;
}

// Strings are emitted as JSON, which is valid double-quoted YAML.
const frontMatter = (title, extra = {}) =>
  [
    '---',
    `title: ${JSON.stringify(title)}`,
    ...Object.entries(extra).map(([k, v]) => `${k}: ${typeof v === 'string' ? JSON.stringify(v) : v}`),
    'custom_edit_url: null',
    '---',
    '',
  ].join('\n');

// component.property pairs per asset type, read off the component schemas.
const users = {};
for (const [cname, schema] of Object.entries(components)) {
  for (const [prop, spec] of Object.entries(schema)) {
    if (spec.type === 'asset') (users[spec.asset ?? ''] ??= []).push([cname, prop]);
  }
}

function propertyRow(name, spec) {
  const notes = [spec.description ?? ''];
  if (spec.options) notes.push('One of ' + spec.options.map(code).join(', ') + '.');
  if ('min' in spec || 'max' in spec) {
    notes.push('max' in spec ? `Range ${spec.min ?? ''}–${spec.max}.` : `At least ${spec.min}.`);
  }
  if (spec.shorthand) {
    notes.push(`Scene shorthand: ${code(name)}'s value can be given as the component's whole value.`);
  }
  if (spec.readonly) notes.push('Read-only: engine output the inspector shows but never writes.');
  let type = spec.type ?? '';
  if (type === 'asset') {
    const asset = spec.asset ?? '';
    type = asset in assetTypes ? `asset · [${code(asset)}](../assets/${asset}.md)` : `asset · ${code(asset)}`;
  }
  const raw = spec.default === undefined ? '' : JSON.stringify(spec.default).replace(/^"|"$/g, '');
  return `| ${code(name)} | ${cell(type)} | ${raw ? code(raw) : '—'} | ${cell(notes.filter(Boolean).join(' '))} |`;
}

rmSync(out, {recursive: true, force: true});
for (const dir of ['components', 'assets', 'modules']) mkdirSync(join(out, dir), {recursive: true});
const write = (rel, lines) => writeFileSync(join(out, rel), lines.join('\n'));
const category = (label, position, slug, description) =>
  JSON.stringify(
    {label, position, collapsed: false, link: {type: 'generated-index', title: label, slug, description}},
    null,
    2,
  ) + '\n';

writeFileSync(
  join(out, 'components', '_category_.json'),
  category('Components', 1, '/reference/components', 'Every component a node can carry: what it gives the node, the properties a scene sets, and the functions a script calls on it.'),
);
writeFileSync(
  join(out, 'assets', '_category_.json'),
  category('Asset types', 2, '/reference/assets', 'The content an asset-typed property names: a file in the project, or a definition written inline.'),
);
writeFileSync(
  join(out, 'modules', '_category_.json'),
  category('Script modules', 3, '/reference/modules', 'What a script can call: every module, function and constant, read from a booted engine.'),
);

for (const name of Object.keys(components).sort()) {
  const schema = components[name];
  const props = Object.keys(schema).sort();
  const t = tags[name] ?? [];
  const referenced = [...new Set(props.map((p) => schema[p]).filter((s) => s.type === 'asset').map((s) => s.asset))];
  const lines = [
    frontMatter(`${name} component`, {
      sidebar_label: name,
      description: snippet(
        componentDocs[name],
        `The ${name} component of the Balaur game engine: its ${properties(props.length)}, and the functions a script calls on it.`,
      ),
    }),
    `# ${code(name)}`,
    '',
    `${t.length ? t.map(code).join(' · ') : 'untagged'} · ${properties(props.length)} · ${groupOf(name)}`,
    '',
  ];
  if (componentDocs[name]) lines.push(componentDocs[name], '');
  lines.push(
    `In a scene, ${code(name)} is the node key that applies it. A script reaches the same properties through ${code('node.' + name + '.get()')} and ${code('node.' + name + '.set(table)')}.`,
    '',
    '## Properties',
    '',
    '| property | type | default | description |',
    '| --- | --- | --- | --- |',
    ...props.map((p) => propertyRow(p, schema[p])),
    '',
  );
  if (referenced.length) {
    lines.push(
      `Asset types this component references: ${referenced.map((a) => (a in assetTypes ? `[${code(a)}](../assets/${a}.md)` : code(a))).join(', ')}.`,
      '',
    );
  }
  const acting = modulesActingOn(name);
  if (acting.length) {
    lines.push(
      '## Script functions',
      '',
      `Methods of ${code('node.' + name)}, the handle a node carrying this component exposes. Each is also a free function on its module, taking the node as its first argument. Every handle also has ${code('get()')}, ${code('set(table)')}, ${code('has()')} and ${code('remove()')}.`,
      '',
    );
    for (const m of acting) {
      const own = m.functions.filter((f) => actsOn(m, f).includes(name));
      lines.push(
        `From [${code(m.name)}](../modules/${m.name}.md):`,
        '',
        '| method | what it does |',
        '| --- | --- |',
        ...own.map((f) => `| ${signatureOf(m, f, {dropFirst: true})} | ${cell(docOf(m, f))} |`),
        '',
      );
    }
  }
  write(`components/${name}.md`, lines);
}

for (const type of Object.keys(assetTypes).sort()) {
  const info = assetTypes[type];
  const used = (users[type] ?? []).map(([c, p]) => `[${code(c)}](../components/${c}.md) · ${code(p)}`);
  const files = info.directory
    ? `Files live in ${code(info.directory + '/')}.`
    : 'This type declares no project directory, so an inline definition cannot be promoted to a file.';
  write(`assets/${type}.md`, [
    frontMatter(`${type} asset type`, {
      sidebar_label: type,
      description: snippet(
        info.doc,
        `The ${type} asset type of the Balaur game engine: the content an asset-typed property names, in a file or inline.`,
      ),
    }),
    `# ${code(type)}`,
    '',
    `${files} Used by ${used.length ? used.join(', ') : 'no component property yet'}.`,
    '',
    (info.doc ?? '').trim(),
    '',
  ]);
}

for (const m of modules) {
  const lines = [
    frontMatter(`${m.name} module`, {
      sidebar_label: m.name,
      description: snippet(
        m.doc,
        `The ${m.name} script module of the Balaur game engine: ${plural(m.functions.length, 'function')} and ${plural(m.constants.length, 'constant')} a Rune script reaches as ${m.name}::.`,
      ),
    }),
    `# ${code(m.name)}`,
    '',
  ];
  if (m.doc) lines.push(m.doc, '');
  lines.push(
    `${plural(m.functions.length, 'function')}, ${plural(m.constants.length, 'constant')}. Scripts reach it as ${code(m.name + '::')}.`,
    '',
  );
  const touched = [...new Set(Object.values(m.acts_on ?? {}).flat())].sort();
  if (touched.length) {
    lines.push(
      `Acts on ${touched.map((c) => (c in components ? `[${code(c)}](../components/${c}.md)` : code(c))).join(', ')}: those functions are also methods on the component's handle, without the node argument.`,
      '',
    );
  }
  if (m.functions.length) {
    lines.push(
      '## Functions',
      '',
      'Argument kinds are the script values a call passes: `node` is a node handle, `any` a table or value of any kind, `fn` a callback.',
      '',
      '| function | acts on | what it does |',
      '| --- | --- | --- |',
      ...m.functions.map((f) => {
        const on = actsOn(m, f).map((c) => (c in components ? `[${code(c)}](../components/${c}.md)` : code(c)));
        return `| ${signatureOf(m, f)} | ${on.join(', ') || '—'} | ${cell(docOf(m, f))} |`;
      }),
      '',
    );
  }
  if (m.constants.length) {
    lines.push('## Constants', '', '| name | value |', '| --- | --- |', ...m.constants.map((c) => `| ${code(c.name)} | ${code(String(c.value))} |`), '');
  }
  write(`modules/${m.name}.md`, lines);
}

const index = [
  frontMatter('Reference — components, asset types and script modules', {
    sidebar_label: 'Reference',
    sidebar_position: 0,
    slug: '/reference',
    description:
      'Every component, asset type and script module in the Balaur game engine, read from a booted engine so nothing can drift from what a scene or a script sees.',
  }),
  '# Reference',
  '',
  'Every component, asset type and script module in the engine, read from a booted engine rather than the source, so nothing here can drift from what a scene or a script actually sees.',
  '',
  '- A **component** is what gives a node a capability; its page lists the properties a scene sets and the functions a script calls on it.',
  '- An **asset type** is the content an asset-typed property names, in a file or inline; its page shows the definition table.',
  '- A **script module** is what a script calls; its page lists functions and constants.',
  '',
  '## Components',
  '',
];
const grouped = {};
for (const name of Object.keys(components).sort()) (grouped[groupOf(name)] ??= []).push(name);
for (const label of [...GROUPS.map(([, l]) => l), 'Other']) {
  if (!grouped[label]) continue;
  index.push(`### ${label}`, '', '| component | properties | what it gives a node |', '| --- | ---: | --- |');
  for (const name of grouped[label]) {
    index.push(`| [${code(name)}](./components/${name}.md) | ${Object.keys(components[name]).length} | ${cell(componentDocs[name])} |`);
  }
  index.push('');
}
index.push('## Asset types', '', '| type | files | used by |', '| --- | --- | --- |');
for (const type of Object.keys(assetTypes).sort()) {
  const used = (users[type] ?? []).map(([c, p]) => code(c + '.' + p)).join(', ') || '—';
  index.push(`| [${code(type)}](./assets/${type}.md) | ${assetTypes[type].directory ? code(assetTypes[type].directory + '/') : '—'} | ${used} |`);
}
index.push('', '## Script modules', '', '| module | functions | what it is for |', '| --- | ---: | --- |');
for (const m of modules) index.push(`| [${code(m.name)}](./modules/${m.name}.md) | ${m.functions.length} | ${cell(m.doc)} |`);
index.push('');
write('index.md', index);

const described = modules.reduce((n, m) => n + Object.keys(m.docs ?? {}).length, 0);
const total = modules.reduce((n, m) => n + m.functions.length, 0);
console.log(
  `reference: ${Object.keys(components).length} components, ${Object.keys(assetTypes).length} asset types, ` +
    `${modules.length} modules, ${described}/${total} functions described → docs/reference/`,
);
