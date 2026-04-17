import { useBusiness } from '@/context/BusinessContext';
import { useI18n } from '@/context/I18nContext';

export function buildWhatsappUrl(phone: string | undefined, message: string): string {
  const num = (phone ?? '').replace(/\D/g, '');
  return `https://wa.me/${num}?text=${encodeURIComponent(message)}`;
}

export default function Hero() {
  const { business } = useBusiness();
  const { t, dir, isPrimary } = useI18n();

  const waUrl = buildWhatsappUrl(
    business?.whatsapp || business?.phone,
    `${t('contact_wa_intro')} - ${t('contact_wa_default_msg')}`,
  );

  return (
    <section
      id="hero"
      dir={dir}
      className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-700 to-sky-500 flex items-center justify-center min-h-screen"
    >
      {/* Background circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-sky-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto py-32">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/30 rounded-full px-4 py-2 text-sm font-medium text-white mb-6">
          <span>{business?.logo_emoji || '🏢'}</span>
          <span>{t('hero_badge')}</span>
        </div>

        {/* Title */}
        <h1 className="text-5xl md:text-7xl font-black text-white mb-4 tracking-tight leading-tight">
          {isPrimary ? business?.name : business?.name_en}
        </h1>

        {/* Subtitle */}
        <p className="text-xl text-white/80 mb-6 font-light">{t('hero_subtitle')}</p>

        {/* Rating */}
        {business && (
          <div className="flex items-center justify-center gap-3 mb-8">
            <span className="text-yellow-300 text-lg">⭐ {business.rating}</span>
            <span className="text-white/65 text-sm">
              ({business.reviews_count}+ {t('reviews_happy')})
            </span>
          </div>
        )}

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={`tel:${business?.phone}`}
            className="w-full sm:w-auto bg-white text-gray-800 font-bold text-lg px-8 py-4 rounded-2xl shadow-2xl hover:shadow-blue-300/50 hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
          >
            📞 {t('hero_cta_call')}
          </a>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto bg-green-500 text-white font-bold text-lg px-8 py-4 rounded-2xl shadow-2xl hover:shadow-green-400/50 hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
          >
            💬 {t('hero_cta_whatsapp')}
          </a>
        </div>

        <p className="mt-6 text-white/65 text-sm">✅ {t('hero_available')}</p>
      </div>
    </section>
  );
}
