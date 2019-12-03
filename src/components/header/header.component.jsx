import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router";
import appLogo from './../../assets/micon.jpg';
import { auth } from '../../firebase/firebase.utils';
import './header.styles.scss';

const Header = (props) => {
  const currentPath = props.location.pathname;
  //console.log('props in header: ', props);
  return (
    <div className='header'>
      <img src={appLogo} height='100' alt='app logo'/>
      {       
        currentPath === '/main' ? <div></div> :
        <Link className='option' to='/main'>
          Click to Play
        </Link>
      }
        
      {
        props.currentUser ? (
        <div className="signedIn-options">
          <div className='option' onClick={() => auth.signOut()}>
            Sign Out
          </div>
          <Link className='option' to='/account'>
            <i className="fa fa-user-circle-o">Account</i>
          </Link>
        </div>
      ) : (
        <Link className='option' to='/'>
          Sign In
        </Link>
      )}
    </div>
 
); }

export default withRouter(Header);


/* auth.currentUser ? <div></div> : */ 