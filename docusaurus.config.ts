import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const url = 'https://balaurengine.org';

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
      // Search over the docs, the reference, the pages and the devlog, built
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

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  headTags: [
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
    jsonLd({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Balaur',
      url: `${url}/`,
      logo: `${url}/brand/balaur-mark-light-512.png`,
      sameAs: ['https://github.com/balaurengine'],
    }),
    jsonLd({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Balaur',
      url: `${url}/`,
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
          blogTitle: 'Devlog',
          blogDescription:
            'The Balaur devlog: what shipped in the engine and the thinking behind it.',
          // With a handful of posts the archive, tag and author pages are
          // near-duplicates of the list; tags are off the posts and the
          // author page is off in authors.yml for the same reason.
          archiveBasePath: null,
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
          ignorePatterns: ['/blog/authors/**'],
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
        alt: 'Balaur Logo',
        src: 'img/logo-light.svg',
        srcDark: 'img/logo-dark.svg',
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
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Docs',
        },
        {
          type: 'docSidebar',
          sidebarId: 'referenceSidebar',
          position: 'left',
          label: 'Reference',
        },
        {
          type: 'doc',
          docId: 'roadmap',
          position: 'left',
          label: 'Roadmap',
        },
        {to: '/blog', label: 'Devlog', position: 'left'},
        {to: '/editor', label: 'Editor', position: 'right'},
        {to: '/play', label: 'Play', position: 'right'},
        {to: '/download', label: 'Download', position: 'right'},
        {
          href: 'https://github.com/balaurengine/balaur',
          label: 'GitHub',
          position: 'right',
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
          ],
        },
        {
          title: 'Community',
          items: [
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
          ],
        },
        {
          title: 'More',
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
              label: 'Devlog',
              to: '/blog',
            },
            {
              label: 'Compare',
              to: '/compare',
            },
            {
              label: 'FAQ',
              to: '/faq',
            },
            {
              label: 'Branding',
              to: '/branding',
            },
            {
              label: 'Devlog RSS',
              href: 'pathname:///blog/rss.xml',
            },
            {
              label: 'Website repo',
              href: 'https://github.com/balaurengine/balaur-website',
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
