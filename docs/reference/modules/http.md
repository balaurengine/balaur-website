---
title: "http"
custom_edit_url: null
---

# `http`

1 function, 0 constants. Scripts reach it as `http::`.

## Functions

Argument kinds are the script values a call passes: `node` is a node handle, `any` a table or value of any kind, `fn` a callback.

| function | acts on | what it does |
| --- | --- | --- |
| `request(any, any?, any?) -> any` | — | Start an HTTP request and return the id its reply carries, to await or to match inside the handler. |
