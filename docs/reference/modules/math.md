---
title: "math"
custom_edit_url: null
---

# `math`

Deterministic float maths, backed by pure-Rust `libm`: the same inputs give the same bits on every platform. A script uses these rather than the language's own float methods, which reach for the platform's libm and drift between machines.

24 functions, 3 constants. Scripts reach it as `math::`.

## Functions

Argument kinds are the script values a call passes: `node` is a node handle, `any` a table or value of any kind, `fn` a callback.

| function | acts on | what it does |
| --- | --- | --- |
| `abs` | — | The magnitude, with the sign dropped. |
| `acos` | — | The angle in radians whose cosine is the argument, from 0 to PI; NaN outside -1..1. |
| `asin` | — | The angle in radians whose sine is the argument, from -PI/2 to PI/2; NaN outside -1..1. |
| `atan` | — | The angle in radians whose tangent is the argument; with two arguments, the y-then-x form instead. |
| `atan2` | — | The angle in radians from the positive x axis to the point, taking y first and x second. |
| `ceil` | — | The smallest whole number at or above the argument, still a float. |
| `clamp` | — | The first argument held inside the range given by the second (low) and third (high). |
| `cos` | — | The cosine of an angle in radians. |
| `cosh` | — | The hyperbolic cosine. |
| `deg` | — | Radians converted to degrees. |
| `exp` | — | e raised to the given power. |
| `floor` | — | The largest whole number at or below the argument, still a float. |
| `log` | — | The natural logarithm, or the logarithm in the base given as a second argument. |
| `log10` | — | The base-10 logarithm; -INF at zero and NaN below it. |
| `max` | — | The larger of two numbers. |
| `min` | — | The smaller of two numbers. |
| `pow` | — | The first argument raised to the power of the second. |
| `rad` | — | Degrees converted to radians. |
| `round` | — | The nearest whole number, with halfway cases going away from zero. |
| `sin` | — | The sine of an angle in radians. |
| `sinh` | — | The hyperbolic sine. |
| `sqrt` | — | The square root; NaN for a negative argument. |
| `tan` | — | The tangent of an angle in radians. |
| `tanh` | — | The hyperbolic tangent, between -1 and 1. |

## Constants

| name | value |
| --- | --- |
| `INF` | `inf` |
| `PI` | `3.141592653589793` |
| `TAU` | `6.283185307179586` |
