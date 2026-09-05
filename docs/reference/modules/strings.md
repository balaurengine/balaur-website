---
title: "strings module"
image: "/img/social/reference.png"
sidebar_label: "strings"
description: "Localization: one strings/<locale>.toml per language, keys to strings. [locale] in project.toml sets the locale a run starts in and the one a missing key…"
custom_edit_url: null
---

# <span class="ref-icon ref-icon--other" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M224,184H144l40-80ZM96,127.56h0A95.78,95.78,0,0,0,128,56H64A95.78,95.78,0,0,0,96,127.56Z" opacity="0.2"/><path d="M247.15,212.42l-56-112a8,8,0,0,0-14.31,0l-21.71,43.43A88,88,0,0,1,108,126.93,103.65,103.65,0,0,0,135.69,64H160a8,8,0,0,0,0-16H104V32a8,8,0,0,0-16,0V48H32a8,8,0,0,0,0,16h87.63A87.7,87.7,0,0,1,96,116.35a87.74,87.74,0,0,1-19-31,8,8,0,1,0-15.08,5.34A103.63,103.63,0,0,0,84,127a87.55,87.55,0,0,1-52,17,8,8,0,0,0,0,16,103.46,103.46,0,0,0,64-22.08,104.18,104.18,0,0,0,51.44,21.31l-26.6,53.19a8,8,0,0,0,14.31,7.16L148.94,192h70.11l13.79,27.58A8,8,0,0,0,240,224a8,8,0,0,0,7.15-11.58ZM156.94,176,184,121.89,211.05,176Z"/></svg></span>`strings`

Localization: one `strings/<locale>.toml` per language, keys to strings. `[locale]` in `project.toml` sets the locale a run starts in and the one a missing key falls back to. A key neither has comes back as itself — visible in the game, which is how a missing string gets noticed rather than showing as a blank label.

6 functions, 0 constants. Scripts reach it as `strings::`.

## Functions

Argument kinds are the script values a call passes: `node` is a node handle, `any` a table or value of any kind, `fn` a callback.

| function | acts on | what it does |
| --- | --- | --- |
| `locale()` | — | The locale in force. |
| `locales()` | — | Every locale the project ships a `strings/<locale>.toml` for, in name order. |
| `set_locale(locale: string)` | — | Switch locale; the next `tr` answers in it, which for a widget showing a key is the next frame. |
| `set_root(root: string)` | — | Read the catalogues from this directory instead of the project root, forgetting the ones already read; an empty string puts it back. For a host running a project other than its own — the editor, whose own root has no `strings/`, so without this every `text_key` in a played scene draws as its key. |
| `system_locale()` | — | The locale the operating system reports, like `en-US`, or nil when it says nothing; recorded with the session. A game picks its starting locale from it once and saves the choice. |
| `tr(key: string, args: table?)` | — | The string for a key in the current locale. `{name}` in it is replaced by the argument called `name`, and an `n` argument also picks the plural form the locale's language calls for. |
