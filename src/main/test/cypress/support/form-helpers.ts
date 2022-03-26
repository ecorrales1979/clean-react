export const testInputStatus = (field: string, error?: string): void => {
  const status = error ? 'invalid' : 'valid'
  const attr = `${error ? '' : 'not.'}have.attr`
  cy.getByTestId(`${field}-wrap`).should('have.attr', 'data-status', status)
  cy.getByTestId(field).should(attr, 'title', error)
  cy.getByTestId(`${field}-label`).should(attr, 'title', error)
}

export const testLoading = (): void => {
  cy.getByTestId('spinner').should('exist')
  cy.getByTestId('main-error').should('not.exist')
}

export const testMainError = (error: string): void => {
  cy.getByTestId('spinner').should('not.exist')
  cy.getByTestId('main-error').should('contain.text', error)
}
