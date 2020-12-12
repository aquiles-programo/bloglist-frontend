import React, { useEffect, useState, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import CreateBlogForm from './components/CreateBlogForm'
import loginService from './services/login'
import blogService from './services/blogs'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import './App.css'



const App = () => {
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [notification, setnotification] = useState({ message: null, type: null })
  const BlogFormref = useRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      setUser(user)
    }
    blogService.getAll().then(blogs =>
      setBlogs(blogs.sort((a, b) => b.likes - a.likes))
    )

  }, [])

  const handleUserLogin = async credentials => {
    try {
      const user = await loginService.login(credentials)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      displayNotification(`${user.name} has logged in`, 'success')
    } catch (error) {
      displayNotification('Wrong username or password', 'error')
      console.error(error)
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
    displayNotification('User logged out successfully', 'success')
  }

  const handleAddedBlog = (addedBlog) => {
    BlogFormref.current.toggleVisibility()
    setBlogs(blogs.concat(addedBlog))
    displayNotification('A new blog has been added', 'success')
  }

  const displayNotification = (message, type) => {
    setnotification({ message, type })
    setTimeout(() => {
      setnotification({ message: null, type: null })
    }, 5000)
  }

  const likeBlog = (updatedBlog) => {
    displayNotification('Blog liked!', 'success')
    const latestBlogs = blogs.map(b =>
      b.id === updatedBlog.id ? { ...b, likes: updatedBlog.likes } : b
    )
    setBlogs(latestBlogs.sort((a, b) => b.likes - a.likes))

  }

  const removeBlog = (blogId, err) => {
    if (err) {
      displayNotification('There has been an error', 'error')
    } else {
      displayNotification('Blog deleted successfully', 'success')
    }
    setBlogs(blogs.filter(blog => blog.id !== blogId))
  }

  if (!user) {
    return (
      <div>
        <Notification message={notification.message} type={notification.type} />
        <Togglable buttonLabel="Log in">
          <LoginForm handleUserLogin={handleUserLogin} />
        </Togglable>
      </div>
    )
  } else {
    return (
      <div>
        <h2>Blogs</h2>
        <Notification message={notification.message} type={notification.type} />

        <p>{`${user.name} logged in`} <button onClick={handleLogout}>Logout</button> </p>

        <Togglable buttonLabel="new blog" ref={BlogFormref}>
          <CreateBlogForm handleAddedBlog={handleAddedBlog} />
        </Togglable>

        <h2>Latest blogs</h2>
        {
          blogs.map(blog =>
            <Blog key={blog.id}
              blog={blog}
              likeBlog={likeBlog}
              removeBlog={removeBlog}
              deletable={(user.username === blog.user.username) ? true : false}
            />
          )
        }
      </div>
    )
  }


}

export default App