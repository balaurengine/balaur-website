---
title: "rollback module"
image: "/img/social/reference.png"
sidebar_label: "rollback"
description: "Rollback netcode from a script's side. The session decides each tick's inputs before the tick runs — the real one where it has arrived, a repeat of the…"
custom_edit_url: null
---

# <span class="ref-icon ref-icon--other" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M216,128a88,88,0,1,1-88-88A88,88,0,0,1,216,128Z" opacity="0.2"/><path d="M224,128a96,96,0,0,1-94.71,96H128A95.38,95.38,0,0,1,62.1,197.8a8,8,0,0,1,11-11.63A80,80,0,1,0,71.43,71.39a3.07,3.07,0,0,1-.26.25L44.59,96H72a8,8,0,0,1,0,16H24a8,8,0,0,1-8-8V56a8,8,0,0,1,16,0V85.8L60.25,60A96,96,0,0,1,224,128Z"/></svg></span>`rollback`

Rollback netcode from a script's side. The session decides each tick's inputs before the tick runs — the real one where it has arrived, a repeat of the player's last one where it has not — and `input` reads whichever it settled on. A tick may run more than once: when a late input contradicts a prediction, the engine restores the tick before it and simulates forward again, so anything a script does with an effect outside the simulation has to ask `is_resimulating` first.

2 functions, 0 constants. Scripts reach it as `rollback::`.

## Functions

Argument kinds are the script values a call passes: `node` is a node handle, `any` a table or value of any kind, `fn` a callback.

| function | acts on | what it does |
| --- | --- | --- |
| `input(int) -> any` | — | What that player is doing on the tick being simulated, real or predicted; nil outside a session or for a player it does not know. |
| `is_resimulating() -> any` | — | Whether this tick is a re-run of one already simulated, so a script can skip anything it must not do twice. |
