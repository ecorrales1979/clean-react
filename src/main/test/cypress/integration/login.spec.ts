import faker from '@faker-js/faker'

import * as Http from '../support/login-mocks'
import * as FormHelpers from '../support/form-helpers'

const simulateValidSubmit = (): void => {
  cy.getByTestId('email').focus().type(faker.internet.email())
  cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5))
  cy.getByTestId('submit').click()
}

describe('Login', () => {
  beforeEach(() => {
    cy.visit('/login')
    cy.window().then(w => w.localStorage.clear())
  })

  it('Should load with correct initial state', () => {
    cy.getByTestId('email').should('have.attr', 'readonly')
    FormHelpers.testInputStatus('email', 'Campo obrigatório')
    cy.getByTestId('password').should('have.attr', 'readonly')
    FormHelpers.testInputStatus('password', 'Campo obrigatório')
    cy.getByTestId('submit').should('be.disabled')
    cy.getByTestId('loading-wrap').should('not.have.descendants')
  })

  it('Should present error state if form is invalid', () => {
    cy.getByTestId('email').focus().type(faker.random.word())
    FormHelpers.testInputStatus('email', 'email is invalid')
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(3))
    FormHelpers.testInputStatus('password', 'password is invalid')
    cy.getByTestId('submit').should('be.disabled')
    cy.getByTestId('loading-wrap').should('not.have.descendants')
  })

  it('Should present valid state if form is valid', () => {
    cy.getByTestId('email').focus().type(faker.internet.email())
    FormHelpers.testInputStatus('email')
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5))
    FormHelpers.testInputStatus('password')
    cy.getByTestId('submit').should('not.be.disabled')
    cy.getByTestId('loading-wrap').should('not.have.descendants')
  })

  it('Should present InvalidCredentialsError on 401', () => {
    Http.mockInvalidCredentialsError(50)
    simulateValidSubmit()
    FormHelpers.testLoading()
    cy.wait('@request')
    FormHelpers.testMainError('Credenciais inválidas')
    FormHelpers.testUrl('/login')
  })

  it('Should present UnexpectedError on 400', () => {
    Http.mockUnexpectedError(50)
    simulateValidSubmit()
    FormHelpers.testLoading()
    cy.wait('@request')
    FormHelpers.testMainError('Erro de autenticação')
    FormHelpers.testUrl('/login')
  })

  it('Should throw error if invalid data is returned', () => {
    Http.mockSuccess({ invalidProperty: faker.datatype.uuid() }, 50)
    simulateValidSubmit()
    FormHelpers.testLoading()
    cy.wait('@request')
    FormHelpers.testMainError('Erro de autenticação')
    FormHelpers.testLocalStorageItem('accessToken', true)
    FormHelpers.testUrl('/login')
  })

  it('Should save accessToken if valid credentials are provided', () => {
    Http.mockSuccess({ accessToken: faker.datatype.uuid() }, 50)
    simulateValidSubmit()
    FormHelpers.testLoading()
    cy.wait('@request')
    cy.getByTestId('spinner').should('not.exist')
    cy.getByTestId('main-error').should('not.exist')
    FormHelpers.testLocalStorageItem('accessToken')
    FormHelpers.testUrl('/')
  })

  it('Should prevent multiple submits', () => {
    Http.mockSuccess({ accessToken: faker.datatype.uuid() }, 50)
    cy.getByTestId('email').focus().type(faker.internet.email())
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5))
    cy.getByTestId('submit').dblclick()
    cy.wait('@request')
    FormHelpers.testHttpCallsCount(1)
  })

  it('Should call submit if enter key is pressed', () => {
    Http.mockSuccess({ accessToken: faker.datatype.uuid() }, 50)
    cy.getByTestId('email').focus().type(faker.internet.email())
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5)).type('{enter}')
    FormHelpers.testHttpCallsCount(1)
  })

  it('Should prevent request to be called if form is invalid', () => {
    Http.mockSuccess({ accessToken: faker.datatype.uuid() })
    cy.getByTestId('email').focus().type(faker.random.word())
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5)).type('{enter}')
    FormHelpers.testHttpCallsCount(0)
  })
})
