---
title: "window module"
image: "/img/social/reference.png"
sidebar_label: "window"
description: "The OS window and the display under it: mode, cursor, app icon, keep-awake, the safe area and the refresh rate."
custom_edit_url: null
---

# <span class="ref-icon ref-icon--other" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2"/><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Z"/></svg></span>`window`

The OS window and the display under it: mode, cursor, app icon, keep-awake, the safe area and the refresh rate.

8 functions, 0 constants. Scripts reach it as `window::`.

## Functions

Argument kinds are the script values a call passes: `node` is a node handle, `any` a table or value of any kind, `fn` a callback.

| function | acts on | what it does |
| --- | --- | --- |
| `refresh_rate() -> float` | — | Frames per second the display refreshes at, as measured over the last frames; 60 with no window. |
| `safe_area() -> any` | — | The display's insets in pixels, `{ left, top, right, bottom }`: what a notch or a home bar covers, read once per frame and recorded. Zero on a desktop. |
| `set_app_icon(string)` | — | Set the application icon (the dock or taskbar one) from a PNG in the project, named by its path. |
| `set_cursor_grab(bool)` | — | Confine the cursor to the window, for FPS-style mouse look. |
| `set_cursor_hidden(bool)` | — | Hide or show the mouse cursor over the window. |
| `set_fullscreen(bool)` | — | Put the window into borderless fullscreen on the current monitor, or back into a window. |
| `set_keep_awake(bool)` | — | Keep the screen from dimming while the game runs: a page takes a wake lock, a phone its equivalent, a desktop needs nothing. |
| `set_window_mode(string)` | — | `windowed`, `maximized`, `fullscreen` (borderless) or `exclusive` (the monitor's largest video mode): the same choice as `[window] mode`. |
