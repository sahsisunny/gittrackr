import './navbar.css';
import Image from '../Reusable/Image/index';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Logo from '../../assets/GitTrackr.png';
import { GITHUB_BASE_API } from '../../constants/urls';
import Button from '../Reusable/Button/index';



const USERNAME = localStorage.getItem('username');
const GIT_API = `${GITHUB_BASE_API}users/${USERNAME}`;

const Navbar = () => {
  const [userNames, setUserNames] = useState('');
  const [orgName, setOrgName] = useState('');
  const [display, setDisplay] = useState('block');
  const [username, setUsername] = useState('Sign In');
  const [profile, setProfile] = useState('');

  function getUserNames(e) {
    setUserNames(e.target.value);
  }

  function getOrgName(e) {
    setOrgName(e.target.value);
  }

  function onSubmitHandler(e) {
    e.preventDefault();
    if (userNames === '' || orgName === '') {
      if (localStorage.getItem('username') === null || localStorage.getItem('orgname') === null) {
        alert('Please enter your username and organization name');
        return;
      } else {
        window.location.reload();
      }
    } else {
      localStorage.setItem('username', userNames);
      localStorage.setItem('orgname', orgName);
      window.location.reload();
    }
    setDisplay('none');
  }

  function logout() {
    localStorage.removeItem('username');
    localStorage.removeItem('orgname');
    window.location.reload();
  }

  useEffect(() => {
    if (localStorage.getItem('username') !== null && localStorage.getItem('orgname') !== null) {
      setDisplay('none');
      async function fetchProfile() {
        axios.get(GIT_API)
          .then((response) => {
            setUsername(response.data.name);
            setProfile(response.data.avatar_url);
          })
          .catch((error) => {
            console.log(error);
          })
      }
      fetchProfile();
    }
  }, [userNames, orgName]);


  return (
    <nav>
      <Link to={'/'} className='logo'>
        <Image
          src={Logo}
          alt='logo'
          className='logo-icon'
        />
        <h1>GitTrackr</h1>
      </Link>
      <div className='sign-in-section'>
        <img
          src={profile}
          alt={username}
          className={`user-icon ${display === 'none' ? 'show' : 'hide'}`}
        />
        <p className={`sign-in-text ${display === 'none' ? 'show' : 'hide'}`}
        >{username}</p>
        <div className="input-group">
          <input
            type="username"
            className="input"
            placeholder='Username'
            onChange={(e) => getUserNames(e)}
            style={{ display: display }}
            autoFocus
            required="required"
            autoComplete="on"
          />
          <input
            type="orgname"
            className="input"
            placeholder='Organization'
            onChange={(e) => getOrgName(e)}
            style={{ display: display }}
            required="required"
            autoComplete="on"
            
            />
            </div>
          <Button
            className={`button--submit ${display === 'none' ? 'hide' : 'show'}`}
            type="submit"
            onClick={(e) => onSubmitHandler(e)}
            text="Login"
          />
        <img
          src='https://cdn-icons-png.flaticon.com/512/660/660350.png'
          alt='logout'
          className={`logo-icon logout ${display === 'none' ? 'show' : 'hide'}`}
          onClick={() => {logout();}}
        />
      </div>
    </nav>
  );
}

export default Navbar;
