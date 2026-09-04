import type {ReactNode} from 'react';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {translate} from '@docusaurus/Translate';
import IconHome from '@theme/Icon/Home';
import styles from './styles.module.css';

export type Crumb = {label: string; href?: string};

// The site canonicalises every URL with a trailing slash, but the hrefs the
// theme passes around carry none. <Link> normalises them as it renders;
// structured data has to do it by hand, or every breadcrumb names a redirect
// of the page it points at rather than the page itself.
function useAbsoluteUrl(): (href: string) => string {
  const {siteConfig} = useDocusaurusContext();
  const {url, baseUrl, trailingSlash} = siteConfig;
  return (href) => {
    const [pathname] = href.split(/[#?]/);
    // '/' and the baseUrl itself are already in their canonical form.
    if (trailingSlash === undefined || pathname === '/' || pathname === baseUrl) {
      return `${url}${href}`;
    }
    const canonical = trailingSlash
      ? pathname.replace(/\/?$/, '/')
      : pathname.replace(/\/$/, '');
    return `${url}${href.replace(pathname, canonical)}`;
  };
}

// A BreadcrumbList tells Google to render the trail in place of the raw URL in
// a result. Items without a link are not allowed in one, so they are dropped.
export function BreadcrumbsStructuredData({items}: {items: Crumb[]}): ReactNode {
  const absolute = useAbsoluteUrl();
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items
      .filter((item) => item.href)
      .map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.label,
        item: absolute(item.href!),
      })),
  };
  return (
    <Head>
      <script type="application/ld+json">{JSON.stringify(data)}</script>
    </Head>
  );
}

// The same markup the docs sidebar breadcrumbs render (Infima's `breadcrumbs`
// classes), for the parts of the site that have no sidebar to derive a trail
// from. The last crumb is the current page: shown, never linked.
export default function Breadcrumbs({items}: {items: Crumb[]}): ReactNode {
  const homeHref = useBaseUrl('/');
  return (
    <>
      <BreadcrumbsStructuredData items={items} />
      <nav
        className={styles.breadcrumbsContainer}
        aria-label={translate({
          id: 'theme.docs.breadcrumbs.navAriaLabel',
          message: 'Breadcrumbs',
          description: 'The ARIA label for the breadcrumbs',
        })}>
        <ul className="breadcrumbs">
          <li className="breadcrumbs__item">
            <Link
              aria-label={translate({
                id: 'theme.docs.breadcrumbs.home',
                message: 'Home page',
                description:
                  'The ARIA label for the home page in the breadcrumbs',
              })}
              className="breadcrumbs__link"
              href={homeHref}>
              <IconHome className={styles.homeIcon} />
            </Link>
          </li>
          {items.map((item, idx) => {
            const isLast = idx === items.length - 1;
            return (
              <li
                key={idx}
                className={`breadcrumbs__item${
                  isLast ? ' breadcrumbs__item--active' : ''
                }`}>
                {isLast || !item.href ? (
                  <span className="breadcrumbs__link">{item.label}</span>
                ) : (
                  <Link className="breadcrumbs__link" href={item.href}>
                    <span>{item.label}</span>
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
