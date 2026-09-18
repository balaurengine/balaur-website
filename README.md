# Balaur website

The source for [balaurengine.org](https://balaurengine.org), the site and docs for the [Balaur](https://github.com/balaurengine/balaur) game engine. Built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

## Authors

Made by [Dragos Daian (@Ughuuu)](https://github.com/Ughuuu) and [Sébastien Crozet (@sebcrozet)](https://github.com/sebcrozet).

## Run it

Node 22 (`.nvmrc`) and Yarn 4, which `package.json` pins through Corepack:

```bash
corepack enable
yarn
yarn start
```

`yarn start` runs the generators first, then serves the site with live reload.
Two of them read GitHub, so the first start needs the network.

## Check and build

```bash
yarn lint        # prose limits on blog/ and docs/
yarn typecheck
yarn build       # writes build/
```

## Content from the engine

The reference, roadmap, benchmarks and the web build come from the
[engine repository](https://github.com/balaurengine/balaur):

```bash
./scripts/sync-docs.sh
./scripts/sync-play.sh
```

Both fetch from GitHub. `BALAUR_REPO=../balaur` copies from a local checkout
instead.

## Deployment

Every push to `main` builds and deploys the site through GitHub Actions
(`.github/workflows/deploy.yml`), and so does each engine nightly. A pull
request builds without deploying.

## Contributing

[`AGENTS.md`](AGENTS.md) holds the rules for this repository: generated files,
the prose limits and the writing rules for site copy.

## License

MIT, see [LICENSE](LICENSE). Copyright (c) 2026 Sébastien Crozet, Dragos Daian.
