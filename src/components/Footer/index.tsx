import React from 'react';
import Link from 'next/link';

import styles from './footer.module.css';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.linksContainer}>
        <p>
          Created by{' '}
          <a href="https://discord.gg/EQAaFQkQwS" className={styles.anchorLink}>
            Code Hunter
          </a>
        </p>
      </div>
      <div className={styles.linksContainer}>
        Source code available on
        <a
          href="https://github.com/sahsisunny/gittrackr"
          className={styles.anchorLink}
        >
          GitHub
        </a>
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
