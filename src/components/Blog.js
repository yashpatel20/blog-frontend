import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const styles = {
  card: {
    position: 'relative',
    display: 'flex',
    marginBottom: 20
  },
  image: {
    minWidth: 200
  },
  content: {
    padding: 25,
    objectFit: 'cover'
  }
}

const Blog = ({ title, author, url, likes, updateLikes, deleteBlog }) => {
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
  const classes = useStyles()
  const bull = <span className={classes.bullet}>•</span>
  return (
    <div>
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
  )
}

Blog.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  deleteBlog: PropTypes.func.isRequired
}

export default Blog
