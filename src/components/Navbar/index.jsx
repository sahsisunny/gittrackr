import './navbar.css';
import Button from '../Reusable/Button/index';
import Image from '../Reusable/Image/index';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';


const USERNAME = localStorage.getItem('username');
const GIT_API = `https://api.github.com/users/${USERNAME}`;
const Navbar = (props) => {
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

  useEffect(() => {
    if (localStorage.getItem('username') !== null && localStorage.getItem('orgname') !== null) {
      setDisplay('none');
      // fetch github profile name and image and display it
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
          src='https://img.icons8.com/ios/50/000000/github.png'
          alt='logo'
          className='logo-icon'
        />
        <h1>RepoBoss</h1>
      </Link>
      <div className='profile hide'>
        <img
          src='https://avatars.githubusercontent.com/u/59611672?v=4'
          alt='profile'
          className='user-icon'
        />
        <p className='user-fname'>Sunny</p>
      </div>
      <div className='sign-in-section'>
        <img
          src={profile}
          alt={username}
          className={`user-icon ${display === 'none' ? 'show' : 'hide'}`}
        />
        <p className={`sign-in-text ${display === 'none' ? 'show' : 'hide'}`}
        >{username}</p>
        <input
          type='username'
          placeholder='Username'
          className="input-field"
          onChange={(e) => getUserNames(e)}
          style={{ display: display }}
        />
        <input
          type='organization'
          placeholder='Organization'
          className='input-field'
          onChange={(e) => getOrgName(e)}
          style={{ display: display }}
        />
        <Button
          text='Login'
          onClick={(e) => onSubmitHandler(e)}
          className={display === 'none' ? 'hide' : 'show'}
        />
        <img
          src='https://cdn-icons-png.flaticon.com/512/660/660350.png'
          alt='logo'
          className={`logo-icon ${display === 'none' ? 'show' : 'hide'}`}
          onClick={() => {
            localStorage.removeItem('username');
            localStorage.removeItem('orgname');
            window.location.reload();
          }}
        />
      </div>
    </nav>
  );
}

export default Navbar;
