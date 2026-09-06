---
title: "bone_map asset type"
image: "/img/social/reference.png"
sidebar_label: "bone_map"
description: "A bone map lets one rig play another's clips. [bones] pairs a canonical bone name with the node path it takes on this rig, relative to the playing node…"
custom_edit_url: null
---

# <span class="ref-icon ref-icon--other" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M216,48V152a8,8,0,0,1-8,8H168v48a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V104a8,8,0,0,1,8-8H88V48a8,8,0,0,1,8-8H208A8,8,0,0,1,216,48Z" opacity="0.2"/><path d="M224,48V152a16,16,0,0,1-16,16H99.31l10.35,10.34a8,8,0,0,1-11.32,11.32l-24-24a8,8,0,0,1,0-11.32l24-24a8,8,0,0,1,11.32,11.32L99.31,152H208V48H96v8a8,8,0,0,1-16,0V48A16,16,0,0,1,96,32H208A16,16,0,0,1,224,48ZM168,192a8,8,0,0,0-8,8v8H48V104H156.69l-10.35,10.34a8,8,0,0,0,11.32,11.32l24-24a8,8,0,0,0,0-11.32l-24-24a8,8,0,0,0-11.32,11.32L156.69,88H48a16,16,0,0,0-16,16V208a16,16,0,0,0,16,16H160a16,16,0,0,0,16-16v-8A8,8,0,0,0,168,192Z"/></svg></span>`bone_map`

Files live in `animations/`. Used by no component property yet.

A bone map lets one rig play another's clips. `[bones]` pairs a canonical
bone name with the node path it takes on this rig, relative to the playing
node; `profile` names a `skeleton_profile` asset whose rests the clip was
authored against, and defaults to the built-in humanoid. Pass the map to
`animation.play(node, clip, { retarget = "maps/hero.toml" })`: each track's
target is renamed through it, rotations are re-read as turns away from the
profile's rest, and positions are scaled by how much longer this rig's bones
are.

```toml
type = "bone_map"

[bones]
Hips = "Armature/Hips"
Spine = "Armature/Hips/Spine"
Head = "Armature/Hips/Spine/Neck/Head"
```
