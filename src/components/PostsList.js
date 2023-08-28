import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import CreatePost from './CreatePost';

class PostsList extends React.Component {
  render() {
    const { posts } = this.props;
    return (
      <div className="posts-list">
        <CreatePost />
        {posts.map((post) => (
          <div className="post-wrapper" key={post.userId}>
            <div className="post-header">
              <div className="post-avatar">
                <Link to={`/user/${post.userId}`}>
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMIV9U3YBjg2f0zAnAqK1SKBJpPq-iSMWRPmWKgI-ceA&s"
                    alt="user-pic"
                  />
                </Link>
                <div>
                  <span className="post-author">{post.name}</span>
                  <span className="post-time">a minute ago</span>
                </div>
              </div>
              <div className="post-content">{post.body}</div>

              <div className="post-actions">
                <div className="post-like">
                  <img
                    src="https://e1.pxfuel.com/desktop-wallpaper/446/719/desktop-wallpaper-youtube-like-icon-png-thumbnail.jpg"
                    alt="likes-icon"
                  />
                  {/* <span>{post.likes.length}</span> */}
                </div>

                <div className="post-comments-icon">
                  <img
                    src="data:image/png;base64,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"
                    alt="comments-icon"
                  />
                  {/* <span>{post.body.length}</span> */}
                </div>
              </div>
              <div className="post-comment-box">
                <input placeholder="Start typing a comment" />
              </div>

              <div className="post-comments-list">
                <div className="post-comments-item">
                  <div className="post-comment-header">
                    <span className="post-comment-author">Bill</span>
                    <span className="post-comment-time">a minute ago</span>
                    <span className="post-comment-likes">22</span>
                  </div>

                  <div className="post-comment-content">Random comment</div>
                </div>
              </div>
            </div>
          </div>
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
