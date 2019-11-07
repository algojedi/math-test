import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import MainControl from './pages/main-control/main-control';
import Header from './components/header/header.component';
import SignIn from './components/sign-in/sign-in.component';
import SignUp from './components/sign-up/sign-up.component';
import Account from './pages/account/account';


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
          <Route exact path='/' component={SignIn} />
          <Route path='/main' component={MainControl} />
          <Route path='/signup' component={SignUp} />
          <Route path='/account' component={Account} />
        </Switch>
      </div>
    );
  }
}

export default App;

