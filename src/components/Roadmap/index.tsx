import type {ReactNode} from 'react';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

export type RoadmapTier = 1 | 2 | 3;

/** Short on the card; the page's legend above the groups spells each one out. */
const TIER_LABEL: Record<RoadmapTier, string> = {
  1: 'Tier 1',
  2: 'Tier 2',
  3: 'Tier 3',
};

export type RoadmapItem = {
  title: string;
  text: ReactNode;
  tier: RoadmapTier;
  /** The engine's plan document for this item; kept as data, not rendered. */
  plan?: string;
};

// One card per thing that does not exist yet: a title and one sentence. The
// page groups cards under markdown h2 sections, so cards are h3. Cards sort by
// tier, keeping the order the page wrote them in within a tier.
export default function Roadmap({items}: {items: RoadmapItem[]}): ReactNode {
  const sorted = [...items].sort((a, b) => a.tier - b.tier);
  return (
    <div className={styles.grid}>
      {sorted.map((item) => (
        <div className={`${styles.card} ${styles[`tier${item.tier}`]}`} key={item.title}>
          <p className={styles.tier}>{TIER_LABEL[item.tier]}</p>
          <Heading as="h3" className={styles.title}>
            {item.title}
          </Heading>
          <p className={styles.text}>{item.text}</p>
        </div>
      ))}
    </div>
  );
}
