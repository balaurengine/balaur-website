import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import CodeBlock from '@theme/CodeBlock';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            Read the docs
          </Link>
          <Link
            className="button button--outline button--secondary button--lg"
            to="/features">
            Features
          </Link>
        </div>
      </div>
    </header>
  );
}

const scriptSample = `-- scripts/spinner.luau
local Spinner = {}

function Spinner:init()
    self.angle = 0
end

function Spinner:update(dt)
    if input.just_pressed(input.KEY_SPACE) then
        animation.tween_to(self.node, "scale",
            { 1.5, 1.5, 1.5 }, 0.2, "out_back")
    end
    self.angle += dt
    self.node:set_rotation_euler(0, self.angle, 0)
end

return Spinner`;

const sceneSample = `# scenes/main.toml
[[nodes]]
name = "Ball"
position = [0.0, 6.0, 0.0]
script = "scripts/ball.luau"
body = "dynamic"
collider = { kind = "ball", radius = 0.5 }
shape = { kind = "ball", radius = 0.5 }

[[nodes]]
name = "Spinner"
position = [2.5, 0.5, 0.0]
script = "scripts/spinner.luau"
shape = { kind = "cuboid", half_extents = [0.5, 0.5, 0.5] }`;

function HomepageExample() {
  return (
    <section className={styles.example}>
      <div className="container">
        <div className="row">
          <div className="col col--6">
            <Heading as="h3">Scripts, hot reloaded</Heading>
            <p>
              A script is attached to a node and declares lifecycle methods, in
              Luau or Rune. Save while the game runs: the new code is live in
              milliseconds and the state survives.
            </p>
            <CodeBlock language="lua">{scriptSample}</CodeBlock>
          </div>
          <div className="col col--6">
            <Heading as="h3">Scenes, declarative</Heading>
            <p>
              A scene is TOML, and plugins extend its vocabulary: physics,
              shapes, widgets, and animation clips are all components — which
              is also what makes the whole scene editable in the editor.
            </p>
            <CodeBlock language="toml">{sceneSample}</CodeBlock>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} — ${siteConfig.tagline}`}
      description="Balaur is a scriptable, node-based game engine with a Rust data plane: instant hot reload, cross-platform determinism, Luau and Rune scripting, 3D and 2D, and an editor that is itself a Balaur project.">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        <HomepageExample />
      </main>
    </Layout>
  );
}
