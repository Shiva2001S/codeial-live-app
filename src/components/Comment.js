import React from 'react';

function Comment({ comment }) {
  console.log('comment ', comment);
  return (
    <div className="post-comment-item">
      <div className="post-comment-header">
        <span className="post-comment-author">{comment.user && comment.user.name}</span>
        <span className="post-comment-time">a minute ago</span>
        {/* <span className="post-comment-likes">{comment.likes.length} likes</span> */}
      </div>

      <div className="post-comment-content">{comment && comment.content}</div>
    </div>
  );
}

export default Comment;
