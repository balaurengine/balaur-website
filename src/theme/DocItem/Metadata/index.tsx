import type {ReactNode} from 'react';
import Metadata from '@theme-original/DocItem/Metadata';
import type MetadataType from '@theme/DocItem/Metadata';
import type {WrapperProps} from '@docusaurus/types';
import Head from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import {useAbsoluteUrl} from '@site/src/components/Breadcrumbs';

type Props = WrapperProps<typeof MetadataType>;

// A manual page as a TechArticle, the way a post is already a BlogPosting:
// the headline, snippet, canonical URL and picture a result can be built
// from, with the site as author and publisher. No date, since the docs
// plugin does not track one here and a wrong one is worse than none.
export default function MetadataWrapper(props: Props): ReactNode {
  const {metadata, frontMatter} = useDoc();
  const {siteConfig} = useDocusaurusContext();
  const absolute = useAbsoluteUrl();
  const image = typeof frontMatter.image === 'string' ? frontMatter.image : '/img/social/home.png';
  const url = absolute(metadata.permalink);
  const site = {'@type': 'Organization', name: siteConfig.title, url: `${siteConfig.url}/`};
  const data = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: metadata.title,
    description: metadata.description,
    url,
    mainEntityOfPage: url,
    image: absolute(image),
    inLanguage: 'en',
    author: site,
    publisher: site,
  };
  return (
    <>
      <Metadata {...props} />
      <Head>
        <script type="application/ld+json">{JSON.stringify(data)}</script>
      </Head>
    </>
  );
}
