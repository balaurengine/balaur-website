// The prose half of the roadmap page. The engine's docs/ROADMAP.md owns which
// items exist, their order, their milestone and their plan; this file owns how
// each one reads. scripts/gen-roadmap.mjs joins the two on the title and writes
// docs/roadmap.mdx, so a new item is added there and its paragraph here.
//
// Every value is source pasted into the generated MDX verbatim: `items` holds
// each card's JSX — a quoted string, or a fragment where it needs <code>. The
// page is its tabs: no intro, and a milestone is its heading and its cards.

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
    'Curve editor and onion skin':
      `'Tangent handles on keys and ghosted neighbouring frames in the timeline.'`,
    'Selection, alignment and a library':
      `<>Built. The selection is a set: shift and ⌘ click, box select in both viewports, and a gizmo drag that moves, turns and scales the whole set. Group, align, distribute, hide, lock, isolate; outliner facet chips; a dropped file becoming a node; light, camera and frustum gizmos; a view-mode chip and camera bookmarks; a Pen tool over <code>path2d</code>; a material panel with texture slots; a Cost dock; and a Library of materials, lighting setups and templates behind <code>balaur new --template</code>. No sky ships yet.</>`,
    'Network dock and Play as two':
      `'Round trip, loss, rollbacks per second and the desync tick per link, and a second instance of the project launched headless and joined over loopback with the fault settings on.'`,
    'A graph that writes Rune':
      `<>Boxes and wires that emit a script. A <code>graphs/*.toml</code> asset writes the <code>.rn</code> beside it, so the digest, the debugger, hot reload and the language server all see ordinary Rune and nothing learns a second language. The palette is generated from the API reference, and the canvas is <code>egui-snarl</code> on the egui the widgets already use.</>`,
    'The editor in a browser':
      `'Shipped: the canvas, play and hot reload as on the desktop, a project the browser keeps across a refresh, a folder opened from your machine and taken back out as a zip, and the two builds a tab can finish by itself — a pack and a web bundle. Left: a project kept on a server rather than in one browser, and the native builds, which need a linker no browser has.'`,
    'Texture import settings':
      `<>A pixel-art sprite can ask for hard edges today: a settings file sits beside the picture, <code>[import.texture]</code> sets the project's default, and filtering and colour space reach the upload. The editor has an Import tab beside the Inspector for the file the Assets dock has selected, saying for each key whether the value is the file's own, the project's or the engine's. Still to come: repeat, mipmaps, anisotropy and premultiplied alpha, which wait on the renderer exposing a whole sampler, and GPU-compressed textures at export.</>`,
    'Asset streaming':
      `'A load that runs off the tick, a scene added to one already running, and an asset dropped when nothing names it — instead of a pack held whole in memory.'`,
    'Scripts you can take':
      `<>The library dock ships materials, skies and models; this adds scripts. Fifteen short files with <code>exports()</code>, dropped onto a node and tuned in the inspector without opening one: movement in 2D and 3D, orbit, first-person, third-person and click-to-move cameras, follow, patrol, a spawner, a timer, health, a pickup, parallax. A copy lands in the project, so changing one is editing your own file.</>`,
    'FBX import':
      `<>The meshes, rigs and clips that never ship as glTF: <code>balaur import</code> over the <code>ufbx</code> crate. Mixamo is the case that forces it, since its downloads are FBX and a rig from there is one the retargeter already handles.</>`,
    'Modelling in the viewport':
      `<>Every shape the engine draws is already a <code>mesh</code> asset built without a GPU, so a modelling tool edits data that exists rather than a new format. Push and pull a face, bevel an edge, subdivide, unwrap with <code>xatlas</code>. Unreal calls this Modeling Mode and Unity ships ProBuilder; nothing here moves a vertex yet.</>`,
    'A shader graph':
      `<>The same canvas the Rune graph brings, emitting WESL instead of Rune. A material's <code>[params]</code> are already read off the linked shader, so a graph writes a file the pipeline compiles the ordinary way. Every large engine has one, and this one costs a second emitter rather than a second renderer.</>`,
    'More than one window':
      `<>A second window from the operating system: a dock torn off the editor onto another monitor, or a game drawing on a second display. kiss3d owns the single window there is, which is the same obstacle standing in XR's way, so the two are one piece of work.</>`,
    'Extensions in WebAssembly':
      `<>A third tier beside the Rust and C ones. A <code>.wasm</code> module runs over <code>wasmtime</code> on a desktop and over the browser's own engine on the web, so an extension is sandboxed and a web build can carry one at all. <code>dlopen</code> reaches neither a browser nor a console.</>`,
    'A world bigger than a float':
      `<>Origin rebasing on the fixed step, so a world runs past the precision a 32-bit float has left, with the scene streamed in chunks around the camera. A 64-bit world is not planned. Rebasing lands in the digest, which makes it a decision the tick takes rather than the renderer.</>`,
    'Translations as a pipeline':
      `<>Strings per locale, interpolation, plurals and the system locale are built. The workflow around them is not: importing from a spreadsheet or a gettext <code>.po</code>, swapping an asset per locale, a dock that names every missing key, and pseudolocalisation, which finds the strings nobody wrapped before a translator does.</>`,
    'Sound that fills a room':
      `<>A bus is a gain tree today. This makes it a graph: reverb, EQ, a compressor and a limiter, music ducked under speech, HRTF so a sound sits at a head rather than between two speakers, and long music streamed instead of decoded whole.</>`,
    'Touch controls a phone needs':
      `<>Touches are already recorded and replayed; nothing draws a control over them. A <code>touch_button</code> and a <code>touch_stick</code> widget kind, pinch, swipe and long-press recognisers, and a keyboard height a layout can read, so a text field is never hidden under the keyboard.</>`,
    'Global illumination':
      `<>Light that bounces, computed while the game runs: a screen-space pass, or a field of probes over a signed distance field. Nothing in the renderer's fork does it, and it is the gap named most often against Godot's SDFGI and Unreal's Lumen. Baked lightmaps stay out.</>`,
    'Occlusion culling':
      `<>What stands behind a wall is drawn today. A software depth rasteriser skips it, over the frustum and distance culling 0.3 brings. It was held back until a scene asked for it, and a scene big enough to ask is what this milestone is about.</>`,
    'Terrain sculpting and foliage':
      `<>The <code>heightfield</code> asset and its mesher exist; no tool touches either. Brushes that raise and flatten ground, splat maps for the textures between, and grass and trees scattered by painting rather than placed one at a time.</>`,
    'A library others publish to':
      `<>The library dock reads one list, the one shipped with the editor. This is the catalogue anyone can publish to, over the same manifest, with a hash per entry and a name saying who wrote it. An engine's asset store, in files rather than in a storefront.</>`,
    'A game on a small machine':
      `<>An ARM Linux build is already an export target, and nothing has ever run one. A Raspberry Pi wants the GL backend rather than Vulkan, a build that needs no desktop compositor, and a frame budget somebody has actually measured on the board.</>`,
    'A web module that loads in parts':
      `<>The engine module is most of a web game's download, and nothing inside it loads lazily. Split it, so a game fetches the physics, audio or networking it uses and no more, and let a pack arrive in pieces beside it.</>`,
    'Dialogue':
      `<>A conversation is content, and nothing in the tree holds one. A <code>dialogue</code> plugin over an ink-shaped script: lines addressed by key so the translation table reaches them, the conversation stepped on the fixed tick and inside the digest, a choice raised as an event, and a view that edits the branches.</>`,
    'Behaviour trees':
      `<>A tree asset ticked on the fixed step and inside the digest, its leaves the navigation agents and the binding actions a scene already has, drawn on the same canvas the Rune graph brings. What an enemy does has been a script's job; this is the other way of saying it.</>`,
    'Procedural noise':
      `<>Value, perlin, simplex and worley, with fbm over them, seeded the way <code>rng</code> is and computed on the same libm every platform shares. A generated world comes out identical on every machine and inside a replay. The cloner scatters with a private one today, and no script can reach a noise function at all.</>`,
    'A package manager':
      `<>Dependencies named in the project file, added with one command, and pinned in a lockfile that carries a hash per entry. A package is files, plus a native or WebAssembly extension when it needs one, so a plugin, a script library and an art pack all install the same way. A plugin template and a build matrix come with it.</>`,
    'More importers':
      `<>Spine and DragonBones, whose 2D skeletal animation is exactly what <code>bone2d</code> and the skinned polygons already draw; layered PSD files; and <code>.blend</code> read by calling Blender, the way Godot does. Aseprite, Tiled, LDtk and glTF are built already.</>`,
    'What a phone lends a game':
      `<>The share sheet, the camera and the photo library, geolocation, biometrics, the clipboard, keep-awake and vibration, behind one module with a desktop answer or an honest unsupported. These are the gaps a phone game hits first, and the plan for 2D games lists every one of them.</>`,
    'Extensions, tier two':
      `'Native extensions that add components and systems, and call back into scripts.'`,
    'Falling sand':
      `<>A Noita-shaped grid in 2D: sand pours, water flows, lava sets fire to wood and cools to stone, each cell following a rule table in a <code>cell_set</code> rather than a script of its own. It is not physics, so it is not in rapier and not in the default build — a <code>balaur_cells</code> plugin behind a feature that is off, on the fixed step and in the digest. Bodies couple through parry's 2D voxel collider, which <code>collider2d</code> already has and which a script already digs into.</>`,
    'Soft bodies, tearing, fluids':
      `'Deformable bodies, cloth that tears, liquids and granular materials, built in Rapier and exposed as components.'`,
    'Root motion':
      `<>A clip that moves the character instead of sliding under it. The root bone's delta per tick is handed to <code>character2d</code> and <code>character3d</code> rather than written straight to the transform. Blending lands in 0.2; nothing reads a root track yet.</>`,
    'Animation blending':
      `'Blend trees and state machines that mix clips by weight. A rig is otherwise complete — five modifier kinds in 2D and 3D, retargeting, deform tracks and ragdolls — and what is missing is running two clips at once.'`,
    'A sequencer':
      `'Cutscenes and cameras on a timeline, with tracks that call something rather than only move it.'`,
    'Pause, time scale and smooth frames':
      `<>A pause that holds the game and keeps the menu alive, a <code>process</code> mode per subtree, slow motion and fast forward, motion interpolated between fixed steps so a 144 Hz display sees every frame move, and a tick rate setting.</>`,
    'A controller-only shell':
      `<>What a console and a television ask of an interface. Directional focus between widgets rather than <code>focus_next</code> alone, an on-screen keyboard for a text field, safe-area insets applied to the layout instead of only reported by <code>render.safe_area</code>, and button glyphs that follow the pad in hand. The screens asking for it are a console, a tvOS box and an Android TV.</>`,
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
    'Decals and volumetric fog':
      `<>A texture projected onto whatever is under it, for a scorch mark, a puddle or a poster, and fog that light shafts through. Neither exists today: <code>environment</code> carries flat fog, and neither pass is in the kiss3d fork's list, so both are ours to write.</>`,
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
    'Suspend and resume':
      `<>A phone call, a locked screen, an alt-tab, a console's suspend. Hooks a script answers, audio released and taken back, a save on the way out, and a tick that pauses rather than catching up on return. Nothing in the tree answers a <code>Suspended</code> event today.</>`,
    'Per-platform project settings':
      `<>One <code>project.toml</code>, with <code>[application.android]</code> and its siblings over it: window mode, tick rate, feature set and asset variant per target, resolved when the export runs rather than branched inside a script.</>`,
    'One-click deploy':
      `'Deploy to the web or to a phone from one command or one button: the game built, signed and put somewhere a player can reach it — a URL, itch.io, a device on the cable, TestFlight, Play or Steam. Today an export leaves a bundle on your disk and stops.'`,
    'Embedding on a page':
      `<>A <code>&lt;balaur-viewer&gt;</code> element and an npm runtime with a React wrapper, a page API to set variables and hear events over the bridge that already exists, a web module sized to what the game uses instead of one that carries everything, a progressive web app option on the export, and image, video and glTF export from the editor.</>`,
    'Sealed packs and stripped binaries':
      `'Today every texture, sound and scene comes out of a shipped game as the original file, scripts as bytecode on native and source on the web, and the binary keeps its symbols. Planned: a stripped binary, bytecode on the web, and a pack sealed with ChaCha20-Poly1305 — a speed bump by name, since the key ships with the game. DRM wrappers, anti-cheat and anti-debugging are not coming; a result that matters is checked by a server.'`,
    'Console export':
      `'Switch, PlayStation and Xbox. The export and the pack shape travel; each console’s graphics, input and store layer is an NDA SDK that is none of the crates the engine runs on.'`,
    'XR':
      `<>OpenXR on desktop and standalone headsets, WebXR in a browser, and a phone's own AR through ARKit and ARCore, all behind one seam: stereo views, tracked poses, controller and hand input, and a camera the scene composites onto.</>`,
  },
};
