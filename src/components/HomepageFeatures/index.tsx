import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Nodes and scenes',
    description: (
      <>
        A game is a scene tree of named nodes with scripts attached, the way
        Godot works. Under the hood every node is an ECS entity, and every
        subsystem is a plugin over the same data plane.
      </>
    ),
  },
  {
    title: 'Instant hot reload',
    description: (
      <>
        Saving a script swaps its code into the running game in milliseconds,
        preserving all live state. It is automatic, always on in dev mode, and
        provided by the core.
      </>
    ),
  },
  {
    title: 'Cross-platform determinism',
    description: (
      <>
        Identical inputs produce bit-for-bit identical simulations on every
        platform. Every subsystem decision is vetted against this guarantee.
      </>
    ),
  },
  {
    title: 'Two scripting languages',
    description: (
      <>
        Luau and Rune ship out of the box. Subsystems declare their bindings
        once against a language-neutral seam, so neither language is
        privileged and a third costs one crate.
      </>
    ),
  },
  {
    title: '3D and 2D',
    description: (
      <>
        2D is a second set of components over the same scene tree: rapier2d
        physics with the same determinism guarantees, an orthographic pan/zoom
        camera, and an editor that adapts automatically.
      </>
    ),
  },
  {
    title: 'One executable to ship',
    description: (
      <>
        Export compiles scripts to bytecode, bundles them into a pack, and
        fuses the pack onto a runtime template. The result is a single binary
        with no compiler and no script sources in it.
      </>
    ),
  },
];

function Feature({title, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center padding-horiz--md padding-vert--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
