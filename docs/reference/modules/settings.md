---
title: "settings module"
image: "/img/social/reference.png"
sidebar_label: "settings"
description: "Every setting the engine, its plugins and this game declare, addressed by path: physics/solver_iterations, netcode/faults, editor/appearance/theme. The…"
custom_edit_url: null
---

# <span class="ref-icon ref-icon--other" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2"/><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Z"/></svg></span>`settings`

Every setting the engine, its plugins and this game declare, addressed by path: `physics/solver_iterations`, `netcode/faults`, `editor/appearance/theme`. The first segment is the category, the last is the key, and the path is also where the value is stored: `physics/solver_iterations` is `[physics] solver_iterations` in project.toml. A project setting ships with the game; an editor one stays on the machine that set it. Define your own with `define` and it appears in the settings screen beside the engine's. One key may hold an answer per platform: `[override.android.window] orientation` is what `window/orientation` reads on a phone.

11 functions, 0 constants. Scripts reach it as `settings::`.

## Functions

Argument kinds are the script values a call passes: `node` is a node handle, `any` a table or value of any kind, `fn` a callback.

| function | acts on | what it does |
| --- | --- | --- |
| `all() -> any` | — | Every defined setting as `{ path, scope, spec }`, in definition order. |
| `base(string) -> any` | — | What the file says, ignoring every override: what a settings screen edits. |
| `clear(string) -> any` | — | Forget one value, so the next write drops the key: how an override is removed. |
| `define(string, any) -> any` | — | Declare a setting of your own: `type`, `default`, and optionally `min`, `max`, `options`, `help`, `order` and `applies`. A path starting `editor/` is kept on this machine; anything else ships with the game. |
| `get(string) -> any` | — | One setting's value here: the narrowest `[override.<tag>]` this platform answers to, else what was set, else what its definition defaults to, else nil. |
| `known_tags() -> any` | — | Every tag a project may write an override for: the engine's, then the project's own from `[export] tags`. |
| `load(string) -> any` | — | Read values out of a TOML text, folding them onto what is already loaded. |
| `overrides(string) -> any` | — | The tags this project holds an override for at `path`, in tag order. |
| `set(string, any) -> any` | — | Change one setting, in memory. Whether it takes effect now or on the next run is the setting's own business; `all` reports it as `applies`. |
| `tags() -> any` | — | The names this run answers to, broad to narrow: the kind of machine, the operating system, the architecture, the build. |
| `to_toml(string, string) -> any` | — | The text one scope would write, starting from `existing` so anything no setting describes survives. Scope is "project" or "editor". |
