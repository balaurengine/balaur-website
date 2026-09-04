---
title: "scene module"
sidebar_label: "scene"
description: "The node tree: its root, lookup by path, spawning and instancing. Also the component and preset vocabulary an editor builds its palette from."
custom_edit_url: null
---

# `scene`

The node tree: its root, lookup by path, spawning and instancing. Also the component and preset vocabulary an editor builds its palette from.

13 functions, 0 constants. Scripts reach it as `scene::`.

## Functions

Argument kinds are the script values a call passes: `node` is a node handle, `any` a table or value of any kind, `fn` a callback.

| function | acts on | what it does |
| --- | --- | --- |
| `apply_preset(node: node, name: string)` | — | Add every component a preset names to the node; a part that fails leaves the parts before it in place. |
| `component_properties(name: string, params: any)` | — | What a component's `apply` would receive for `params`: the schema's defaults with a shorthand or a partial table merged over them. This is how a tool compares two spellings of the same component. |
| `component_schema(name: string)` | — | A component type's property schema as a table; nil for a name nothing registered. |
| `component_tags(name: string)` | — | The facets a component type is filed under, for filtering a palette; nil for a name nothing registered. |
| `component_types()` | — | The names of every registered component type, not the components on any node. |
| `get_node(path: string)` | — | The node at an `A/B/C` path from the root, where `..` climbs to the parent; nil when nothing matches. |
| `instantiate(source: string, parent: node?, opts: any?)` | — | Build a scene document — TOML text, not a path — under a parent; `{ scripts: false }` leaves scripts unattached. |
| `preset_info(name: string)` | — | A preset's description, tags and the components it adds; nil for a name nothing registered. |
| `presets()` | — | The names of every registered preset. |
| `root()` | — | The tree's root node. |
| `source(path: string)` | — | A scene file's raw TOML text, project-relative and found inside the pack in a packed run; nil when missing. |
| `spawn(name: string, parent: node?)` | — | Create one empty named node under the given parent, or under the root when none is given. |
| `unmet_expectations(node: node)` | — | Components on the node whose expectations nothing satisfies, as `{ component, expects }`; advisory only. |
