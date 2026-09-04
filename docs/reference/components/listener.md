---
title: "listener component"
image: "/img/social/reference.png"
sidebar_label: "listener"
description: "The ears a positional sound is heard from: its distance to this node sets its volume, and its offset across this node's right sets its pan. The last…"
custom_edit_url: null
---

# `listener`

`audio` · 1 property · Audio

The ears a positional sound is heard from: its distance to this node sets its volume, and its offset across this node's right sets its pan. The last `current` listener applied wins; with no listener in the scene at all, every sound plays flat.

In a scene, `listener` is the node key that applies it. A script reaches the same properties through `node.listener.get()` and `node.listener.set(table)`.

## Properties

| property | type | default | description |
| --- | --- | --- | --- |
| `current` | bool | `true` | Whether the mix is heard from this node; the last current one wins |
