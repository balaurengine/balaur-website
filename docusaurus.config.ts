import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const url = 'https://balaurengine.org';
const repoUrl = 'https://github.com/balaurengine/balaur';
// The community server; the footer's social row (src/theme/Footer/Copyright)
// reads it from customFields so there is one copy of the invite.
const discordUrl = 'https://discord.gg/v649emcpAu';

// Site-wide structured data: who publishes the site and what it is. The
// SoftwareApplication entry for the engine itself lives in
// src/components/SoftwareJsonLd.tsx, on the pages that describe it.
const jsonLd = (data: object) => ({
  tagName: 'script',
  attributes: {type: 'application/ld+json'},
  innerHTML: JSON.stringify(data),
});

const config: Config = {
  title: 'Balaur',
  tagline: 'A 2D & 3D node-based game engine, fully deterministic, with scripts that reload in milliseconds.',
  // Favicons are declared in headTags below, at stable root URLs.

  markdown: {
    // .md files (the synced reference docs) render as CommonMark; .mdx as MDX.
    format: 'detect',
    mermaid: true,
  },
  themes: [
    '@docusaurus/theme-mermaid',
    [
      // Search over the docs, the reference, the pages and the blog, built
      // into the site at build time — no service, no account, works offline.
      '@easyops-cn/docusaurus-search-local',
      {
        hashed: true,
        indexDocs: true,
        indexBlog: true,
        indexPages: true,
        docsRouteBasePath: '/docs',
        blogRouteBasePath: '/blog',
        highlightSearchTermsOnTargetPage: true,
        searchResultLimits: 8,
        explicitSearchResultPath: true,
      },
    ],
  ],

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url,
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',
  // GitHub Pages serves every page as a directory with a trailing slash, so
  // the sitemap, canonical URLs and internal links must carry it too — or
  // every URL the site publishes is a redirect.
  trailingSlash: true,

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'balaurengine', // Usually your GitHub org/user name.
  projectName: 'balaur-website', // Usually your repo name.

  onBrokenLinks: 'throw',

  customFields: {discordUrl, repoUrl},

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  headTags: [
    // The @font-face rules live here rather than in custom.css because
    // webpack rewrites every url() it finds in a stylesheet to a hashed copy
    // under /assets: the fonts would ship twice, and the preloads below name
    // the stable path so they would match neither copy. In the head they also
    // need no stylesheet parsed before the browser can start the download.
    {tagName: 'style', attributes: {}, innerHTML: '@font-face{font-family:\'Alegreya\';font-style:normal;font-weight:400 900;font-display:swap;src:url(\'/fonts/alegreya-latin.woff2\') format(\'woff2\');unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}@font-face{font-family:\'Alegreya\';font-style:normal;font-weight:400 900;font-display:swap;src:url(\'/fonts/alegreya-latin-ext.woff2\') format(\'woff2\');unicode-range:U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:\'JetBrains Mono\';font-style:normal;font-weight:100 800;font-display:swap;src:url(\'/fonts/jetbrains-mono-latin.woff2\') format(\'woff2\');unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}@font-face{font-family:\'JetBrains Mono\';font-style:normal;font-weight:100 800;font-display:swap;src:url(\'/fonts/jetbrains-mono-latin-ext.woff2\') format(\'woff2\');unicode-range:U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:\'Source Sans 3\';font-style:normal;font-weight:200 900;font-display:swap;src:url(\'/fonts/source-sans-3-latin.woff2\') format(\'woff2\');unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}@font-face{font-family:\'Source Sans 3\';font-style:normal;font-weight:200 900;font-display:swap;src:url(\'/fonts/source-sans-3-latin-ext.woff2\') format(\'woff2\');unicode-range:U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:\'Source Sans 3\';font-style:italic;font-weight:200 900;font-display:swap;src:url(\'/fonts/source-sans-3-italic-latin.woff2\') format(\'woff2\');unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}@font-face{font-family:\'Source Sans 3\';font-style:italic;font-weight:200 900;font-display:swap;src:url(\'/fonts/source-sans-3-italic-latin-ext.woff2\') format(\'woff2\');unicode-range:U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF}'},
    // The two faces that draw the first screen, fetched in parallel with the
    // stylesheet rather than after it. Only the latin subsets: latin-ext and
    // the mono are left to the @font-face rules to pull when a page needs
    // them. crossOrigin is required on font preloads even same-origin, or
    // the browser fetches the file a second time.
    {tagName: 'link', attributes: {rel: 'preload', href: '/fonts/alegreya-latin.woff2', as: 'font', type: 'font/woff2', crossorigin: 'anonymous'}},
    {tagName: 'link', attributes: {rel: 'preload', href: '/fonts/source-sans-3-latin.woff2', as: 'font', type: 'font/woff2', crossorigin: 'anonymous'}},
    // Icons live at the site root under names that never change. Google
    // refetches a favicon only when it recrawls the home page, and a new URL
    // starts that discovery over. The ICO carries 16-64 px frames; the SVG
    // and the 192 px PNG are the brand tile (a multiple of 48 px, which is
    // what Google asks for); the 180 px PNG is what iOS looks for. `sizes`
    // on the ICO keeps Chrome from preferring it over the SVG.
    {tagName: 'link', attributes: {rel: 'icon', href: '/favicon.ico', sizes: '32x32'}},
    {tagName: 'link', attributes: {rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml'}},
    {tagName: 'link', attributes: {rel: 'icon', href: '/favicon-192.png', type: 'image/png', sizes: '192x192'}},
    {tagName: 'link', attributes: {rel: 'apple-touch-icon', href: '/apple-touch-icon.png', sizes: '180x180'}},
    // Who publishes the site. The founders are named because an engine is
    // judged by who writes it, and because a bare name and logo give an
    // answer engine nothing to tie the project to: the people, the repository
    // and the licence are what make it one identifiable thing rather than a
    // word. All of it is already on /about.
    jsonLd({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Balaur',
      alternateName: 'Balaur Engine',
      url: `${url}/`,
      logo: `${url}/brand/balaur-mark-light-512.png`,
      description:
        'Balaur is a free and open source 2D and 3D node-based game engine written in Rust, with Rune scripts that hot reload in milliseconds and an always-on deterministic tick.',
      foundingDate: '2026',
      founder: [
        {
          '@type': 'Person',
          name: 'Dragos Daian',
          url: 'https://github.com/Ughuuu',
          sameAs: ['https://github.com/Ughuuu', 'https://appsinacup.com'],
        },
        {
          '@type': 'Person',
          name: 'Sébastien Crozet',
          url: 'https://github.com/sebcrozet',
          sameAs: ['https://github.com/sebcrozet'],
        },
      ],
      sameAs: [
        'https://github.com/balaurengine',
        `${repoUrl}`,
        discordUrl,
      ],
    }),
    // The site itself, with the search box that the built-in index answers.
    jsonLd({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Balaur',
      alternateName: 'Balaur Engine',
      url: `${url}/`,
      description:
        'Documentation, blog and downloads for Balaur, a deterministic 2D and 3D game engine in Rust.',
      inLanguage: 'en',
      publisher: {'@type': 'Organization', name: 'Balaur', url: `${url}/`},
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${url}/search/?q={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
    }),
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/balaurengine/balaur-website/tree/main/',
        },
        blog: {
          blogTitle: 'Blog',
          blogDescription:
            'The Balaur blog: what shipped in the engine and the thinking behind it.',
          // With a handful of posts the archive, tag and author pages are
          // near-duplicates of the list; tags are off the posts and the
          // author page is off in authors.yml for the same reason.
          archiveBasePath: null,
          // The blog is a running list of what shipped; the sidebar is the
          // only index of it now that the archive page is off, so show it all.
          blogSidebarCount: 'ALL',
          blogSidebarTitle: 'All posts',
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/balaurengine/balaur-website/tree/main/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
        sitemap: {
          // The authors list is generated whenever authors.yml exists; with
          // one author it is a duplicate of /blog, so it is not advertised.
          // /search is a form with no content of its own and is noindexed in
          // src/theme/SearchPage; the paginated blog pages are the same
          // posts as /blog, which is the page that should rank.
          ignorePatterns: ['/blog/authors/**', '/search/', '/blog/page/**'],
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    metadata: [
      {
        name: 'keywords',
        content:
          'game engine, rust game engine, deterministic game engine, 2d game engine, 3d game engine, open source game engine, hot reload scripting, rune scripting, skeletal animation, balaur engine',
      },
    ],
    // The card a link to the site unfurls with; scripts/social-cards.mjs draws it.
    image: 'img/social/home.png',
    colorMode: {
      // First visit follows the OS; the swizzled toggle (src/theme/
      // ColorModeToggle) then offers a plain light/dark switch that persists.
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Balaur',
      logo: {
        alt: 'Balaur logo',
        src: 'img/logo-light.svg',
        srcDark: 'img/logo-dark.svg',
        // The intrinsic box, so the navbar does not reflow when the SVG lands.
        width: 32,
        height: 32,
      },
      items: [
        {
          label: 'Made for',
          position: 'left',
          items: [
            {to: '/code', label: 'Game developers'},
            {to: '/animate', label: 'Animators'},
            {to: '/multiplayer', label: 'Multiplayer and simulation'},
          ],
        },
        {to: '/features', label: 'Features', position: 'left'},
        {to: '/examples', label: 'Examples', position: 'left'},
        // Everything there is to read, under one heading: the manual and the
        // reference are each a sidebar, and the blog sits with them.
        {
          label: 'Docs',
          position: 'left',
          items: [
            {type: 'docSidebar', sidebarId: 'docsSidebar', label: 'Documentation'},
            {to: '/docs/getting-started', label: 'Getting started'},
            {type: 'docSidebar', sidebarId: 'referenceSidebar', label: 'Reference'},
            {to: '/blog', label: 'Blog'},
          ],
        },
        // A plain link, not type: 'doc'. A doc navbar item is also active for
        // every other page in the same sidebar, so it would light up on every
        // page of the manual.
        {to: '/docs/roadmap', label: 'Roadmap', position: 'left'},
        {to: '/editor', label: 'Editor', position: 'right'},
        {to: '/download', label: 'Download', position: 'right'},
        // Hidden until the donation page is ready. The one item that asks for
        // something rather than offering it, so it is a pill rather than a
        // sixth link (see custom.css).
        // {
        //   to: '/donate',
        //   label: 'Donate',
        //   position: 'right',
        //   className: 'navbar__link--donate',
        // },
        {
          label: 'Community',
          position: 'right',
          items: [
            {to: '/community', label: 'Community'},
            {to: '/about', label: 'About'},
            {href: discordUrl, label: 'Discord'},
          ],
        },
        // An icon, because the word costs a button's worth of room and the
        // mark is the more recognisable of the two.
        {
          href: 'https://github.com/balaurengine/balaur',
          position: 'right',
          className: 'header-github-link',
          'aria-label': 'Balaur on GitHub',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Introduction',
              to: '/docs/intro',
            },
            {
              label: 'Getting started',
              to: '/docs/getting-started',
            },
            {
              label: 'Reference',
              to: '/docs/reference',
            },
            {
              label: 'Roadmap',
              to: '/docs/roadmap',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Community and contributing',
              to: '/community',
            },
            {
              label: 'Discord',
              href: discordUrl,
            },
            {
              label: 'Discussions',
              href: 'https://github.com/balaurengine/balaur/discussions',
            },
            {
              label: 'Issues',
              href: 'https://github.com/balaurengine/balaur/issues',
            },
            {
              label: 'Engine repo',
              href: 'https://github.com/balaurengine/balaur',
            },
            {
              label: 'Website repo',
              href: 'https://github.com/balaurengine/balaur-website',
            },
          ],
        },
        {
          title: 'Made for',
          items: [
            {
              label: 'For game developers',
              to: '/code',
            },
            {
              label: 'For animators',
              to: '/animate',
            },
            {
              label: 'For multiplayer',
              to: '/multiplayer',
            },
            {
              label: 'Compare',
              to: '/compare',
            },
            {
              label: 'FAQ',
              to: '/faq',
            },
          ],
        },
        {
          title: 'Try it',
          items: [
            {
              label: 'Editor',
              to: '/editor',
            },
            {
              label: 'Examples',
              to: '/examples',
            },
            {
              label: 'Benchmarks',
              to: '/benchmark',
            },
            {
              label: 'Download',
              to: '/download',
            },
          ],
        },
        {
          title: 'The project',
          items: [
            {
              label: 'About',
              to: '/about',
            },
            // Hidden until the donation page is ready.
            // {
            //   label: 'Support Balaur',
            //   to: '/donate',
            // },
            {
              label: 'Blog',
              to: '/blog',
            },
            {
              label: 'Blog RSS',
              href: 'pathname:///blog/rss.xml',
            },
            {
              label: 'Branding',
              to: '/branding',
            },
            {
              label: 'Privacy',
              to: '/privacy',
            },
          ],
        },
      ],
      copyright: `Balaur is free and open source, MIT. Copyright © ${new Date().getFullYear()} balaurengine. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.nightOwlLight,
      darkTheme: prismThemes.nightOwl,
      // prism-react-renderer bundles only a handful of grammars — rust,
      // json, yaml and friends — so every other fence in the docs renders as
      // plain text until it is named here. Rune is added in
      // src/theme/prism-include-languages.ts, which has no component to load.
      additionalLanguages: ['bash', 'toml', 'wgsl'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
