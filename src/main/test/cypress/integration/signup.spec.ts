import faker from '@faker-js/faker'

import account from '../fixtures/account.json'
import * as Http from '../utils/http-mocks'
import * as FormHelpers from '../utils/form-helpers'
import * as Helpers from '../utils/helpers'

const path = /signup/

const mockEmailInUseError = (delay?: number): void => {
  Http.mockForbiddenError(path, 'POST', delay)
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
  cy.getByTestId('name').focus().type(faker.name.findName())
  cy.getByTestId('email').focus().type(faker.internet.email())
  const password = faker.random.alphaNumeric(5)
  cy.getByTestId('password').focus().type(password)
  cy.getByTestId('passwordConfirmation').focus().type(password)
}

const simulateValidSubmit = (): void => {
  populateFields()
  cy.getByTestId('submit').click()
}

describe('SignUp', () => {
  beforeEach(() => {
    cy.visit('signup')
  })

  it('Should load with correct initial state', () => {
    cy.getByTestId('name').should('have.attr', 'readonly')
    FormHelpers.testInputStatus('name', 'Campo obrigatório')
    cy.getByTestId('email').should('have.attr', 'readonly')
    FormHelpers.testInputStatus('email', 'Campo obrigatório')
    cy.getByTestId('password').should('have.attr', 'readonly')
    FormHelpers.testInputStatus('password', 'Campo obrigatório')
    cy.getByTestId('passwordConfirmation').should('have.attr', 'readonly')
    FormHelpers.testInputStatus('passwordConfirmation', 'Campo obrigatório')
    cy.getByTestId('submit').should('be.disabled')
    cy.getByTestId('loading-wrap').should('not.have.descendants')
  })

  it('Should present error state if form is invalid', () => {
    cy.getByTestId('name').focus().type(faker.random.alphaNumeric(1))
    FormHelpers.testInputStatus('name', 'name is invalid')
    cy.getByTestId('email').focus().type(faker.random.word())
    FormHelpers.testInputStatus('email', 'email is invalid')
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(3))
    FormHelpers.testInputStatus('password', 'password is invalid')
    cy.getByTestId('passwordConfirmation').focus().type(faker.random.alphaNumeric(5))
    FormHelpers.testInputStatus('passwordConfirmation', 'passwordConfirmation is invalid')
    cy.getByTestId('submit').should('be.disabled')
    cy.getByTestId('loading-wrap').should('not.have.descendants')
  })

  it('Should present valid state if form is valid', () => {
    populateFields()
    FormHelpers.testInputStatus('name')
    FormHelpers.testInputStatus('email')
    FormHelpers.testInputStatus('password')
    FormHelpers.testInputStatus('passwordConfirmation')
    cy.getByTestId('submit').should('not.be.disabled')
    cy.getByTestId('loading-wrap').should('not.have.descendants')
  })

  it('Should present EmailInUseError on 403', () => {
    mockEmailInUseError(50)
    simulateValidSubmit()
    FormHelpers.testLoading()
    cy.wait('@request')
    FormHelpers.testMainError('Esse e-mail já está em uso')
    Helpers.testUrl('/signup')
  })

  it('Should present UnexpectedError on error cases', () => {
    mockUnexpectedError(50)
    simulateValidSubmit()
    FormHelpers.testLoading()
    cy.wait('@request')
    FormHelpers.testMainError('Erro criando a conta')
    Helpers.testUrl('/signup')
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
    populateFields()
    cy.getByTestId('submit').dblclick()
    cy.wait('@request')
    Helpers.testHttpCallsCount(1)
  })

  it('Should call submit if enter key is pressed', () => {
    mockSuccess(50)
    populateFields()
    cy.getByTestId('passwordConfirmation').type('{enter}')
    Helpers.testHttpCallsCount(1)
  })

  it('Should prevent request to be called if form is invalid', () => {
    mockSuccess()
    cy.getByTestId('name').focus().type(faker.random.word())
    cy.getByTestId('email').focus().type(faker.random.word())
    cy.getByTestId('password')
      .focus()
      .type(faker.random.alphaNumeric(5))
    cy.getByTestId('passwordConfirmation')
      .focus()
      .type(faker.random.alphaNumeric(5))
      .type('{enter}')
    Helpers.testHttpCallsCount(0)
  })
})
