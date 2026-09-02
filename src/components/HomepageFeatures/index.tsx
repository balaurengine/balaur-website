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

// Twelve cards, one line each. The long form is /features.
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
        A game is a <strong>tree of named nodes</strong> with scripts attached.
        Scenes are plain TOML.
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
        Rust's syntax, no build step, <strong>async/await</strong>, and a
        debugger in the editor.
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
        <strong>live in milliseconds</strong>, state intact.
      </>
    ),
  },
  {
    title: 'Determinism, always on',
    icon: (
      <Icon>
        <path d="M3 12a9 9 0 0 1 15.5-6.2M21 12a9 9 0 0 1-15.5 6.2" />
        <path d="M18.5 2v3.8h-3.8M5.5 22v-3.8h3.8" />
      </Icon>
    ),
    description: (
      <>
        Same inputs, <strong>same bits</strong> on every platform. Record a
        session and replay it, network replies included.
      </>
    ),
  },
  {
    title: '2D and 3D physics',
    icon: (
      <Icon>
        <circle cx="8" cy="15" r="4" />
        <rect x="13" y="5" width="7" height="7" rx="1" />
        <path d="M3 21h18" />
      </Icon>
    ),
    description: (
      <>
        <strong>Rapier</strong> under both, stepped on a fixed 60 Hz tick,
        declared in scenes or driven from scripts.
      </>
    ),
  },
  {
    title: 'Rendering',
    icon: (
      <Icon>
        <path d="M12 3 4 7.5v9L12 21l8-4.5v-9z" />
        <path d="M4 7.5 12 12l8-4.5M12 12v9" />
      </Icon>
    ),
    description: (
      <>
        3D and 2D on <strong>wgpu</strong>: windowed, offscreen for screenshots
        and CI, or fully headless.
      </>
    ),
  },
  {
    title: 'Animation and skeletons',
    icon: (
      <Icon>
        <path d="M12 4v6M12 10l-5 5M12 10l5 5M7 15l-2 5M17 15l2 5" />
        <circle cx="12" cy="3" r="1.5" />
      </Icon>
    ),
    description: (
      <>
        Clips and tweens, <strong>2D bones</strong> with skinned polygons,{' '}
        <strong>3D rigs</strong> from glTF, two-bone IK.
      </>
    ),
  },
  {
    title: 'The editor',
    icon: (
      <Icon>
        <rect x="3" y="4" width="18" height="14" rx="2" />
        <path d="M3 9h18M8 4v14" />
      </Icon>
    ),
    description: (
      <>
        Itself a Balaur project: scene tree, inspector, gizmos, timeline, rig
        tools, <strong>play-in-editor</strong>.
      </>
    ),
  },
  {
    title: 'Networking',
    icon: (
      <Icon>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
      </Icon>
    ),
    description: (
      <>
        HTTP and <strong>websockets</strong> with compression, delivered into
        the simulation once per tick.
      </>
    ),
  },
  {
    title: 'Every platform',
    icon: (
      <Icon>
        <rect x="2" y="5" width="13" height="10" rx="1.5" />
        <path d="M6 19h5" />
        <rect x="17" y="8" width="5" height="11" rx="1" />
      </Icon>
    ),
    description: (
      <>
        <strong>Windows, macOS and Linux</strong> today; iOS, Android and
        the web are cross-compiled in CI on every push.
      </>
    ),
  },
  {
    title: 'One file to ship',
    icon: (
      <Icon>
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <path d="M9 15l6-6M15 15V9H9" />
      </Icon>
    ),
    description: (
      <>
        Export fuses bytecode, scenes and assets onto the runtime:{' '}
        <strong>one self-contained binary per target</strong>, nothing to
        install.
      </>
    ),
  },
  {
    title: 'Built on Rust',
    icon: (
      <Icon>
        <ellipse cx="12" cy="13.5" rx="6" ry="4" />
        <path d="M9.6 10.2V8.9M14.4 10.2V8.9" />
        <circle cx="9.6" cy="7.8" r="1.1" />
        <circle cx="14.4" cy="7.8" r="1.1" />
        <path d="M6.3 12.2 4.2 10.4m0 0L2.3 9.1m1.9 1.3L2.5 11.7" />
        <path d="m17.7 12.2 2.1-1.8m0 0 1.9-1.3m-1.9 1.3 1.7 1.3" />
        <path d="M7 16.3 5.2 18.5M9.7 17.4l-.8 2.4M14.3 17.4l.8 2.4M17 16.3l1.8 2.2" />
      </Icon>
    ),
    description: (
      <>
        <strong>Safe Rust</strong> throughout, and the ecosystem as it is:
        Rapier, wgpu, egui, rodio, Rune.
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
