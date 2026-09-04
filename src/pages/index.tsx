import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import HomepageShowcase from '@site/src/components/HomepageShowcase';
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
        {/* One heading holds the wordmark and the tagline, so the page's h1
            says what the engine is rather than only what it is called. The
            tagline is the same sentence as siteConfig.tagline, in two halves. */}
        <Heading as="h1" className={styles.heroHeading}>
          <span className={clsx('hero__title', styles.heroTitle)}>{siteConfig.title}</span>{' '}
          <span className={clsx('hero__subtitle', styles.heroSubtitle)}>
            A 2D &amp; 3D node-based game engine, fully deterministic,{' '}
            <br className={styles.heroBreak} />
            with scripts that reload in milliseconds.
          </span>
        </Heading>
        <p className={styles.heroMission}>
          Written in Rust. Fast to run, fast to iterate, easy to use — and one
          file to ship.
        </p>
        <div className={styles.buttons}>
          <Link className="button button--primary button--lg" to="/docs/intro">
            Read the docs
          </Link>
          <Link
            className={clsx('button button--outline button--lg', styles.heroGhost)}
            to="/features">
            Features
          </Link>
          <Link
            className={clsx('button button--outline button--lg', styles.heroGhost)}
            to="/docs/principles">
            Principles
          </Link>
          <Link
            className={clsx('button button--outline button--lg', styles.heroGhost)}
            to="/download">
            Download
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  return (
    <Layout
      title="A deterministic 2D & 3D game engine in Rust"
      description="Balaur is a node-based game engine in Rust: 2D and 3D, Rune scripting with hot reload, deterministic physics and replay, and an editor that is itself a Balaur project.">
      <SoftwareJsonLd />
      <Header />
      <main>
        <HomepageFeatures />
        <HomepageShowcase />
      </main>
    </Layout>
  );
}
