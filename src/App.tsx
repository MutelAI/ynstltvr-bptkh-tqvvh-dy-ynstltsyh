import { useEffect, lazy, Suspense } from 'react';
import { BusinessProvider, useBusiness } from '@/context/BusinessContext';
import { I18nProvider, useI18n } from '@/context/I18nContext';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Footer from '@/components/Footer';
import WhatsappFab from '@/components/WhatsappFab';

// Lazy-load below-fold sections for performance
const Services  = lazy(() => import('@/components/Services'));
const Gallery   = lazy(() => import('@/components/Gallery'));
const Reviews   = lazy(() => import('@/components/Reviews'));
const Contact   = lazy(() => import('@/components/Contact'));
const Location  = lazy(() => import('@/components/Location'));

export default function App() {
  return (
    <BusinessProvider>
      <I18nProvider>
        <AppContent />
      </I18nProvider>
    </BusinessProvider>
  );
}

function AppContent() {
  const { business, loaded } = useBusiness();
  const { lang, dir } = useI18n();

  // Sync lang/dir to <html> element
  useEffect(() => {
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('dir', dir);
  }, [lang, dir]);

  // SEO meta tags
  useEffect(() => {
    if (!business) return;
    document.title = business.name;
    setMeta('name', 'description', `${business.name} – ${business.category_he || business.category_en}`);
    setMeta('property', 'og:title', business.name);
    setMeta('property', 'og:image', business.thumbnail);
  }, [business]);

  // JSON-LD structured data
  useEffect(() => {
    if (!business || !loaded) return;
    const script = document.getElementById('json-ld') ?? document.createElement('script');
    script.id = 'json-ld';
    (script as HTMLScriptElement).type = 'application/ld+json';
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': business.schema_type || 'LocalBusiness',
      name: business.name,
      telephone: business.phone,
      address: { '@type': 'PostalAddress', streetAddress: business.address_en },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: business.rating,
        reviewCount: business.reviews_count,
      },
    });
    document.head.appendChild(script);
  }, [business, loaded]);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Suspense fallback={<div style={{ minHeight: 200 }} />}>
          <Services />
        </Suspense>
        <Suspense fallback={<div style={{ minHeight: 200 }} />}>
          <Gallery />
        </Suspense>
        <Suspense fallback={<div style={{ minHeight: 200 }} />}>
          <Reviews />
        </Suspense>
        <Contact />
        <Suspense fallback={<div style={{ minHeight: 200 }} />}>
          <Location />
        </Suspense>
      </main>
      <Footer />
      <WhatsappFab />
    </>
  );
}

function setMeta(attr: string, value: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${value}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, value);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}
