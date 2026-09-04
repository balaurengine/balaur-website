import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import Clip from '@site/src/components/Clip';
import Icon, {type IconName, type Tone} from '@site/src/components/Icon';
import styles from './styles.module.css';

// One group of the features catalogue: its lines on one side, what it looks
// like on the other, sides alternating down the page. `clip` names a manual
// clip and `image` a manual screenshot, both without extension; `media` is
// anything else, a diagram say.
export default function FeatureGroup({
  title,
  to,
  toLabel,
  clip,
  image,
  alt,
  media,
  side = 'left',
  children,
}: {
  title: string;
  to?: string;
  toLabel?: string;
  clip?: string;
  image?: string;
  alt?: string;
  media?: ReactNode;
  side?: 'left' | 'right';
  children: ReactNode;
}): ReactNode {
  const shown =
    media ??
    (clip ? (
      <Clip name={clip} alt={alt} />
    ) : image ? (
      <img src={`/img/manual/${image}.webp`} alt={alt ?? ''} width={1600} height={1000} loading="lazy" />
    ) : null);
  return (
    <section className={clsx(styles.group, side === 'right' && styles.groupRight)}>
      <div className={styles.text}>
        <Heading as="h2" className={styles.title}>
          {title}
        </Heading>
        <ul className={styles.lines}>{children}</ul>
        {to && (
          <Link to={to} className={styles.more}>
            See it in the editor: {toLabel ?? title} →
          </Link>
        )}
      </div>
      {shown && <div className={styles.media}>{shown}</div>}
    </section>
  );
}

// One line of a group. The icon is the same glyph the reference and the
// editor use for the thing; `to` links the line's own manual section.
export function Feature({
  icon,
  tone,
  to,
  children,
}: {
  icon: IconName;
  tone?: Tone;
  to?: string;
  children: ReactNode;
}): ReactNode {
  return (
    <li className={styles.line}>
      <Icon name={icon} tone={tone} className={styles.lineIcon} />
      <span>
        {children}
        {to && (
          <>
            {'\u00a0'}
            <Link to={to} className={styles.lineLink} aria-label="Read more">
              →
            </Link>
          </>
        )}
      </span>
    </li>
  );
}
