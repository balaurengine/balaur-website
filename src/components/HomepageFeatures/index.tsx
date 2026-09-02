import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  icon: ReactNode;
  description: ReactNode;
};

function Icon({children}: {children: ReactNode}) {
  return (
    <svg
      className={styles.featureIcon}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      role="img"
      aria-hidden="true">
      {children}
    </svg>
  );
}

const FeatureList: FeatureItem[] = [
  {
    title: 'Nodes and scenes',
    icon: (
      <Icon>
        <circle cx="12" cy="5" r="2.5" />
        <circle cx="6" cy="18" r="2.5" />
        <circle cx="18" cy="18" r="2.5" />
        <path d="M10.8 7.2 7.2 15.8M13.2 7.2l3.6 8.6" />
      </Icon>
    ),
    description: (
      <>
        A game is a <strong>scene tree</strong> of named nodes with scripts
        attached. Underneath, every node is an <strong>ECS entity</strong> and
        every subsystem a plugin over the same data.
      </>
    ),
  },
  {
    title: 'Instant hot reload',
    icon: (
      <Icon>
        <path d="M13 2 4 14h6l-1 8 9-12h-6z" />
      </Icon>
    ),
    description: (
      <>
        Save a script while the game runs: the new code is{' '}
        <strong>live in milliseconds</strong>, and the state survives.
      </>
    ),
  },
  {
    title: 'Determinism',
    icon: (
      <Icon>
        <path d="M3 12a9 9 0 0 1 15.5-6.2M21 12a9 9 0 0 1-15.5 6.2" />
        <path d="M18.5 2v3.8h-3.8M5.5 22v-3.8h3.8" />
      </Icon>
    ),
    description: (
      <>
        Identical inputs give <strong>bit-for-bit identical</strong>{' '}
        simulations on every platform — replays and lockstep for free.
      </>
    ),
  },
  {
    title: 'Scripting in Rune',
    icon: (
      <Icon>
        <path d="m8 7-5 5 5 5M16 7l5 5-5 5" />
      </Icon>
    ),
    description: (
      <>
        Scripts are <strong>Rune</strong>: Rust's syntax, no build step, a
        debugger in the editor. One binding API reaches every module.
      </>
    ),
  },
  {
    title: '3D and 2D',
    icon: (
      <Icon>
        <path d="M12 3 4 7.5v9L12 21l8-4.5v-9z" />
        <path d="M4 7.5 12 12l8-4.5M12 12v9" />
      </Icon>
    ),
    description: (
      <>
        Two component sets over <strong>one scene tree</strong>, with rapier
        physics behind both and an editor that adapts.
      </>
    ),
  },
  {
    title: 'One executable',
    icon: (
      <Icon>
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <path d="M9 15l6-6M15 15V9H9" />
      </Icon>
    ),
    description: (
      <>
        Export fuses precompiled bytecode onto a runtime:{' '}
        <strong>a single binary</strong>, no compiler, no sources.
      </>
    ),
  },
];

function Feature({title, icon, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className={styles.featureCard}>
        {icon}
        <Heading as="h3" className={styles.featureTitle}>
          {title}
        </Heading>
        <p className={styles.featureText}>{description}</p>
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
