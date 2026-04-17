import { motion } from 'motion/react';
import { useBusiness } from '@/context/BusinessContext';
import { useI18n } from '@/context/I18nContext';

export default function About() {
  const { business, hours, design, isHidden } = useBusiness();
  const { t, dir, isPrimary } = useI18n();

  const stats = [
    { icon: '⭐', value: business?.rating?.toFixed(1) ?? '–', label: t('about_rating_label') },
    { icon: '😊', value: `${business?.reviews_count ?? 0}+`, label: t('about_reviews_label') },
    { icon: '🏆', value: '10+', label: t('about_years_label') },
    { icon: '📅', value: '24/7', label: t('about_available_label') },
  ];

  const cardClass =
    design.card_style === 'border'
      ? 'bg-white rounded-2xl border-2 border-blue-200 p-6 text-center hover:border-blue-400 hover:-translate-y-1 transition-all duration-200'
      : design.card_style === 'glass'
      ? 'bg-white/60 backdrop-blur-sm rounded-2xl border border-white/30 shadow-lg p-6 text-center hover:-translate-y-1 transition-all duration-200'
      : 'bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-center hover:shadow-md hover:-translate-y-1 transition-all duration-200';

  return (
    <section id="about" dir={dir} className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-black text-gray-900 mb-4">{t('about_title')}</h2>
            <div className="w-16 h-1.5 bg-blue-600 rounded mb-6" />
            <p className="text-gray-600 text-lg leading-relaxed mb-8" data-edit-key="translations.about_desc.he">
              {t('about_desc')}
            </p>

            {/* Hours */}
            {hours.length > 0 && !isHidden('hours') && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                  🕐 {t('hours_title')}
                </h3>
                <div className="space-y-2">
                  {hours.map((h) => (
                    <div key={h.day_key} className="flex justify-between items-center text-sm">
                      <span className="font-medium text-gray-700">
                        {isPrimary ? h.day_he : h.day_en}
                      </span>
                      <span className={h.is_open ? 'text-green-600 font-semibold' : 'text-red-400'}>
                        {isPrimary ? h.hours_he : h.hours_en}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* Stats side */}
          <div className="grid grid-cols-2 gap-5">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className={cardClass}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="text-4xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-black text-blue-700 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
