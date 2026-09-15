---
title: "reflection_probe component"
image: "/img/social/reference.png"
sidebar_label: "reflection_probe"
description: "A box the room around it was captured inside. A reflective surface within it mirrors that capture, aimed at the box, instead of the distant sky."
custom_edit_url: null
---

# <span class="ref-icon ref-icon--3d" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M128,129.09V232a8,8,0,0,1-3.84-1l-88-48.16a8,8,0,0,1-4.16-7V80.2a8,8,0,0,1,.7-3.27Z" opacity="0.2"/><path d="M223.68,66.15,135.68,18h0a15.88,15.88,0,0,0-15.36,0l-88,48.17a16,16,0,0,0-8.32,14v95.64a16,16,0,0,0,8.32,14l88,48.17a15.88,15.88,0,0,0,15.36,0l88-48.17a16,16,0,0,0,8.32-14V80.18A16,16,0,0,0,223.68,66.15ZM128,32h0l80.34,44L128,120,47.66,76ZM40,90l80,43.78v85.79L40,175.82Zm96,129.57V133.82L216,90v85.78Z"/></svg></span>`reflection_probe`

`3d` · `render` · 5 properties · 3D

A box the room around it was captured inside. A reflective surface within it mirrors that capture, aimed at the box, instead of the distant sky.

In a scene, `reflection_probe` is the node key that applies it. A script reaches each property below as a field on `node.reflection_probe`: reading one asks the running component, and assigning one leaves the rest alone. The whole table is `node.reflection_probe.get()` and `node.reflection_probe.set(table)`.

## Properties

| property | type | default | description |
| --- | --- | --- | --- |
| `falloff` | float | `0.5` | How wide the soft edge at the box's face is; a surface crossing it fades back to the sky At least 0. |
| `half_extents` | vec3 | `[5,5,5]` | Half the box this probe speaks for, in world units, centred on the node At least 0. |
| `image` | string | — | Baked equirectangular image, project-relative. Empty captures the scene from the node's own position |
| `intensity` | float | `1` | Brightness of what the probe reflects At least 0. |
| `rotation` | float | `0` | Turn of the captured map about y, in degrees |
