import type {ReactNode} from 'react';
import Heading from '@theme/Heading';
import data from '@site/src/data/sponsors.json';

import styles from './styles.module.css';

// The people and studios sponsoring the engine, from GitHub, read at build
// time by scripts/gen-sponsors.mjs. Only public sponsorships are in the file.
//
// Nothing renders while the list is empty, heading included: a Sponsors
// section with nobody under it reads worse than no section at all.
// The shape scripts/gen-sponsors.mjs writes. It is spelled out because an
// empty list in the JSON gives TypeScript nothing to infer from.
type Sponsor = {
  login: string;
  name: string;
  url: string;
  avatar: string;
  dollars: number;
  oneTime: boolean;
  since: string;
};

export default function Sponsors(): ReactNode {
  const {sponsors} = data as {sponsors: Sponsor[]};
  if (!sponsors.length) return null;
  return (
    <>
      <Heading as="h2">Sponsors</Heading>
      <ul className={styles.list}>
        {sponsors.map((sponsor) => (
          <li key={sponsor.login}>
            <a href={sponsor.url}>{sponsor.name}</a>
          </li>
        ))}
      </ul>
    </>
  );
}
