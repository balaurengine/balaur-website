---
title: "apple module"
image: "/img/social/reference.png"
sidebar_label: "apple"
description: "Apple platform services that platform. does not cover. identity fetches what a server needs to verify a Game Center player — url, signature, salt and…"
custom_edit_url: null
---

# <span class="ref-icon ref-icon--other" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M216,73.52Zm0,99.26c-16.79-11.53-24-30.87-24-52.78,0-18.3,11.68-34.81,24-46.48C204.53,62.66,185,56,168,56a63.72,63.72,0,0,0-40,14h0A63.71,63.71,0,0,0,88.88,56C52,55.5,23.06,86.3,24,123.19a119.62,119.62,0,0,0,37.65,84.12A32,32,0,0,0,83.6,216h87.7a31.75,31.75,0,0,0,23.26-10c15.85-17,21.44-33.2,21.44-33.2Z" opacity="0.2"/><path d="M223.3,169.59a8.07,8.07,0,0,0-2.8-3.4C203.53,154.53,200,134.64,200,120c0-17.67,13.47-33.06,21.5-40.67a8,8,0,0,0,0-11.62C208.82,55.74,187.82,48,168,48a72.23,72.23,0,0,0-40,12.13,71.56,71.56,0,0,0-90.71,9.09A74.63,74.63,0,0,0,16,123.4a127,127,0,0,0,40.14,89.73A39.8,39.8,0,0,0,83.59,224h87.68a39.84,39.84,0,0,0,29.12-12.57,125,125,0,0,0,17.82-24.6C225.23,174,224.33,172,223.3,169.59Zm-34.63,30.94a23.76,23.76,0,0,1-17.4,7.47H83.59a23.82,23.82,0,0,1-16.44-6.51A111.14,111.14,0,0,1,32,123,58.5,58.5,0,0,1,48.65,80.47,54.81,54.81,0,0,1,88,64h.78A55.45,55.45,0,0,1,123,76.28a8,8,0,0,0,10,0A55.39,55.39,0,0,1,168,64a70.64,70.64,0,0,1,36,10.35c-13,14.52-20,30.47-20,45.65,0,23.77,7.64,42.73,22.18,55.3A105.52,105.52,0,0,1,188.67,200.53ZM128.23,30A40,40,0,0,1,167,0h1a8,8,0,0,1,0,16h-1a24,24,0,0,0-23.24,18,8,8,0,1,1-15.5-4Z"/></svg></span>`apple`

Apple platform services that `platform.*` does not cover. `identity` fetches what a server needs to verify a Game Center player — url, signature, salt and timestamp — and answers on a later tick as a map carrying `kind`, both to the node's `on_apple` method and to whoever awaits the id. Achievements, leaderboards, sign-in and cloud saves are `platform.*`, which speaks Game Center here.

18 functions, 0 constants. Scripts reach it as `apple::`.

## Functions

Argument kinds are the script values a call passes: `node` is a node handle, `any` a table or value of any kind, `fn` a callback.

| function | acts on | what it does |
| --- | --- | --- |
| `access_point(any, any?) -> any` | — | Show or hide Game Center's floating access point, and answer whether it is showing; `location` is a corner — top_leading, top_trailing, bottom_leading or bottom_trailing. |
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
| `show_dashboard(any?, any?) -> any` | — | Open Game Center's dashboard over the game; `state` picks the page — default, leaderboards, achievements, challenges, profile, dashboard or friends. |
| `sign_in(any?, any?) -> any` | — | Sign in with Apple, and return the id the identity token comes back on. Game Center's own sign-in is `platform.sign_in`. |
| `watch(any, any?) -> any` | — | Subscribe a node's method to everything that arrives unasked: a notification tapped, a URL opened, a push token, a transaction that landed elsewhere. |
| `watch_urls() -> any` | — | Hear about URLs the game is asked to open while it runs. A URL the game was launched with arrives before the engine boots and is not one of them. |
