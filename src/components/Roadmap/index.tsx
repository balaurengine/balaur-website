import type {ReactNode} from 'react';
import styles from './styles.module.css';

export type RoadmapItem = {
  area: string;
  title: string;
  what: ReactNode;
  next: ReactNode;
};

// One card per thing we want to add: what it is, and the concrete next step.
export default function Roadmap({items}: {items: RoadmapItem[]}): ReactNode {
  return (
    <div className={styles.grid}>
      {items.map((item) => (
        <div className={styles.card} key={item.title}>
          <div className={styles.area}>{item.area}</div>
          <h3 className={styles.title}>{item.title}</h3>
          <p className={styles.what}>{item.what}</p>
          <p className={styles.next}>
            <strong>Next</strong>
            {item.next}
          </p>
        </div>
      ))}
    </div>
  );
}
