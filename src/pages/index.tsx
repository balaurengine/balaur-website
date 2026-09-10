import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import PersonaSections from '@site/src/components/PersonaSections';
import SoftwareJsonLd from '@site/src/components/SoftwareJsonLd';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function Header() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        <ThemedImage
          alt=""
          className={styles.heroMark}
          sources={{
            light: useBaseUrl('/img/logo-light.svg'),
            dark: useBaseUrl('/img/logo-dark.svg'),
          }}
        />
        {/* One heading holds the wordmark and what the engine is, so the h1
            says more than the name. It is kept near 50 characters: past about
            60 Google truncates it, and the h1 is the line most often quoted
            back as the page's name. The rest of the tagline follows in the
            mission line, where length costs nothing. */}
        <Heading as="h1" className={styles.heroHeading}>
          <span className={clsx('hero__title', styles.heroTitle)}>{siteConfig.title}</span>{' '}
          <span className={clsx('hero__subtitle', styles.heroSubtitle)}>
            A deterministic 2D &amp; 3D game engine.
          </span>
        </Heading>
        <p className={styles.heroMission}>
          Node-based scenes, and scripts that reload in milliseconds.
          Written in Rust.
        </p>
        <div className={styles.buttons}>
          <Link className="button button--primary button--lg" to="/docs/intro">
            Read the docs
          </Link>
          <Link
            className={clsx('button button--outline button--lg', styles.heroGhost)}
            to="/download">
            Download
          </Link>
        </div>
        {/* The four pages a first visit asks for, as chips, so a phone reaches
            them without opening the menu. */}
        <div className={clsx(styles.buttons, styles.heroLinks)}>
          {[
            {to: '/features', label: 'Features'},
            {to: '/docs/roadmap', label: 'Roadmap'},
            {to: '/compare', label: 'Compare'},
            {to: '/blog', label: 'Blog'},
          ].map(({to, label}) => (
            <Link
              key={to}
              className={clsx('button button--outline', styles.heroGhost, styles.heroLink)}
              to={to}>
              {label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  return (
    <Layout
      title="A deterministic 2D & 3D game engine"
      description="Balaur is a node-based 2D and 3D game engine with Rune scripts that hot reload in milliseconds, always-on determinism, and a built-in editor.">
      <SoftwareJsonLd />
      <Header />
      <main>
        {/* Who it is for, one section each, then the catalogue. */}
        <PersonaSections />
        <HomepageFeatures />
        <section className={styles.cta}>
          <div className="container">
            <p className={styles.ctaText}>Free and open source, MIT, for Windows, macOS, Linux, iOS, Android and Web.</p>
            <div className={styles.buttons}>
              <Link className="button button--primary button--lg" to="/download">
                Download
              </Link>
              <Link className={clsx('button button--outline button--lg', styles.heroGhost)} to="/docs/getting-started">
                Getting started
              </Link>
              <Link className={clsx('button button--outline button--lg', styles.heroGhost)} to="/docs/roadmap">
                Roadmap
              </Link>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
