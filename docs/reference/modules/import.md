---
title: "import module"
image: "/img/social/reference.png"
sidebar_label: "import"
description: "Imports a .glb or .gltf model, an .aseprite sprite, or a .tmx or .ldtk level into the project being edited, with the importers balaur import runs."
custom_edit_url: null
---

# <span class="ref-icon ref-icon--other" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2"/><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Z"/></svg></span>`import`

Imports a `.glb` or `.gltf` model, an `.aseprite` sprite, or a `.tmx` or `.ldtk` level into the project being edited, with the importers `balaur import` runs.

2 functions, 0 constants. Scripts reach it as `import::`.

## Functions

Argument kinds are the script values a call passes: `node` is a node handle, `any` a table or value of any kind, `fn` a callback.

| function | acts on | what it does |
| --- | --- | --- |
| `file(string) -> any` | — | Import one file into the edited project. Answers `{ files, scene, note }`: the project-relative paths written, the scene to instantiate when there is one, and a line for the log. Answers `{ error }` when the import failed. |
| `handles(string) -> any` | — | Whether an importer claims this file, by extension. |
