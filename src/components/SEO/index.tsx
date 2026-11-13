import { FC } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { siteConfig } from '@/config/site';

export interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  keywords?: string[];
  ogType?: 'website' | 'article' | 'profile';
  ogImage?: string;
  noindex?: boolean;
  jsonLd?: Record<string, unknown> | Array<Record<string, unknown>>;
}

export const SEO: FC<SEOProps> = ({
  title,
  description = siteConfig.description,
  canonical,
  keywords = siteConfig.keywords,
  ogType = 'website',
  ogImage = `${siteConfig.deployedUrl}/og-image.svg`,
  noindex = false,
  jsonLd,
}) => {
  const router = useRouter();
  const cleanPath = router.asPath.split('?')[0];
  const pageUrl = canonical || `${siteConfig.deployedUrl}${cleanPath === '/' ? '' : cleanPath}`;
  const fullTitle = title
    ? `${title} | ${siteConfig.name}`
    : siteConfig.title;

  return (
    <Head>
      {/* Basic Metadata */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      <meta name="author" content={siteConfig.author.name} />
      <meta name="creator" content={siteConfig.author.name} />
      <meta name="publisher" content={siteConfig.name} />
      <meta name="application-name" content={siteConfig.name} />
      <meta name="theme-color" content={siteConfig.themeColor} />
      <meta name="color-scheme" content="dark light" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      {/* Canonical URL */}
      <link rel="canonical" href={pageUrl} />

      {/* Robots Directive for SEO & AI Crawlers */}
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <>
          <meta
            name="robots"
            content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
          />
          <meta
            name="googlebot"
            content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
          />
          <meta
            name="bingbot"
            content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
          />
        </>
      )}

      {/* Open Graph (Facebook, LinkedIn, Discord, Slack) */}
      <meta property="og:site_name" content={siteConfig.name} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:type" content={ogType} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:alt" content={`${siteConfig.name} - ${description}`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={siteConfig.author.twitter} />
      <meta name="twitter:creator" content={siteConfig.author.twitter} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={`${siteConfig.name} Cockpit Preview`} />

      {/* PWA / Mobile Web App */}
      <link rel="manifest" href="/manifest.json" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-title" content={siteConfig.name} />

      {/* LLM & AI Discovery hint */}
      <link rel="alternate" type="text/plain" href="/llms.txt" title="LLM context" />

      {/* Structured Data (JSON-LD) for Search & Answer Engines (AEO) */}
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(Array.isArray(jsonLd) ? jsonLd : [jsonLd]),
          }}
        />
      )}
    </Head>
  );
};

export default SEO;

