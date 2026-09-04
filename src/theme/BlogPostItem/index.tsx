import type {ReactNode} from 'react';
import clsx from 'clsx';
import BlogPostItem from '@theme-original/BlogPostItem';
import type BlogPostItemType from '@theme/BlogPostItem';
import type {WrapperProps} from '@docusaurus/types';
import {useBlogPost} from '@docusaurus/plugin-content-blog/client';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

type Props = WrapperProps<typeof BlogPostItemType>;

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
