import faker from '@faker-js/faker'

import account from '../fixtures/account.json'
import * as Http from '../utils/http-mocks'
import * as FormHelpers from '../utils/form-helpers'
import * as Helpers from '../utils/helpers'

const path = /login/

const mockInvalidCredentialsError = (delay?: number): void => {
  Http.mockUnauthorizedError(path, delay)
}

const mockUnexpectedError = (delay?: number): void => {
  Http.mockServerError(path, 'POST', delay)
}

const mockSuccess = (delay?: number): void => {
  Http.mockSuccess(
    path,
    'POST',
    account,
    delay
  )
}

const populateFields = (): void => {
  cy.getByTestId('email').focus().type(faker.internet.email())
  cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5))
}

const simulateValidSubmit = (): void => {
  populateFields()
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
    populateFields()
    FormHelpers.testInputStatus('email')
    FormHelpers.testInputStatus('password')
    cy.getByTestId('submit').should('not.be.disabled')
    cy.getByTestId('loading-wrap').should('not.have.descendants')
  })

  it('Should present InvalidCredentialsError on 401', () => {
    mockInvalidCredentialsError(50)
    simulateValidSubmit()
    FormHelpers.testLoading()
    cy.wait('@request')
    FormHelpers.testMainError('Credenciais inválidas')
    Helpers.testUrl('/login')
  })

  it('Should present UnexpectedError on 400', () => {
    mockUnexpectedError(50)
    simulateValidSubmit()
    FormHelpers.testLoading()
    cy.wait('@request')
    FormHelpers.testMainError('Erro de autenticação')
    Helpers.testUrl('/login')
  })

  it('Should save account if valid credentials are provided', () => {
    mockSuccess(50)
    Http.mockSuccess(/\//, 'GET', [])
    simulateValidSubmit()
    FormHelpers.testLoading()
    cy.wait('@request')
    cy.getByTestId('spinner').should('not.exist')
    cy.getByTestId('main-error').should('not.exist')
    Helpers.testLocalStorageItem('account')
    Helpers.testUrl('/')
  })

  it('Should prevent multiple submits', () => {
    mockSuccess(50)
    cy.getByTestId('email').focus().type(faker.internet.email())
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5))
    cy.getByTestId('submit').dblclick()
    cy.wait('@request')
    Helpers.testHttpCallsCount(1)
  })

  it('Should call submit if enter key is pressed', () => {
    mockSuccess(50)
    populateFields()
    cy.getByTestId('password').type('{enter}')
    Helpers.testHttpCallsCount(1)
  })

  it('Should prevent request to be called if form is invalid', () => {
    mockSuccess()
    cy.getByTestId('email').focus().type(faker.random.word())
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5)).type('{enter}')
    Helpers.testHttpCallsCount(0)
  })
})
