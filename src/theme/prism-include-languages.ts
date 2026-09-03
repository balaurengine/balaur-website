/**
 * Swizzled from @docusaurus/theme-classic to add Rune.
 *
 * Everything above the Rune block is the upstream implementation: it loads the
 * `prism.additionalLanguages` grammars onto prism-react-renderer's own Prism
 * instance. Keep it in step when Docusaurus changes.
 */
import siteConfig from '@generated/docusaurus.config';
import type * as PrismNamespace from 'prismjs';

export default function prismIncludeLanguages(
  PrismObject: typeof PrismNamespace,
): void {
  const {
    themeConfig: {prism},
  } = siteConfig as {themeConfig: {prism: {additionalLanguages: string[]}}};
  const {additionalLanguages} = prism;

  const PrismBefore = globalThis.Prism;
  globalThis.Prism = PrismObject;

  additionalLanguages.forEach((lang) => {
    if (lang === 'php') {
      require('prismjs/components/prism-markup-templating.js');
    }
    require(`prismjs/components/prism-${lang}`);
  });

  // Rune, the engine's scripting language. Prism has no grammar for it and
  // Rust is the closest fit — same `fn`, `let`, `::`, comments and strings.
  // Two shapes are Rune's own: `#{ .. }` object literals, which the Rust
  // grammar would read as an attribute, and `pub fn f(this)`.
  const rust = PrismObject.languages.rust;
  if (rust) {
    PrismObject.languages.rune = PrismObject.languages.extend('rust', {
      punctuation: /#\{|[{}[\];(),:]|\.(?!\d)/,
    });
    delete (PrismObject.languages.rune as Record<string, unknown>).attribute;
    PrismObject.languages.rn = PrismObject.languages.rune;
  }

  delete (globalThis as {Prism?: unknown}).Prism;
  if (typeof PrismBefore !== 'undefined') {
    globalThis.Prism = PrismObject;
  }
}
