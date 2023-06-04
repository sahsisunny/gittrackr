import React, { useState } from 'react';
import Image from 'next/image';
import Logo from './../../assets/GitTrackr.png';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import fetchData from '@/utils/FetchData';
import { useEffect } from 'react';

const Navbar = () => {
  const { data: session } = useSession();
  const [orgsData, setOrgsData] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();
  const ORGS_URL = session?.user?.organizations_url;
  const TOKEN = session?.accessToken;

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const renderNavLinks = () => {
    if (!session && router.pathname === '/login') {
      return (
        <>
          <Link href="/" className="nav-link">
            Home
          </Link>
          <Link href="/#about" className="nav-link">
            About
          </Link>
          <Link href="/#contact" className="nav-link">
            Contact
          </Link>
        </>
      );
    }
    if (session) {
      return null;
    }
    return (
      <>
        <Link href="/login" className="nav-link">
          Login
        </Link>
        <Link href="/#features" className="nav-link">
          Features
        </Link>
        <Link href="/#about" className="nav-link">
          About
        </Link>
        <Link href="/#faq" className="nav-link">
          FAQ
        </Link>
        <Link href="/#contact" className="nav-link">
          Contact
        </Link>
      </>
    );
  };

  useEffect(() => {
    if (session) {
      if (ORGS_URL) {
        fetchData(ORGS_URL, TOKEN, setOrgsData);
      }
    }
  }, [session, ORGS_URL, TOKEN]);

  return (
    <nav className="navbar">
      <Link href="/" className="logo">
        <Image src={Logo} alt="logo" className="logo-icon" />
        <h1>GitTrackr</h1>
      </Link>
      <div className="nav-links">{renderNavLinks()}</div>

      {session && (
        <div className="profile" onClick={toggleDropdown}>
          <div className="profile-img">
            <Image
              src={session.user?.image ?? ''}
              alt="profile image"
              width={30}
              height={30}
              className="profile-image"
            />
          </div>
          <div className="profile-name">
            {session.user?.name?.split(' ')[0] ?? ''}
          </div>
          <div className="profile-arrow">
            <svg width="24" height="24" fill="white" viewBox="0 0 512 512">
              <path d="M256 352L96 192l320 0L256 352z"></path>
            </svg>
          </div>
          <div className={`dropdown ${showDropdown ? 'show' : ''}`}>
            <div className="dropdown-item">
              <div className="dropdown-item-img">
                <Image
                  src={session.user?.image ?? ''}
                  alt="profile image"
                  width={70}
                  height={70}
                  className="profile-image"
                />
              </div>
              <p className="dropdown-greeting-text">
                <strong>{session.user?.name ?? ''}</strong>
              </p>
              <hr className="dropdown-divider" />
              <Link href="/profile" className="nav-link">
                Profile
              </Link>
              <Link href="/dashboard" className="nav-link">
                Dashboard
              </Link>
              {orgsData.length > 0 ? (
                orgsData.map((org) => (
                  <Link
                    href={`/dashboard/${org.login}`}
                    className="nav-link"
                    key={org.id}
                  >
                    {org.login.replace(/-/g, ' ')}
                  </Link>
                ))
              ) : (
                <></>
              )}
              <hr className="dropdown-divider" />
              <Link href="/#about" className="nav-link">
                About
              </Link>
              <Link href="/#contact" className="nav-link">
                Contact
              </Link>
              <button className="dropdown-item-btn" onClick={() => signOut()}>
                Sign out
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
