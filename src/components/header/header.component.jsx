import React from 'react';
import { Link } from 'react-router-dom';

import { auth } from '../../firebase/firebase.utils';


import './header.styles.scss';

const Header = ({ currentUser }) => (
  <div className='header'>
    <Link className='add-here' to='/selection'>
      Math Test
    </Link>
    <div className='options'>
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
  </div>
);

export default Header;
