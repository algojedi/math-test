import React from 'react';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { signInWithGoogle } from '../../firebase/firebase.utils';
import './sign-in.styles.scss';
import { Link } from 'react-router-dom';
import { ReactComponent as GSvg } from './../../assets/search.svg';
import { auth } from '../../firebase/firebase.utils';


class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      failedLogin: false
    };
  }

  handleSubmit = async event => {
    event.preventDefault();
    const { email, password } = this.state;
    
    console.log('trying to log in w. ', email, password);
    
    //TODO: must validate credentials against firebase
    try {
      await auth.signInWithEmailAndPassword(email, password);
      this.setState({ email: '', password: '' });
      this.props.history.push('/main');
      console.log('user logged in and authenticated');
    } catch(err) {
        console.log(err);
        this.setState({ failedLogin: true });
    }
    // if (!auth.currentUser) {
    //   this.setState({ failedLogin: true });
    // }
  };

  handleChange = event => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    
    return (
      <div className='sign-in'>
        <h1>Sign In</h1>
        <span>Sign in with your email and password</span>

        <form className='signin-form' onSubmit={this.handleSubmit}>
          <FormInput
            name='email'
            type='email'
            handleChange={this.handleChange}
            value={this.state.email}
            label='Email'
            required
          />
          <FormInput
            name='password'
            type='password'
            value={this.state.password}
            handleChange={this.handleChange}
            label='Password'
            required
          />
          <div className='buttons'>
            <CustomButton type='submit'> Sign in </CustomButton>
            <CustomButton onClick={signInWithGoogle} isGoogleSignIn>
              
              <GSvg width='30' height='30' />
                 
            </CustomButton>
          </div>
        </form>
        {this.state.failedLogin ? <div style={{color:'red'}}> Incorrect username or password </div> : '' }
        <Link style={{ textDecoration: 'none' }} to='/signup'>
          <p>
            No Account Yet? Register Now
          </p>
        </Link>

      </div>
    );
  }
}

export default SignIn;
