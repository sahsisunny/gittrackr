import { FC, ReactNode } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEO, { SEOProps } from '@/components/SEO';

export interface LayoutProps extends SEOProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({
  title,
  description,
  canonical,
  keywords,
  ogType,
  ogImage,
  noindex,
  jsonLd,
  children,
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <SEO
        title={title}
        description={description}
        canonical={canonical}
        keywords={keywords}
        ogType={ogType}
        ogImage={ogImage}
        noindex={noindex}
        jsonLd={jsonLd}
      />
      <Navbar />
      <div style={{ flex: 1 }}>{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
