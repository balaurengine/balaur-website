---
title: "scene"
custom_edit_url: null
---

# `scene`

12 functions, 0 constants. Scripts reach it as `scene::`.

## Functions

Argument kinds are the script values a call passes: `node` is a node handle, `any` a table or value of any kind, `fn` a callback.

| function | acts on | what it does |
| --- | --- | --- |
| `apply_preset` | — | Add every component a preset names to the node; a part that fails leaves the parts before it in place. |
| `component_schema` | — | A component type's property schema as a table; nil for a name nothing registered. |
| `component_tags` | — | The facets a component type is filed under, for filtering a palette; nil for a name nothing registered. |
| `component_types` | — | The names of every registered component type, not the components on any node. |
| `get_node` | — |  |
| `instantiate` | — | Build a scene document — TOML text, not a path — under a parent; `{ scripts: false }` leaves scripts unattached. |
| `preset_info` | — | A preset's description, tags and the components it adds; nil for a name nothing registered. |
| `presets` | — | The names of every registered preset. |
| `root` | — | The tree's root node. |
| `source` | — | A scene file's raw TOML text, project-relative and found inside the pack in a packed run; nil when missing. |
| `spawn` | — | Create one empty named node under the given parent, or under the root when none is given. |
| `unmet_expectations` | — | Components on the node whose expectations nothing satisfies, as `{ component, expects }`; advisory only. |
