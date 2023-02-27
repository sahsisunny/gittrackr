import './navbar.css';
import Button from '../Reusable/Button/index';
import Image from '../Reusable/Image/index';
import { Link } from 'react-router-dom';

function Navbar() {
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
      <ul className='nav-links'>
        <Link to={'/'}>Home</Link>
        <Link to={'/myrepos'}>My Repos</Link>
        <Link to={'/orgs'}>Org Repos</Link>
        <Link to={'about'}>About</Link>
      </ul>

      <div className='profile hide'>
        <img
          src='https://avatars.githubusercontent.com/u/59611672?v=4'
          alt='profile'
          className='user-icon'
        />
        <p className='user-fname'>Sunny</p>
      </div>
      <div className='sign-in-section'>
        <Button
          text='Sign in with Github'
          className='sign-in-btn'
          onClick={() => {}}
          children={
            <Image
              src='https://img.icons8.com/ios/50/000000/github.png'
              alt='github'
              className='github-icon'
            />
          }
        />
      </div>
    </nav>
  );
}

export default Navbar;
