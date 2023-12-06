import React from 'react';
import Link from 'next/link';

import styles from './footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.linksContainer}>
        <p>
          Created by
          <Link
            href="https://github.com/sahsisunny"
            className={styles.anchorLink}
            target="_blank"
          >
            Sunny Sahsi
          </Link>
        </p>
      </div>
      <div className={styles.linksContainer}>
        Source code available on
        <Link
          href="https://github.com/sahsisunny/gittrackr"
          className={styles.anchorLink}
          target="_blank"
        >
          GitHub
        </Link>
      </div>
      <div className={styles.linksContainer}>
        <Link className={styles.anchorLink} href="/faq">
          FAQ
        </Link>
        <Link className={styles.anchorLink} href="/contact-us">
          Contact us
        </Link>
        <Link className={styles.anchorLink} href="/">
          Home
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
