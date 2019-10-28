import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom'
import Main from './pages/main-pg/main'
import Header from './components/header/header.component'
import SignIn from './components/sign-in/sign-in.component'
import SignUp from './components/sign-up/sign-up.component'

import { auth, createUserProfileDocument } from './firebase/firebase.utils';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null
    };
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        //snapshot has all the important user information
        userRef.onSnapshot(snapShot => {
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          });

          console.log(this.state);
        });
      }
      this.setState({ currentUser: userAuth });  //sets user to null when signing out
    });
  }
  
  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }
  
  render() {
    return (
      <div className='App'>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path='/' component={Main} />
          {/* <Route path='/signin' component={SignInAndSignUpPage} /> */}
          <Route path='/signin' component={SignIn} />
          <Route path='/signup' component={SignUp} />
        </Switch>
      </div>
    );
  }
}

export default App;

