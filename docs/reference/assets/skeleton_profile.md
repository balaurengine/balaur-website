---
title: "skeleton_profile asset type"
image: "/img/social/reference.png"
sidebar_label: "skeleton_profile"
description: "The canonical skeleton a bone_map names bones from. Each [[bones]] entry has a name, a rest_rotation and a rest_position; no bones means the built-in…"
custom_edit_url: null
---

# <span class="ref-icon ref-icon--other" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M225.09,102.44a28,28,0,0,1-35.92,5.3,8,8,0,0,0-10,1.07l-70.38,70.38a8,8,0,0,0-1.07,10,28,28,0,1,1-51.42,10.51,28,28,0,1,1,10.51-51.42,8,8,0,0,0,10-1.07l70.38-70.38a8,8,0,0,0,1.07-10,28,28,0,1,1,51.42-10.51,28,28,0,0,1,25.41,46.12Z" opacity="0.2"/><path d="M231.67,60.89a35.82,35.82,0,0,0-23.82-12.74,36,36,0,1,0-66.37,22.92.25.25,0,0,1,0,.08L71.17,141.51s0,0-.1,0a36,36,0,1,0-22.92,66.37,36,36,0,1,0,66.37-22.92.54.54,0,0,1,0-.08l70.35-70.36s0,0,.1,0a36,36,0,0,0,46.74-53.63ZM219.1,97.16a20,20,0,0,1-25.67,3.8,16,16,0,0,0-19.88,2.19l-70.4,70.4A16,16,0,0,0,101,193.43a20,20,0,1,1-36.75,7.5,8,8,0,0,0-7.91-9.24,8.5,8.5,0,0,0-1.23.1A20,20,0,1,1,62.57,155a16,16,0,0,0,19.88-2.19l70.4-70.4A16,16,0,0,0,155,62.57a20,20,0,1,1,36.75-7.5,8,8,0,0,0,9.14,9.14,20,20,0,0,1,18.17,33Z"/></svg></span>`skeleton_profile`

Files live in `animations/`. Used by no component property yet.

The canonical skeleton a `bone_map` names bones from. Each `[[bones]]` entry has a `name`, a `rest_rotation` and a `rest_position`; no `bones` means the built-in humanoid.

```toml
type = "skeleton_profile"

[[bones]]
name = "Hips"
rest_position = [0.0, 1.0, 0.0]   # its length scales a retargeted position track

[[bones]]
name = "Spine"
rest_rotation = [0.0, 0.0, 0.0]   # euler radians
```
