---
title: "strings module"
image: "/img/social/reference.png"
sidebar_label: "strings"
description: "Localization: one strings/<locale>.toml per language, keys to strings. [locale] in project.toml sets the locale a run starts in and the one a missing key…"
custom_edit_url: null
---

# `strings`

Localization: one `strings/<locale>.toml` per language, keys to strings. `[locale]` in `project.toml` sets the locale a run starts in and the one a missing key falls back to. A key neither has comes back as itself — visible in the game, which is how a missing string gets noticed rather than showing as a blank label.

5 functions, 0 constants. Scripts reach it as `strings::`.

## Functions

Argument kinds are the script values a call passes: `node` is a node handle, `any` a table or value of any kind, `fn` a callback.

| function | acts on | what it does |
| --- | --- | --- |
| `locale()` | — | The locale in force. |
| `locales()` | — | Every locale the project ships a `strings/<locale>.toml` for, in name order. |
| `set_locale(locale: string)` | — | Switch locale; the next `tr` answers in it, which for a widget showing a key is the next frame. |
| `set_root(root: string)` | — | Read the catalogues from this directory instead of the project root, forgetting the ones already read; an empty string puts it back. For a host running a project other than its own — the editor, whose own root has no `strings/`, so without this every `text_key` in a played scene draws as its key. |
| `tr(key: string, args: table?)` | — | The string for a key in the current locale. `{name}` in it is replaced by the argument called `name`, and an `n` argument also picks the plural form the locale's language calls for. |
