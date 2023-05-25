// Navbar component
import React from 'react';
import './navbar.css'
import Image from 'next/image'
import Logo from '../../assets/GitTrackr.png'
import { useSession, signIn, signOut } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession()
  const [showDropdown, setShowDropdown] = React.useState(false)

  return (
    <>
      <nav className="navbar">
        <a href="/" className="logo">
          <Image
            src={Logo}
            alt='logo'
            className='logo-icon'
          />
          <h1>GitTrackr</h1>
        </a>
        <div className="nav-links">
          <a href="/dashboard" className="nav-link">Dashboard</a>
          <a href="/repolist" className="nav-link">Repos List</a>
          <a href="/about" className="nav-link">About</a>



        </div>
        {
          session ? (

            <div className="profile"
              onClick={() => {
                console.log("clicked"); setShowDropdown(!showDropdown)
              }}
            >
              <div className="profile-img">
                <Image
                  src={session.user?.image ?? ""}
                  alt="profile image"
                  width={30}
                  height={30}
                  className="profile-image"
                />
              </div>
              <div className="profile-name">
                {session.user?.name?.split(" ")[0] ?? ""}
              </div>
              <div className={`dropdown ${showDropdown ? "show" : ""}`}>
                <div className="dropdown-item">
                  <button className="button"
                    onClick={() => signOut()}
                  >
                    <p className="text">Sign out</p>
                    <svg width="24" height="24" fill="white" viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path></svg>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="login">
              <button className="button"
                onClick={() => signIn()}
              >
                <p className="text">Sign in</p>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0.296997C5.37 0.296997 0 5.67 0 12.297C0 17.6 3.438 22.097 8.205 23.682C8.805 23.795 9.025 23.424 9.025 23.105C9.025 22.82 9.015 22.065 9.01 21.065C5.672 21.789 4.968 19.455 4.968 19.455C4.422 18.07 3.633 17.7 3.633 17.7C2.546 16.956 3.717 16.971 3.717 16.971C4.922 17.055 5.555 18.207 5.555 18.207C6.625 20.042 8.364 19.512 9.05 19.205C9.158 18.429 9.467 17.9 9.81 17.6C7.145 17.3 4.344 16.268 4.344 11.67C4.344 10.36 4.809 9.29 5.579 8.45C5.444 8.147 5.039 6.927 5.684 5.274C5.684 5.274 6.689 4.952 8.984 6.504C9.944 6.237 10.964 6.105 11.984 6.099C13.004 6.105 14.024 6.237 14.984 6.504C17.264 4.952 18.269 5.274 18.269 5.274C18.914 6.927 18.509 8.147 18.389 8.45C19.154 9.29 19.619 10.36 19.619 11.67C19.619 16.28 16.814 17.295 14.144 17.59C14.564 17.95 14.954 18.686 14.954 19.81C14.954 21.416 14.939 22.706 14.939 23.096C14.939 23.411 15.149 23.786 15.764 23.666C20.565 22.092 24 17.592 24 12.297C24 5.67 18.627 0.296997 12 0.296997Z" fill="white"></path>
                </svg>
              </button>
            </div>
          )
        }
      </nav>
    </>
  )
};

export default Navbar;