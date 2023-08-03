import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import {logoutUser} from '../actions/auth';

class Navbar extends Component {
  logOut = ()=>{
    localStorage.removeItem('token');
    this.props.dispatch(logoutUser());
  }
  render() {
    const {auth } = this.props;
    return (
      <nav className="nav">
        <div className="left-div">
        <Link to='/'>
          <img
            src="https://ninjasfiles.s3.amazonaws.com/0000000000003454.png"
            alt="logo"
          />
        </Link>
        </div>
        <div className="search-container">
          <img
            className="search-icon"
            src="data:image/png;base64,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"
            alt="search-icon"
          />
          <input placeholder="Search" />
  
          <div className="search-results">
            <ul>
              <li className="search-results-row">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMIV9U3YBjg2f0zAnAqK1SKBJpPq-iSMWRPmWKgI-ceA&s"
                  alt="user-dp"
                />
                <span>John Doe</span>
              </li>
              <li className="search-results-row">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMIV9U3YBjg2f0zAnAqK1SKBJpPq-iSMWRPmWKgI-ceA&s"
                  alt="user-dp"
                />
                <span>John Doe</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="right-nav">
          {auth.isLoggedin && (
            <div className="user">
            <Link to='/setting'>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMIV9U3YBjg2f0zAnAqK1SKBJpPq-iSMWRPmWKgI-ceA&s"
                alt="user-dp"
                id="user-dp"
              />
            </Link>
            <span>{auth.user.name}</span>
          </div>
          )}
          <div className="nav-links">
            <ul>
              <Link to='/login'>
                {!auth.isLoggedin && (<li>Log in</li>)}
              </Link>
              
                {auth.isLoggedin && (<li onClick={this.logOut}>Log out</li>)}
              
              <Link to='signup'>
                {!auth.isLoggedin && (<li>Register</li>)}
              </Link>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}

function mapStateToProps(state) {
  return {
    auth : state.auth,
  };
}
export default connect(mapStateToProps)(Navbar);

