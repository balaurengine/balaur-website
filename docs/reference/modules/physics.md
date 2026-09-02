---
title: "physics"
custom_edit_url: null
---

# `physics`

The 3D rigid-body world: bodies and colliders on nodes, their velocities, and overlap queries. `physics` holds what spans both worlds.

5 functions, 0 constants. Scripts reach it as `physics::`.

## Functions

Argument kinds are the script values a call passes: `node` is a node handle, `any` a table or value of any kind, `fn` a callback.

| function | acts on | what it does |
| --- | --- | --- |
| `clear()` | — | Remove every body and collider from both worlds, as a play-in-editor session does on stop. |
| `is_paused() -> bool` | — | Whether stepping is stopped. |
| `set_paused(bool)` | — | Stop or resume stepping both worlds; nodes keep their poses. |
| `set_sleeping_allowed(bool)` | — | Allow or forbid resting bodies falling asleep, in both worlds and for bodies added later. |
| `sleeping_allowed() -> bool` | — | Whether resting bodies are allowed to fall asleep. |
