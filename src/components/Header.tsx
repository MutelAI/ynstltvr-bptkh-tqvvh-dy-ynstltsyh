import { useState, useEffect } from 'react';
import { useBusiness } from '@/context/BusinessContext';
import { useI18n } from '@/context/I18nContext';

const NAV_ITEMS = [
  { key: 'nav_about',    anchor: 'about' },
  { key: 'nav_services', anchor: 'services' },
  { key: 'nav_gallery',  anchor: 'gallery' },
  { key: 'nav_reviews',  anchor: 'reviews' },
  { key: 'nav_contact',  anchor: 'contact' },
];

export default function Header() {
  const { business } = useBusiness();
  const { t, dir, isPrimary, showLangToggle, toggleLang } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const scrollTo = (anchor: string, e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(anchor)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  return (
    <header
      dir={dir}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-2 group" onClick={(e) => scrollTo('hero', e)}>
          {business?.logo_url ? (
            <img src={business.logo_url} alt={business.name} className="h-10 w-auto max-w-[120px] object-contain" />
          ) : (
            <span className="text-2xl">{business?.logo_emoji || '🏢'}</span>
          )}
          <div>
            <div className={`font-bold text-lg leading-tight transition-colors ${scrolled ? 'text-blue-700' : 'text-white'}`}>
              {isPrimary ? business?.name : business?.name_en}
            </div>
            <div className={`text-xs transition-colors ${scrolled ? 'text-gray-500' : 'text-white/65'}`}>
              {isPrimary ? business?.category_he : business?.category_en}
            </div>
          </div>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.key}
              href={`#${item.anchor}`}
              className={`text-sm font-medium transition-colors hover:text-blue-400 ${scrolled ? 'text-gray-700' : 'text-white'}`}
              onClick={(e) => scrollTo(item.anchor, e)}
            >
              {t(item.key)}
            </a>
          ))}
        </nav>

        {/* Right side: lang + phone + hamburger */}
        <div className="flex items-center gap-3">
          <a
            href={`tel:${business?.phone}`}
            className={`hidden md:flex items-center gap-1 text-sm font-semibold px-3 py-1.5 rounded-full transition-all ${
              scrolled ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            📞 {business?.phone_display}
          </a>

          {showLangToggle && (
            <button
              onClick={toggleLang}
              className={`text-sm font-medium px-3 py-1.5 rounded-full border transition-all ${
                scrolled ? 'border-blue-600 text-blue-600 hover:bg-blue-50' : 'border-white/60 text-white hover:bg-white/10'
              }`}
            >
              {t('lang_toggle')}
            </button>
          )}

          <button
            className="md:hidden p-2"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Menu"
          >
            <svg className={`w-6 h-6 ${scrolled ? 'text-gray-800' : 'text-white'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className={`md:hidden px-4 py-4 flex flex-col gap-3 ${scrolled ? 'bg-white' : 'bg-gray-900/95 backdrop-blur-sm'}`}>
          {NAV_ITEMS.map((item) => (
            <a
              key={item.key}
              href={`#${item.anchor}`}
              className={`text-sm font-medium py-2 ${scrolled ? 'text-gray-700' : 'text-white'}`}
              onClick={(e) => scrollTo(item.anchor, e)}
            >
              {t(item.key)}
            </a>
          ))}
          <a
            href={`tel:${business?.phone}`}
            className="mt-2 bg-blue-600 text-white text-sm font-semibold px-4 py-3 rounded-xl text-center"
          >
            📞 {business?.phone_display}
          </a>
        </div>
      )}
    </header>
  );
}
