import { useMemo } from 'react';
import { motion } from 'motion/react';
import { useBusiness } from '@/context/BusinessContext';
import { useI18n } from '@/context/I18nContext';

export default function Location() {
  const { business, isHidden } = useBusiness();
  const { t, dir, isPrimary } = useI18n();

  const mapUrl = useMemo(() => {
    if (!business?.geo) return null;
    const q = encodeURIComponent(`${business.geo.latitude},${business.geo.longitude}`);
    return `https://maps.google.com/maps?q=${q}&z=15&output=embed`;
  }, [business?.geo]);

  if (isHidden('location')) return null;

  return (
    <section id="location" dir={dir} className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-3">{t('location_title')}</h2>
          <p className="text-gray-500 text-lg">{t('location_subtitle')}</p>
        </motion.div>

        {business && (
          <motion.div
            className="grid md:grid-cols-2 gap-8 items-stretch"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
          >
            {/* Map */}
            <div className="rounded-2xl overflow-hidden shadow-lg min-h-[320px]">
              {mapUrl && (
                <iframe
                  src={mapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: 320 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="map"
                />
              )}
            </div>

            {/* Info */}
            <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col justify-center gap-6">
              <div className="flex items-start gap-4">
                <span className="text-3xl">📍</span>
                <div>
                  <h3 className="font-bold text-gray-800 text-lg mb-1">{t('location_address')}</h3>
                  <p className="text-gray-600">{isPrimary ? business.address_he : business.address_en}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="text-3xl">📞</span>
                <div>
                  <h3 className="font-bold text-gray-800 text-lg mb-1">{t('location_phone')}</h3>
                  <a href={`tel:${business.phone}`} className="text-blue-600 hover:underline">
                    {business.phone_display}
                  </a>
                </div>
              </div>

              <a
                href={business.maps_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-colors mt-2"
              >
                🗺️ {t('location_navigate')}
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
