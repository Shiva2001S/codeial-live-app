import React, { Component } from 'react'
import PostsList from './PostsList';
export default class Home extends Component {
  render() {
    console.log("Home ",this.props)
    console.log("obj ",this.props.obj)
    const {posts} = this.props;
    return (
      <div>
        <PostsList posts={posts} />
      </div>
    )
  }
}
