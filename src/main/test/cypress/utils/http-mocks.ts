import faker from '@faker-js/faker'

type HttpMethod = 'GET' | 'POST'

export const mockUnauthorizedError = (
  url: RegExp,
  delay?: number
): void => {
  cy.intercept('POST', url, {
    statusCode: 401,
    body: { error: faker.random.words() },
    delay
  }).as('request')
}

export const mockForbiddenError = (
  url: RegExp,
  method: HttpMethod,
  delay?: number
): void => {
  cy.intercept(method, url, {
    statusCode: 403,
    body: { error: faker.random.words() },
    delay
  }).as('request')
}

export const mockServerError = (
  url: RegExp,
  method: HttpMethod,
  delay?: number
): void => {
  cy.intercept(method, url, {
    statusCode: faker.random.arrayElement([400, 404, 500]),
    body: { error: faker.random.words() },
    delay
  }).as('request')
}

export const mockSuccess = (
  url: RegExp,
  method: HttpMethod,
  response: any,
  delay?: number
): void => {
  cy.intercept(method, url, {
    statusCode: 200,
    body: response,
    delay
  }).as('request')
}
