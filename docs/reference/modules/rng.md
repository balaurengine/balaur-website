---
title: "rng module"
image: "/img/social/reference.png"
sidebar_label: "rng"
description: "The engine's one deterministic PCG32 stream: the same seed draws the same numbers on every platform, and a replay reproduces every draw a recorded…"
custom_edit_url: null
---

# <span class="ref-icon ref-icon--other" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M216,64V192a24,24,0,0,1-24,24H64a24,24,0,0,1-24-24V64A24,24,0,0,1,64,40H192A24,24,0,0,1,216,64Z" opacity="0.2"/><path d="M192,32H64A32,32,0,0,0,32,64V192a32,32,0,0,0,32,32H192a32,32,0,0,0,32-32V64A32,32,0,0,0,192,32Zm16,160a16,16,0,0,1-16,16H64a16,16,0,0,1-16-16V64A16,16,0,0,1,64,48H192a16,16,0,0,1,16,16ZM104,92A12,12,0,1,1,92,80,12,12,0,0,1,104,92Zm72,0a12,12,0,1,1-12-12A12,12,0,0,1,176,92Zm-72,72a12,12,0,1,1-12-12A12,12,0,0,1,104,164Zm36-36a12,12,0,1,1-12-12A12,12,0,0,1,140,128Zm36,36a12,12,0,1,1-12-12A12,12,0,0,1,176,164Z"/></svg></span>`rng`

The engine's one deterministic PCG32 stream: the same seed draws the same numbers on every platform, and a replay reproduces every draw a recorded session made.

4 functions, 0 constants. Scripts reach it as `rng::`.

## Functions

Argument kinds are the script values a call passes: `node` is a node handle, `any` a table or value of any kind, `fn` a callback.

| function | acts on | what it does |
| --- | --- | --- |
| `int(low: int, high: int)` | — | A whole number from the deterministic engine stream, uniform in `[low, high]`, both ends included. |
| `random()` | — | A float from the deterministic engine stream, uniform in `[0, 1)`. |
| `range(low: float, high: float)` | — | A float from the deterministic engine stream, uniform in `[low, high)` — the two arguments. |
| `seed(seed: int)` | — | Restart the deterministic engine stream at the given seed, so every draw after it repeats. |
