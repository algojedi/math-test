import React from 'react';
import { Link } from 'react-router-dom';
import appLogo from './../../assets/micon.jpg';
import { auth } from '../../firebase/firebase.utils';


import './header.styles.scss';

const Header = ({ currentUser }) => (
  <div className='header'>
    
    <img src={appLogo} height='100' alt='app logo'/>

    {
      auth.currentUser ? '' :
    <Link className='option' to='/main'>
      Click to Play
    </Link>
    }
    
{/*     
    <Link className='option' to='/main'>
      <img src={appLogo} height='100' alt='app logo'/>
    </Link> 
    This section should be updated to allow for a full restart of the game.
    This would require moving state up a level for a component to have the power of a full refresh
    */}
    
    {currentUser ? (
      <div className="signedIn-options">
        <div className='option' onClick={() => auth.signOut()}>
          SIGN OUT
        </div>
        <Link className='option' to='/account'>
          <i className="fa fa-user-circle-o"></i>
        </Link>
      </div>
    ) : (
      <Link className='option' to='/'>
        SIGN IN
      </Link>
    )}
  </div>
 
);

export default Header;
