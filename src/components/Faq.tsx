import type {ReactNode} from 'react';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';

// The questions and their answers, rendered once as the page and once as
// schema.org FAQPage data, from the same list so the two cannot drift. The
// answer text is plain so it can go into the JSON-LD as-is; a link, when
// there is one, is shown after it.
export type FaqItem = {q: string; a: string; more?: {to: string; label: string}};

export default function Faq({items}: {items: FaqItem[]}): ReactNode {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((i) => ({
      '@type': 'Question',
      name: i.q,
      acceptedAnswer: {'@type': 'Answer', text: i.a},
    })),
  };
  return (
    <>
      <Head>
        <script type="application/ld+json">{JSON.stringify(data)}</script>
      </Head>
      {items.map((i) => (
        <section key={i.q}>
          <Heading as="h2" id={i.q.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}>
            {i.q}
          </Heading>
          <p>
            {i.a}
            {i.more && (
              <>
                {' '}
                <Link to={i.more.to}>{i.more.label} →</Link>
              </>
            )}
          </p>
        </section>
      ))}
    </>
  );
}
