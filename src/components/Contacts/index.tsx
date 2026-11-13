import { FC, useState } from 'react';
import Image from 'next/image';
import { FiSend, FiCheckCircle, FiAlertCircle, FiLoader } from 'react-icons/fi';
import styles from './contact.module.css';
import { ContactState } from '@/types/contacts.types';
import ContactUsImg from '../../assets/contactus.png';

const Contacts: FC = () => {
  const defaultContact: ContactState = {
    contactName: '',
    email: '',
    message: '',
  };

  const [contact, setContact] = useState<ContactState>(defaultContact);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setContact((prevContact) => ({
      ...prevContact,
      [name]: value,
    }));
  };

  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contact),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Failed to deliver message via Resend');
      }

      setSubmitted(true);
      setContact(defaultContact);
    } catch (err: any) {
      setErrorMessage(
        err.message || 'Something went wrong while sending your message. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
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
              <div className={styles.successContent}>
                <FiCheckCircle size={22} />
                <span>Thank you! Your message has been sent successfully.</span>
              </div>
              <button
                type="button"
                className={styles.resetButton}
                onClick={() => setSubmitted(false)}
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <>
              {errorMessage && (
                <div className={styles.errorMessage} role="alert">
                  <FiAlertCircle size={18} />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className={styles.formGroup}>
                <label htmlFor="name">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="contactName"
                  placeholder="e.g. Alex Rivera"
                  required
                  disabled={isSubmitting}
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
                  disabled={isSubmitting}
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
                  disabled={isSubmitting}
                  value={contact.message}
                  onChange={handleChange}
                />
              </div>

              <button
                type="submit"
                className={styles.submitButton}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <FiLoader
                      className="spin"
                      style={{ animation: 'spin 1s linear infinite' }}
                    />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <FiSend aria-hidden="true" />
                  </>
                )}
              </button>
            </>
          )}
        </form>
      </div>
    </section>
  );
};

export default Contacts;
