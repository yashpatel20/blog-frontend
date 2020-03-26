import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Notification from './components/Notification'
import loginService from './services/login'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newFilterName, setNewFilterName] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [notifMessage, setNotifMessage] = useState([true, 'Read successful'])
  const [user, setUser] = useState(null)

  const blogFormRef = React.createRef()
  //Effects
  useEffect(() => {
    blogService.getAll().then(blogs => {
      blogs.sort((a, b) => a.likes - b.likes)
      setBlogs(blogs)
    })
  }, [])

  //TODO logout button
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  //button handlers
  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({
        username,
        password
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
    } catch (error) {
      window.localStorage.removeItem('loggedBlogappUser')
      setNotifMessage([false, 'Wrong credentials'])
      setTimeout(() => {
        setNotifMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  // const handleFilterNameChange = event => {
  //   setNewFilterName(event.target.value)
  //   setShowAll(false)
  // }

  const addBlog = async blogObject => {
    blogFormRef.current.toggleVisibility()
    try {
      const response = await blogService.create(blogObject)
      setBlogs(blogs.concat(response))
      setNotifMessage([true, 'Create successful'])
    } catch (error) {
      console.log(error)
      setNotifMessage([false, error.message])
    }
  }

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
  //forms
  const loginForm = () => (
    <Togglable buttonLabel="login">
      <LoginForm handleLogin={handleLogin} />
    </Togglable>
  )

  const blogForm = () => (
    <Togglable buttonLabel="new note" ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  //filter //add filtering using regex later
  const blogsToShow = showAll
    ? blogs
    : blogs.filter(blog => blog.name === newFilterName)
  const rows = blogsToShow.map(blog => {
    return (
      <div>
        <Blog
          key={blog.title}
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

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notifMessage} />

      {user === null ? (
        loginForm()
      ) : (
        <div>
          <p>
            {user.name} logged in <button onClick={handleLogout}>Logout</button>
          </p>
          <div>{blogForm()}</div>
          <div>{rows}</div>
        </div>
      )}

      {/* <div>
        Filter:{" "}
        <input value={newFilterName} onChange={handleFilterNameChange} />
      </div> */}
    </div>
  )
}

export default App
