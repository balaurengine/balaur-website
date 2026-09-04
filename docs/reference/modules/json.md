---
title: "json module"
sidebar_label: "json"
description: "JSON text to and from script values, for talking to anything outside the engine. Unlike TOML it has null, so nil survives a round trip."
custom_edit_url: null
---

# `json`

JSON text to and from script values, for talking to anything outside the engine. Unlike TOML it has null, so nil survives a round trip.

2 functions, 0 constants. Scripts reach it as `json::`.

## Functions

Argument kinds are the script values a call passes: `node` is a node handle, `any` a table or value of any kind, `fn` a callback.

| function | acts on | what it does |
| --- | --- | --- |
| `encode(value: any)` | — | A value written back out as JSON text; NaN, infinity, a node or a callback has no JSON form and is an error. |
| `parse(text: string)` | — | The value a JSON document describes; an error on text that does not parse. |
