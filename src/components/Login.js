import React, { Component } from 'react'
import { connect } from 'react-redux';
import {Navigate, useLocation } from 'react-router-dom';

import { clearAuthState, login } from '../actions/auth';
class Login extends Component {
  constructor(props) {
    super(props);
    // this.emailInputRef = React.createRef();
    // this.passwordInputRefInputRef = React.createRef();

    this.state = {
      email: '',
      password: '',
    };
  }

  componentWillUnmount = () => {
    this.props.dispatch(clearAuthState());
  }
  

  handleEmailChange = (e) => {
    console.log(e.target.value);
    this.setState({
      email: e.target.value
    });
  }

  handlePasswordChange = (e) => {
    console.log(e.target.value);
    this.setState({
      password: e.target.value
    });
  }

  handleFormSubmit = (e) => {
    // console.log('this.emailInputRef ', this.emailInputRef);
    // console.log('this.passwordInputRef ', this.passwordInputRefInputRef);
    e.preventDefault();
    console.log(this.state);
    const { email, password } = this.state;
    if (email && password) {
      this.props.dispatch(login(email, password));
    }
  };

  render() {
    const { error, inProgress, isLoggedin } = this.props.auth;
    const {location} = this.props;
    // const location = locationfinder();
    console.log('myprops ', this.props.location);
    const {from} = (location && location.state) || {from : {pathname : '/'}};
    // If the user is already logged in then we are simply redirecting him to home page
    if(isLoggedin){
      return <Navigate to={from} />
    }
    return (
      <form className='login-form'>
        <span className='login-signup-header'>Log In</span>
        {error && <div className='alert error-dailog'>{error}</div>}
        <div className='field'>
          <input
            type='email'
            placeholder='Email'
            required
            // ref={this.emailInputRef} 
            onChange={this.handleEmailChange}
            value={this.state.email}
          />
        </div>
        <div className='field'>
          <input
            type='password'
            placeholder='Password'
            required
            // ref={this.passwordInputRef} 
            onChange={this.handlePasswordChange}
            value={this.state.password}
          />
        </div>
        <div className='field'>
          {/* if inProgress is true then button will be disabled */}
          {inProgress ? 
              (<button onClick={this.handleFormSubmit} disabled={inProgress}>Log in...</button>) :
              (<button onClick={this.handleFormSubmit} disabled={inProgress}>Log In</button>)
          }
        </div>
      </form>
    )
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(Login);