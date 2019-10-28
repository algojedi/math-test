import React from 'react';

import './custom-buttom.styles.scss';

const CustomButton = ({ children, isTimerBtn, isGoogleSignIn, ...otherProps }) => (
  <button
    className={`${isGoogleSignIn ? 
              'google-sign-in' : isTimerBtn ? 'timer-btn' : '' } custom-button`}
    {...otherProps}
  >
    {children}
  </button>
);

export default CustomButton;
