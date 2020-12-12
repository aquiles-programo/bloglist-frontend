import React from 'react'
import { cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import CreateBlogForm from './CreateBlogForm'


describe('Blog display tests', () => {
  let component
  let likeBlog = jest.fn()
  afterEach(cleanup)
  beforeEach(() => {
    const blog = {
      'likes': '0',
      'title': 'New Title',
      'author': 'uduran',
      'url': 'https://www.instagram.com/p/CHgYYozlj32/',
      'user': {
        'username': 'uduran',
        'name': 'Ulises Duran',
        'id': '5fc7140ad5ef757181d046c7'
      },
      'id': '5fcd656f92f131799caf2180'
    }
    component = render(
      <Blog blog={blog} likeBlog={likeBlog} />
    )

  })

  test('should render content', () => {
    expect(component.container).toHaveTextContent(
      'New Title uduran'
    )
  })

  test('like handler should be called twice when button is clicked twice', () => {
    const button = component.getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)

    expect(likeBlog.mock.calls).toHaveLength(0)

  })
  test('should call the handler for adding a new blog', () => {
    const handleAddedBlog = jest.fn()

    const formComponent = render(
      <CreateBlogForm handleAddedBlog={handleAddedBlog} />
    )
    const title = formComponent.container.querySelector('#title')
    const author = formComponent.container.querySelector('#author')
    const url = formComponent.container.querySelector('#url')

    fireEvent.change(title, {
      target: { value: 'Blog Title' }
    })
    fireEvent.change(author, {
      target: { value: 'Blog Author' }
    })
    fireEvent.change(url, {
      target: { value: 'Blog Url' }
    })
    const form = formComponent.container.querySelector('form')
    fireEvent.submit(form)

    expect(handleAddedBlog.mock.calls).toHaveLength(0)
  })

  test('should render details when button is clicked', () => {
    const button = component.getByText('view')
    fireEvent.click(button)

    const div = component.container.querySelector('.blog-details')
    expect(div).not.toHaveStyle('display: none')

    expect(component.container).toHaveTextContent(
      'https://www.instagram.com/p/CHgYYozlj32/ 0'
    )
  })



})