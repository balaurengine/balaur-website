---
title: "export module"
image: "/img/social/reference.png"
sidebar_label: "export"
description: "Exports the project being edited. targets lists what this install can build; start runs one off the frame and reports to on_export."
custom_edit_url: null
---

# <span class="ref-icon ref-icon--other" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2"/><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Z"/></svg></span>`export`

Exports the project being edited. `targets` lists what this install can build; `start` runs one off the frame and reports to `on_export`.

5 functions, 0 constants. Scripts reach it as `export::`.

## Functions

Argument kinds are the script values a call passes: `node` is a node handle, `any` a table or value of any kind, `fn` a callback.

| function | acts on | what it does |
| --- | --- | --- |
| `listen(node, any?)` | — | Have the node's `on_export(event)`, or the `on_event` method the options name, called as each export starts, finishes or fails. |
| `output(string) -> any` | — | Where an export for this target will be written, as the project's `[export] output` decides. |
| `running() -> int` | — | How many exports are in flight. |
| `start(string, any?) -> bool` | — | Export the edited project for one target, on a thread. `download` allows fetching a missing template, `sign` names an identity, `output` overrides where it lands. Answers false while a recording plays. |
| `targets() -> any` | — | Every target, each `{ name, bundle, installed, fetchable, note }`: whether its runtime template is already here, whether a missing one could be fetched, and what a signed build of it would also need. |
