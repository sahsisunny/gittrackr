import { FC } from 'react';
import Image from 'next/image';
import { FiMessageSquare, FiStar } from 'react-icons/fi';
import { TestimonialsMock } from '@/mocks/testimonialsMock';
import styles from './testimonials.module.css';

const Testimonials: FC = () => {
  return (
    <section className={styles.testimonialsSection} id="testimonials" aria-label="Developer Testimonials">
      <div className={styles.sectionHeader}>
        <div className={styles.sectionBadge}>
          <FiMessageSquare aria-hidden="true" />
          <span>Community Feedback</span>
        </div>
        <h2 className={styles.sectionHeading}>
          Trusted by <span>Modern Developers</span>
        </h2>
      </div>

      <div className={styles.testimonialsGrid}>
        {TestimonialsMock.map((element) => (
          <article className={styles.testimonialCard} key={element.id}>
            <div style={{ display: 'flex', gap: '3px', color: '#fbbf24', marginBottom: '0.25rem' }}>
              {[...Array(5)].map((_, i) => (
                <FiStar key={i} fill="#fbbf24" size={16} aria-hidden="true" />
              ))}
            </div>

            <p className={styles.quoteText}>&ldquo;{element.userTestimonial}&rdquo;</p>

            <div className={styles.authorRow}>
              {element.avatar && (
                <Image
                  src={element.avatar}
                  alt={element.customerName}
                  width={44}
                  height={44}
                  className={styles.authorAvatar}
                />
              )}
              <div className={styles.authorMeta}>
                <span className={styles.authorName}>{element.customerName}</span>
                <span className={styles.authorRole}>{element.role}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
