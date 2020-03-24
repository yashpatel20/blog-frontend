import React from "react";
const Blog = props => (
  <div>
    <div>{props.title}</div>
    <div>{props.author}</div>
    <div>{props.url}</div>
    <div>{props.likes}</div>
  </div>
);

export default Blog;
