import {useEffect, useRef, useState} from 'react';
import type {KeyboardEvent, ReactNode} from 'react';
import Heading from '@theme/Heading';
import useBrokenLinks from '@docusaurus/useBrokenLinks';
import styles from './styles.module.css';

export type RoadmapItem = {
  /** The engine group the item sits in, shown above the card's title. */
  group: string;
  title: string;
  text: ReactNode;
  /** The engine's plan document for this item; kept as data, not rendered. */
  plan?: string;
  /** Built. The only thing that says so; a milestone is built when all of its
      items are. */
  done?: boolean;
  /** A screenshot of the thing. Only a built item has one. */
  image?: string;
  alt?: string;
  /** The posts that announced it, in the order they were written. */
  posts?: {slug: string; title: string}[];
};

export type RoadmapMilestone = {
  /** `0.2`, or `Later` for the ones with no version against them. */
  id: string;
  /** Derived from the items, never written down: built when every one of them
      is done, building for the first that is not. */
  state: 'built' | 'building' | 'planned';
  /** The month the milestone is aimed at, `December 2026`. Per milestone, so
      every card in the tab carries the same date. */
  estimate?: string;
  title: string;
  items: RoadmapItem[];
};

/** Said once beside the milestone's heading. A built milestone says nothing
    here: every card in it carries its own done chip. */
const STATE_LABEL: Record<string, string> = {
  building: 'Being built now',
};

const slug = (id: string) => `milestone-${id.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;

// The milestone being built keeps the full rule down the card's side; later
// ones lighten with distance, and a built one is quieter than any of them.
const weight = (milestone: RoadmapMilestone, index: number) =>
  milestone.state === 'built' ? styles.done : index <= 1 ? styles.near : index < 4 ? styles.mid : styles.far;

// One tab per milestone, one card per thing that milestone does not do yet.
// The tab is in the URL hash, so a link can open the page on 0.4.
//
// Every panel is rendered and the ones not selected carry `hidden`: the build
// prerenders one HTML file for this page, and the search index is built from
// it, so a panel left unrendered is a milestone nobody can search for.
export default function Roadmap({milestones}: {milestones: RoadmapMilestone[]}): ReactNode {
  const [active, setActive] = useState(milestones[0].id);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const strip = useRef<HTMLDivElement | null>(null);

  // The tab ids below are the page's anchors. Only a heading registers itself,
  // so a link to `#0.1` reads as broken at build unless they are collected.
  const brokenLinks = useBrokenLinks();
  milestones.forEach((milestone) => brokenLinks.collectAnchor(milestone.id));

  // The hash is read once the page is in a browser: the build prerenders the
  // first milestone, and a deep link corrects it before paint. On a narrow
  // screen the strip scrolls, so bring the milestone landed on into view —
  // its own scrollLeft, never the page's.
  useEffect(() => {
    const wanted = decodeURIComponent(window.location.hash.replace(/^#/, ''));
    const index = milestones.findIndex((m) => m.id === wanted);
    if (index < 0) return;
    setActive(wanted);
    const tab = tabs.current[index];
    if (tab && strip.current) strip.current.scrollLeft = tab.offsetLeft - 16;
  }, [milestones]);

  const select = (id: string) => {
    setActive(id);
    window.history.replaceState(null, '', `#${encodeURIComponent(id)}`);
  };

  // Left and right move between tabs, as a tablist is expected to.
  const onKeyDown = (event: KeyboardEvent, index: number) => {
    const step = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0;
    if (!step) return;
    event.preventDefault();
    const next = (index + step + milestones.length) % milestones.length;
    select(milestones[next].id);
    tabs.current[next]?.focus();
  };

  const shown = milestones.find((m) => m.id === active) ?? milestones[0];

  return (
    <div className={styles.roadmap}>
      <div className={styles.tabs} role="tablist" aria-label="Milestones" ref={strip}>
        {milestones.map((milestone, i) => (
          <button
            key={milestone.id}
            ref={(el) => {
              tabs.current[i] = el;
            }}
            type="button"
            role="tab"
            // The milestone's own id, so `/docs/roadmap#0.4` is an anchor that
            // exists rather than only a hash the effect above reads.
            id={milestone.id}
            aria-controls={slug(milestone.id)}
            aria-selected={milestone.id === shown.id}
            tabIndex={milestone.id === shown.id ? 0 : -1}
            className={`${styles.tab} ${milestone.id === shown.id ? styles.tabActive : ''}`}
            onClick={() => select(milestone.id)}
            onKeyDown={(event) => onKeyDown(event, i)}>
            {milestone.id}
            <span className={styles.count}>{milestone.items.length}</span>
          </button>
        ))}
      </div>

      {milestones.map((milestone, i) => (
      <div
        className={styles.panel}
        role="tabpanel"
        key={milestone.id}
        id={slug(milestone.id)}
        aria-labelledby={milestone.id}
        hidden={milestone.id !== shown.id}>
        <Heading as="h2" className={styles.milestone}>
          {milestone.title}
        </Heading>
        <p className={styles.badges}>
          {STATE_LABEL[milestone.state] && (
            <span className={`${styles.state} ${styles[milestone.state]}`}>{STATE_LABEL[milestone.state]}</span>
          )}
          {milestone.estimate && (
            <span className={`${styles.state} ${styles.estimate}`}>{milestone.estimate}</span>
          )}
        </p>
        <div className={styles.grid}>
          {milestone.items.map((item) => (
            <div className={`${styles.card} ${weight(milestone, i)}`} key={item.title}>
              {item.image && (
                <img
                  className={styles.shot}
                  src={item.image}
                  alt={item.alt}
                  width={1600}
                  height={1000}
                  loading="lazy"
                />
              )}
              <p className={styles.group}>
                {item.group}
                {item.done && <span className={styles.shipped}>Done</span>}
              </p>
              <Heading as="h3" className={styles.title}>
                {item.title}
              </Heading>
              <p className={styles.text}>{item.text}</p>
              {item.posts && (
                <p className={styles.posts}>
                  {item.posts.map((post) => (
                    <a key={post.slug} href={`/blog/${post.slug}`}>
                      {post.title}
                    </a>
                  ))}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
      ))}
    </div>
  );
}
