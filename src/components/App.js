import React from 'react'
import { connect } from 'react-redux';
import { BrowserRouter as Router, Link, Routes, Route, Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

import { fetchPosts } from '../actions/posts'
// import {PostsList} from './index.js';
import PostsList from './PostsList';
import Navbar from './Navbar';
import Home from './Home';
import Page404 from './Page404';
import Login from './Login';
import Signup from './Signup';
import { authenticateUser } from '../actions/auth';
import Settings from "./Setting";
import UserProfile from './UserProfile';
import { fetchUserFriends } from '../actions/friends';

// const Login = () => {
//   return <div>Login</div>
// };

// const Home = () => {
//   return <div>Home</div>
// };

// const Signup = () => {
//   return <div>Signup</div>
// };

// const Settings = () => <div>Settings</div>;

// This is how we create private route
const PrivateRoute = ({ isLoggedin, children }) => {
  // Here children is the component we have wrapped in PrivateRoute
  const location = useLocation();
  // console.log('location ', location);
  const navigate = useNavigate();
  return isLoggedin ? children : navigate('/login', {
    state : {
      location : location.pathname
    }
  });

};

class App extends React.Component {
  componentDidMount = () => {
    // fetchPosts calls an asynchronous action and save the posts in store
    this.props.dispatch(fetchPosts());

    // In this we are decoding the info. of user using jwt token stored in local storage
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const user = jwt_decode(token);
        console.log('myuser', user);

        // In this we are storing the user in store 
        this.props.dispatch(authenticateUser({
          email: user.email,
          userId: user.userId,
          name: user.name,
        }));

        this.props.dispatch(fetchUserFriends(user.userId));
      } catch (error) {
        console.log('Invalid token:', error.message);
      }
    }
  }

  render() {
    console.log('App props ', this.props);
    const { posts, auth, friends } = this.props;
    return (
      // To do routing we enclose it in this
      <Router>
        <div>
          <Navbar />
          {/* <PostsList posts={posts} /> */}

          <ul>
            {/* Here instead of anchor tag we have used link tag bcz it helps us to go to other component without refreshing the page */}
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/login'>Login</Link>
            </li>
            <li>
              <Link to='/signup'>Signup</Link>
            </li>
          </ul>

        </div>
        <Routes>

          {/* exact helps us to go to exact route otherwise it renders home component with every component bcz '/' matches with everyone  */}
          {/* <Route exact={true} path='/' render={()=>{
              return <Home posts={posts} />
            }} /> */}
          <Route exact={true} path='/' element={<Home obj={this.props} posts={posts} friends={friends} isLoggedin={auth.isLoggedin} />} />
          <Route path='/login' element={<Login  />} />
          <Route path='/signup' element={<Signup />} />
          {/* This is how we create private route */}
          {/* <Route element={<PrivateRoute isLoggedin={auth.isLoggedin} />} >
              <Route path='/setting' element={Settings} isLoggedin={auth.isLoggedin} {...this.props} />
             </Route> */}
          <Route
            path='/setting'
            element={<PrivateRoute isLoggedin={auth.isLoggedin} >
              <Settings {...this.props} />
            </PrivateRoute>}
          />
          <Route
          // This is how we pass params in react
          // After /user whatever is passed is stored in userId variable
            path='/user/:userId'
            element={<PrivateRoute isLoggedin={auth.isLoggedin} >
              <UserProfile {...this.props} />
            </PrivateRoute>}
          />
          {/* When no route is matched or some other route which is not defined if someone tries to go there then it will render to this */}
          <Route path='*' element={<Page404 />} />
        </Routes>
      </Router>
    );
  }
}

// This fn helps to pass the props in our component 
function mapStateToProps(state) {
  return {
    posts: state.posts,
    auth: state.auth,
  }
}

export default connect(mapStateToProps)(App);
