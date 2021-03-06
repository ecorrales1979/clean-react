const baseUrl = Cypress.config('baseUrl')

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

export const setLocalStorageItem = (key: string, value: object): void => {
  localStorage.setItem(key, JSON.stringify(value))
}

export const getLocalStorageItem = (key: string): any => {
  const value = localStorage.getItem(key)
  return JSON.parse(value)
}
