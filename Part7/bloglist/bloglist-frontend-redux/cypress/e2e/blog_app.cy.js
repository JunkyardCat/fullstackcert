describe('Blog App', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'mowgly',
      username: 'manchild',
      password: 'password',
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })
  it('front page can be opened', function() {
    cy.contains('blogs')

  })
  /*
  it('login form can be opened', function() {
          cy.get('input:first').type('name')
          cy.get('input:last').type('12345')
     cy.contains('login').click()
  })
  */
  describe('Login',function() {

    it('succeeds with correct credentials', function() {
      cy.get('#username').type('manchild')
      cy.get('#password').type('12345')
      cy.get('#login-button').click()
      cy.get('html').should('not.contain','manchild logged in')
    })
    it('fails with wrong credentials', function() {
      cy.get('#username').type('manchild')
      cy.get('#password').type('password')
      cy.get('#login-button').click()
      cy.contains('manchild logged in')
    })
  })



  describe('when logged in', function() {
    beforeEach(function() {

      cy.get('#username').type('manchild')
      cy.get('#password').type('password')
      cy.get('#login-button').click()
      cy.contains('manchild logged in')
    })
    it('a blog can be created', function(){
      cy.contains('new blog').click()
      cy.get('#input-title').type('a blog created by cypress e2e testing')
      cy.get('#input-author').type('some author')
      cy.get('#input-url').type('some url')
      cy.contains('add blog').click()
      cy.contains('a blog created by cypress e2e testing')
    })
    describe('blog exists', function(){
      beforeEach(function (){
        cy.contains('new blog').click()
        cy.get('#input-title').type('a blog created by cypress e2e testing')
        cy.get('#input-author').type('pokemon')
        cy.get('#input-url').type('peter')
        cy.contains('add blog').click()
        cy.get('#input-title').type('the blog awesomeness')
        cy.get('#input-author').type('sister')
        cy.get('#input-url').type('pikachi')
        cy.contains('add blog').click()
        cy.get('#input-title').type('how is my darling')
        cy.get('#input-author').type('gulag')
        cy.get('#input-url').type('some url')
        cy.contains('add blog').click()
      })

      it('blog can be liked', function(){
        cy.wait(500)
        cy.contains('a blog created by cypress e2e testing').parent().find('button').click()
        cy.get('#like-button').click()
      })
      it('blog can be deleted', function(){
        cy.wait(500)
        cy.contains('a blog created by cypress e2e testing').parent().find('button').click()
        cy.get('#delete-button').click()
        cy.get('html').should('not.contain','a blog created by cypress e2e testing')
      })
      it('only owner can see the delete button', function(){
        const user = {
          name: 'wutai',
          username: 'foundation',
          password: 'lolol',
        }
        cy.request('POST', 'http://localhost:3003/api/users/', user)
        cy.contains('log out').click()
        cy.get('#username').type('foundation')
        cy.get('#password').type('lolol')
        cy.get('#login-button').click()

        cy.contains('a blog created by cypress e2e testing').parent().find('button').click()
        cy.get('html').should('not.contain','delete')

      })
      it.only('check if blogs are sorted in order with highest likes first', function(){
        //cy.contains("the blog awesomeness").parent().find('button').as('theShowButton01')
        //     cy.get('@theShowButton01').click()
        //cy.contains("the blog awesomeness").parent().find('button').click()
        cy.wait(500)
        cy.contains('the blog awesomeness').parent().find('button').click()
        cy.get('#like-button').click().wait(500).click().wait(500)
        cy.contains('the blog awesomeness').parent().find('button').click()
        cy.contains('how is my darling').parent().find('button').click()
        cy.get('#like-button').click().wait(500).click().wait(500).click().wait(500)
        cy.get('.blog').eq(0).should('contain','how is my darling')
        cy.get('.blog').eq(1).should('contain','the blog awesomeness')
        cy.get('.blog').eq(2).should('contain','a blog created by cypress e2e testing')

      })
    })

  })


})

