import React, { useState } from 'react';
import Image from 'next/image';
import Logo from '../../assets/GitTrackr.png';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMediaQuery } from 'react-responsive';

const Navbar = () => {
  const { data: session } = useSession();
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
              <p className="dropdown-greeting-text">
                Hello,{' '}
                <strong>{session.user?.name?.split(' ')[0] ?? ''}</strong>
              </p>
              <hr className="dropdown-divider" />
              <Link href="/profile" className="nav-link">
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
