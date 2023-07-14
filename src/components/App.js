import React from 'react'
import { connect } from 'react-redux';

import {fetchPosts} from '../actions/posts'
import {PostsList}  from './index.js';

class App extends React.Component {
  componentDidMount = () => {
    // fetchPosts calls an asynchronous action and save the posts in store
    this.props.dispatch(fetchPosts());
  }
  
  render() {
    console.log('props ', this.props);
    const {posts} = this.props;
    return (
      <div>
        <PostsList posts={posts} />
        hello
      </div>
    )
  }
}

// This fn helps to pass the props in our component 
function mapStateToProps(state) {
  return {
    posts : state.posts
  }
}

export default connect(mapStateToProps)(App);
