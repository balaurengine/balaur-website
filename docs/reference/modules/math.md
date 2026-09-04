---
title: "math module"
image: "/img/social/reference.png"
sidebar_label: "math"
description: "Deterministic float maths, backed by pure-Rust libm: the same inputs give the same bits on every platform. A script uses these rather than the language's…"
custom_edit_url: null
---

# `math`

Deterministic float maths, backed by pure-Rust `libm`: the same inputs give the same bits on every platform. A script uses these rather than the language's own float methods, which reach for the platform's libm and drift between machines.

24 functions, 3 constants. Scripts reach it as `math::`.

## Functions

Argument kinds are the script values a call passes: `node` is a node handle, `any` a table or value of any kind, `fn` a callback.

| function | acts on | what it does |
| --- | --- | --- |
| `abs(x: float)` | — | The magnitude, with the sign dropped. |
| `acos(x: float)` | — | The angle in radians whose cosine is the argument, from 0 to PI; NaN outside -1..1. |
| `asin(x: float)` | — | The angle in radians whose sine is the argument, from -PI/2 to PI/2; NaN outside -1..1. |
| `atan(y: float, x: float?)` | — | The angle in radians whose tangent is the argument; with two arguments, the y-then-x form instead. |
| `atan2(y: float, x: float)` | — | The angle in radians from the positive x axis to the point, taking y first and x second. |
| `ceil(x: float)` | — | The smallest whole number at or above the argument, still a float. |
| `clamp(x: float, low: float, high: float)` | — | The first argument held inside the range given by the second (low) and third (high). |
| `cos(angle: float)` | — | The cosine of an angle in radians. |
| `cosh(x: float)` | — | The hyperbolic cosine. |
| `deg(radians: float)` | — | Radians converted to degrees. |
| `exp(power: float)` | — | e raised to the given power. |
| `floor(x: float)` | — | The largest whole number at or below the argument, still a float. |
| `log(x: float, base: float?)` | — | The natural logarithm, or the logarithm in the base given as a second argument. |
| `log10(x: float)` | — | The base-10 logarithm; -INF at zero and NaN below it. |
| `max(a: float, b: float)` | — | The larger of two numbers. |
| `min(a: float, b: float)` | — | The smaller of two numbers. |
| `pow(base: float, exponent: float)` | — | The first argument raised to the power of the second. |
| `rad(degrees: float)` | — | Degrees converted to radians. |
| `round(x: float)` | — | The nearest whole number, with halfway cases going away from zero. |
| `sin(angle: float)` | — | The sine of an angle in radians. |
| `sinh(x: float)` | — | The hyperbolic sine. |
| `sqrt(x: float)` | — | The square root; NaN for a negative argument. |
| `tan(angle: float)` | — | The tangent of an angle in radians. |
| `tanh(x: float)` | — | The hyperbolic tangent, between -1 and 1. |

## Constants

| name | value |
| --- | --- |
| `INF` | `inf` |
| `PI` | `3.141592653589793` |
| `TAU` | `6.283185307179586` |
