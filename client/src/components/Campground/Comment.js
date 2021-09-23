import React from "react";

const Comment = ({author, text}) => (
  <div className="comment">
  <div className="comment-info">
    <p className="comment-author">{author.username}</p>
    <span className="comment-date">il y a 10 jours</span>
  </div>
  <p className="comment-description">{text}</p>
</div>
)

export default Comment;