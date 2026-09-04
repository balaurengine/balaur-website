import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

// One screenshot of the editor as it is. It is the `editor_overview` shot of
// scripts/showcase.sh in the engine repository, so regenerating the manual's
// images refreshes this one too.
const Shot = {
  title: 'The editor',
  caption:
    'The Scene persona on examples/angrynerds: the node tree, the viewport with its 2D grid and gizmo, the inspector, and the Output dock.',
  src: '/img/manual/editor_overview.webp',
  to: '/docs/manual/editor',
};

export default function HomepageShowcase(): ReactNode {
  return (
    <section className={styles.showcase}>
      <div className="container">
        <Link to={Shot.to} className={styles.shot}>
          <img src={Shot.src} alt={Shot.caption} width={1600} height={1000} loading="lazy" />
          <Heading as="h2" className={styles.shotTitle}>
            {Shot.title}
          </Heading>
          <p className={styles.shotCaption}>{Shot.caption}</p>
        </Link>
      </div>
    </section>
  );
}
