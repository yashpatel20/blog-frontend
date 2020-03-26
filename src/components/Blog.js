import React from 'react'
import PropTypes from 'prop-types'

const Blog = ({ title, author, url, likes, updateLikes, deleteBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLikeButton = () => {
    const blogObject = {
      title: title,
      author: author,
      url: url,
      likes: likes + 1
    }
    updateLikes(blogObject)
  }

  const handleDeleteButton = () => {
    const blogObject = {
      title: title,
      author: author,
      url: url,
      likes: likes
    }
    deleteBlog(blogObject)
  }

  return (
    <li className="blog">
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
    </li>
  )
}

Blog.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  deleteBlog: PropTypes.func.isRequired
}

export default Blog
