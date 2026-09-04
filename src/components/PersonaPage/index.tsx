import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import Icon, {type IconName, type Tone} from '@site/src/components/Icon';
import styles from './styles.module.css';

// The pieces of a persona landing page — a page written for one kind of
// person, in that person's words. Every persona page has the same anatomy:
// hero, four things you get, how it works beside a real snippet, three
// editor tools, an honest table against the rival that audience knows, and
// one primary action repeated. The copy lives in the page; these lay it out.

export function PersonaHero({
  who,
  persona,
  title,
  image,
  alt,
  primary,
  secondary,
  children,
}: {
  who: string;
  persona: string;
  title: string;
  image: string;
  alt: string;
  primary: {to: string; label: string};
  secondary: {to: string; label: string};
  children: ReactNode;
}): ReactNode {
  return (
    <header className={styles.hero}>
      <div className={styles.heroText}>
        <p className={styles.eyebrow}>
          <span>{who}</span>
          <span className={styles.persona}>{persona}</span>
        </p>
        <Heading as="h1" className={styles.h1}>
          {title}
        </Heading>
        <div className={styles.sub}>{children}</div>
        <div className={styles.buttons}>
          <Link className="button button--primary button--lg" to={primary.to}>
            {primary.label}
          </Link>
          <Link className="button button--outline button--lg" to={secondary.to}>
            {secondary.label}
          </Link>
        </div>
      </div>
      <img className={styles.heroImage} src={`/img/manual/${image}.webp`} alt={alt} width={1600} height={1000} />
    </header>
  );
}

export function Section({title, sub, children}: {title: string; sub?: string; children: ReactNode}): ReactNode {
  return (
    <section className={styles.section}>
      <Heading as="h2" className={styles.h2}>
        {title}
      </Heading>
      {sub && <p className={styles.sectionSub}>{sub}</p>}
      {children}
    </section>
  );
}

export function Features({items}: {items: {icon: IconName; tone?: Tone; title: string; text: ReactNode}[]}): ReactNode {
  return (
    <div className={styles.features}>
      {items.map((f) => (
        <div key={f.title} className={styles.feature}>
          <Icon name={f.icon} tone={f.tone} className={styles.featureIcon} />
          <div>
            <Heading as="h3" className={styles.h3}>
              {f.title}
            </Heading>
            <p className={styles.featureText}>{f.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// Prose on the left, a real file from the manual on the right.
export function HowItWorks({code, file, children}: {code: string; file: string; children: ReactNode}): ReactNode {
  return (
    <div className={styles.how}>
      <div className={styles.howText}>{children}</div>
      <div className={styles.code}>
        <div className={styles.codeFile}>{file}</div>
        <pre className={styles.codePre}>
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}

export function EditorCards({items}: {items: {icon: IconName; tone?: Tone; title: string; text: string}[]}): ReactNode {
  return (
    <div className={styles.cards}>
      {items.map((c) => (
        <div key={c.title} className={styles.card}>
          <Icon name={c.icon} tone={c.tone} className={styles.cardIcon} />
          <Heading as="h3" className={styles.h3}>
            {c.title}
          </Heading>
          <p className={styles.cardText}>{c.text}</p>
        </div>
      ))}
    </div>
  );
}

// Rows of [what, the rival, Balaur]. Written to be fair; the rival's cell
// comes from its own site.
export function Compare({rival, rows}: {rival: string; rows: [string, string, string][]}): ReactNode {
  return (
    <div className={styles.compare}>
      <div className={styles.compareHead}>
        <span></span>
        <span>{rival}</span>
        <span className={styles.compareUs}>Balaur</span>
      </div>
      {rows.map((r) => (
        <div key={r[0]} className={styles.compareRow}>
          <span className={styles.compareWhat}>{r[0]}</span>
          <span className={styles.compareThem}>{r[1]}</span>
          <span>{r[2]}</span>
        </div>
      ))}
    </div>
  );
}

export function StartBand({
  title,
  text,
  primary,
  secondary,
}: {
  title: string;
  text: string;
  primary: {to: string; label: string};
  secondary: {to: string; label: string};
}): ReactNode {
  return (
    <section className={styles.start}>
      <Heading as="h2" className={styles.h2}>
        {title}
      </Heading>
      <p className={styles.startText}>{text}</p>
      <div className={styles.buttons} style={{justifyContent: 'center'}}>
        <Link className="button button--primary button--lg" to={primary.to}>
          {primary.label}
        </Link>
        <Link className="button button--outline button--lg" to={secondary.to}>
          {secondary.label}
        </Link>
      </div>
    </section>
  );
}
