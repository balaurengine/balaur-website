import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import type {Props} from '@theme/NotFound/Content';

// The 404, in place of the theme's. Short: what happened, where the things
// people were probably after live, and where to report the link that broke.
export default function NotFoundContent({className}: Props): ReactNode {
  return (
    <main className={clsx('container margin-vert--xl', className)}>
      <div className="row">
        <div className="col col--6 col--offset-3">
          <Heading as="h1" className="hero__title">
            404
          </Heading>
          <p>Nothing at this address.</p>
          <ul>
            <li>
              <Link to="/docs/intro">Docs</Link> — the manual
            </li>
            <li>
              <Link to="/docs/reference">Reference</Link> — every component, asset type and script module
            </li>
            <li>
              <Link to="/examples">Examples</Link> — the projects that ship with the engine
            </li>
            <li>
              <Link to="/blog">Devlog</Link> — what shipped, and when
            </li>
            <li>
              <Link to="/">Home</Link>
            </li>
          </ul>
          <p>
            Or search: <kbd>Ctrl</kbd> <kbd>K</kbd>.
          </p>
          <p>
            A link on this site brought you here?{' '}
            <Link href="https://github.com/balaurengine/balaur-website/issues">Open an issue</Link>.
          </p>
        </div>
      </div>
    </main>
  );
}
