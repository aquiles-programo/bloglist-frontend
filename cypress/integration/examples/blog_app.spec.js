/* eslint-disable no-undef */
describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Ulises Duran',
      username: 'uduran',
      password: '1113'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('Log in')
  })

  it('succeeds with correct credentials', function () {
    cy.contains('Log in').click()
    cy.get('#username').type('uduran')
    cy.get('#password').type('1113')
    cy.get('#login-button').click()
    cy.contains('Ulises Duran logged in')
  })

  it('fails with wrong credentials', function () {
    cy.contains('Log in').click()
    cy.get('#username').type('uduran')
    cy.get('#password').type('wrong')
    cy.get('#login-button').click()
    cy.contains('Wrong username or password')
  })

  describe('When logged in', () => {
    beforeEach(function () {
      cy.login({ username: 'uduran', password: '1113' })
      cy.createBlog({
        title: 'Blog Title',
        author: 'Blog Author',
        url: 'http://blogurl.com'
      })
    })

    it('A blog can be created', () => {
      cy.contains('Blog Title uduran')
    })

    it('A blog can be liked', () => {
      cy.contains('view').click()
      cy.get('#like-blog').click()
      cy.contains('Likes: 1')
    })

    it('A blog can be removed', () => {
      cy.contains('remove')
    })

    it('Blogs are sorted by likes', () => {
      cy.createBlog({
        title: 'New Blog',
        author: 'New Author',
        url: 'http://newblogurl.com',
        likes: '100'
      })
      cy.contains('New Blog').then(blogs => {
        cy.wrap(blogs[0]).contains('view').click()
        cy.contains('Likes: 100')
      })
    })
  })

})