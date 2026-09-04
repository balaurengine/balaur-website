import type {ReactNode} from 'react';
import clsx from 'clsx';
import BlogPostItem from '@theme-original/BlogPostItem';
import type BlogPostItemType from '@theme/BlogPostItem';
import type {WrapperProps} from '@docusaurus/types';
import {useBlogPost, useBlogMetadata} from '@docusaurus/plugin-content-blog/client';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Breadcrumbs from '@site/src/components/Breadcrumbs';
import styles from './styles.module.css';

type Props = WrapperProps<typeof BlogPostItemType>;

// A post is the only page on the site two levels deep without a sidebar: the
// trail is its one link back up to the devlog, and what Google renders in
// place of the URL in a result. Its own component because useBlogMetadata()
// only resolves on a post's route — the list page renders BlogPostItem too.
function PostBreadcrumbs(): ReactNode {
  const {metadata} = useBlogPost();
  const {blogBasePath, blogTitle} = useBlogMetadata();
  return (
    <Breadcrumbs
      items={[
        {label: blogTitle, href: blogBasePath},
        {label: metadata.title, href: metadata.permalink},
      ]}
    />
  );
}

// A post's `image` front matter is its cover: cropped to a banner in the list,
// shown whole on the post's own page.
export default function BlogPostItemWrapper(props: Props): ReactNode {
  const {metadata, isBlogPostPage} = useBlogPost();
  const image = metadata.frontMatter.image;
  // The front matter names the PNG, which stays the og:image for link
  // unfurlers; on the page itself the screenshot dirs have a lossless WebP
  // beside every PNG (scripts/optimize-images.mjs), a third of the bytes.
  const src = useBaseUrl((image ?? '').replace(/^(\/img\/(?:manual|editor)\/[^/]+)\.png$/, '$1.webp'));
  return (
    <>
      {isBlogPostPage && <PostBreadcrumbs />}
      {image && (
        <img
          className={clsx(styles.cover, isBlogPostPage && styles.coverFull)}
          src={src}
          alt=""
        />
      )}
      <BlogPostItem {...props} />
    </>
  );
}
