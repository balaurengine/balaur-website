import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

// Two screenshots with a title each: what the engine looks like, no prose.
const Shots = [
  {
    title: 'The editor',
    caption: 'A scene, its tree, and the inspector — the editor is a Balaur project.',
    src: '/img/editor/persona_scene.png',
    to: '/docs/manual/editor',
  },
  {
    title: 'Skeletal animation',
    caption: 'A skinned leg on a clip, an arm on two-bone IK, keyed in the timeline.',
    src: '/img/editor/persona_animate.png',
    to: '/docs/manual/animation#skeletons-and-skins',
  },
];

export default function HomepageShowcase(): ReactNode {
  return (
    <section className={styles.showcase}>
      <div className="container">
        <div className="row">
          {Shots.map((shot) => (
            <div className="col col--6" key={shot.title}>
              <Link to={shot.to} className={styles.shot}>
                <img src={shot.src} alt={shot.caption} loading="lazy" />
                <Heading as="h3" className={styles.shotTitle}>
                  {shot.title}
                </Heading>
                <p className={styles.shotCaption}>{shot.caption}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
