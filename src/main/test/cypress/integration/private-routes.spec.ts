import * as Helpers from '../utils/helpers'

describe('Private routes', () => {
  it('Should logout if survey-list has no token', () => {
    cy.visit('/')
    Helpers.testUrl('/login')
  })
})
