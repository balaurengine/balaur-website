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
const assetTypes = api.asset_types ?? {};
const modules = [...(api.modules ?? [])].sort((a, b) => a.name.localeCompare(b.name));
const moduleNames = new Set(modules.map((m) => m.name));

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
const cell = (s) => String(s).replace(/\|/g, '\\|').replace(/\s*\n\s*/g, ' ');
const plural = (n, word) => `${n} ${word}${n === 1 ? '' : 's'}`;

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
// `name(arg kinds) -> result`, or the bare name when the function came in
// without a signature.
function signatureOf(m, f) {
  const sig = m.signatures?.[f];
  if (!sig) return code(f);
  const [args, ret] = sig.split(' -> ');
  const r = scriptType(ret ?? '');
  return code(`${f}(${scriptType(args)})${r ? ' -> ' + r : ''}`);
}
const modulesDriving = (component) => modules.filter((m) => (m.components ?? []).includes(component));
const frontMatter = (title, extra = {}) =>
  [
    '---',
    `title: "${title}"`,
    ...Object.entries(extra).map(([k, v]) => `${k}: ${v}`),
    'custom_edit_url: null',
    '---',
    '',
  ].join('\n');

// component.property pairs per asset type, read off the schemas.
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
  const dflt = raw ? code(raw) : '—';
  return `| ${code(name)} | ${cell(type)} | ${cell(dflt)} | ${cell(notes.filter(Boolean).join(' '))} |`;
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
  category('Components', 1, '/reference/components', 'Every component a node can carry: the properties a scene sets and a script reads or writes.'),
);
writeFileSync(
  join(out, 'assets', '_category_.json'),
  category('Asset types', 2, '/reference/assets', 'The content an asset-typed property names: a file in the project, or a definition written inline.'),
);
writeFileSync(
  join(out, 'modules', '_category_.json'),
  category('Script modules', 3, '/reference/modules', 'What a script can call: every module, function and constant, read from a booted engine.'),
);

const nodeLink = moduleNames.has('node') ? `the [${code('node')}](../modules/node.md) module's` : 'the `node` module\'s';
for (const name of Object.keys(components).sort()) {
  const schema = components[name];
  const props = Object.keys(schema).sort();
  const t = tags[name] ?? [];
  const referenced = [...new Set(props.map((p) => schema[p]).filter((s) => s.type === 'asset').map((s) => s.asset))];
  const lines = [
    frontMatter(name),
    `# ${code(name)}`,
    '',
    `${t.length ? t.map(code).join(' · ') : 'untagged'} · ${plural(props.length, 'property').replace('propertys', 'properties')} · ${groupOf(name)}`,
    '',
    `In a scene, ${code(name)} is the node key that applies it. From a script, ${nodeLink} component functions read and write the same properties by name.`,
    '',
    '| property | type | default | description |',
    '| --- | --- | --- | --- |',
    ...props.map((p) => propertyRow(p, schema[p])),
    '',
  ];
  if (referenced.length) {
    lines.push(
      `Asset types this component references: ${referenced.map((a) => (a in assetTypes ? `[${code(a)}](../assets/${a}.md)` : code(a))).join(', ')}.`,
      '',
    );
  }
  const driving = modulesDriving(name);
  if (driving.length) {
    lines.push('## Script functions', '');
    for (const m of driving) {
      lines.push(`From [${code(m.name)}](../modules/${m.name}.md), called as ${code(m.name + '::function(...)')}:`, '');
      lines.push(...m.functions.map((f) => `- ${signatureOf(m, f)}`), '');
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
    frontMatter(type),
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
    frontMatter(m.name),
    `# ${code(m.name)}`,
    '',
    `${plural(m.functions.length, 'function')}, ${plural(m.constants.length, 'constant')}. Scripts reach it as ${code(m.name + '::')}.`,
    '',
  ];
  if (m.name === 'node' && Object.keys(components).length) {
    lines.push(`The component functions take a component name from the [component reference](/docs/reference/components) and a property table shaped like that component's page.`, '');
  }
  if (m.name === 'assets' && Object.keys(assetTypes).length) {
    lines.push(`Asset references resolve to one of the [asset types](/docs/reference/assets).`, '');
  }
  if ((m.components ?? []).length) {
    lines.push(
      `Acts on ${m.components.map((c) => (c in components ? `[${code(c)}](../components/${c}.md)` : code(c))).join(', ')}.`,
      '',
    );
  }
  if (m.functions.length) {
    lines.push('## Functions', '', 'Argument kinds are the script values a call passes; `node` is a node handle, `any` a table or value of any kind.', '');
    lines.push(...m.functions.map((f) => `- ${signatureOf(m, f)}`), '');
  }
  if (m.constants.length) {
    lines.push('## Constants', '', '| name | value |', '| --- | --- |', ...m.constants.map((c) => `| ${code(c.name)} | ${code(String(c.value))} |`), '');
  }
  write(`modules/${m.name}.md`, lines);
}

const index = [
  frontMatter('Reference', {sidebar_position: 0, slug: '/reference'}),
  '# Reference',
  '',
  'Every component, asset type and script module in the engine, read from a booted engine rather than the source, so nothing here can drift from what a scene or a script actually sees.',
  '',
  '- A **component** is what gives a node a capability; its page lists the properties a scene sets and a script reads or writes.',
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
  index.push(`### ${label}`, '', '| component | tags | properties |', '| --- | --- | --- |');
  for (const name of grouped[label]) {
    index.push(`| [${code(name)}](./components/${name}.md) | ${(tags[name] ?? []).map(code).join(' · ')} | ${Object.keys(components[name]).length} |`);
  }
  index.push('');
}
index.push('## Asset types', '', '| type | files | used by |', '| --- | --- | --- |');
for (const type of Object.keys(assetTypes).sort()) {
  const used = (users[type] ?? []).map(([c, p]) => `${code(c + '.' + p)}`).join(', ') || '—';
  index.push(`| [${code(type)}](./assets/${type}.md) | ${assetTypes[type].directory ? code(assetTypes[type].directory + '/') : '—'} | ${used} |`);
}
index.push('', '## Script modules', '', '| module | functions | constants |', '| --- | ---: | ---: |');
for (const m of modules) index.push(`| [${code(m.name)}](./modules/${m.name}.md) | ${m.functions.length} | ${m.constants.length} |`);
index.push('');
write('index.md', index);

console.log(
  `reference: ${Object.keys(components).length} components, ${Object.keys(assetTypes).length} asset types, ${modules.length} modules → docs/reference/`,
);
