import type {ReactNode} from 'react';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

export type RoadmapItem = {
  title: string;
  text: ReactNode;
};

// One card per thing that does not exist yet: a title and one sentence. The
// page groups cards under markdown h2 sections, so cards are h3.
export default function Roadmap({items}: {items: RoadmapItem[]}): ReactNode {
  return (
    <div className={styles.grid}>
      {items.map((item) => (
        <div className={styles.card} key={item.title}>
          <Heading as="h3" className={styles.title}>
            {item.title}
          </Heading>
          <p className={styles.text}>{item.text}</p>
        </div>
      ))}
    </div>
  );
}
