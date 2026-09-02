import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Balaur',
  tagline: 'A node-based game engine, fully deterministic, 2D and 3D, with scripts that reload in milliseconds.',
  favicon: 'img/favicon.ico',

  markdown: {
    // .md files (the synced reference docs) render as CommonMark; .mdx as MDX.
    format: 'detect',
    mermaid: true,
  },
  themes: ['@docusaurus/theme-mermaid'],

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://balaurengine.org',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

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
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/social-card.png',
    colorMode: {
      // First visit follows the OS; the swizzled toggle (src/theme/
      // ColorModeToggle) then offers a plain light/dark switch that persists.
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Balaur',
      logo: {
        alt: 'Balaur Logo',
        src: 'img/logo.svg',
        srcDark: 'img/logo-dark.svg',
      },
      items: [
        {to: '/features', label: 'Features', position: 'left'},
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Docs',
        },
        {
          type: 'docSidebar',
          sidebarId: 'tutorialsSidebar',
          position: 'left',
          label: 'Tutorials',
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
              label: 'Script API',
              to: '/docs/reference/script-api',
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
              label: 'Devlog',
              to: '/blog',
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
      theme: prismThemes.gruvboxMaterialLight,
      darkTheme: prismThemes.gruvboxMaterialDark,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
