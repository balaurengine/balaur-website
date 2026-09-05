import {useEffect, useState, type ReactNode} from 'react';
import Link from '@docusaurus/Link';
import useBrokenLinks from '@docusaurus/useBrokenLinks';
import Heading from '@theme/Heading';
import Icon, {type IconName, type Tone} from '@site/src/components/Icon';
import Player from '@site/src/components/Player';
import styles from './styles.module.css';

// The example projects that ship in the engine repository, one card each:
// its still from the manual, what it shows, the command that opens it, and
// where its source and its manual page are. An example without a still (the
// extensions, which the offscreen editor cannot open yet) shows an icon; one
// with a pack in static/play/ has a Play button that runs it over the page.
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
  play?: boolean;
};

const REPO = 'https://github.com/balaurengine/balaur/tree/main/examples';

// What is running: which example, and whether the click that opened it may
// ask the browser for fullscreen (a link that opens on the game may not).
type Playing = {name: string; maximize: boolean};

export default function ExampleGrid({items}: {items: Example[]}): ReactNode {
  // Each card is an anchor target (/examples#hello, and one per example, linked
  // from the persona sections). The id below is on the <article>, which the
  // broken-link checker does not scan, so the anchors are registered by hand.
  const brokenLinks = useBrokenLinks();
  items.forEach((e) => brokenLinks.collectAnchor(e.name));

  const [playing, setPlaying] = useState<Playing | null>(null);

  // `/examples/?play=angrynerds` opens straight into the game — a link
  // someone can share, and what a reload comes back to.
  useEffect(() => {
    const asked = new URLSearchParams(window.location.search).get('play');
    if (asked !== null && items.some((e) => e.play && e.name === asked)) {
      setPlaying({name: asked, maximize: false});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const play = (name: string) => {
    window.history.replaceState(null, '', `?play=${name}`);
    setPlaying({name, maximize: true});
  };

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
            {e.play && (
              <p className={styles.actions}>
                <button type="button" className="button button--primary button--sm" onClick={() => play(e.name)}>
                  Play in the browser
                </button>
                <span className={styles.actionNote}>Needs WebGPU; a few MB, fetched when you press it.</span>
              </p>
            )}
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
      {playing && <Player name={playing.name} maximize={playing.maximize} onClose={() => setPlaying(null)} />}
    </div>
  );
}
