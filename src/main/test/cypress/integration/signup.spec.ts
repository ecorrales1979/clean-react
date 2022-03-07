import faker from '@faker-js/faker'

import * as Http from '../support/signup-mocks'
import * as FormHelpers from '../support/form-helpers'

const simulateValidSubmit = (): void => {
  cy.getByTestId('name').focus().type(faker.name.findName())
  cy.getByTestId('email').focus().type(faker.internet.email())
  const password = faker.random.alphaNumeric(6)
  cy.getByTestId('password').focus().type(password)
  cy.getByTestId('passwordConfirmation').focus().type(password)
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
    cy.getByTestId('name').focus().type(faker.name.findName())
    FormHelpers.testInputStatus('name')
    cy.getByTestId('email').focus().type(faker.internet.email())
    FormHelpers.testInputStatus('email')
    const password = faker.random.alphaNumeric(5)
    cy.getByTestId('password').focus().type(password)
    FormHelpers.testInputStatus('password')
    cy.getByTestId('passwordConfirmation').focus().type(password)
    FormHelpers.testInputStatus('passwordConfirmation')
    cy.getByTestId('submit').should('not.be.disabled')
    cy.getByTestId('loading-wrap').should('not.have.descendants')
  })

  it('Should present EmailInUseError on 403', () => {
    Http.mockEmailInUseError(50)
    simulateValidSubmit()
    FormHelpers.testLoading()
    cy.wait('@request')
    FormHelpers.testMainError('Esse e-mail já está em uso')
    FormHelpers.testUrl('/signup')
  })

  it('Should present UnexpectedError on error cases', () => {
    Http.mockUnexpectedError(50)
    simulateValidSubmit()
    FormHelpers.testLoading()
    cy.wait('@request')
    FormHelpers.testMainError('Erro criando a conta')
    FormHelpers.testUrl('/signup')
  })
})
