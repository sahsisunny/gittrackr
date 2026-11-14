import React, { useState, useEffect, useRef } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import {
  FiUser,
  FiActivity,
  FiHelpCircle,
  FiLogOut,
  FiChevronDown,
  FiCompass,
  FiGithub,
  FiExternalLink,
} from 'react-icons/fi';

import Logo from '../../assets/GitTrackr.png';
import fetchData from '@/utils/FetchData';

interface OrgItem {
  id: number;
  login: string;
}

const Navbar: React.FC = () => {
  const { data: session } = useSession();
  const [orgsData, setOrgsData] = useState<OrgItem[]>([]);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const user = session?.user as
    | {
        name?: string | null;
        image?: string | null;
        login?: string;
        organizations_url?: string;
      }
    | undefined;

  const ORGS_URL = user?.organizations_url;
  const TOKEN = (session as { accessToken?: string } | null)?.accessToken;
  const userLogin = user?.login || '';

  // Close dropdown on outside click or escape key
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (session && ORGS_URL && TOKEN) {
      fetchData<OrgItem[]>(ORGS_URL, TOKEN, (data) => {
        if (Array.isArray(data)) {
          setOrgsData(data);
        }
      });
    }
  }, [session, ORGS_URL, TOKEN]);

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const isCurrent = (path: string) => {
    if (path === '/' && router.pathname === '/') return 'page';
    if (path !== '/' && router.pathname.startsWith(path)) return 'page';
    return undefined;
  };

  return (
    <nav className="navbar" aria-label="Main Navigation">
      <Link
        href={session && userLogin ? `/dashboard/${userLogin}` : '/'}
        className="logo"
        title={session ? 'Go to Dashboard' : 'GitTrackr Home'}
      >
        <Image src={Logo} alt="GitTrackr logo" className="logo-icon" width={32} height={32} priority />
        <h1>GitTrackr</h1>
      </Link>

      <div className="nav-links">
        {session ? (
          /* ==========================================================================
             Logged-in User Navigation (Application Cockpit Links)
             ========================================================================== */
          <>
            <Link
              href={userLogin ? `/dashboard/${userLogin}` : '/dashboard'}
              className={`nav-link ${router.pathname.startsWith('/dashboard') ? 'active' : ''}`}
              aria-current={router.pathname.startsWith('/dashboard') ? 'page' : undefined}
            >
              <FiActivity style={{ marginRight: '0.35rem', verticalAlign: '-2px' }} />
              <span>Dashboard</span>
            </Link>

            <Link
              href="/profile"
              className={`nav-link ${router.pathname === '/profile' ? 'active' : ''}`}
              aria-current={router.pathname === '/profile' ? 'page' : undefined}
            >
              <FiUser style={{ marginRight: '0.35rem', verticalAlign: '-2px' }} />
              <span>Profile</span>
            </Link>

            <Link
              href="/help"
              className={`nav-link ${router.pathname === '/help' ? 'active' : ''}`}
              aria-current={isCurrent('/help')}
            >
              <FiHelpCircle style={{ marginRight: '0.35rem', verticalAlign: '-2px' }} />
              <span>Help &amp; Guide</span>
            </Link>

            <Link
              href="/contact-us"
              className={`nav-link ${router.pathname === '/contact-us' ? 'active' : ''}`}
              aria-current={isCurrent('/contact-us')}
            >
              <span>Contact</span>
            </Link>
          </>
        ) : (
          /* ==========================================================================
             Guest / Visitor Navigation (Marketing Landing Links)
             ========================================================================== */
          <>
            <Link
              href="/"
              className={`nav-link ${router.pathname === '/' ? 'active' : ''}`}
              aria-current={isCurrent('/')}
            >
              Home
            </Link>
            <Link href="/#features" className="nav-link">
              Features
            </Link>
            <Link href="/#about" className="nav-link">
              About
            </Link>
            <Link
              href="/faq"
              className={`nav-link ${router.pathname === '/faq' ? 'active' : ''}`}
              aria-current={isCurrent('/faq')}
            >
              FAQ
            </Link>
            <Link
              href="/contact-us"
              className={`nav-link ${router.pathname === '/contact-us' ? 'active' : ''}`}
              aria-current={isCurrent('/contact-us')}
            >
              Contact
            </Link>
            <Link href="/dashboard/octocat" className="nav-pill-btn">
              <FiCompass aria-hidden="true" />
              <span>Live Demo</span>
            </Link>
          </>
        )}

        {/* User Account / Sign In Pill */}
        {!session ? (
          <Link
            href="/login"
            className={`nav-link ${router.pathname === '/login' ? 'active' : ''}`}
            aria-current={isCurrent('/login')}
          >
            Sign In
          </Link>
        ) : (
          <div className="profile" onClick={toggleDropdown} ref={dropdownRef}>
            <div className="profile-img">
              {user?.image ? (
                <Image
                  src={user.image}
                  alt={user.name ?? 'Profile image'}
                  width={28}
                  height={28}
                  className="profile-image"
                />
              ) : (
                <FiUser />
              )}
            </div>
            <div className="profile-name">
              {user?.name ? user.name.split(' ')[0] : user?.login}
            </div>
            <div className="profile-arrow">
              <FiChevronDown />
            </div>

            <div className={`dropdown ${showDropdown ? 'show' : ''}`} role="menu">
              <div className="dropdown-user-header">
                {user?.image && (
                  <Image
                    src={user.image}
                    alt={user.name ?? 'Profile image'}
                    width={40}
                    height={40}
                    className="dropdown-user-avatar"
                  />
                )}
                <div className="dropdown-user-info">
                  <span className="dropdown-greeting-text">{user?.name}</span>
                  <span className="dropdown-user-login">@{userLogin}</span>
                </div>
              </div>

              <div className="dropdown-menu-list">
                <div className="dropdown-section-title">Workspaces</div>

                <Link
                  href={`/dashboard/${userLogin}`}
                  className={`dropdown-link ${router.asPath === `/dashboard/${userLogin}` ? 'active' : ''}`}
                  onClick={() => setShowDropdown(false)}
                >
                  <FiUser aria-hidden="true" />
                  <span>Personal ({userLogin})</span>
                  {router.asPath === `/dashboard/${userLogin}` && (
                    <span className="dropdown-active-dot" aria-label="Current workspace" />
                  )}
                </Link>

                {orgsData.map((org) => {
                  const isOrgActive = router.asPath.includes(`/dashboard/${org.login}`);
                  return (
                    <Link
                      href={`/dashboard/${org.login}`}
                      className={`dropdown-link ${isOrgActive ? 'active' : ''}`}
                      key={org.id}
                      onClick={() => setShowDropdown(false)}
                    >
                      <FiGithub aria-hidden="true" />
                      <span>{org.login}</span>
                      {isOrgActive && (
                        <span className="dropdown-active-dot" aria-label="Current workspace" />
                      )}
                    </Link>
                  );
                })}

                <div className="dropdown-divider" />

                <a
                  href={`https://github.com/${userLogin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="dropdown-link"
                  onClick={() => setShowDropdown(false)}
                >
                  <FiExternalLink aria-hidden="true" />
                  <span>GitHub Profile</span>
                </a>

                <button
                  type="button"
                  className="dropdown-item-btn"
                  onClick={() => signOut({ callbackUrl: '/' })}
                >
                  <FiLogOut aria-hidden="true" />
                  <span>Sign out</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
