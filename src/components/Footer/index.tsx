import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react';
import { FiGithub, FiLogOut, FiActivity, FiUser, FiHelpCircle } from 'react-icons/fi';
import Logo from '../../assets/GitTrackr.png';
import styles from './footer.module.css';

const Footer: React.FC = () => {
  const { data: session } = useSession();
  const user = session?.user as { name?: string | null; login?: string } | undefined;
  const userLogin = user?.login || '';

  // Logged-in User Minimal Cockpit Footer
  if (session) {
    return (
      <footer className={styles.userFooter} aria-label="Developer Cockpit Footer">
        <div className={styles.userFooterInner}>
          <div className={styles.userFooterLeft}>
            <Link
              href={userLogin ? `/dashboard/${userLogin}` : '/dashboard'}
              className={styles.userFooterBrand}
            >
              <Image src={Logo} alt="GitTrackr logo" width={22} height={22} />
              <span>GitTrackr Cockpit</span>
            </Link>

            {userLogin && (
              <span className={styles.userFooterTag}>
                @{userLogin}
              </span>
            )}

            <div className={styles.statusIndicator}>
              <span className={styles.statusDot} aria-hidden="true" />
              <span>GitHub API: Operational</span>
            </div>
          </div>

          <ul className={styles.userFooterLinks}>
            <li>
              <Link
                href={userLogin ? `/dashboard/${userLogin}` : '/dashboard'}
                className={styles.userFooterLink}
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="/profile" className={styles.userFooterLink}>
                Profile
              </Link>
            </li>
            <li>
              <Link href="/help" className={styles.userFooterLink}>
                Help &amp; Guide
              </Link>
            </li>
            <li>
              <Link href="/contact-us" className={styles.userFooterLink}>
                Contact
              </Link>
            </li>
            <li>
              <a
                href="https://github.com/sahsisunny/gittrackr"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.userFooterLink}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
              >
                <FiGithub size={13} />
                <span>Repo</span>
              </a>
            </li>
            <li>
              <button
                type="button"
                className={styles.userFooterLink}
                onClick={() => signOut({ callbackUrl: '/' })}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', color: '#f87171' }}
              >
                <FiLogOut size={13} />
                <span>Sign out</span>
              </button>
            </li>
          </ul>

          <div className={styles.userFooterRight}>
            <span>© {new Date().getFullYear()} GitTrackr • Built by Sunny Sahsi</span>
          </div>
        </div>
      </footer>
    );
  }

  // Guest / Visitor Marketing Footer
  return (
    <footer className={styles.footer} aria-label="Site Footer">
      <div className={styles.footerInner}>
        <div className={styles.footerTop}>
          <div className={styles.footerBrand}>
            <Link href="/" className={styles.footerLogo}>
              <Image src={Logo} alt="GitTrackr logo" width={28} height={28} />
              <span>GitTrackr</span>
            </Link>
            <p className={styles.footerTagline}>
              High-velocity GitHub developer cockpit for tracking Pull Requests, Issues,
              and Organization velocity without friction.
            </p>
          </div>

          <div className={styles.footerNavColumns}>
            <div className={styles.navGroup}>
              <h4 className={styles.navGroupHeading}>Product</h4>
              <ul className={styles.navGroupLinks}>
                <li><Link href="/dashboard/octocat" className={styles.footerLink}>Live Demo</Link></li>
                <li><Link href="/#features" className={styles.footerLink}>Features</Link></li>
                <li><Link href="/#about" className={styles.footerLink}>About</Link></li>
                <li><Link href="/login" className={styles.footerLink}>Sign In</Link></li>
              </ul>
            </div>

            <div className={styles.navGroup}>
              <h4 className={styles.navGroupHeading}>Resources</h4>
              <ul className={styles.navGroupLinks}>
                <li><Link href="/faq" className={styles.footerLink}>FAQ</Link></li>
                <li><Link href="/help" className={styles.footerLink}>Help &amp; Guide</Link></li>
                <li><Link href="/contact-us" className={styles.footerLink}>Contact Us</Link></li>
              </ul>
            </div>

            <div className={styles.navGroup}>
              <h4 className={styles.navGroupHeading}>Open Source</h4>
              <ul className={styles.navGroupLinks}>
                <li>
                  <a
                    href="https://github.com/sahsisunny/gittrackr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.footerLink}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
                  >
                    <FiGithub aria-hidden="true" />
                    <span>GitHub Repo</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/sahsisunny"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.footerLink}
                  >
                    Sunny Sahsi
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <div className={styles.statusIndicator}>
            <span className={styles.statusDot} aria-hidden="true" />
            <span>GitHub API Telemetry: All Systems Operational</span>
          </div>

          <p>© {new Date().getFullYear()} GitTrackr. Built for developers worldwide.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
