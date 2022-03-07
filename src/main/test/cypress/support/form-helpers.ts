const baseUrl = Cypress.config('baseUrl')

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

export const testHttpCallsCount = (count: number): void => {
  cy.get('@request.all').should('have.length', count)
}

export const testUrl = (path: string): void => {
  cy.url().should('eq', `${baseUrl}${path}`)
}

export const testLocalStorageItem = (item: string, error?: boolean): void => {
  const method = error ? 'isNull' : 'isOk'
  cy.window().then(w => assert[method](w.localStorage.getItem(item)))
}
