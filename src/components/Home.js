import React, { Component } from 'react'
import PostsList from './PostsList';
import FriendsList from './FriendsList';
import { connect } from 'react-redux';
class Home extends Component {
  render() {
    // console.log("Home ",this.props)
    console.log("obj ",this.props)
    const {posts, friends, isLoggedin} = this.props;
    return (
      <div>
        <PostsList posts={posts} />
        {isLoggedin && <FriendsList friends={friends} />}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    friends : state.friends,
  };
}

export default connect(mapStateToProps)(Home);
