import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import useBrokenLinks from '@docusaurus/useBrokenLinks';
import Heading from '@theme/Heading';
import Icon, {type IconName, type Tone} from '@site/src/components/Icon';
import styles from './styles.module.css';

// The example projects that ship in the engine repository, one card each:
// its still from the manual, what it shows, the command that opens it, and
// where its source and its manual page are. An example without a still (the
// extensions, which the offscreen editor cannot open yet) shows an icon.
export type Example = {
  name: string;
  title: string;
  text: ReactNode;
  image?: string;
  alt?: string;
  icon?: IconName;
  tone?: Tone;
  manual: {to: string; label: string};
  run?: 'run' | 'edit';
  also?: string;
};

const REPO = 'https://github.com/balaurengine/balaur/tree/main/examples';

export default function ExampleGrid({items}: {items: Example[]}): ReactNode {
  // Each card is an anchor target (/examples#hello, and one per example, linked
  // from the persona sections). The id below is on the <article>, which the
  // broken-link checker does not scan, so the anchors are registered by hand.
  const brokenLinks = useBrokenLinks();
  items.forEach((e) => brokenLinks.collectAnchor(e.name));

  return (
    <div className={styles.grid}>
      {items.map((e) => (
        <article key={e.name} className={styles.card} id={e.name}>
          {e.image ? (
            <img
              className={styles.still}
              src={`/img/manual/${e.image}.webp`}
              alt={e.alt ?? ''}
              width={1600}
              height={1000}
              loading="lazy"
            />
          ) : (
            <div className={styles.placeholder}>
              <Icon name={e.icon ?? 'plug'} tone={e.tone} className={styles.placeholderIcon} />
            </div>
          )}
          <div className={styles.body}>
            <Heading as="h2" className={styles.title}>
              <code>{e.name}</code> <span className={styles.subtitle}>{e.title}</span>
            </Heading>
            <p className={styles.text}>{e.text}</p>
            <pre className={styles.cmd}>
              <code>{`cargo run -p balaur_cli --features window -- ${e.run ?? 'edit'} examples/${e.name}`}</code>
            </pre>
            <p className={styles.links}>
              <Link to={`${REPO}/${e.name}`}>Source →</Link>
              {e.also && <Link to={`${REPO}/${e.also}`}>{e.also} source →</Link>}
              <Link to={e.manual.to}>{e.manual.label} →</Link>
            </p>
          </div>
        </article>
      ))}
    </div>
  );
}
