import type {ReactNode} from 'react';
import Head from '@docusaurus/Head';
import SearchPage from '@theme-original/SearchPage';
import type SearchPageType from '@theme/SearchPage';
import type {WrapperProps} from '@docusaurus/types';

type Props = WrapperProps<typeof SearchPageType>;

// The search page is a form with no content of its own, and every result it
// can show is a page that is already in the sitemap, so it should stay out of
// the index. The theme does emit a robots tag for it, but as
// `<meta property="robots">`; crawlers only read `name`, so that tag does
// nothing and the page is indexable. This adds the one they read.
// Upstream: the same line is in @easyops-cn/docusaurus-search-local and in
// Docusaurus's own Algolia SearchPage.
export default function SearchPageWrapper(props: Props): ReactNode {
  return (
    <>
      <Head>
        <meta name="robots" content="noindex, follow" />
      </Head>
      <SearchPage {...props} />
    </>
  );
}
