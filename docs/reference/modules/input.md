---
title: "input module"
image: "/img/social/reference.png"
sidebar_label: "input"
description: "One frame of input: the keyboard, mouse, touch screen and gamepads as they stand now, plus the edges — what went down or came up this frame. Nothing…"
custom_edit_url: null
---

# `input`

One frame of input: the keyboard, mouse, touch screen and gamepads as they stand now, plus the edges — what went down or came up this frame. Nothing feeds it in a headless run, where every query answers neutrally rather than failing.

27 functions, 190 constants. Scripts reach it as `input::`.

## Functions

Argument kinds are the script values a call passes: `node` is a node handle, `any` a table or value of any kind, `fn` a callback.

| function | acts on | what it does |
| --- | --- | --- |
| `action_just_pressed(string) -> bool` | — | Whether the action went down this frame. |
| `action_just_released(string) -> bool` | — | Whether the action came up this frame. |
| `action_pressed(string) -> bool` | — | Whether the action is held down now. |
| `action_value(string) -> float` | — | How far the action is pushed, -1 to 1; a key answers 0 or 1, a stick or `keys:A,D` the whole range. |
| `actions() -> any` | — | Every action `[input.actions]` declares, so a rebinding screen can list them. |
| `bind(string, any)` | — | Rebind the action to one binding or a list of them, replacing what it had and saving to the user data directory. |
| `bindings(string) -> any` | — | What the action is bound to now, whether from the project or from the player's own rebinding. |
| `dropped_files() -> any` | — | The absolute paths of files dropped onto the window this frame, in drop order; desktop only. |
| `gamepad_axis(int, string) -> float` | — | How far the pad's `AXIS_*` stick or trigger is pushed, -1 to 1; zero at rest and for an absent pad. |
| `gamepad_down(int, string) -> bool` | — | Whether the pad's `PAD_*` button is held down right now, however many frames it has been down. |
| `gamepad_just_pressed(int, string) -> bool` | — | Whether the pad's `PAD_*` button went down this frame; true for that one frame only. |
| `gamepad_just_released(int, string) -> bool` | — | Whether the pad's `PAD_*` button came up this frame; true for that one frame only. |
| `gamepad_name(int) -> string` | — | The pad's name as the platform reports it, empty when no pad has that id. |
| `gamepads() -> any` | — | The ids of every connected pad, ordered so the list is stable from frame to frame. |
| `is_down(string) -> bool` | — | Whether the `KEY_*` key is held down right now, however many frames it has been down. |
| `is_mouse_down(int) -> bool` | — | Whether the `MOUSE_*` button is held down right now, however many frames it has been down. |
| `just_pressed(string) -> bool` | — | Whether the `KEY_*` key went down this frame; true for that one frame only. |
| `just_released(string) -> bool` | — | Whether the `KEY_*` key came up this frame; true for that one frame only. |
| `mouse_delta() -> float, float` | — | How far the cursor moved this frame, in pixels; movement, not a position. |
| `mouse_just_pressed(int) -> bool` | — | Whether the `MOUSE_*` button went down this frame; true for that one frame only. |
| `mouse_just_released(int) -> bool` | — | Whether the `MOUSE_*` button came up this frame; true for that one frame only. |
| `mouse_position() -> float, float` | — | The cursor's position in window pixels, with (0, 0) at the top-left corner. |
| `reset_bindings()` | — | Drop every saved rebinding and go back to what the project declared. |
| `scroll_delta() -> float, float` | — | How far the wheel turned this frame, as an (x, y) pair; zero when it did not turn. |
| `touches() -> any` | — | Every finger on the screen as `{ id, x, y }`, oldest first, in the same pixels as `mouse_position`. |
| `touches_ended() -> any` | — | The ids of the fingers that lifted or were cancelled this frame. |
| `touches_started() -> any` | — | The ids of the fingers that touched down this frame. |

## Constants

