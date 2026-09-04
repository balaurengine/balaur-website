import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import Clip from '@site/src/components/Clip';
import Icon, {type IconName, type Tone} from '@site/src/components/Icon';
import styles from './styles.module.css';

// One section per person the engine is for, in the words that person uses —
// a designer says materials and real time, an animator says mesh skinning and
// inverse kinematics, a multiplayer programmer says deterministic and
// rollback. Each names the editor persona it lives in and shows a clip the
// manual already has. Sides alternate down the page.
type Line = {icon: IconName; tone?: Tone; text: string};
type Persona = {
  id: string;
  who: string;
  persona: string;
  headline: string;
  lines: Line[];
  clip?: string;
  image?: string;
  alt: string;
  links: {to: string; label: string}[];
};

const PERSONAS: Persona[] = [
  {
    id: 'design',
    who: 'For designers',
    persona: 'Scene and Interface personas',
    headline: 'Real-time design, no build step.',
    lines: [
      {icon: 'cursor', tone: '2d', text: 'Place, move and scale in the viewport; every property is a row in the inspector, and every change is undoable.'},
      {icon: 'palette', tone: 'render', text: 'Materials, lights, shadows and particles, live in the scene you are editing.'},
      {icon: 'play', tone: 'ui', text: 'Press play. The scene you designed is the game, and the HUD is laid out over the safe area right there.'},
    ],
    clip: 'scenes_inspect',
    alt: 'Selecting a node in the tree and editing it in the inspector, the viewport updating as you type',
    links: [
      {to: '/docs/manual/scenes', label: 'Scenes and nodes'},
      {to: '/docs/manual/ui', label: 'UI'},
      {to: '/examples#angrynerds', label: 'Open examples/angrynerds'},
    ],
  },
  {
    id: 'code',
    who: 'For programmers',
    persona: 'Script persona',
    headline: 'Save the script. It is already running.',
    lines: [
      {icon: 'code', text: 'Rune reads like Rust without the types: no build step, async/await, one language for the game and the editor.'},
      {icon: 'lightning', text: 'Hot reload in milliseconds with state intact; breakpoints, stepping, frames and locals in the editor.'},
      {icon: 'plug', text: 'Plugins in Rust or C when you want the metal, and one file to ship when you are done.'},
    ],
    clip: 'scripting_live',
    alt: 'Editing a script while the game runs; on save the new code is live and the state survives',
    links: [
      {to: '/docs/manual/scripting', label: 'Scripting'},
      {to: '/docs/manual/extensions', label: 'Extensions'},
      {to: '/examples#hello', label: 'Open examples/hello'},
    ],
  },
  {
    id: 'animate',
    who: 'For animators',
    persona: 'Animate persona',
    headline: '2D and 3D animation for games, rigged where you play it.',
    lines: [
      {icon: 'bone', tone: 'animation', text: 'Bend and deform images with mesh skinning: bones, painted weights, polygons.'},
      {icon: 'magic-wand', tone: 'animation', text: 'Pose with inverse kinematics, two-bone IK and look-at, and key it in the timeline.'},
      {icon: 'cube', tone: '3d', text: '3D rigs imported from glTF; clips, tweens and twelve easings drive any property.'},
    ],
    clip: 'animation_key',
    alt: 'Scrubbing a clip, posing a bone, keying it, and playing it back',
    links: [
      {to: '/animate', label: 'Balaur for animators'},
      {to: '/docs/manual/animation', label: 'Animation manual'},
      {to: '/examples#rig', label: 'Open examples/rig'},
    ],
  },
  {
    id: 'multiplayer',
    who: 'For multiplayer and simulation',
    persona: 'Physics persona',
    headline: 'Deterministic by default: same inputs, same bits, on every machine.',
    lines: [
      {icon: 'timer', tone: 'physics', text: 'A fixed 60 Hz tick and a digest per tick, so the engine can prove two machines agree.'},
      {icon: 'record', tone: 'physics', text: 'Record inputs only, network included, and replay the whole session; rollback-ready.'},
      {icon: 'broadcast', text: 'HTTP, websockets and QUIC delivered once per tick; rooms and server hooks through Gamend.'},
    ],
    clip: 'determinism_replay',
    alt: 'A recorded session replayed to the same per-tick digests',
    links: [
      {to: '/multiplayer', label: 'Balaur for multiplayer'},
      {to: '/docs/manual/determinism', label: 'Determinism manual'},
      {to: '/examples#angrynerds', label: 'Open examples/angrynerds'},
    ],
  },
  {
    id: 'art',
    who: 'For artists',
    persona: 'Scene persona, shaders and rendering',
    headline: 'Lights, shadows and shaders you can read.',
    lines: [
      {icon: 'sun', tone: 'render', text: '2D lights and occluders build a light map every sprite, polygon and tile is lit by.'},
      {icon: 'paint-brush', tone: 'render', text: 'Materials in WESL, WGSL with imports and variants, linked at run time rather than at build.'},
      {icon: 'sparkle', tone: 'render', text: 'Post-processing, particles, tile maps, sprites and meshes on wgpu.'},
    ],
    image: 'rendering_lights2d',
    alt: 'Two 2D lights over a scene, the shapes casting shadows from occluders',
    links: [
      {to: '/docs/manual/rendering', label: 'Rendering'},
      {to: '/docs/manual/shaders', label: 'Shaders and materials'},
      {to: '/examples#shaders', label: 'Open examples/shaders'},
    ],
  },
];

function Section({p, index}: {p: Persona; index: number}): ReactNode {
  return (
    <section id={p.id} className={clsx(styles.section, index % 2 === 1 && styles.sectionFlip)}>
      <div className={styles.text}>
        <p className={styles.eyebrow}>
          <span>{p.who}</span>
          <span className={styles.persona}>{p.persona}</span>
        </p>
        <Heading as="h2" className={styles.headline}>
          {p.headline}
        </Heading>
        <ul className={styles.lines}>
          {p.lines.map((l) => (
            <li key={l.text} className={styles.line}>
              <Icon name={l.icon} tone={l.tone} className={styles.lineIcon} />
              <span>{l.text}</span>
            </li>
          ))}
        </ul>
        <p className={styles.links}>
          {p.links.map((l, i) => (
            <Link key={l.to} to={l.to} className={clsx(styles.link, i === 0 && styles.linkPrimary)}>
              {l.label} →
            </Link>
          ))}
        </p>
      </div>
      <div className={styles.media}>
        {p.clip ? (
          <Clip name={p.clip} alt={p.alt} />
        ) : (
          <img src={`/img/manual/${p.image}.webp`} alt={p.alt} width={1600} height={1000} loading="lazy" />
        )}
      </div>
    </section>
  );
}

export default function PersonaSections(): ReactNode {
  return (
    <div className={clsx('container', styles.wrap)}>
      {PERSONAS.map((p, i) => (
        <Section key={p.id} p={p} index={i} />
      ))}
    </div>
  );
}
