import {useCallback, useState, type ReactNode, type SyntheticEvent} from 'react';
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
// trail is its one link back up to the blog, and what Google renders in
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

// The two ratios a list cover is cropped to, and the ratio halfway between
// them: 16:9 for the editor's 1920x1080 shots, 16:10 for a game's 1600x1000.
const WIDE = 16 / 9;
const TALL = 16 / 10;
const MIDPOINT = (WIDE + TALL) / 2;

// A post's `image` front matter is its cover: cropped to whichever of 16:9 and
// 16:10 is nearer its own ratio in the list, shown whole on the post's own page.
export default function BlogPostItemWrapper(props: Props): ReactNode {
  const {metadata, isBlogPostPage} = useBlogPost();
  const image = metadata.frontMatter.image;
  // 16:9 until the image reports its size: most covers are editor shots.
  const [wide, setWide] = useState(true);
  const measure = useCallback((img: HTMLImageElement | null) => {
    // A cached image can finish loading before React attaches onLoad.
    if (img?.complete && img.naturalHeight) {
      setWide(img.naturalWidth / img.naturalHeight >= MIDPOINT);
    }
  }, []);
  // The front matter names the PNG, which stays the og:image for link
  // unfurlers; on the page itself the screenshot dirs have a lossless WebP
  // beside every PNG (scripts/optimize-images.mjs), a third of the bytes.
  const src = useBaseUrl((image ?? '').replace(/^(\/img\/(?:manual|editor)\/[^/]+)\.png$/, '$1.webp'));
  return (
    <>
      {isBlogPostPage && <PostBreadcrumbs />}
      {image && (
        <img
          ref={measure}
          className={clsx(
            styles.cover,
            !wide && styles.coverTall,
            isBlogPostPage && styles.coverFull,
          )}
          onLoad={(e: SyntheticEvent<HTMLImageElement>) => {
            const {naturalWidth, naturalHeight} = e.currentTarget;
            setWide(naturalWidth / naturalHeight >= MIDPOINT);
          }}
          src={src}
          // The cover is a screenshot of the thing the post is about, not
          // decoration, so it carries the post's title: that is the text
          // Google Images indexes it under.
          alt={metadata.title}
          width={1600}
          height={1000}
        />
      )}
      <BlogPostItem {...props} />
    </>
  );
}
