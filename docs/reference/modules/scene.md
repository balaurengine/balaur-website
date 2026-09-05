---
title: "scene module"
image: "/img/social/reference.png"
sidebar_label: "scene"
description: "The node tree: its root, lookup by path, spawning and instancing. Also the component and preset vocabulary an editor builds its palette from."
custom_edit_url: null
---

# <span class="ref-icon ref-icon--other" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M64,112v32a8,8,0,0,1-8,8H24a8,8,0,0,1-8-8V112a8,8,0,0,1,8-8H56A8,8,0,0,1,64,112ZM208,40H160a8,8,0,0,0-8,8V96a8,8,0,0,0,8,8h48a8,8,0,0,0,8-8V48A8,8,0,0,0,208,40Zm0,112H160a8,8,0,0,0-8,8v48a8,8,0,0,0,8,8h48a8,8,0,0,0,8-8V160A8,8,0,0,0,208,152Z" opacity="0.2"/><path d="M160,112h48a16,16,0,0,0,16-16V48a16,16,0,0,0-16-16H160a16,16,0,0,0-16,16V64H128a24,24,0,0,0-24,24v32H72v-8A16,16,0,0,0,56,96H24A16,16,0,0,0,8,112v32a16,16,0,0,0,16,16H56a16,16,0,0,0,16-16v-8h32v32a24,24,0,0,0,24,24h16v16a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V160a16,16,0,0,0-16-16H160a16,16,0,0,0-16,16v16H128a8,8,0,0,1-8-8V88a8,8,0,0,1,8-8h16V96A16,16,0,0,0,160,112ZM56,144H24V112H56v32Zm104,16h48v48H160Zm0-112h48V96H160Z"/></svg></span>`scene`

The node tree: its root, lookup by path, spawning and instancing. Also the component and preset vocabulary an editor builds its palette from.

16 functions, 0 constants. Scripts reach it as `scene::`.

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
| `node_by_id(id: string, under: node?)` | — | The node carrying a stable id, which survives the rename and the reparent a path does not; nil when nothing carries it. `under` bounds the search to one subtree, for a tool holding more than one tree. |
| `preset_info(name: string)` | — | A preset's description, tags and the components it adds; nil for a name nothing registered. |
| `presets()` | — | The names of every registered preset. |
| `root()` | — | The tree's root node. |
| `source(path: string)` | — | A scene file's raw TOML text, project-relative and found inside the pack in a packed run; nil when missing. |
| `spawn(name: string, parent: node?)` | — | Create one empty named node under the given parent, or under the root when none is given. |
| `tagged(tag: string)` | — | Every node filed under a tag, in tree order; what a scene's `tags` key and `node.add_tag` feed. |
| `unmet_expectations(node: node)` | — | Components on the node whose expectations nothing satisfies, as `{ component, expects }`; advisory only. |
| `with_component(component: string)` | — | Every node carrying the named component, in tree order. What a script asks instead of walking the tree itself. |
