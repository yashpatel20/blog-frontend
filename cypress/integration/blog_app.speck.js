describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'testName',
      username: 'testUsername',
      password: 'qwerty'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function() {
    cy.visit('http://localhost:3000')
    cy.contains('blogs')
  })

  it('login form is not visible by default', () => {
    cy.visit('http://localhost:3000')
    cy.not.contains('username')
  })

  it('login succeeds with correct credentials', function() {
    cy.visit('http://localhost:3000')
    cy.contains('login').click()
    cy.get('#username').type('testUsername')
    cy.get('#password').type('qwerty')
    cy.get('#login-button').click()
    cy.contains('testName logged in')
  })

  it.only('login fails with wrong credentials', function() {
    cy.contains('login').click()
    cy.get('#username').type('testUsername')
    cy.get('#password').type('wrong')
    cy.get('#login-button').click()
    cy.contains('Wrong credentials')
    cy.get('html').should('not.contain', 'testName logged in')
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'testUsername', password: 'qwerty' })
    })
    it('a new blog can be created', function() {
      cy.contains('new note').click()
      cy.get('#title').type('cypress title')
      cy.get('#author').type('cypress author')
      cy.get('#url').type('cypress.com')
      cy.get('#likes').type(123)
      cy.contains('add').click()
      cy.contains('cypress title')
    })
    describe('and a blog exists', function() {
      beforeEach(function() {
        cy.createBlog({
          title: 'title1',
          auhtor: 'author1',
          url: 'url1',
          likes: 1
        })
        cy.createBlog({
          title: 'title2',
          auhtor: 'author2',
          url: 'url2',
          likes: 2
        })
        cy.createBlog({
          title: 'title3',
          auhtor: 'author3',
          url: 'url3',
          likes: 3
        })
      })

      it('user can like a blog', function() {})
      it('user can delete a blog', function() {})
      it('blogs are ordered by likes', function() {})
    })
  })
})
