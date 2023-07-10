import React from 'react';
import Link from 'next/link';

import styles from './footer.module.css';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.linksContainer}>
        <Link href="/faq">FAQ</Link>
        <Link href="/contact-us">Contact us</Link>
        <Link href="/">Home</Link>
      </div>
      <div>
        <p>created by code hunter</p>
      </div>
      <div className={styles.githubRepoLinkContainer}>
        Source code available on &nbsp;
        <a
          href="https://github.com/sahsisunny/git-dashboard"
          className={styles.githubRepoLink}
        >
          GitHub
        </a>
      </div>
    </footer>
  );
};

export default Footer;
