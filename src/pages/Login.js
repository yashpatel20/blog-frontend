import React, { useState, useEffect } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'
import LoginForm from '../components/LoginForm'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const Login = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

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
      // setNotifMessage([false, 'Wrong credentials'])
      // setTimeout(() => {
      //   // setNotifMessage(null)
      // }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }
  return (
    <div>
      <LoginForm handleLogin={handleLogin} />
    </div>
  )
}

export default Login
