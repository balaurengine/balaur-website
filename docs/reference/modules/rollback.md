---
title: "rollback module"
image: "/img/social/reference.png"
sidebar_label: "rollback"
description: "Rollback netcode from a script's side. The session decides each tick's inputs before the tick runs — the real one where it has arrived, a repeat of the…"
custom_edit_url: null
---

# `rollback`

Rollback netcode from a script's side. The session decides each tick's inputs before the tick runs — the real one where it has arrived, a repeat of the player's last one where it has not — and `input` reads whichever it settled on. A tick may run more than once: when a late input contradicts a prediction, the engine restores the tick before it and simulates forward again, so anything a script does with an effect outside the simulation has to ask `is_resimulating` first.

2 functions, 0 constants. Scripts reach it as `rollback::`.

## Functions

Argument kinds are the script values a call passes: `node` is a node handle, `any` a table or value of any kind, `fn` a callback.

| function | acts on | what it does |
| --- | --- | --- |
| `input(int) -> any` | — | What that player is doing on the tick being simulated, real or predicted; nil outside a session or for a player it does not know. |
| `is_resimulating() -> any` | — | Whether this tick is a re-run of one already simulated, so a script can skip anything it must not do twice. |
