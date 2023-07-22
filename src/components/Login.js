import React, { Component } from 'react'

export default class Login extends Component {
    constructor(props){
        super(props);
        // this.emailInputRef = React.createRef();
        // this.passwordInputRefInputRef = React.createRef();

        this.state = {
          email : '',
          password : '',
        }
    }

    handleEmailChange = (e) => {
      console.log(e.target.value);
      this.setState({
        email : e.target.value
      });
    }
    
    handlePasswordChange = (e) => {
      console.log(e.target.value);
      this.setState({
        password : e.target.value
      });
    }

    handleFormSubmit = (e)=>{
        e.preventDefault();
        console.log(this.state);
        // console.log('this.emailInputRef ', this.emailInputRef);
        // console.log('this.passwordInputRef ', this.passwordInputRefInputRef);
    }
  render() {
    return (
      <form className='login-form'>
        <span className='login-signup-header'>Log In</span>
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
            <button onClick={this.handleFormSubmit}>Log In</button>
        </div>
      </form>
    )
  }
}
