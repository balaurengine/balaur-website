import type {ReactNode} from 'react';
import BlogPostItems from '@theme-original/BlogPostItems';
import type BlogPostItemsType from '@theme/BlogPostItems';
import type {WrapperProps} from '@docusaurus/types';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {useLocation} from '@docusaurus/router';

type Props = WrapperProps<typeof BlogPostItemsType>;

// The list page is the only page on the site without a heading of its own:
// the theme renders the posts and nothing above them. One h1 with the blog's
// title, on the first page only, so the page says what it is. The route and
// title come from customFields: useBlogMetadata() is absent on page 2 on.
export default function BlogPostItemsWrapper(props: Props): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  const {path, title} = siteConfig.customFields?.blog as {path: string; title: string};
  const {pathname} = useLocation();
  const trim = (s: string) => s.replace(/\/+$/, '');
  const isIndex = trim(pathname) === trim(path);
  return (
    <>
      {isIndex && (
        <header className="margin-bottom--lg">
          <h1>{title}</h1>
        </header>
      )}
      <BlogPostItems {...props} />
    </>
  );
}
