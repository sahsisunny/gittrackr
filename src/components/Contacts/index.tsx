import { FC, useState } from 'react';
import Image from 'next/image';
import styles from './contact.module.css';
import { ContactState } from '@/types/contacts.types';
import ContactUsImg from './../../assets/contactus.png';

const Contacts: FC = () => {
  const defaultContact = {
    contactName: '',
    email: '',
    message: '',
  };

  const [contact, setContact] = useState<ContactState>(defaultContact);

  const handleContacts = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setContact({ ...contact, [e.target.name]: [e.target.value] });
  };

  // const handleSubmitForm = () => {};

  return (
    <div className={styles.contact} id="contact">
      <h2 className={styles.sectionHeading}>Contact Us</h2>
      <div className={styles.contactContainer}>
        <div className={styles.contactImageContainer}>
          <Image
            src={ContactUsImg}
            alt="contact"
            className={styles.contactImage}
          />
        </div>

        <form className={styles.contactForm}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="contactName"
              value={contact.contactName}
              onChange={handleContacts}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={contact.email}
              onChange={handleContacts}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="message">Message:</label>
            <input
              id="message"
              value={contact.message}
              onChange={handleContacts}
              required
            />
          </div>
          <button type="submit" className={styles.submitButton}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contacts;
