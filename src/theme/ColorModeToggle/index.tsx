import type {ReactNode} from 'react';
import clsx from 'clsx';
import {useColorMode} from '@docusaurus/theme-common';
import type {Props} from '@theme/ColorModeToggle';
import styles from './styles.module.css';

// A two-state light/dark switch. The site still *defaults* to the OS
// preference on a first visit, but the button never cycles through a third
// "system" state: a click is an explicit choice, and it persists. Both icons
// are rendered and CSS picks one by [data-theme], so server and client HTML
// match.
export default function ColorModeToggle({className, buttonClassName}: Props): ReactNode {
  const {colorMode, setColorMode} = useColorMode();
  return (
    <div className={className}>
      <button
        className={clsx('clean-btn', styles.toggle, buttonClassName)}
        type="button"
        onClick={() => setColorMode(colorMode === 'dark' ? 'light' : 'dark')}
        title="Switch between light and dark mode"
        aria-label="Switch between light and dark mode">
        <svg
          className={styles.moon}
          viewBox="0 0 24 24"
          width="20"
          height="20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true">
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
        </svg>
        <svg
          className={styles.sun}
          viewBox="0 0 24 24"
          width="20"
          height="20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
      </button>
    </div>
  );
}
