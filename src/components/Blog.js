import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles({
  root: {
    minWidth: 150,
    marginBottom: 25
  }
})

const Blog = ({
  title,
  author,
  url,
  likes,
  userHandle,
  updateLikes,
  deleteBlog
}) => {
  const classes = useStyles()
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
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {title}
        </Typography>
        <Typography color="textSecondary">{author}</Typography>
        <Typography color="textSecondary">{url}</Typography>
        <Typography color="textSecondary">{likes}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" onClick={handleLikeButton}>
          Like
        </Button>
        <Button size="small" color="secondary" onClick={handleDeleteButton}>
          Delete
        </Button>
      </CardActions>
    </Card>
    // <div>
    //   {/* <div>{title}</div>
    //   <div>{author}</div>
    //   <div>{url}</div>
    //   <div>
    //     {likes} <button onClick={handleLikeButton}>Like</button>
    //   </div>
    //   <div>
    //     <button onClick={handleDeleteButton}>Delete</button>
    //   </div> */}
    // </div>
  )
}

Blog.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  deleteBlog: PropTypes.func.isRequired
}

export default Blog
