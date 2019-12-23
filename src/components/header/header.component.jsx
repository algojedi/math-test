import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router";
import { signingOut } from '../../firebase/firebase.utils';
import './header.styles.scss';

const Header = (props) => {
  const currentPath = props.location.pathname;
  return (
    <div className='header'>
      <div className="logo-wrapper">
        <p className='appLogo'>The Math App</p>
      </div>
      
      {       
        currentPath === '/main' ? <div></div> :
        <Link className='option' to='/main'>
          Click to Play
        </Link>
      }
        
      {
        props.currentUser ? (
        <div className="signedIn-options">
          <div className='option' onClick={() => { 
                    signingOut(); 
                    props.signout(); //unsubscribes from onSnapshot
               }}>
                Sign Out
          </div>
          <Link className='option' to='/account'>
            <i className="fa fa-user-circle-o"></i>
            <span className='account-link'>Account</span>
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
