import { FC } from 'react';

import { TestimonialsMock } from '@/mocks/testimonialsMock';

import styles from './testimonials.module.css';

const Testimonials: FC = () => {
  return (
    <div className={styles.testimonial} id="testimonials">
      <div className="testimonial-title">
        <h2 className={styles.sectionHeading}>Testimonials</h2>
        {TestimonialsMock.map((element) => (
          <div className="testimonial-text" key={element.id}>
            <p className={styles.testimonialTextQuote}>
              {element.csutomerTestimonial}
            </p>
            <p className={styles.testimonialTextAuthor}>
              - {element.customerName}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
