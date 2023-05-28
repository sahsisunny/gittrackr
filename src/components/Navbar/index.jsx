import React, { useState } from 'react';
import Image from 'next/image';
import Logo from './../../assets/GitTrackr.png';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMediaQuery } from 'react-responsive';
import fetchData from '@/utils/FetchData';
import { GITHUB_USER_URL } from '@/constants/url';
import { useEffect } from 'react';

const Navbar = () => {
  const { data: session } = useSession();
  const [data, setData] = useState(null);
  const [orgsData, setOrgsData] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const renderNavLinks = () => {
    if (!session && router.pathname === '/login') {
      return (
        <>
          <Link href="/about" className="nav-link">
            About
          </Link>
          <Link href="/contact" className="nav-link">
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
        <Link href="/about" className="nav-link">
          About
        </Link>
        <Link href="/contact" className="nav-link">
          Contact
        </Link>
      </>
    );
  };

  useEffect(() => {
    if (session) {
      const userUrl = GITHUB_USER_URL;
      const token = session?.accessToken;

      fetchData(userUrl, token, setData);
    }
  }, [session]);

  useEffect(() => {
    if (session && data) {
      const orgsUrl = data.organizations_url;
      const token = session.accessToken;

      if (orgsUrl) {
        fetchData(orgsUrl, token, setOrgsData);
      }
    }
  }, [session, data]);

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
              <span className="dropdown-item-heading">Dashboard</span>
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
                <p className="dropdown-no-orgs">No organizations</p>
              )}
              <hr className="dropdown-divider" />
              <Link
                href={`/profiles/${data?.login ?? ''}`}
                className="nav-link"
              >
                Profile
              </Link>
              <Link href="/about" className="nav-link">
                About
              </Link>
              <Link href="/contact" className="nav-link">
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
