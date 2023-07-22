import React from 'react'
import { connect } from 'react-redux';
import { BrowserRouter as Router, Link, Routes, Route } from 'react-router-dom';

import { fetchPosts } from '../actions/posts'
// import {PostsList} from './index.js';
import PostsList from './PostsList';
import Navbar from './Navbar';
import Home from './Home';
import Page404 from './Page404';
import Login from './Login';

// const Login = () => {
//   return <div>Login</div>
// };

// const Home = () => {
//   return <div>Home</div>
// };

const Signup = () => {
  return <div>Signup</div>
};

class App extends React.Component {
  componentDidMount = () => {
    // fetchPosts calls an asynchronous action and save the posts in store
    this.props.dispatch(fetchPosts());
  }

  render() {
    console.log('props ', this.props);
    const { posts } = this.props;
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
            <Route exact={true} path='/' element={<Home obj={this.props} posts={posts} />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
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
    posts: state.posts
  }
}

export default connect(mapStateToProps)(App);
