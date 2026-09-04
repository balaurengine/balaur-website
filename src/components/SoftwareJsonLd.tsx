import Head from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

// schema.org SoftwareApplication for the engine, on the pages that describe
// it: the homepage and Download. The Organization and WebSite entries are
// site-wide, in docusaurus.config.ts.
export default function SoftwareJsonLd() {
  const {siteConfig} = useDocusaurusContext();
  const data = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Balaur',
    url: `${siteConfig.url}/`,
    description: siteConfig.tagline,
    applicationCategory: 'DeveloperApplication',
    applicationSubCategory: 'Game engine',
    operatingSystem: 'Windows, macOS, Linux',
    downloadUrl: `${siteConfig.url}/download/`,
    image: `${siteConfig.url}/img/social-card.png`,
    license: 'https://opensource.org/license/mit',
    isAccessibleForFree: true,
    offers: {'@type': 'Offer', price: '0', priceCurrency: 'USD'},
    author: {'@type': 'Organization', name: 'balaurengine', url: 'https://github.com/balaurengine'},
    sameAs: ['https://github.com/balaurengine/balaur'],
  };
  return (
    <Head>
      <script type="application/ld+json">{JSON.stringify(data)}</script>
    </Head>
  );
}
