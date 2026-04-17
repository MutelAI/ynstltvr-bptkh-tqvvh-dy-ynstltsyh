import { motion } from 'motion/react';
import { useBusiness } from '@/context/BusinessContext';
import { useI18n } from '@/context/I18nContext';

export default function Services() {
  const { services, isHidden } = useBusiness();
  const { t, dir, isPrimary } = useI18n();

  if (isHidden('services') || services.length === 0) return null;

  return (
    <section id="services" dir={dir} className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-black text-gray-900 mb-3">{t('services_title')}</h2>
          <div className="w-16 h-1.5 bg-blue-600 rounded mx-auto mb-4" />
          <p className="text-gray-500 text-lg">{t('services_subtitle')}</p>
        </motion.div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
            >
              <div className="text-4xl mb-3">{service.icon}</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {isPrimary ? service.title_he : service.title_en}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {isPrimary ? service.desc_he : service.desc_en}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
