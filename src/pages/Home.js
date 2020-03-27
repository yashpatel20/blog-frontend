import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import blogService from '../services/blogs'
import Blog from '../components/Blog'

const Home = () => {
  const [blogs, setBlogs] = useState([])
  const [notifMessage, setNotifMessage] = useState([true, 'Read successful'])

  useEffect(() => {
    blogService.getAll().then(blogs => {
      blogs.sort((a, b) => a.likes - b.likes)
      setBlogs(blogs)
    })
  }, [])

  const updateLikes = async blogObject => {
    try {
      const findBlog = blogs.find(item => item.title === blogObject.title)
      const response = await blogService.update(findBlog.id, blogObject)
      const newBlogs = blogs
        .map(blog => (blog.title === findBlog.title ? response : blog))
        .sort((a, b) => a.likes - b.likes)
      setBlogs(newBlogs)
      setNotifMessage([true, 'Update successful'])
    } catch (error) {
      console.log(error)
      setNotifMessage([false, error.message])
    }
  }

  const deleteBlog = async blogObject => {
    try {
      const findBlog = blogs.find(item => item.title === blogObject.title)
      await blogService.deleteReq(findBlog.id)
      const newBlogs = blogs
        .filter(blog => blog.title !== findBlog.title)
        .sort((a, b) => a.likes - b.likes)
      setBlogs(newBlogs)
      setNotifMessage([true, 'Delete successful'])
    } catch (error) {
      console.log(error)
      setNotifMessage([false, error.message])
    }
  }

  const rows = blogs ? (
    blogs.map(blog => {
      return (
        <div>
          <Blog
            key={blog.id}
            title={blog.title}
            author={blog.author}
            url={blog.url}
            likes={blog.likes}
            updateLikes={updateLikes}
            deleteBlog={deleteBlog}
          />
        </div>
      )
    })
  ) : (
    <p>Loading ...</p>
  )

  return (
    <Grid container>
      <Grid item sm={8} xs={12}>
        <p>{rows}</p>
      </Grid>
      <Grid item sm={4} xs={12}>
        <p>Profile</p>
      </Grid>
    </Grid>
  )
}

export default Home
