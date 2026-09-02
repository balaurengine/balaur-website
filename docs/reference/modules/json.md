---
title: "json"
custom_edit_url: null
---

# `json`

2 functions, 0 constants. Scripts reach it as `json::`.

## Functions

Argument kinds are the script values a call passes: `node` is a node handle, `any` a table or value of any kind, `fn` a callback.

| function | acts on | what it does |
| --- | --- | --- |
| `encode` | — | A value written back out as JSON text; NaN, infinity, a node or a callback has no JSON form and is an error. |
| `parse` | — | The value a JSON document describes; an error on text that does not parse. |
