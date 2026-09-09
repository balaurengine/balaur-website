// The site's half of the Releases page. `scripts/gen-releases.mjs` reads what
// GitHub has published into `releases.json`; this file says which versions the
// site describes and what it says about them, the way `roadmap-copy.mjs` owns
// the words on the roadmap cards.
//
// It leads rather than follows, because a version exists here before GitHub
// has a release for it: the engine's `scripts/draft_release.sh` drafts a `v*`
// tag for a human to press the button on, so there is a gap between the
// version being cut and the release being published. A row with no published
// release yet simply shows no GitHub link.
//
// Newest first — the page does not sort.
export default [
  {
    // What the engine's release workflow tags, and what a reader calls it.
    tag: 'v0.1.0',
    version: '0.1.0',
    // Shown until GitHub has a published release to take a date from.
    date: '2026-09-09',
    prerelease: true,
    line: 'The editor, Rune scripting, Rapier in 2D and 3D, rendering and export.',
    // The announcement, the milestone it closed, and the reel on the post.
    post: '/blog/balaur-0-1-0',
    milestone: '/docs/roadmap#0.1',
    clip: 'balaur-0-1-0',
  },
];
