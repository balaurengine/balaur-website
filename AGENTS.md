# Working in this repository

The Balaur website: a Docusaurus site at balaurengine.org. Every push to `main`
builds and deploys it through `.github/workflows/deploy.yml`, and so does the
engine's nightly. The engine repo's `AGENTS.md` governs writing, and wins where
it disagrees with this file. `CLAUDE.md` imports this file; edit this one.

## Where things are

| File | What it holds |
| --- | --- |
| [README.md](README.md) | install, run, build, and how a deploy happens |
| [scripts/lint-prose.mjs](scripts/lint-prose.mjs) | every prose limit below, as code |
| [.claude/house-style.json](.claude/house-style.json) | the `--style` profile for the `avoid-ai-writing` skill |
| [static/play/README.md](static/play/README.md) | the web build that `/play` and `/editor` load |
| [assets/audio/README.md](assets/audio/README.md) | the reel's music and its credit |
| [Engine `AGENTS.md`](https://github.com/balaurengine/balaur/blob/main/AGENTS.md) | the writing rules for the manual and the devlog |
| [Engine `CONTRIBUTING.md`](https://github.com/balaurengine/balaur/blob/main/CONTRIBUTING.md) | what a pull request is held to |
| [Engine `docs/ROADMAP.md`](https://github.com/balaurengine/balaur/blob/main/docs/ROADMAP.md) | the rows the roadmap page is built from |
| [Engine `scripts/showcase.sh`](https://github.com/balaurengine/balaur/blob/main/scripts/showcase.sh) | the PNGs and clips in `static/img/manual` and `static/video` |

The engine checkout sits at `../balaur`. `BALAUR_REPO=../balaur` points both
sync scripts at it instead of GitHub.

## Generated files, never edited by hand

A build, a sync script or a by-hand generator writes these, so an edit to one
is lost on the next run. Change the generator instead.

- `docs/reference/**` and `docs/roadmap.mdx` — `scripts/gen-reference.mjs`,
  `scripts/gen-roadmap.mjs`. A roadmap card is a row in the engine's
  `docs/ROADMAP.md`; this repository owns the page's frontmatter and the shot
  and posts a built item shows, in `src/data/roadmap-copy.mjs`.
  **`gen-roadmap.mjs` does not fail a build over its source.** A row over the
  card limits, a missing shot, a post nothing names: warnings. A source it
  cannot read or parse: a warning, and the committed `docs/roadmap.mdx` stays
  as it is. It still fails when there is no committed page to keep, or when
  `src/data/roadmap-copy.mjs` throws. The limits are enforced where the file is
  written, by the engine's `scripts/prose_lints.py`. `--strict` runs the same
  checks here as failures, and `--check` fails if the page is stale.
- `src/data/sponsors.json` — `scripts/gen-sponsors.mjs`, from GitHub Sponsors
  over GraphQL. It needs `SPONSORS_TOKEN` (or `GH_SPONSORS_TOKEN`), a personal
  token with `read:org`; the runner's own `github.token` cannot read
  sponsorships. With no token, a failed fetch or a fork's build, it keeps the
  committed list and says so. `includePrivate` stays false: a private sponsor
  is never written to a file this repository publishes.
- `src/data/releases.json` — `scripts/gen-releases.mjs`, from the engine's
  GitHub releases.
- `src/play-version.json` and `src/play-size.json` — `scripts/gen-play-version.mjs`
  and `scripts/gen-play-size.mjs`, from the files in `static/play/`.
- `static/llms.txt`, `static/llms-full.txt` — `scripts/gen-llms.mjs`.
- `static/img/{manual,editor}/*.webp` and `static/img/poster/` —
  `scripts/optimize-images.mjs`, from the PNGs the engine's showcase writes.
- `reference/`, `docs/benchmarks.md` and `docs/manual/_features.mdx` —
  `scripts/sync-docs.sh`, from the engine repo. CI runs it before the build;
  `yarn build` does not.
- `static/play/` — `scripts/sync-play.sh`, the web template and packs of an
  engine release (`ENGINE_TAG`, `nightly` by default).
- `static/img/social/*.png` — `scripts/social-cards.mjs`, run by hand.
- `static/video/balaur-*.mp4|webm` and `video-out/*-share.mp4` —
  `scripts/video-reel.mjs` (`yarn video-reel`), which cuts the release reel
  from the per-feature clips already in `static/video/`. It runs by hand, not
  on build: a pass over two minutes of video is a quarter of an hour, and the
  reel only changes when a clip is retaken. `--share-only` re-cuts just the
  upload copy in about a minute. `NAME`, `VERSION` and `SECTIONS` in that file
  are the release being cut; a shipped reel keeps its files and what made it is
  in the file's history.

An editor clip or screenshot is **1920x1080**, set by `OFFSCREEN_SIZE` in the
engine's `crates/balaur_cli/src/main.rs`. A game renders at its own
`window/width` and `window/height`, 1600x1000 by default. Two things here are
pinned to 1920x1080 and move together: `src/components/Clip.tsx`'s default
`WIDTH`/`HEIGHT`, which stop the page reflowing as a clip loads, and `W`/`H` in
`video-reel.mjs`, which size the cards and are asserted against every clip
before the concat. A clip of a game at another size passes `width` and
`height` to `<Clip>`.

`assets/reel/` holds a clip at the full 1920x1080 for a subject the page
carries at half size, and `video-reel.mjs` reads it before `static/video/`.
Sponza is the one: a camera walking through that much detail costs an order of
magnitude more than a UI clip, so the served copy is 1280 wide and the reel's
source is not served at all. `balaur-sponza`'s `scripts/media.sh --reel <path>`
writes it.

`assets/audio/` is the reel's music bed, committed with its attribution in the
README beside it so `yarn video-reel` needs no download and no account. It is
CC BY: the credit is not optional, and `--audio` refuses a substitute track
that arrives without a `--credit` to go with it. `assets/` is not `static/`, so
none of it is served.

## Search engines

- A page title is at most 60 characters **including the ` | Balaur` suffix**,
  so about 51 of your own. A description is at most 160.
- Every page carries a description, an `image`, and a canonical. A page with
  no `image` falls back to `themeConfig.image`, and the lint does not catch it.
- `/search` and the 404 page are noindexed. The sitemap's `ignorePatterns`
  leaves out `/search/`, `/blog/authors/**` and `/blog/page/**`.
- The theme's search page emits `<meta property="robots">`, which crawlers
  ignore because they read `name`. `src/theme/SearchPage` adds the correct tag;
  do not delete it thinking it is a duplicate.

## Fonts and third parties

The site loads nothing from another origin.

- Fonts are self-hosted in `static/fonts/`, one variable file per family, style
  and subset, declared as `@font-face` in a `<style>` in `headTags`.
- They live there rather than in `custom.css` because webpack rewrites every
  `url()` in a stylesheet to a hashed copy under `/assets`: the fonts would
  ship twice and the preloads would match neither.

## Measuring performance

`docusaurus serve` sends everything **uncompressed**. GitHub Pages gzips, so a
Lighthouse run against `serve` reads a JS payload about three times production's
and scores roughly twenty points low. Measure against a server that gzips, or
against the deployed site. A mobile score in the seventies from `serve` is
normally a high nineties in production.

## Writing rules for site copy

Headlines, feature lines, card text and page intros. The engine repo's
`AGENTS.md` still governs the manual and the blog; these are the extra rules
for the marketing pages, and they are read, not linted.

1. **Never define by negation.** Say what it is, never what it lacks or
   avoids. "no build step", "nothing to install", "no export step", "rather
   than at build" all go.
   - No: `Real-time design, no build step.`
   - Yes: `Design in real time.`
2. **One idea per line.** A semicolon, a colon or a second `and` is the tell.
   Cut everything after the first idea, or promote it to its own line.
   - No: `Place, move and scale in the viewport; every property is a row in the inspector, and every change is undoable.`
   - Yes: `Place, move and scale.`
3. **Enumerations enumerate.** A list of things is a list of things, with no
   trailing clause explaining them.
   - No: `Materials, lights, shadows and particles, live in the scene you are editing.`
   - Yes: `Materials, lights, shadows, particles.`
4. **One sentence.** Two sentences means the first was setup; write the
   second one properly instead.
   - No: `Press play. The scene you designed is the game, and the HUD is laid out over the safe area right there.`
   - Yes: `Pressing play starts the game exactly as you designed it.`
   - No: `Save the script. It is already running.`
   - Yes: `Scripts reload instantly on save.`
5. **One subject. No clause stacking.**
   - No: `Hot reload in milliseconds; breakpoints, stepping, frames and locals in the editor.`
   - Yes: `Hot reload with breakpoint support.`
6. **Short headlines.** A few words, not a claim with a subordinate clause.
   - No: `Deterministic by default: same inputs, same outputs, on every machine.`
   - Yes: `Deterministic by default.`
7. **Cut reassurance.** `right there`, `already`, `live in the scene you are
   editing`, `when you want the metal`, `when you are done`, `you can read`
   are tone, not fact.
8. **No framing, just the thing.** Drop "reads like X without the Y" and
   "think of it as".
   - No: `Rune reads like Rust without the types: no build step, async/await, one language for the game and the editor.`
   - Yes: `Rune scripting with Rust syntax and async/await.`

9. **Simple verbs, simple structure.** No metaphor where a verb will do.
   - No: `Every property is a row in the inspector.`
   - Yes: `View properties in the inspector.`
10. **No jargon a working game developer would not say.** `digest`, `QUIC`,
    `wgpu`, `light map` mean nothing outside the engine. Say `WebTransport`,
    not `QUIC`. Materials are written in `WESL`; `WGSL` is the target and
    belongs in the manual, not on a page.
11. **Cut implementation detail nobody asked for.** `delivered once per tick`,
    `on wgpu`, `linked at run time`, `over an ECS` answer a question the
    reader did not ask.
    - No: `HTTP, WebSockets and QUIC delivered once per tick.`
    - Yes: `HTTP, WebSockets and WebTransport.`
    - No: `2D lights and occluders build a light map.`
    - Yes: `2D lights and occluders.`
12. **Banned phrases.** `one file to ship` says nothing; the fact is that a
    game exports to a single executable, so write that. `no build step` is
    gone site-wide, including the comparison tables.

A fact cut from one page must already live on the page it links to. Check
before cutting.

## Prose lint

`scripts/lint-prose.mjs` runs in CI before the build, over `blog/` and
`docs/`, and a page over any of these is a red PR. `src/pages/` is not linted.
The fix is to cut, never to widen a limit.

- A blog post: at most 300 words of prose, 35 words in a sentence, 60 in a
  paragraph, and 4 paragraphs outside bullets. A description, and a
  `{/* truncate */}` marker.
- Any page under `docs/`: the same sentence rule, 90 words in a paragraph, no
  word cap.
- Both: no em dash on any line outside a code fence, front matter included,
  except after the lead of a list item: `- **Term** — text`,
  `- [label](url) — text` or ``- `code` — text``. None of the phrases in the
  script's `PHRASES`: honest, actually, truly, genuinely, "it is worth",
  "worth noting", let's, "to be clear", "in order to", leverage, delve,
  seamless and the rest.
- Front matter: title at most 51 characters, description at most 160, and an
  `image`, when one is set, that exists under `static/` (a `.webp` passes if
  its `.png` does).

Prose is what is left after front matter, code, images, tags, tables,
headings, admonition fences, imports and link URLs are removed. Generated and
synced files are not linted; their fix is in the generator or the engine repo.
The engine's `scripts/prose_lints.py` copies `PHRASES` and the dash rule for
its own docs, so a change to either lands in both.

The same run feeds each page through `avoid-ai-writing-detector`, the
mechanical half of the `avoid-ai-writing` skill (MIT, a dev dependency): the
tier word lists, hollow intensifiers, template phrases, "it's not X, it's Y",
transition openers, bold overuse and the rest. A P0 or P1 finding is an
error; P2 and P3, and the stylometric heuristics, print with `--reports` and
never fail. With the detector missing, the lint exits 2. The skill's
judgement-only rules (invented specifics, fake first person) have no lint;
that is still a read, with `.claude/house-style.json` as its profile. A name
it misreads as filler (`showcase`, the screenshot pipeline; `features`, the
cargo noun) goes in the script's `DOMAIN_TERMS`, not into a rewording.

## Before committing

    corepack enable     # once; package.json pins Yarn 4
    ./scripts/sync-docs.sh && yarn lint && yarn typecheck && yarn build

CI runs the sync, `yarn lint` and `yarn build`. `yarn typecheck` runs only
here.

`onBrokenLinks` is `throw`, so a bad internal link fails the build.
