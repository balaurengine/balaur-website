// The prose half of the roadmap page. The engine's docs/ROADMAP.md owns which
// items exist, their order, their milestone and their plan; this file owns how
// each one reads. scripts/gen-roadmap.mjs joins the two on the title and writes
// docs/roadmap.mdx, so a new item is added there and its paragraph here.
//
// Every value is source pasted into the generated MDX verbatim: `items` holds
// each card's JSX — a quoted string, or a fragment where it needs <code>.

export default {
  frontmatter: `---
title: "Roadmap — what is built, and what each milestone adds"
sidebar_label: "Roadmap"
description: "What the Balaur game engine does today and what each milestone adds next: the editor, rendering, physics, networking, platforms and shipping, one tab per version."
image: "/img/social/roadmap.png"
hide_table_of_contents: true
---`,

  intro: `What is built, and what comes after it, one tab per milestone. **0.1**
is the engine as it stands, built and waiting on a tag; 0.2 is what is being
built now; **Later** is the pile with no version against it, wanted and waiting
on someone with a game that needs it. Nothing here is a date.

The [features page](/features) is 0.1 feature by feature, and the
[changelog](./changelog.md) is the same list as one line each.`,

  // Closes the page, under the tabs.
  outro: `[Discord](https://discord.gg/v649emcpAu) ·
[Issues](https://github.com/balaurengine/balaur/issues) ·
[Discussions](https://github.com/balaurengine/balaur/discussions)`,

  // The line under each milestone's heading, above its cards.
  milestones: {
    '0.1': `<>Everything below already runs. It is one version for the whole workspace, tagged nowhere yet, so there is no download that carries a number: the ten cards here are what a <code>v0.1.0</code> would contain. The <a href="/docs/changelog">changelog</a> lists it feature by feature.</>`,
    '0.2': `'The list you hit making an ordinary game: two clips at once, a viewport that selects more than one node, a 3D light you place yourself, a session a script can host, and a build signed for the platform it runs on.'`,
    '0.3': `<>Everything you see. 2D lights get normal maps, particles reach 3D, the camera culls what is behind it and draws to more than one view, and the timeline grows the curve handles and the sequencer a cutscene needs.</>`,
    '0.4': `<>Two machines playing the same game. Rollback, stable ids and QUIC datagrams are built and reachable only from Rust; this is the milestone that puts them behind <code>session</code> in a script, in a browser, and on a Gamend lobby. Server work lives in the <a href="https://github.com/appsinacup/gamend">Gamend repository</a>; the plan is kept beside the engine's so the two sides agree.</>`,
    '0.5': `'Making a game without opening a script: hooks and states on any node, paths an agent walks, a tile map finished, voice and a controller that does more than rumble, and an agent driving the editor over MCP.'`,
    '0.6': `<>Getting the thing out. One command puts a build on a URL or a phone, a pack ships sealed, Steam and Google Play join Apple behind the <code>platform</code> module, and a project loads while the game runs rather than whole.</>`,
    'Later': `'Wanted, planned, and waiting on a game that asks. Nothing here is refused; each one moves into a numbered milestone the moment somebody needs it.'`,
  },

  items: {
    'The editor':
      `<>A stage shell of tabbed, resizable, animated docks, built out of the engine's own widgets and themed with them, so the editor is a Balaur application. Undo and redo, copy and paste, a searchable inspector, prefab instances with overrides, ray picking, a profiler dock, a narrow-window layout, and the Rig, Polygon and Tiles tools. Renaming a file in the Assets dock rewrites every reference to it.</>`,
    'Rune scripting':
      `<>One language, chosen for being deterministic: Rune, with a <code>math</code> module that answers the same on every platform. Exported properties, component handles on nodes, hot reload, named events between scripts, modules loaded from disk or a pack, and a debugger with breakpoints, stepping and frames over the Debug Adapter Protocol. The API documents itself, and <code>balaur api</code> prints it.</>`,
    'Scenes, assets and packs':
      `<>Prefabs with an override per path, <code>id://</code> references that survive a rename, import settings in a file beside the picture, sprite sheets with tags and slices, and hot reload for textures, models, fonts and sounds. <code>balaur import</code> reads Aseprite, Tiled and LDtk. A shipped project is a sha256-verified binary pack.</>`,
    'Rapier in 2D and 3D':
      `<>The whole of rapier, in both dimensions and behind one script API: bodies with CCD and sleep, joints with motors, limits and breaking, character controllers, raycasts and shape casts, collision and contact-force events, one-way platforms, ray-cast vehicles, and every collider shape rapier has, voxels included and editable while the game runs.</>`,
    'Rigs and animation':
      `<>Skeletons in 2D and 3D with the same five modifiers each — <code>look_at</code>, <code>two_bone_ik</code>, <code>fabrik</code>, <code>ccdik</code> and <code>jiggle</code> — GPU skinning, per-vertex deform tracks, morph targets from glTF, a clip retargeted onto another rig through a <code>bone_map</code>, and ragdolls blended back onto the bones by weight.</>`,
    'What draws today':
      `<>Sprites, atlases and tile maps; 2D lights and shadows; WESL shaders and material assets, including ones that read the screen; bloom, SSAO, SSR and depth of field; ten 3D primitives and six 2D ones, every one a mesh built headless; path assets stroked, extruded, revolved and swept; booleans; a <code>cloner</code>; and textured particles.</>`,
    'Widgets, text and the batteries':
      `<>Fourteen widget kinds with containers, themes, focus and a text field that takes IME input, over cosmic-text, so bidi, CJK breaks and font fallback work. Text in the world as <code>text2d</code> and <code>text3d</code>, and bitmap fonts for a pixel face. Beside them: audio buses and positional audio, input actions with rebinding, save games with migrations, localisation with plurals, and tweens.</>`,
    'The deterministic core':
      `<>A fixed 60 Hz step, a digest per tick that CI compares across operating systems, record and replay, and rollback with node ids stable across spawns. Sessions run lockstep over a socket and are recordable, with a faulty transport to test against. HTTP, WebSocket and WebTransport sit behind one <code>Transport</code> trait.</>`,
    'Apple and the platform module':
      `<>Sign-in, achievements, leaderboards, cloud saves and presence behind one <code>platform</code> module, with Game Center and iCloud behind it, in-app purchase, notifications and URL handling. An <code>[apple]</code> manifest section writes <code>Info.plist</code> and entitlements and signs a macOS app. A store write waits for its tick to settle, so rollback cannot double it.</>`,
    'Export, the web and the CLI':
      `<><code>balaur export</code> builds a native or web target and reports what the pack weighs, by section and by largest entry, naming what nothing references; <code>strip</code> drops those, and images, fonts and audio re-encode losslessly or lossily per kind. The editor runs in a browser over IndexedDB. <code>balaur test</code>, a lint script that mirrors CI, and a benchmark suite measured beside Godot's come with it.</>`,
    'Tile maps':
      `<>What is left of tile maps: quarter-tile sheets, where a cell is drawn as four half-tiles picked by its own corners, which is how the five-tile sheets people download are meant to be read. Everything else landed — collision as one voxel shape, autotiling from an ordered rule table with templates, animated and light-blocking tiles, per-tile data, isometric and hexagonal layouts, the brushes and the Set panel, cells a level may keep in its own file, and <code>balaur import</code> for Tiled and LDtk.</>`,
    'Script completion and hover':
      `<>Type <code>physics2d::</code> and the list is that module's 66 functions and 48 constants, each with the line the reference prints. Type <code>node.body2d.</code> and it is what acts on that component. Hover names a function's signature and what it does; go-to-definition opens the file, or the Docs dock when the definition is the engine's. <code>balaur fmt</code> lays a project out, rename rewrites every file a script's <code>mod</code> declarations reach, and the same server answers a VS Code, Zed or Neovim client. Semantic tokens, inlay hints and code actions are not planned.</>`,
    'Semantic tokens, inlay hints and code actions':
      `<>The three LSP surfaces the script tooling left out. Semantic tokens colour a script from what the compiler resolved rather than from a TextMate grammar's guess, so a shadowed local and a module function stop looking alike. Inlay hints show an inferred type or an argument name beside the code that omitted it. A code action offers the fix on a diagnostic: import the module, spell the call the way it is registered. All three wait until completion, hover and rename have been used enough to say which gaps are real.</>`,
    'Curve editor and onion skin':
      `'Tangent handles on keys and ghosted neighbouring frames in the timeline.'`,
    'Selection, alignment and a library':
      `<>Built. The selection is a set: shift and ⌘ click, box select in both viewports, and a gizmo drag that moves, turns and scales the whole set. Group, align, distribute, hide, lock, isolate; outliner facet chips; a dropped file becoming a node; light, camera and frustum gizmos; a view-mode chip and camera bookmarks; a Pen tool over <code>path2d</code>; a material panel with texture slots; a Cost dock; and a Library of materials, lighting setups and templates behind <code>balaur new --template</code>. No sky ships yet.</>`,
    'Network dock and Play as two':
      `'Round trip, loss, rollbacks per second and the desync tick per link, and a second instance of the project launched headless and joined over loopback with the fault settings on.'`,
    'The editor in a browser':
      `'Shipped: the canvas, play and hot reload as on the desktop, a project the browser keeps across a refresh, a folder opened from your machine and taken back out as a zip, and the two builds a tab can finish by itself — a pack and a web bundle. Left: a project kept on a server rather than in one browser, and the native builds, which need a linker no browser has.'`,
    'Texture import settings':
      `<>A pixel-art sprite can ask for hard edges today: a settings file sits beside the picture, <code>[import.texture]</code> sets the project's default, and filtering and colour space reach the upload. The editor has an Import tab beside the Inspector for the file the Assets dock has selected, saying for each key whether the value is the file's own, the project's or the engine's. Still to come: repeat, mipmaps, anisotropy and premultiplied alpha, which wait on the renderer exposing a whole sampler, and GPU-compressed textures at export.</>`,
    'Asset streaming':
      `'A load that runs off the tick, a scene added to one already running, and an asset dropped when nothing names it — instead of a pack held whole in memory.'`,
    'Extensions, tier two':
      `'Native extensions that add components and systems, and call back into scripts.'`,
    'Falling sand':
      `<>A Noita-shaped grid in 2D: sand pours, water flows, lava sets fire to wood and cools to stone, each cell following a rule table in a <code>cell_set</code> rather than a script of its own. It is not physics, so it is not in rapier and not in the default build — a <code>balaur_cells</code> plugin behind a feature that is off, on the fixed step and in the digest. Bodies couple through parry's 2D voxel collider, which <code>collider2d</code> already has and which a script already digs into.</>`,
    'Soft bodies, tearing, fluids':
      `'Deformable bodies, cloth that tears, liquids and granular materials, built in Rapier and exposed as components.'`,
    'Animation blending':
      `'Blend trees and state machines that mix clips by weight. A rig is otherwise complete — five modifier kinds in 2D and 3D, retargeting, deform tracks and ragdolls — and what is missing is running two clips at once.'`,
    'A sequencer':
      `'Cutscenes and cameras on a timeline, with tracks that call something rather than only move it.'`,
    'Pause, time scale and smooth frames':
      `<>A pause that holds the game and keeps the menu alive, a <code>process</code> mode per subtree, slow motion and fast forward, motion interpolated between fixed steps so a 144 Hz display sees every frame move, and a tick rate setting.</>`,
    'Interactivity without a script':
      `<>Built, bar the rigs. Hover, click, key, action, scroll and resize hooks on any drawn node; <code>states</code> naming a look; typed <code>[variables]</code> on the scene; and <code>[[nodes.bindings]]</code> rows the Events view writes, each one a call a script could make and convertible to one. A <code>when</code> is a comparison over the variables, so the editor reads it and diffs it. Orbit, first-person, third-person and click-to-move rigs as presets are what is left.</>`,
    'Navigation':
      `<>A <code>navmesh</code> asset baked from the scene's colliders and tile maps, paths over it through <code>polyanya</code> or over a grid, and <code>agent2d</code> and <code>agent3d</code> that avoid each other and moving obstacles, all on the fixed step and in the digest so a lockstep game runs it on every peer.</>`,
    'Voice in a session':
      `'Capture, Opus, a jitter buffer, push-to-talk or voice activity, echo cancellation, and each player heard from where their node stands, on a bus like every other sound. Voice never enters the simulation or the digest.'`,
    'Motion and haptics beyond one pad':
      `'Gyro on Switch Pro and Joy-Con, sensor calibration per unit, adaptive triggers and light bars, waveform haptics, motion from a phone or tablet, and gamepads on iOS and Android. A PlayStation pad reports motion and runs both motors today; nothing else does.'`,
    'The 3D look':
      `<><code>light3d</code> with shadows and light layers, an <code>environment</code> carrying sky, fog, exposure, tonemap and grading, and <code>package::pbr</code> with six texture slots are built; a scene with no light still gets the engine's own. What is left: image-based lighting and SSAO bound, that surface as the built-in a node with no material draws, glTF import keeping factors and maps, glass, mirrors and probes, the finishing passes, and layer stacks.</>`,
    'Lit normal-mapped sprites':
      `<>2D lights and shadows are built. A normal map on <code>sprite</code> needs the light map to carry a direction as well as a colour. Occluding tiles moved to the tile-map plan.</>`,
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
