---
title: "node"
custom_edit_url: null
---

# `node`

What every node has: its name and path, its transform in local and world space, its children, its components and its script. Each operation takes the node as its first argument, so scripts normally call them as methods on a node value (`this.node.position()`).

30 functions, 0 constants. Scripts reach it as `node::`.

## Functions

Argument kinds are the script values a call passes: `node` is a node handle, `any` a table or value of any kind, `fn` a callback.

| function | acts on | what it does |
| --- | --- | --- |
| `add_child(name: string)` | — | Create a named child node under this one and return it. |
| `attach_script(path: string, props: any?)` | — | Attach the script at a path, with an optional table overriding what the script exports. |
| `call(method: string, args: any?)` | — | Call a method on the node's script and return what it gives back; nil when there is no such script or method. |
| `children()` | — | The node's direct children, an empty list when it has none. |
| `component_names()` | — | The names of every component on the node. |
| `get_component(component: string)` | — | The named component's properties as a table, nil when the node does not carry it. |
| `get_node(path: string)` | — | The node at an `A/B/C` path relative to this one, `..` climbing to the parent; nil when nothing matches. |
| `global_position()` | — | The node's position in world space, as of the last transform sync. |
| `global_rotation_euler()` | — | The node's world rotation as euler angles in radians, as of the last transform sync. |
| `global_scale()` | — | The node's scale in world space, as of the last transform sync. |
| `has_component(component: string)` | — | Whether the node carries the named component. |
| `is_valid()` | — | Whether the node is still in the world; false rather than an error when the value is not a node. |
| `name()` | — | The node's own name, empty when it carries none. |
| `parent()` | — | The node's parent, nil at the root. |
| `path()` | — | The node's slash-separated path, built by climbing parents from the node up to the root. |
| `position()` | — | The node's position in its parent's space. |
| `queue_free()` | — | Destroy the node and its subtree at the end of the frame. |
| `remove_component(component: string)` | — | Take the named component off the node. |
| `rotation_degrees()` | — | The same local rotation as `rotation_euler`, in degrees. |
| `rotation_euler()` | — | The node's local rotation as euler angles in radians, x then y then z. |
| `scale()` | — | The node's scale relative to its parent. |
| `script_path()` | — | The path of the script attached to the node, nil when it has none. |
| `set_component(component: string, params: any?)` | — | Give the node the named component, built from the given table over the component's schema defaults. |
| `set_name(name: string)` | — | Rename the node, doing nothing when it carries no name. |
| `set_parent(parent: node)` | — | Move the node under another, keeping where it is in the world; an error for a cycle or a dead parent. |
| `set_position(x: float, y: float, z: float)` | — | Move the node to a local position, given as three numbers or one vector. |
| `set_rotation_degrees(x: float, y: float, z: float)` | — | Set the node's local rotation from euler angles in degrees. |
| `set_rotation_euler(x: float, y: float, z: float)` | — | Set the node's local rotation from euler angles in radians. |
| `set_scale(x: float, y: float, z: float)` | — | Set the node's scale relative to its parent, as three numbers or one vector. |
| `translate(x: float, y: float, z: float)` | — | Move the node by an offset in its parent's space, given as three numbers or one vector. |
