import { auth } from '../../firebase/firebase.utils';
import MainControl from '../../pages/main-control/main-control';
import SignUp from '../sign-up/sign-up.component';
import React from 'react';

const SignInOrPlay = () => {
     
    if (auth.currentUser) { //redirect users already logged in
        return <MainControl/>
    }
    else {
        return <SignUp/>
    }
    
     
}
 
export default SignInOrPlay;