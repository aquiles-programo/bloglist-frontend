import React, { useState } from 'react'
import blogService from '../services/blogs'

const CreateBlogForm = ({ handleAddedBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleBlogCreate = async (e) => {
    e.preventDefault()
    const newBlog = {
      title, author, url
    }
    const res = await blogService.create(newBlog)
    handleAddedBlog(res)

  }

  return (
    <div>
      <form id='add.blog.form' onSubmit = { handleBlogCreate }>
        <div>
            title:
          <input type = 'text' value = { title }
            name = 'title' id="title" required
            onChange = { ({ target }) => setTitle(target.value) }
          />
        </div>
        <div>
            author:
          <input type = 'text' value = { author }
            name = 'author' id="author" required
            onChange = { ({ target }) => setAuthor(target.value) }
          />
        </div>
        <div>
            url:
          <input type = 'text' value = { url }
            name = 'url' id="url" required
            onChange = { ({ target }) => setUrl(target.value) }
          />
        </div>
        <button id="new-blog-button" type="submit">Create</button>
      </form>
    </div>
  )
}

export default CreateBlogForm