import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, likeBlog, removeBlog, deletable }) => {
  const [visible, setVisible] = useState(false)
  const showWhenVisible = { display: visible ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleBlogLike = async () => {
    const updatedBlog = await blogService.like({
      user: blog.user.id,
      likes: (parseInt(blog.likes) + 1),
      author: blog.author,
      title: blog.title,
      url: blog.url
    }, blog.id)

    likeBlog(updatedBlog)
  }

  const handleBlogDelete = async () => {
    if (window.confirm(`Remove ${blog.title} by ${blog.author} ?`)) {
      const res = await blogService.removeBlog(blog.id)

      if (res.status === 204) {
        removeBlog(blog.id, false)
      } else {
        removeBlog(blog.id, true)
      }

    }
  }

  return (
    <div className = 'blog' style = {blogStyle}>
      <div>
        {blog.title} {blog.author} <button onClick = {toggleVisibility}> view </button>
      </div>
      <div style={showWhenVisible} className="blog-details">
        URL: {blog.url} <br></br>
        Likes: {blog.likes} <button id="like-blog" onClick = { handleBlogLike }> like </button> <br></br>
        Author: {blog.author} <br></br>

        {(deletable)
          ? <button onClick = { handleBlogDelete }> remove </button>
          : ''
        }
      </div>
    </div>

  )
}

export default Blog