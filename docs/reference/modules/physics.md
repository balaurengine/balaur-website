---
title: "physics"
custom_edit_url: null
---

# `physics`

What spans both physics worlds at once: pausing, sleeping and clearing. Bodies and colliders live in `physics2d` and `physics3d`.

13 functions, 0 constants. Scripts reach it as `physics::`.

## Functions

Argument kinds are the script values a call passes: `node` is a node handle, `any` a table or value of any kind, `fn` a callback.

| function | acts on | what it does |
| --- | --- | --- |
| `clear()` | — | Remove every body and collider from both worlds, as a play-in-editor session does on stop. |
| `counters() -> any` | — | What the last step spent its time on. Zeroes unless the engine was built with rapier's profiler. |
| `debug_draw() -> any` | — | What the debug renderer is drawing now, as a table of `enabled` and one flag per mode. |
| `is_paused() -> bool` | — | Whether stepping is stopped. |
| `quarantined() -> any` | — | The nodes rapier disabled this step because their position or velocity stopped being a number. Empty is the normal answer. |
| `set_debug_draw(any)` | — | Draw the physics world over the scene: `true` for the usual shapes, or a table naming modes (`#{ colliders = true, joints = true }`). |
| `set_paused(bool)` | — | Stop or resume stepping both worlds; nodes keep their poses. |
| `set_sleeping_allowed(bool)` | — | Allow or forbid resting bodies falling asleep, in both worlds and for bodies added later. |
| `set_threads(int)` | — | How many threads rapier's solver may use. Only a build with the `parallel` feature has any; on a serial build this says so and changes nothing. |
| `set_tuning(any)` | — | Change how the solver behaves in both worlds: `solver_iterations`, `length_unit`, `ccd_substeps`, contact softness and the rest. Every value here changes results, so a recording only replays against the same numbers — prefer `[physics]` in project.toml. |
| `sleeping_allowed() -> bool` | — | Whether resting bodies are allowed to fall asleep. |
| `threads() -> int` | — | How many threads the solver is using; 1 on a serial build. |
| `tuning() -> any` | — | The solver settings both worlds are running with. |
