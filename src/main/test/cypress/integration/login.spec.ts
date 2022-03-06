import faker from '@faker-js/faker'

const baseUrl = Cypress.config('baseUrl')

describe('Login', () => {
  beforeEach(() => {
    cy.visit('/login')
    cy.window().then(w => w.localStorage.clear())
  })

  it('Should load with correct initial state', () => {
    cy.getByTestId('email').should('have.attr', 'readonly')
    cy.getByTestId('password').should('have.attr', 'readonly')
    cy.getByTestId('email-status')
      .should('have.attr', 'title', 'Campo obrigatório')
      .should('contain.text', '🔴')
    cy.getByTestId('password-status')
      .should('have.attr', 'title', 'Campo obrigatório')
      .should('contain.text', '🔴')
    cy.getByTestId('submit').should('be.disabled')
    cy.getByTestId('loading-wrap').should('not.have.descendants')
  })

  it('Should present error state if form is invalid', () => {
    cy.getByTestId('email').focus().type(faker.random.word())
    cy.getByTestId('email-status')
      .should('have.attr', 'title', 'email is invalid')
      .should('contain.text', '🔴')
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(3))
    cy.getByTestId('password-status')
      .should('have.attr', 'title', 'password is invalid')
      .should('contain.text', '🔴')
    cy.getByTestId('submit').should('be.disabled')
    cy.getByTestId('loading-wrap').should('not.have.descendants')
  })

  it('Should present valid state if form is valid', () => {
    cy.getByTestId('email').focus().type(faker.internet.email())
    cy.getByTestId('email-status')
      .should('have.attr', 'title', 'Tudo certo')
      .should('contain.text', '🟢')
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5))
    cy.getByTestId('password-status')
      .should('have.attr', 'title', 'Tudo certo')
      .should('contain.text', '🟢')
    cy.getByTestId('submit').should('not.be.disabled')
    cy.getByTestId('loading-wrap').should('not.have.descendants')
  })

  it('Should present InvalidCredentialsError on 401', () => {
    cy.intercept('POST', /login/, {
      statusCode: 401,
      body: { error: faker.random.words() },
      delay: 50
    })
    cy.getByTestId('email').focus().type(faker.internet.email())
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5))
    cy.getByTestId('submit').click()
    cy.getByTestId('spinner').should('exist')
    cy.getByTestId('main-error').should('not.exist')
    cy.getByTestId('spinner').should('not.exist')
    cy.getByTestId('main-error').should('contain.text', 'Credenciais inválidas')
    cy.url().should('eq', `${baseUrl}/login`)
  })

  it('Should present UnexpectedError on 400', () => {
    cy.intercept('POST', /login/, {
      statusCode: 400,
      body: { error: faker.random.words() },
      delay: 50
    })
    cy.getByTestId('email').focus().type(faker.internet.email())
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5))
    cy.getByTestId('submit').click()
    cy.getByTestId('spinner').should('exist')
    cy.getByTestId('main-error').should('not.exist')
    cy.getByTestId('spinner').should('not.exist')
    cy.getByTestId('main-error').should('contain.text', 'Erro de autenticação')
    cy.url().should('eq', `${baseUrl}/login`)
  })

  it('Should throw error if invalid data is returned', () => {
    cy.intercept('POST', /login/, {
      statusCode: 200,
      body: { invalidProperty: faker.datatype.uuid() },
      delay: 50
    })
    cy.getByTestId('email').focus().type(faker.internet.email())
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5))
    cy.getByTestId('submit').click()
    cy.getByTestId('spinner').should('exist')
    cy.getByTestId('main-error').should('not.exist')
    cy.getByTestId('spinner').should('not.exist')
    cy.getByTestId('main-error').should('contain.text', 'Erro de autenticação')
    cy.window().then(w => expect(w.localStorage.getItem('accessToken')).to.be.null)
    cy.url().should('eq', `${baseUrl}/login`)
  })

  it('Should save accessToken if valid credentials are provided', () => {
    cy.intercept('POST', /login/, {
      statusCode: 200,
      body: { accessToken: faker.datatype.uuid() },
      delay: 50
    })
    cy.getByTestId('email').focus().type(faker.internet.email())
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5))
    cy.getByTestId('submit').click()
    cy.getByTestId('spinner').should('exist')
    cy.getByTestId('main-error').should('not.exist')
    cy.getByTestId('spinner').should('not.exist')
    cy.window().then(w => assert.isOk(w.localStorage.getItem('accessToken')))
    cy.url().should('eq', `${baseUrl}/`)
  })
})
