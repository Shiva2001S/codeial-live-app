import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import CreatePost from './CreatePost';
import Post from './Post';

class PostsList extends React.Component {
  render() {
    const { posts } = this.props;
    return (
      <div className="posts-list">
        <CreatePost />
        {posts.map((post) => (
          <Post post={post} key={post.id} />
        ))}
      </div>
    );
  }
}

// It helps us to remind us to import the prop in the form ie. array , string as we needed
PostsList.propTypes = {
  // Here we defining the prop name , its type and that it is required
  posts: PropTypes.array.isRequired
};

export default PostsList;
