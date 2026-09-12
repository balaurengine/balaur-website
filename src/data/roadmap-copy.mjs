// The site's half of the roadmap page. The engine's docs/ROADMAP.md owns the
// cards themselves — which items exist, their order, their milestone, their
// plan and the sentence each one reads — and scripts/gen-roadmap.mjs writes
// docs/roadmap.mdx from it. So a new item, or a reworded one, is edited there.
//
// What is here is what only the site has:
//
// `frontmatter` and `outro` wrap the page. `shots` is the built half: a picture
// of the thing and the posts that announced it, one entry per item in a `built`
// milestone. `essays` names the posts that are records rather than features — a
// first commit, a set of numbers, a release — so the generator can insist every
// other post belongs to a row.

export default {
  frontmatter: `---
title: "Roadmap — what is built, and what each milestone adds"
sidebar_label: "Roadmap"
description: "What the Balaur game engine does today and what each milestone adds next: the editor, rendering, physics, networking, platforms and shipping, one tab per version."
image: "/img/social/roadmap.png"
hide_table_of_contents: true
---`,

  // Closes the page, under the tabs.
  outro: `[Discord](https://discord.gg/v649emcpAu) ·
[Issues](https://github.com/balaurengine/balaur/issues) ·
[Discussions](https://github.com/balaurengine/balaur/discussions)`,

  // Posts that are a record rather than one feature, so no roadmap row owns
  // them. Everything else under blog/ has to be named by a `shots` entry.
  essays: [
    'the-initial-engine',
    'godot-rapier-and-balaur',
    'benchmarks',
    'balaur-0-1-0',
  ],

  // One per built item: the picture on its card, and the posts it was written
  // up in. Every image is a screenshot the engine's showcase pipeline wrote,
  // read as the `.webp` scripts/optimize-images.mjs makes beside the PNG.
  shots: {
    'The editor': {
      image: '/img/manual/editor_overview.webp',
      alt: "The editor on examples/angrynerds: the node tree, the viewport with its 2D grid and gizmo, the inspector, and the dock tabs",
      posts: ['profiler'],
    },
    'Tile maps': {
      image: '/img/manual/tiles_overview.webp',
      alt: 'The Tiles dock painting a ground layer, with tile_collision on the map in the inspector',
      posts: ['tile-maps'],
    },
    'Script completion and hover': {
      image: '/img/manual/script_completion.webp',
      alt: 'The completion popup: a module path, and the functions and constants under it',
      posts: ['what-completes-at-the-caret', 'language-server'],
    },
    'Selection, alignment and a library': {
      image: '/img/manual/editor_selection.webp',
      alt: "The Library dock open under the viewport, with a torus selected and pointed at the library's metal material",
      posts: ['select-two-things'],
    },
    'Godot import': {
      image: '/img/blog/port_godot_balaur.webp',
      alt: 'Polyglot Pirates in Godot on the left and the converted project in Balaur on the right',
      posts: ['porting-a-godot-game'],
    },
    'Focused script editing': {
      image: '/img/manual/editor_focus.webp',
      alt: 'The code pane with the window to itself, the file\'s hooks list beside it, and the Focus chip lit in the top bar',
      posts: ['focused-script-editing'],
    },
    'Rune scripting': {
      image: '/img/manual/scripting_editor.webp',
      alt: 'The Script persona: the file, the hooks it declares, and the events its node receives',
      posts: ['rune-scripting', 'generated-script-reference'],
    },
    'Scenes, assets and packs': {
      image: '/img/manual/editor_assets.webp',
      alt: 'The Assets dock on res://, with the project file, the scenes and the scripts beside the tree',
      posts: ['asset-hot-reload', 'settings-beside-the-file'],
    },
    'Rapier in 2D and 3D': {
      image: '/img/manual/physics_collapse.webp',
      alt: "The Physics persona's collider overlays over the towers of examples/angrynerds",
      posts: ['2d-support'],
    },
    'Rigs and animation': {
      image: '/img/manual/rigging_modifiers.webp',
      alt: "The Rig tool drawing a modifier's chain, the dashed line to its target and the handle that drags it",
      posts: ['skeletons-and-a-debugger', 'gpu-skinning', 'rigging-panels'],
    },
    'Widgets, text and the batteries': {
      image: '/img/manual/ui_widgets.webp',
      alt: "The Interface persona: a HUD's widgets in the tree, drawn over the safe area, and a button in the inspector",
      posts: ['text-in-the-world', 'audio-buses', 'input-actions-and-gamepads', 'save-games', 'localization', 'a-screen-of-nodes'],
    },
    'Interactivity without a script': {
      image: '/img/manual/editor_events.webp',
      alt: 'The Events view: two binding rows on the ball, one counting the click and one opening the door when the score reaches three',
      posts: ['select-two-things'],
    },
    'What draws today': {
      image: '/img/manual/rendering_directional.webp',
      alt: "Three occluders under one directional light, each casting a parallel shadow strip at the light's angle",
      posts: ['sprites', '2d-lights-and-shadows', 'every-shape-is-a-mesh'],
    },
    'Post-process materials': {
      image: '/img/manual/shader_preview.webp',
      alt: 'A material in the inspector, its shader open in the code editor, and the UV channel drawn instead of the picture',
      posts: ['shaders-and-materials'],
    },
    'The deterministic core': {
      image: '/img/manual/determinism_replay.webp',
      alt: 'The Session dock playing a recorded run back, with nobody at the mouse',
      posts: ['rollback-networking'],
    },
    'Apple and the platform module': {
      image: '/img/manual/export_sheet.webp',
      alt: 'The Export sheet: the ios, android, macos-universal, windows and web targets, each saying what it still needs',
      posts: ['game-center-icloud-and-purchases', 'mobile-export'],
    },
    'Export, the web and the CLI': {
      image: '/img/manual/export_size.webp',
      alt: "Where a pack's bytes are, and what lossless re-encoding takes off",
      posts: ['what-an-export-weighs', 'editor-in-the-browser'],
    },
  },
};
