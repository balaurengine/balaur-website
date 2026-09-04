---
title: "widget_theme asset type"
image: "/img/social/reference.png"
sidebar_label: "widget_theme"
description: "How each widget kind is drawn: fill, stroke, stroke_width, radius and padding under a table named for the kind ([button], [panel], [row], ...). A kind…"
custom_edit_url: null
---

# `widget_theme`

Files live in `themes/`. Used by [`widget`](../components/widget.md) · `theme`.

How each widget kind is drawn: `fill`, `stroke`, `stroke_width`, `radius` and `padding` under a table named for the kind (`[button]`, `[panel]`, `[row]`, ...). A kind the file leaves out keeps the built-in look. A widget takes the theme of the nearest ancestor that names one, so a screen is themed by its root.
