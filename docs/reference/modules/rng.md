---
title: "rng module"
sidebar_label: "rng"
description: "The engine's one deterministic PCG32 stream: the same seed draws the same numbers on every platform, and a replay reproduces every draw a recorded…"
custom_edit_url: null
---

# `rng`

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
