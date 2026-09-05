import type {ReactNode} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Copyright from '@theme-original/Footer/Copyright';
import type CopyrightType from '@theme/Footer/Copyright';
import type {WrapperProps} from '@docusaurus/types';

// Phosphor Fill, the same family the reference icons come from (see
// src/components/Icon.tsx); inlined by SVGR so each takes the footer's text
// colour.
import DiscordLogo from '@phosphor-icons/core/assets/fill/discord-logo-fill.svg';
import GithubLogo from '@phosphor-icons/core/assets/fill/github-logo-fill.svg';
import Rss from '@phosphor-icons/core/assets/fill/rss-fill.svg';
import styles from './styles.module.css';

type Props = WrapperProps<typeof CopyrightType>;

// A row of social icons above the copyright line: the places the project
// lives outside this site. The URLs come from docusaurus.config.ts so the
// footer columns, the structured data and this row never disagree.
export default function CopyrightWrapper(props: Props): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  const {discordUrl, repoUrl} = siteConfig.customFields as {
    discordUrl: string;
    repoUrl: string;
  };
  const rssUrl = useBaseUrl('/blog/rss.xml');

  const social = [
    {label: 'Discord', href: discordUrl, Icon: DiscordLogo, external: true},
    {label: 'GitHub', href: repoUrl, Icon: GithubLogo, external: true},
    {label: 'Devlog RSS feed', href: rssUrl, Icon: Rss, external: false},
  ];

  return (
    <>
      <ul className={styles.social} aria-label="Balaur elsewhere">
        {social.map(({label, href, Icon, external}) => (
          <li key={href}>
            <a
              className={styles.link}
              href={href}
              title={label}
              aria-label={label}
              {...(external ? {target: '_blank', rel: 'noopener noreferrer'} : {})}>
              <Icon />
            </a>
          </li>
        ))}
      </ul>
      <Copyright {...props} />
    </>
  );
}
