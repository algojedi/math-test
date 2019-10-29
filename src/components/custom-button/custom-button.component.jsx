import React from 'react';

import './custom-buttom.styles.scss';

const CustomButton = ({ children, isTimerBtn, isStopBtn, isResetBtn, isGoogleSignIn, ...otherProps }) => (
  <button
    className={`${isGoogleSignIn ? 
              'google-sign-in' : isTimerBtn ? 
              'timer-btn' : isResetBtn ?
              'reset-btn' : isStopBtn ?
              'stop-btn' : '' } custom-button`}
    {...otherProps}
  >
    {children}
  </button>
);

export default CustomButton;
