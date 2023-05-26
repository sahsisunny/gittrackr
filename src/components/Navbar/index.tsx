import React from 'react'
import './navbar.css'
import Image from 'next/image'
import Logo from '../../assets/GitTrackr.png'
import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'

const Navbar = () => {
  const { data: session } = useSession({ required: true })
  const [showDropdown, setShowDropdown] = React.useState(false)

  return (
    <>
      <nav className="navbar">
        <Link href="/" className="logo">
          <Image src={Logo} alt="logo" className="logo-icon" />
          <h1>GitTrackr</h1>
        </Link>

        {session ? (
          <div
            className="profile"
            onClick={() => {
              console.log('clicked')
              setShowDropdown(!showDropdown)
            }}
          >
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
                <hr />
                <button className="dropdown-item-btn" onClick={() => signOut()}>
                  Sign out
                </button>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </nav>
    </>
  )
}

export default Navbar
