import { useState } from 'react';
import { motion } from 'motion/react';
import { useBusiness } from '@/context/BusinessContext';
import { useI18n } from '@/context/I18nContext';

function Stars({ rating }: { rating: number }) {
  return (
    <span className="text-yellow-400 text-sm">
      {Array.from({ length: 5 }, (_, i) => (i < rating ? '★' : '☆')).join('')}
    </span>
  );
}

export default function Reviews() {
  const { reviews, business, isHidden } = useBusiness();
  const { t, dir, isPrimary } = useI18n();
  const [visibleCount, setVisibleCount] = useState(6);

  if (isHidden('reviews') || reviews.length === 0) return null;

  const visible = reviews.slice(0, visibleCount);
  const hasMore = reviews.length > visibleCount;

  return (
    <section id="reviews" dir={dir} className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-black text-gray-900 mb-3">{t('reviews_title')}</h2>
          <div className="w-16 h-1.5 bg-blue-600 rounded mx-auto mb-4" />
          <p className="text-gray-500 text-lg">{t('reviews_subtitle')}</p>

          {business && (
            <div className="inline-flex items-center gap-4 mt-6 bg-yellow-50 border border-yellow-200 rounded-2xl px-8 py-4">
              <div className="text-5xl font-black text-yellow-500">{business.rating}</div>
              <div>
                <Stars rating={Math.round(business.rating)} />
                <div className="text-sm text-gray-500 mt-1">
                  {t('reviews_based_on')} {business.reviews_count} {t('reviews_reviews')}
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {visible.map((review, i) => (
            <motion.div
              key={review.author + i}
              className="bg-gray-50 rounded-2xl p-5 border border-gray-100 hover:shadow-md transition-shadow duration-200"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="font-bold text-gray-800 text-sm">{review.author}</div>
                  {review.is_local_guide && (
                    <div className="text-xs text-blue-500 mt-0.5">🏅 {t('reviews_local_guide')}</div>
                  )}
                </div>
                <Stars rating={review.rating} />
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                {isPrimary ? review.text_he : review.text_en}
              </p>
              <div className="text-xs text-gray-400 mt-3">{review.date}</div>
            </motion.div>
          ))}
        </div>

        {hasMore && (
          <div className="text-center mt-8">
            <button
              onClick={() => setVisibleCount((n) => n + 6)}
              className="border-2 border-blue-600 text-blue-600 font-bold px-8 py-3 rounded-2xl hover:bg-blue-50 transition-colors"
            >
              {t('reviews_load_more')}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
