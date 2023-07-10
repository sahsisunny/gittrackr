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
    console.log(contact); // Logging the form values
  };

  return (
    <div className={styles.contact} id="contact">
      <h2 className={styles.sectionHeading}>Contact Us</h2>
      <div className={styles.contactContainer}>
        <div className={styles.contactImageContainer}>
          <Image
            src={ContactUsImg}
            alt="contact"
            className={styles.contactImage}
            priority={true}
          />
        </div>

        <form className={styles.contactForm} onSubmit={handleSubmitForm}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="contactName"
              required
              value={contact.contactName}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={contact.email}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              name="message"
              required
              value={contact.message}
              onChange={handleChange}
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
