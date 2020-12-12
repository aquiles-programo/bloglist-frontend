/* eslint-disable linebreak-style */
import React, { useState, useEffect } from 'react'
import Blog from './Blog'
import blogService from '../services/blogs'

const Blogs = () => {
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )

  }, [])

  return (
    <div>
      {
        blogs.map(blog => <Blog key = {blog.id} blog = {blog} />)
      }
    </div>
  )
}

export default Blogs
