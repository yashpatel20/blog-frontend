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

  it('login form can be opened', function() {
    cy.visit('http://localhost:3000')
    cy.contains('login').click()
    cy.get('#username').type('testUsername')
    cy.get('#password').type('qwerty')
    cy.get('#login-button').click()
    cy.contains('testName logged in')
  })

  it.only('login fails with wrong password', function() {
    cy.contains('login').click()
    cy.get('#username').type('testUsername')
    cy.get('#password').type('wrong')
    cy.get('#login-button').click()
    cy.contains('Wrong credentials')
    cy.get('html').should('not.contain', 'testName logged in')
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.contains('login').click()
      cy.get('#username').type('testUsername')
      cy.get('#password').type('qwerty')
      cy.get('#login-button').click()
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
  })
})
