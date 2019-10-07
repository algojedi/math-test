import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom'
import Main from './pages/main-pg/main'
import Header from './components/header/header.component'

//import Register from './components/register/register'
//import ProtectedRoute from './components/protected-route'

import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { auth } from './firebase/firebase.utils';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null
    };
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(user => {
      this.setState({ currentUser: user });
      console.log(user);
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path='/' component={Main} />
          <Route path='/signin' component={SignInAndSignUpPage} />
        </Switch>
      </div>
    );
  }
}

export default App;

/** 
<script>
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCq_00wBlQPzvJAjUPUMBJATvnT-TEy5Uo",
    authDomain: "math-db.firebaseapp.com",
    databaseURL: "https://math-db.firebaseio.com",
    projectId: "math-db",
    storageBucket: "",
    messagingSenderId: "189383719049",
    appId: "1:189383719049:web:c9e0344a98ec69a4c8ae58",
    measurementId: "G-XJ1LDSL2R0"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
</script>  	*/