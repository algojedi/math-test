import React from 'react';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { signInWithGoogle } from '../../firebase/firebase.utils';
import './sign-in.styles.scss';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { ReactComponent as GSvg } from './../../assets/search.svg';
import { auth } from '../../firebase/firebase.utils';


class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      isLoading: false,
      failedLogin: false
    };
  }

  handleSubmit = async event => {
    event.preventDefault();
    this.setState( { isLoading: true, failedLogin: false } );

    const { email, password } = this.state;
    
    
    //TODO: must validate credentials against firebase
    try {
      await auth.signInWithEmailAndPassword(email, password);
      this.setState({ isLoading: false, email: '', password: '' });
      //this.setState({ isLoading: false });
      this.props.history.push('/main');
      //console.log('user logged in and authenticated');

    } catch(err) {
        //console.log(err);
        this.setState({ failedLogin: true });
        this.setState({ isLoading: false });
      }
    
  };

  handleChange = event => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    let message = this.state.isLoading ? 'loading...' : '';

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
        {this.state.failedLogin ? <div style={{color:'red'}}> Incorrect username or password </div> : message }
        <Link style={{ textDecoration: 'none' }} to='/signup'>
          <p>
            No Account Yet? Register Now
          </p>
        </Link>

      </div>
    );
  }
}

export default withRouter(SignIn);
