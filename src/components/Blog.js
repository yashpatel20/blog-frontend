import React from "react";
const Blog = ({ title, author, url, likes, updateLikes, deleteBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5
  };

  const handleLikeButton = event => {
    const blogObject = {
      title: title,
      author: author,
      url: url,
      likes: likes + 1
    };
    updateLikes(blogObject);
  };

  const handleDeleteButton = event => {
    const blogObject = {
      title: title,
      author: author,
      url: url,
      likes: likes
    };
    deleteBlog(blogObject);
  };

  return (
    <div style={blogStyle}>
      <div>{title}</div>
      <div>{author}</div>
      <div>{url}</div>
      <div>
        {likes} <button onClick={handleLikeButton}>Like</button>
      </div>
      <div>
        <button onClick={handleDeleteButton}>Delete</button>
      </div>
    </div>
  );
};

export default Blog;
