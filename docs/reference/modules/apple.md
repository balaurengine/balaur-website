---
title: "apple module"
image: "/img/social/reference.png"
sidebar_label: "apple"
description: "Apple platform services that platform. does not cover. identity fetches what a server needs to verify a Game Center player — url, signature, salt and…"
custom_edit_url: null
---

# `apple`

Apple platform services that `platform.*` does not cover. `identity` fetches what a server needs to verify a Game Center player — url, signature, salt and timestamp — and answers on a later tick as a map carrying `kind`, both to the node's `on_apple` method and to whoever awaits the id. Achievements, leaderboards, sign-in and cloud saves are `platform.*`, which speaks Game Center here.

18 functions, 0 constants. Scripts reach it as `apple::`.

## Functions

Argument kinds are the script values a call passes: `node` is a node handle, `any` a table or value of any kind, `fn` a callback.

| function | acts on | what it does |
| --- | --- | --- |
| `access_point(any, any?) -> any` | — |  |
| `authenticated() -> any` | — | Whether Game Center has a signed-in player right now. |
| `available() -> any` | — | Whether this build has Apple's frameworks behind it. |
| `cancel_notification(any) -> any` | — | Drop a scheduled notification, and take a delivered one out of the shade. |
| `credential_state(any, any?, any?) -> any` | — | Ask whether a saved Sign in with Apple account is still authorized, revoked, transferred or unknown. |
| `entitlements(any?, any?) -> any` | — | What this player currently owns, each with the signed transaction a server checks. |
| `finish_purchase(any, any?, any?) -> any` | — | Tell StoreKit a transaction is dealt with. One that is never finished comes back on every launch. |
| `identity(any?, any?) -> any` | — | Fetch the items a server needs to verify this Game Center player, and return the id the answer carries. |
| `notify(any, any?, any?) -> any` | — | Schedule a local notification. The options take `title`, `after` in seconds and an `id` to cancel or recognise it by. |
| `products(any, any?, any?) -> any` | — | Ask the App Store about a list of product ids, and answer with what it knows: title, description, price and display price. |
| `purchase(any, any?, any?) -> any` | — | Buy a product. The answer is `purchased`, `cancelled` or `pending`, and a purchase carries the signed `jws` a server checks. |
| `register_for_push() -> any` | — | Ask the OS for a push token. It arrives at everything watching, not at the caller, because the OS hands it over whenever it likes. |
| `request_notifications(any?, any?) -> any` | — | Ask the player to allow notifications, and answer with what they said. |
| `restore_purchases(any?, any?) -> any` | — | Ask the App Store to hand this device's purchases back — the button a review expects a game to have. |
| `show_dashboard(any?, any?) -> any` | — |  |
| `sign_in(any?, any?) -> any` | — | Sign in with Apple, and return the id the identity token comes back on. Game Center's own sign-in is `platform.sign_in`. |
| `watch(any, any?) -> any` | — | Subscribe a node's method to everything that arrives unasked: a notification tapped, a URL opened, a push token, a transaction that landed elsewhere. |
| `watch_urls() -> any` | — | Hear about URLs the game is asked to open while it runs. A URL the game was launched with arrives before the engine boots and is not one of them. |
