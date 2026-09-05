---
title: "node module"
image: "/img/social/reference.png"
sidebar_label: "node"
description: "What every node has: its name and path, its transform in local and world space, its children, its components and its script. Each operation takes the…"
custom_edit_url: null
---

# <span class="ref-icon ref-icon--other" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M64,112v32a8,8,0,0,1-8,8H24a8,8,0,0,1-8-8V112a8,8,0,0,1,8-8H56A8,8,0,0,1,64,112ZM208,40H160a8,8,0,0,0-8,8V96a8,8,0,0,0,8,8h48a8,8,0,0,0,8-8V48A8,8,0,0,0,208,40Zm0,112H160a8,8,0,0,0-8,8v48a8,8,0,0,0,8,8h48a8,8,0,0,0,8-8V160A8,8,0,0,0,208,152Z" opacity="0.2"/><path d="M160,112h48a16,16,0,0,0,16-16V48a16,16,0,0,0-16-16H160a16,16,0,0,0-16,16V64H128a24,24,0,0,0-24,24v32H72v-8A16,16,0,0,0,56,96H24A16,16,0,0,0,8,112v32a16,16,0,0,0,16,16H56a16,16,0,0,0,16-16v-8h32v32a24,24,0,0,0,24,24h16v16a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V160a16,16,0,0,0-16-16H160a16,16,0,0,0-16,16v16H128a8,8,0,0,1-8-8V88a8,8,0,0,1,8-8h16V96A16,16,0,0,0,160,112ZM56,144H24V112H56v32Zm104,16h48v48H160Zm0-112h48V96H160Z"/></svg></span>`node`

What every node has: its name and path, its transform in local and world space, its children, its components and its script. Each operation takes the node as its first argument, so scripts normally call them as methods on a node value (`this.node.position()`).

45 functions, 0 constants. Scripts reach it as `node::`.

## Functions

Argument kinds are the script values a call passes: `node` is a node handle, `any` a table or value of any kind, `fn` a callback.

| function | acts on | what it does |
| --- | --- | --- |
| `add_child(name: string)` | — | Create a named child node under this one and return it. |
| `add_tag(node, tag: string)` | — | File the node under a name; `scene.tagged` finds it from then on. |
| `attach_script(path: string, props: any?)` | — | Attach the script at a path, with an optional table overriding what the script exports. |
| `call(method: string, args: any?)` | — | Call a method on the node's script and return what it gives back; nil when there is no such script or method. |
| `children()` | — | The node's direct children, an empty list when it has none. |
| `component_names()` | — | The names of every component on the node. |
| `descendants()` | — | Every node under this one, in tree order, the node itself excluded. |
| `detach_script()` | — | Drop the script instance on this node, so no further lifecycle call reaches it; the node and its components stay. |
| `get_component(component: string)` | — | The named component's properties as a table, nil when the node does not carry it. |
| `get_node(path: string)` | — | The node at an `A/B/C` path relative to this one, `..` climbing to the parent; nil when nothing matches. |
| `global_position()` | — | The node's position in world space, as of the last transform sync. |
| `global_rotation_euler()` | — | The node's world rotation as euler angles in radians, as of the last transform sync. |
| `global_scale()` | — | The node's scale in world space, as of the last transform sync. |
| `global_visible(node)` | — | What the renderer sees: false when the node or any ancestor is hidden. |
| `global_z_index(node)` | — | The layer the node actually draws on, with every ancestor's added in. |
| `has_component(component: string)` | — | Whether the node carries the named component. |
| `has_method(method: string)` | — | Whether the node's script declares this method, so a caller can tell "no handler" from "a handler that answered nothing". |
| `has_tag(node, tag: string)` | — | Whether the node is filed under a name. |
| `is_valid()` | — | Whether the node is still in the world; false rather than an error when the value is not a node. |
| `name()` | — | The node's own name, empty when it carries none. |
| `parent()` | — | The node's parent, nil at the root. |
| `patch_component(component: string, params: table)` | — | Change the properties the table names and leave the rest of the component where they were. On a node without the component this adds it, the schema defaults being what it currently holds. |
| `path()` | — | The node's slash-separated path, built by climbing parents from the node up to the root. |
| `position()` | — | The node's position in its parent's space. |
| `queue_free()` | — | Destroy the node and its subtree at the end of the frame. |
| `remove_component(component: string)` | — | Take the named component off the node. |
| `remove_tag(node, tag: string)` | — | Take a name off the node; a name it never had is left alone. |
| `rotation_degrees()` | — | The same local rotation as `rotation_euler`, in degrees. |
| `rotation_euler()` | — | The node's local rotation as euler angles in radians, x then y then z. |
| `scale()` | — | The node's scale relative to its parent. |
| `script_path()` | — | The path of the script attached to the node, nil when it has none. |
| `set_component(component: string, params: any?)` | — | Give the node the named component, built from the given table over the component's schema defaults. Every property the table leaves out goes back to its default; `patch_component` is the one that changes a property and leaves the rest. |
| `set_name(name: string)` | — | Rename the node, doing nothing when it carries no name. |
| `set_parent(parent: node)` | — | Move the node under another, keeping where it is in the world; an error for a cycle or a dead parent. |
| `set_position(x: float, y: float, z: float)` | — | Move the node to a local position, given as three numbers or one vector. |
| `set_rotation_degrees(x: float, y: float, z: float)` | — | Set the node's local rotation from euler angles in degrees. |
| `set_rotation_euler(x: float, y: float, z: float)` | — | Set the node's local rotation from euler angles in radians. |
| `set_scale(x: float, y: float, z: float)` | — | Set the node's scale relative to its parent, as three numbers or one vector. |
| `set_visible(node, on: bool)` | — | Show or hide the node and everything under it. Physics is untouched: a hidden collider still collides. |
| `set_z_index(node, z: int, relative: bool)` | — | Put the node and its subtree on a draw layer: higher draws later. Relative by default, adding to the parent's layer; false makes it absolute. |
| `stable_id()` | — | The node's stable id — what a scene file declared or what `ids::mint` gave a spawned node — empty when it carries none. Survives rename and reparent, which a path does not. |
| `tags(node)` | — | The names the node is filed under, sorted. |
| `translate(x: float, y: float, z: float)` | — | Move the node by an offset in its parent's space, given as three numbers or one vector. |
| `visible(node)` | — | Whether the node itself is set to draw; an ancestor may still hide it. |
| `z_index(node)` | — | The node's own draw layer, added to its parent's unless set absolute. |
