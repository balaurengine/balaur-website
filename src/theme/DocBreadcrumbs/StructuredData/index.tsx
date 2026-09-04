import type {ReactNode} from 'react';
import type {PropSidebarBreadcrumbsItem} from '@docusaurus/plugin-content-docs';
import {BreadcrumbsStructuredData} from '@site/src/components/Breadcrumbs';

// Replaces the theme's own version, which builds each item URL by joining
// siteConfig.url to the raw sidebar href. The site sets trailingSlash: true,
// so those URLs were all one redirect away from the page they name; ours
// carry the slash. Identical otherwise.
export default function DocBreadcrumbsStructuredData({
  breadcrumbs,
}: {
  breadcrumbs: PropSidebarBreadcrumbsItem[];
}): ReactNode {
  return (
    <BreadcrumbsStructuredData
      items={breadcrumbs.map((item) => ({label: item.label, href: item.href}))}
    />
  );
}
