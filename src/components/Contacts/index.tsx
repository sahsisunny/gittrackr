import { FC, useState } from 'react';
import Image from 'next/image';
import { FiSend, FiCheckCircle } from 'react-icons/fi';
import styles from './contact.module.css';
import { ContactState } from '@/types/contacts.types';
import ContactUsImg from '../../assets/contactus.png';

const Contacts: FC = () => {
  const defaultContact = {
    contactName: '',
    email: '',
    message: '',
  };

  const [contact, setContact] = useState<ContactState>(defaultContact);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setContact((prevContact) => ({
      ...prevContact,
      [name]: value,
    }));
  };

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    setContact(defaultContact);
  };

  return (
    <section className={styles.contact} id="contact" aria-label="Contact Us">
      <div className={styles.sectionHeader}>
        <h1 className={styles.sectionHeading}>Get in Touch</h1>
        <p className={styles.sectionSubheading}>
          Have questions, feedback, or feature requests? Drop us a line.
        </p>
      </div>

      <div className={styles.contactContainer}>
        <div className={styles.contactImageContainer}>
          <Image
            src={ContactUsImg}
            alt="GitTrackr support"
            className={styles.contactImage}
            priority={true}
          />
        </div>

        <form className={styles.contactForm} onSubmit={handleSubmitForm}>
          {submitted ? (
            <div className={styles.successMessage}>
              <FiCheckCircle size={20} />
              <span>Thank you! Your message has been sent successfully.</span>
            </div>
          ) : (
            <>
              <div className={styles.formGroup}>
                <label htmlFor="name">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="contactName"
                  placeholder="e.g. Alex Rivera"
                  required
                  value={contact.contactName}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="you@company.com"
                  required
                  value={contact.email}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="How can we help your team?"
                  required
                  value={contact.message}
                  onChange={handleChange}
                />
              </div>

              <button type="submit" className={styles.submitButton}>
                <span>Send Message</span>
                <FiSend aria-hidden="true" />
              </button>
            </>
          )}
        </form>
      </div>
    </section>
  );
};

export default Contacts;