| name | value |
| --- | --- |
| `AXIS_DPAD_X` | `DPadX` |
| `AXIS_DPAD_Y` | `DPadY` |
| `AXIS_LEFT_STICK_X` | `LeftStickX` |
| `AXIS_LEFT_STICK_Y` | `LeftStickY` |
| `AXIS_LEFT_Z` | `LeftZ` |
| `AXIS_RIGHT_STICK_X` | `RightStickX` |
| `AXIS_RIGHT_STICK_Y` | `RightStickY` |
| `AXIS_RIGHT_Z` | `RightZ` |
| `KEY_0` | `Key0` |
| `KEY_1` | `Key1` |
| `KEY_2` | `Key2` |
| `KEY_3` | `Key3` |
| `KEY_4` | `Key4` |
| `KEY_5` | `Key5` |
| `KEY_6` | `Key6` |
| `KEY_7` | `Key7` |
| `KEY_8` | `Key8` |
| `KEY_9` | `Key9` |
| `KEY_A` | `A` |
| `KEY_ABNT_C1` | `AbntC1` |
| `KEY_ABNT_C2` | `AbntC2` |
| `KEY_ADD` | `Add` |
| `KEY_APOSTROPHE` | `Apostrophe` |
| `KEY_APPS` | `Apps` |
| `KEY_AT` | `At` |
| `KEY_AX` | `Ax` |
| `KEY_B` | `B` |
| `KEY_BACK` | `Back` |
| `KEY_BACKSLASH` | `Backslash` |
| `KEY_C` | `C` |
| `KEY_CALCULATOR` | `Calculator` |
| `KEY_CAPITAL` | `Capital` |
| `KEY_CARET` | `Caret` |
| `KEY_COLON` | `Colon` |
| `KEY_COMMA` | `Comma` |
| `KEY_COMPOSE` | `Compose` |
| `KEY_CONVERT` | `Convert` |
| `KEY_COPY` | `Copy` |
| `KEY_CUT` | `Cut` |
| `KEY_D` | `D` |
| `KEY_DECIMAL` | `Decimal` |
| `KEY_DELETE` | `Delete` |
| `KEY_DIVIDE` | `Divide` |
| `KEY_DOWN` | `Down` |
| `KEY_E` | `E` |
| `KEY_END` | `End` |
| `KEY_EQUALS` | `Equals` |
| `KEY_ESCAPE` | `Escape` |
| `KEY_F` | `F` |
| `KEY_F1` | `F1` |
| `KEY_F10` | `F10` |
| `KEY_F11` | `F11` |
| `KEY_F12` | `F12` |
| `KEY_F13` | `F13` |
| `KEY_F14` | `F14` |
| `KEY_F15` | `F15` |
| `KEY_F16` | `F16` |
| `KEY_F17` | `F17` |
| `KEY_F18` | `F18` |
| `KEY_F19` | `F19` |
| `KEY_F2` | `F2` |
| `KEY_F20` | `F20` |
| `KEY_F21` | `F21` |
| `KEY_F22` | `F22` |
| `KEY_F23` | `F23` |
| `KEY_F24` | `F24` |
| `KEY_F3` | `F3` |
| `KEY_F4` | `F4` |
| `KEY_F5` | `F5` |
| `KEY_F6` | `F6` |
| `KEY_F7` | `F7` |
| `KEY_F8` | `F8` |
| `KEY_F9` | `F9` |
| `KEY_G` | `G` |
| `KEY_GRAVE` | `Grave` |
| `KEY_H` | `H` |
| `KEY_HOME` | `Home` |
| `KEY_I` | `I` |
| `KEY_INSERT` | `Insert` |
| `KEY_J` | `J` |
| `KEY_K` | `K` |
| `KEY_KANA` | `Kana` |
| `KEY_KANJI` | `Kanji` |
| `KEY_L` | `L` |
| `KEY_LALT` | `LAlt` |
| `KEY_LBRACKET` | `LBracket` |
| `KEY_LCONTROL` | `LControl` |
| `KEY_LEFT` | `Left` |
| `KEY_LSHIFT` | `LShift` |
| `KEY_LWIN` | `LWin` |
| `KEY_M` | `M` |
| `KEY_MAIL` | `Mail` |
| `KEY_MEDIA_SELECT` | `MediaSelect` |
| `KEY_MEDIA_STOP` | `MediaStop` |
| `KEY_MINUS` | `Minus` |
| `KEY_MULTIPLY` | `Multiply` |
| `KEY_MUTE` | `Mute` |
| `KEY_MY_COMPUTER` | `MyComputer` |
| `KEY_N` | `N` |
| `KEY_NAVIGATE_BACKWARD` | `NavigateBackward` |
| `KEY_NAVIGATE_FORWARD` | `NavigateForward` |
| `KEY_NEXT_TRACK` | `NextTrack` |
| `KEY_NO_CONVERT` | `NoConvert` |
| `KEY_NUMLOCK` | `Numlock` |
| `KEY_NUMPAD0` | `Numpad0` |
| `KEY_NUMPAD1` | `Numpad1` |
| `KEY_NUMPAD2` | `Numpad2` |
| `KEY_NUMPAD3` | `Numpad3` |
| `KEY_NUMPAD4` | `Numpad4` |
| `KEY_NUMPAD5` | `Numpad5` |
| `KEY_NUMPAD6` | `Numpad6` |
| `KEY_NUMPAD7` | `Numpad7` |
| `KEY_NUMPAD8` | `Numpad8` |
| `KEY_NUMPAD9` | `Numpad9` |
| `KEY_NUMPAD_COMMA` | `NumpadComma` |
| `KEY_NUMPAD_ENTER` | `NumpadEnter` |
| `KEY_NUMPAD_EQUALS` | `NumpadEquals` |
| `KEY_O` | `O` |
| `KEY_OEM102` | `OEM102` |
| `KEY_P` | `P` |
| `KEY_PAGE_DOWN` | `PageDown` |
| `KEY_PAGE_UP` | `PageUp` |
| `KEY_PASTE` | `Paste` |
| `KEY_PAUSE` | `Pause` |
| `KEY_PERIOD` | `Period` |
| `KEY_PLAY_PAUSE` | `PlayPause` |
| `KEY_POWER` | `Power` |
| `KEY_PREV_TRACK` | `PrevTrack` |
| `KEY_Q` | `Q` |
| `KEY_R` | `R` |
| `KEY_RALT` | `RAlt` |
| `KEY_RBRACKET` | `RBracket` |
| `KEY_RCONTROL` | `RControl` |
| `KEY_RETURN` | `Return` |
| `KEY_RIGHT` | `Right` |
| `KEY_RSHIFT` | `RShift` |
| `KEY_RWIN` | `RWin` |
| `KEY_S` | `S` |
| `KEY_SCROLL` | `Scroll` |
| `KEY_SEMICOLON` | `Semicolon` |
| `KEY_SLASH` | `Slash` |
| `KEY_SLEEP` | `Sleep` |
| `KEY_SNAPSHOT` | `Snapshot` |
| `KEY_SPACE` | `Space` |
| `KEY_STOP` | `Stop` |
| `KEY_SUBTRACT` | `Subtract` |
| `KEY_SYSRQ` | `Sysrq` |
| `KEY_T` | `T` |
| `KEY_TAB` | `Tab` |
| `KEY_U` | `U` |
| `KEY_UNDERLINE` | `Underline` |
| `KEY_UNKNOWN` | `Unknown` |
| `KEY_UNLABELED` | `Unlabeled` |
| `KEY_UP` | `Up` |
| `KEY_V` | `V` |
| `KEY_VOLUME_DOWN` | `VolumeDown` |
| `KEY_VOLUME_UP` | `VolumeUp` |
| `KEY_W` | `W` |
| `KEY_WAKE` | `Wake` |
| `KEY_WEB_BACK` | `WebBack` |
| `KEY_WEB_FAVORITES` | `WebFavorites` |
| `KEY_WEB_FORWARD` | `WebForward` |
| `KEY_WEB_HOME` | `WebHome` |
| `KEY_WEB_REFRESH` | `WebRefresh` |
| `KEY_WEB_SEARCH` | `WebSearch` |
| `KEY_WEB_STOP` | `WebStop` |
| `KEY_X` | `X` |
| `KEY_Y` | `Y` |
| `KEY_YEN` | `Yen` |
| `KEY_Z` | `Z` |
| `MOUSE_LEFT` | `0` |
| `MOUSE_MIDDLE` | `2` |
| `MOUSE_RIGHT` | `1` |
| `PAD_DPAD_DOWN` | `DPadDown` |
| `PAD_DPAD_LEFT` | `DPadLeft` |
| `PAD_DPAD_RIGHT` | `DPadRight` |
| `PAD_DPAD_UP` | `DPadUp` |
| `PAD_EAST` | `East` |
| `PAD_LEFT_THUMB` | `LeftThumb` |
| `PAD_LEFT_TRIGGER` | `LeftTrigger` |
| `PAD_LEFT_TRIGGER2` | `LeftTrigger2` |
| `PAD_MODE` | `Mode` |
| `PAD_NORTH` | `North` |
| `PAD_RIGHT_THUMB` | `RightThumb` |
| `PAD_RIGHT_TRIGGER` | `RightTrigger` |
| `PAD_RIGHT_TRIGGER2` | `RightTrigger2` |
| `PAD_SELECT` | `Select` |
| `PAD_SOUTH` | `South` |
| `PAD_START` | `Start` |
| `PAD_WEST` | `West` |
