---
title: "listener component"
image: "/img/social/reference.png"
sidebar_label: "listener"
description: "The ears a positional sound is heard from: its distance to this node sets its volume, and its offset across this node's right sets its pan. The last…"
custom_edit_url: null
---

# <span class="ref-icon ref-icon--audio" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M208,104c0,40-14.44,72-48,112-8.07,9.77-18.34,16-32,16a44,44,0,0,1-44-44c0-41.49-36-28-36-84a80,80,0,0,1,160,0Z" opacity="0.2"/><path d="M216,104a8,8,0,0,1-16,0,72,72,0,0,0-144,0c0,26.7,8.53,34.92,17.57,43.64C82.21,156,92,165.41,92,188a36,36,0,0,0,36,36c10.24,0,18.45-4.16,25.83-13.09a8,8,0,1,1,12.34,10.18C155.81,233.64,143,240,128,240a52.06,52.06,0,0,1-52-52c0-15.79-5.68-21.27-13.54-28.84C52.46,149.5,40,137.5,40,104a88,88,0,0,1,176,0Zm-38.13,57.08A8,8,0,0,0,166.93,164,8,8,0,0,1,152,160c0-9.33,4.82-15.76,10.4-23.2,6.37-8.5,13.6-18.13,13.6-32.8a48,48,0,0,0-96,0,8,8,0,0,0,16,0,32,32,0,0,1,64,0c0,9.33-4.82,15.76-10.4,23.2-6.37,8.5-13.6,18.13-13.6,32.8a24,24,0,0,0,44.78,12A8,8,0,0,0,177.87,161.08Z"/></svg></span>`listener`

`audio` · 1 property · Audio

The ears a positional sound is heard from: its distance to this node sets its volume, and its offset across this node's right sets its pan. The last `current` listener applied wins; with no listener in the scene at all, every sound plays flat.

In a scene, `listener` is the node key that applies it. A script reaches the same properties through `node.listener.get()` and `node.listener.set(table)`.

## Properties

| property | type | default | description |
| --- | --- | --- | --- |
| `current` | bool | `true` | Whether the mix is heard from this node; the last current one wins |
