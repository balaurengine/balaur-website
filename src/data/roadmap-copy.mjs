// The prose half of the roadmap page. The engine's docs/ROADMAP.md owns which
// items exist, their order, their tier and their plan; this file owns how each
// one reads. scripts/gen-roadmap.mjs joins the two on the title and writes
// docs/roadmap.mdx, so a new item is added there and its paragraph here.
//
// Every value is source pasted into the generated MDX verbatim: `items` holds
// each card's JSX — a quoted string, or a fragment where it needs <code>.

export default {
  frontmatter: `---
title: "Roadmap — what the engine does not do yet"
sidebar_label: "Roadmap"
description: "What the Balaur game engine does not do yet and will: editor tools, scripts and assets, networking, platforms and more, each item linked to its plan."
image: "/img/social/roadmap.png"
---`,

  intro: `What does not exist yet and will. Everything in [Features](/features) is
already in the engine; the [changelog](./changelog.md) is what each release
added.

A tier says how much a game needs the thing, not when it lands. Cards in a
group are ordered by it.

- **Tier 1 — blocks a game today.** You hit this making an ordinary game and
  there is no way around it. Built next.
- **Tier 2 — rounds out the engine.** A game ships without it, awkwardly, or
  a whole kind of game needs it.
- **Tier 3 — when a game asks.** Wanted and planned, waiting on someone with
  a game that needs it.`,

  // Closes the page, under the last group.
  outro: `[Discord](https://discord.gg/v649emcpAu) ·
[Issues](https://github.com/balaurengine/balaur/issues) ·
[Discussions](https://github.com/balaurengine/balaur/discussions)`,

  // An opening line under the group's heading, for the groups that want one.
  groups: {
    'Gamend': `Server work lives in the [Gamend repository](https://github.com/appsinacup/gamend); the plan is kept beside the engine's so the two sides agree.`,
  },

  items: {
    'Tile maps':
      `<>Collision from the tileset. Autotiling as an ordered rule table — first match wins, one rule covering eight orientations, variation picked by hash so a stroke resolves the same twice — with templates for the sheet layouts people ship, and the bitmask terrains Godot and Tiled use as sugar over it. Animated and occluding tiles, custom data per tile, chunked cells, isometric and hexagonal layouts. A Tiles dock with seven brushes, a tileset document, and <code>balaur import</code> for Tiled and LDtk projects.</>`,
    'Script completion and hover':
      `<>Completion, docs on hover, go-to-definition, formatting and rename in <code>balaur lsp</code> and the Script persona, and a VS Code extension over the same server. Diagnostics are all the server publishes today.</>`,
    'Curve editor and onion skin':
      `'Tangent handles on keys and ghosted neighbouring frames in the timeline.'`,
    'Rigging panels':
      `'A weight table with auto and smooth weights, handles for IK targets, bone names in the viewport, mirror and symmetry, a mesh traced from an image, deform keys, and a bone map for retargeting. The Rig and Polygon tools, four mesh modes with a brush, and the rest-pose verbs are there today.'`,
    'Selection, alignment and a library':
      `<>Select several nodes, box-select, group, align and distribute, hide, lock and isolate; filter the outliner; drop an image, a <code>.glb</code> or a sky onto the viewport and get a node; gizmos for lights and cameras; wireframe and normals views; a pen tool; a material panel; and a library of materials, skies, models and templates to start from.</>`,
    'Network dock and Play as two':
      `'Round trip, loss, rollbacks per second and the desync tick per link, and a second instance of the project launched headless and joined over loopback with the fault settings on.'`,
    'The editor in a browser':
      `'Shipped: the canvas, play and hot reload as on the desktop, a project the browser keeps across a refresh, a folder opened from your machine and taken back out as a zip, and the two builds a tab can finish by itself — a pack and a web bundle. Left: a project kept on a server rather than in one browser, and the native builds, which need a linker no browser has.'`,
    'Texture import settings':
      `<>Nearest or linear filtering, repeat, mipmaps, anisotropy and sRGB per image, with project defaults and a settings file the editor writes beside the picture; GPU compression at export. A pixel-art sprite cannot ask for hard edges today.</>`,
    'Asset streaming':
      `'A load that runs off the tick, a scene added to one already running, and an asset dropped when nothing names it — instead of a pack held whole in memory.'`,
    'Extensions, tier two':
      `'Native extensions that add components and systems, and call back into scripts.'`,
    'Soft bodies, tearing, fluids':
      `'Deformable bodies, cloth that tears, liquids and granular materials, built in Rapier and exposed as components.'`,
    'Animation blending':
      `'Blend trees and state machines that mix clips by weight, and IK in 3D.'`,
    'More of a rig':
      `<>FABRIK and CCDIK chains, jiggle, a clip played on another rig through a bone map, vertex deform tracks, and a ragdoll built from the bones. <code>look_at</code> and two-bone IK are built.</>`,
    'A sequencer':
      `'Cutscenes and cameras on a timeline, with tracks that call something rather than only move it.'`,
    'Pause, time scale and smooth frames':
      `<>A pause that holds the game and keeps the menu alive, a <code>process</code> mode per subtree, slow motion and fast forward, motion interpolated between fixed steps so a 144 Hz display sees every frame move, and a tick rate setting.</>`,
    'Interactivity without a script':
      `<>Hover, click, key and resize hooks on any drawn node, named states a node tweens between, scene variables, and event bindings edited in the Events view — each one a call a script could make, and convertible to one. Orbit, first-person, third-person and click-to-move rigs as presets.</>`,
    'Navigation':
      `<>A <code>navmesh</code> asset baked from the scene's colliders and tile maps, paths over it through <code>polyanya</code> or over a grid, and <code>agent2d</code> and <code>agent3d</code> that avoid each other and moving obstacles, all on the fixed step and in the digest so a lockstep game runs it on every peer.</>`,
    'Voice in a session':
      `'Capture, Opus, a jitter buffer, push-to-talk or voice activity, echo cancellation, and each player heard from where their node stands, on a bus like every other sound. Voice never enters the simulation or the digest.'`,
    'Motion and haptics beyond one pad':
      `'Gyro on Switch Pro and Joy-Con, sensor calibration per unit, adaptive triggers and light bars, waveform haptics, motion from a phone or tablet, and gamepads on iOS and Android. A PlayStation pad reports motion and runs both motors today; nothing else does.'`,
    'The 3D look':
      `<>A <code>light3d</code> component with shadows; an <code>environment</code> with sky, image-based lighting, fog, exposure, tonemap and grading; a PBR material with texture maps that needs no shader written and is imported from glTF; glass, mirrors and reflection probes; vignette, grain and the other finishing passes as post-process materials. The only 3D light today is hard-coded.</>`,
    'Lit normal-mapped sprites':
      `<>2D lights and shadows are built. A normal map on <code>sprite</code> needs the light map to carry a direction as well as a colour. Occluding tiles moved to the tile-map plan.</>`,
    'Text in the world':
      `<>A name over a character and a score on a sign: <code>text2d</code> and <code>text3d</code> shaped by the same engine the widgets use, outline and shadow, bitmap fonts, and an immediate <code>draw_text_2d</code> for tools.</>`,
    'Particles in 3D':
      `<>A <code>particles3d</code> emitter, and in both dimensions: emission from a sphere, box, cone, ring or mesh, randomness, animated sheets, attractors, colliders, trails and sub-emitters, with a compute stepper where the GPU has one.</>`,
    'Culling and level of detail':
      `'Nodes outside the camera skipped and a script that can ask whether one is in view, visibility layers, repeated meshes drawn in one call, and meshes that carry cheaper versions of themselves for distance.'`,
    'Voxels and terrain':
      `<>Block types in a <code>voxel_set</code>, a greedy chunk mesher with baked ambient occlusion, a grid file that scales past a hand-written one, a Voxels tool that paints in the viewport, <code>balaur import</code> for MagicaVoxel files, and the same mesher over <code>heightfield</code>. Physics is already there — rapier's voxel shape collides without the seam-catching every hand-rolled voxel collider has, and a script can dig into one today. Nothing draws either asset.</>`,
    'More than one view':
      `<>A <code>viewport</code> component: split screen, a camera rendered to a texture any sprite or material can read, picture-in-picture, and a camera with a projection, field of view and clip planes an author sets.</>`,
    'Video playback':
      `'A movie on a texture with its audio on a bus. Render-side only — a video never feeds simulation state.'`,
    'Post-process materials':
      `'A shader of your own on the camera chain, beside the bloom, SSAO and depth of field already there.'`,
    'WebTransport in the browser':
      `'QUIC runs natively today: reliable streams and unreliable datagrams in one encrypted connection, with datagrams doing the job of raw UDP so the engine never exposes a UDP socket. The browser reaches WebTransport through its own API, which the web build still has to wrap.'`,
    'Sessions from a script':
      `'Host, join and leave from Rune, with a roster whose slots are bound to links; peer, host and headless server roles, the server ordering inputs, verifying every client’s digest and holding the history a late joiner replays from. Rollback runs today between two engines in a Rust test only.'`,
    'Late join, reconnect and host migration':
      `'A snapshot on its own stream for whoever arrives late, a grace period that keeps a dropped player’s slot, spectators, the next member taking over when the host vanishes, and bincode instead of JSON on the wire.'`,
    'State replication and RPC':
      `<>A <code>replicate</code> key on a node — authority, components, mode — and the server sends deltas off the component schema; RPCs address nodes by stable id.</>`,
    'Client prediction and reconciliation':
      `'Your own node moves the frame you press the key, and the server’s correction rewinds that node alone and replays what is still pending, smoothed out over a few frames. Everyone else is drawn a little behind and interpolated.'`,
    'Lag compensation and interest management':
      `'The server rewinds to the tick the shooter saw before testing a hit, and sends each client only what it can see, at a send rate below the tick rate.'`,
    'WebRTC data channels':
      `'Browser peer-to-peer without a relay, behind the same transport trait. Built only once a game needs it; on native, Steam’s Datagram Relay answers the same NAT in the Steam plan.'`,
    'A game server per lobby':
      `'Gamend launches a headless Balaur when a lobby starts, records its address and certificate hash on the lobby, and players connect to it over QUIC. Gamend keeps the roster; the game keeps the ticks.'`,
    'Lobby tokens and rejoin':
      `'A lobby-scoped token binds a player to their slot on the game server and lets them back in after a dropped socket. Leaderboard writes come from the server that saw the match, never from the client that claims a score.'`,
    'The match record':
      `'The server’s recording and final digest uploaded as the lobby’s record, so a disputed result is a replay that either matches or names the tick.'`,
    'A WebRTC relay for browsers':
      `'The server-side WebRTC peer generalised from hook calls to unordered, unreliable data channels per lobby, so two browsers play through Gamend before the engine has WebTransport in a tab.'`,
    'Typed bindings for the whole API':
      `<>One script call per Gamend operation, generated from its OpenAPI document and realtime protobuf, with typed events per channel; <code>rest</code> and <code>push</code> stay for the hooks a game adds.</>`,
    'Skill matchmaking':
      `'Ratings, widening bands and leaver refill, on Gamend’s own roadmap. The engine binds whatever the API exposes.'`,
    'An MCP server':
      `<><code>balaur mcp</code>: the project, its components and API, <code>check</code>, a headless run and a screenshot as tools an agent drives from Claude Code, Cursor or an IDE, and the running editor's palette behind a second flag. Files are the API, so the editor follows every edit.</>`,
    'Projects in the cloud':
      `<>A project on a Gamend account with a version per save, a share link with a role, who else is in the scene and what they have selected, comments pinned to nodes, and editing together — under a lock per scene first, over a CRDT if a team asks.</>`,
    'Accessibility':
      `'A screen reader over the widget tree, text scaling, captions and colour-blind-safe defaults. Focus order, localization and rebindable actions are already there.'`,
    'A crash report that reproduces itself':
      `'The recording, the log and the build id in one file, so a bug report re-runs the session that caused it bit for bit.'`,
    'Steam':
      `<>Sign-in, achievements, leaderboards, Cloud saves, rich presence, the overlay, Workshop, Steam Input and Steam networking — behind the <code>platform</code> module Apple's stores already speak, so one script runs everywhere.</>`,
    'Google Play':
      `'Play Games Services, Sign in with Google, Play Billing, Play Integrity and Play Asset Delivery on Android, over the same module. An application id, an app bundle and 16 KB page alignment come first: without them Play refuses the upload, store or no store.'`,
    'Signed releases':
      `'The nightly and tagged builds, their runtime templates and the updater exist. What is missing is a download per platform that is signed and notarized, so it opens without a warning.'`,
    'One-click deploy':
      `'Deploy to the web or to a phone from one command or one button: the game built, signed and put somewhere a player can reach it — a URL, itch.io, a device on the cable, TestFlight, Play or Steam. Today an export leaves a bundle on your disk and stops.'`,
    'Embedding on a page':
      `<>A <code>&lt;balaur-viewer&gt;</code> element and an npm runtime with a React wrapper, a page API to set variables and hear events over the bridge that already exists, a web module sized to what the game uses instead of one that carries everything, a progressive web app option on the export, and image, video and glTF export from the editor.</>`,
    'Sealed packs and stripped binaries':
      `'Today every texture, sound and scene comes out of a shipped game as the original file, scripts as bytecode on native and source on the web, and the binary keeps its symbols. Planned: a stripped binary, bytecode on the web, and a pack sealed with ChaCha20-Poly1305 — a speed bump by name, since the key ships with the game. DRM wrappers, anti-cheat and anti-debugging are not coming; a result that matters is checked by a server.'`,
    'Console export':
      `'Switch, PlayStation and Xbox. The export and the pack shape travel; each console’s graphics, input and store layer is an NDA SDK that is none of the crates the engine runs on.'`,
    'XR':
      `'OpenXR on desktop and standalone headsets, WebXR in the browser: stereo views, tracked poses, controller and hand input.'`,
  },
};
