# Working in this repository

The Balaur website: a Docusaurus site at balaurengine.org, built and deployed
from `main`. The engine repo's `AGENTS.md` governs writing, and wins where it
disagrees with this file.

## Generated files, never edited by hand

A build regenerates these, so an edit to one is lost on the next `yarn build`.
Change the generator instead.

- `docs/reference/**` and `docs/roadmap.mdx` — `scripts/gen-reference.mjs`,
  `scripts/gen-roadmap.mjs`. The roadmap's prose half is
  `src/data/roadmap-copy.mjs`, and a roadmap item with no copy there fails the
  build on purpose.
- `static/llms.txt`, `static/llms-full.txt` — `scripts/gen-llms.mjs`.
- `static/img/{manual,editor}/*.webp` and `static/img/poster/` —
  `scripts/optimize-images.mjs`, from the PNGs the engine's showcase writes.
- `reference/` — `scripts/sync-docs.sh`, from the engine repo.

## Search engines

- A page title is at most 60 characters **including the ` | Balaur` suffix**,
  so about 51 of your own. A description is at most 160.
- Every page carries a description, an `image`, and a canonical. Utility pages
  that should not rank (`/search`, `/blog/authors`) are noindexed and named in
  the sitemap's `ignorePatterns`.
- The theme's search page emits `<meta property="robots">`, which crawlers
  ignore because they read `name`. `src/theme/SearchPage` adds the correct tag;
  do not delete it thinking it is a duplicate.

## Fonts and third parties

The site loads nothing from another origin, and the privacy page says so.

- Fonts are self-hosted in `static/fonts/`, one variable file per family and
  subset, declared as `@font-face` in a `<style>` in `headTags`.
- They live there rather than in `custom.css` because webpack rewrites every
  `url()` in a stylesheet to a hashed copy under `/assets`: the fonts would
  ship twice and the preloads would match neither.
- Do not reintroduce a font CDN, an analytics script or an embed. Both are a
  measured regression and a contradiction of `/privacy`.

## Measuring performance

`docusaurus serve` sends everything **uncompressed**. GitHub Pages gzips, so a
Lighthouse run against `serve` reads a JS payload about three times production's
and scores roughly twenty points low. Measure against a server that gzips, or
against the deployed site. A mobile score in the seventies from `serve` is
normally a high nineties in production.

## Prose lint

`scripts/lint-prose.mjs` runs in CI before the build, and a post over any of
these is a red PR. The fix is to cut, never to widen a limit.

- A devlog post: at most 300 words of prose, 35 words in a sentence, 60 in a
  paragraph, and 4 paragraphs outside bullets. A `{/* truncate */}` marker.
- A manual page: the same sentence rule, 90 words in a paragraph, no word cap.
- Everywhere: no em dash except as the lead of a list item
  (`- **Term** — text`); none of: honest, actually, truly, genuinely, "it is
  worth", "worth noting", "the question was", let's, "to be clear", "simply
  put", "in order to", "at its core", leverage, delve, seamless.
- Front matter: title at most 51 characters, description at most 160, and an
  `image` that exists under `static/`.

Prose is what is left after front matter, code, images, tags, tables and link
URLs are removed. Generated and synced files are not linted; their fix is in
the generator or the engine repo.

## Before committing

    yarn lint && yarn typecheck && yarn build

`onBrokenLinks` is `throw`, so a bad internal link fails the build.
