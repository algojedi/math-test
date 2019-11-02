import React from 'react';
import { Link } from 'react-router-dom';
import appLogo from './../../assets/micon.jpg';
import { auth } from '../../firebase/firebase.utils';


import './header.styles.scss';

const Header = ({ currentUser }) => (
  <div className='header'>
    
    <img src={appLogo} height='100' alt='app logo'/>
    
    
    <Link className='option' to='/main'>
      Main
    </Link>
    
    {currentUser ? (
      <div className='option' onClick={() => auth.signOut()}>
        SIGN OUT
      </div>
    ) : (
      <Link className='option' to='/'>
        SIGN IN
      </Link>
    )}
  </div>
 
);

export default Header;
