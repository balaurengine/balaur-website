---
title: "physics module"
image: "/img/social/reference.png"
sidebar_label: "physics"
description: "What spans both physics worlds at once: pausing, sleeping and clearing. Bodies and colliders live in physics2d and physics3d."
custom_edit_url: null
---

# <span class="ref-icon ref-icon--other" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M210.26,210.26c-17.23,17.23-68-5.63-113.46-51.06S28.51,63,45.74,45.74s68,5.63,113.46,51.06S227.49,193,210.26,210.26Z" opacity="0.2"/><path d="M196.12,128c24.65-34.61,37.22-70.38,19.74-87.86S162.61,35.23,128,59.88C93.39,35.23,57.62,22.66,40.14,40.14S35.23,93.39,59.88,128c-24.65,34.61-37.22,70.38-19.74,87.86h0c5.63,5.63,13.15,8.14,21.91,8.14,18.48,0,42.48-11.17,66-27.88C151.47,212.83,175.47,224,194,224c8.76,0,16.29-2.52,21.91-8.14h0C233.34,198.38,220.77,162.61,196.12,128Zm8.43-76.55c7.64,7.64,2.48,32.4-18.52,63.28a300.33,300.33,0,0,0-21.19-23.57A300.33,300.33,0,0,0,141.27,70C172.15,49,196.91,43.8,204.55,51.45ZM176.29,128a289.14,289.14,0,0,1-22.76,25.53A289.14,289.14,0,0,1,128,176.29a289.14,289.14,0,0,1-25.53-22.76A289.14,289.14,0,0,1,79.71,128,298.62,298.62,0,0,1,128,79.71a289.14,289.14,0,0,1,25.53,22.76A289.14,289.14,0,0,1,176.29,128ZM51.45,51.45c2.2-2.21,5.83-3.35,10.62-3.35C73.89,48.1,92.76,55,114.72,70A304,304,0,0,0,91.16,91.16,300.33,300.33,0,0,0,70,114.73C49,83.85,43.81,59.09,51.45,51.45Zm0,153.1C43.81,196.91,49,172.15,70,141.27a300.33,300.33,0,0,0,21.19,23.57A304.18,304.18,0,0,0,114.73,186C83.85,207,59.09,212.2,51.45,204.55Zm153.1,0c-7.64,7.65-32.4,2.48-63.28-18.52a304.18,304.18,0,0,0,23.57-21.19A300.33,300.33,0,0,0,186,141.27C207,172.15,212.19,196.91,204.55,204.55ZM140,128a12,12,0,1,1-12-12A12,12,0,0,1,140,128Z"/></svg></span>`physics`

What spans both physics worlds at once: pausing, sleeping and clearing. Bodies and colliders live in `physics2d` and `physics3d`.

13 functions, 0 constants. Scripts reach it as `physics::`.

## Functions

Argument kinds are the script values a call passes: `node` is a node handle, `any` a table or value of any kind, `fn` a callback.

| function | acts on | what it does |
| --- | --- | --- |
| `clear()` | — | Remove every body and collider from both worlds, as a play-in-editor session does on stop. |
| `counters() -> any` | — | What the last step spent its time on. The first call turns rapier's profiler on, so the numbers arrive from the step after it. |
| `debug_draw() -> any` | — | What the debug renderer is drawing now, as a table of `enabled` and one flag per mode. |
| `is_paused() -> bool` | — | Whether stepping is stopped. |
| `quarantined() -> any` | — | The nodes rapier disabled this step because their position or velocity stopped being a number. Empty is the normal answer. |
| `set_debug_draw(any)` | — | Draw the physics world over the scene: `true` for the usual shapes, or a table naming modes (`#{ colliders = true, joints = true }`). |
| `set_paused(bool)` | — | Stop or resume stepping both worlds; nodes keep their poses. |
| `set_sleeping_allowed(bool)` | — | Allow or forbid resting bodies falling asleep, in both worlds and for bodies added later. |
| `set_threads(int) -> any` | — | How many threads the solver may use. The default is one less than the machine reports, capped at eight; rayon's pool is set once per process, so a later call does nothing. |
| `set_tuning(any)` | — | Change how the solver behaves in both worlds: `solver_iterations`, `length_unit`, `ccd_substeps`, contact softness and the rest. Every value here changes results, so a recording only replays against the same numbers — prefer `[physics]` in project.toml. |
| `sleeping_allowed() -> bool` | — | Whether resting bodies are allowed to fall asleep. |
| `threads() -> int` | — | How many threads the solver is using. |
| `tuning() -> any` | — | The solver settings both worlds are running with. |
