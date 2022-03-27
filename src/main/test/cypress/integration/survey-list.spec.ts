import SurveyList from '../fixtures/survey-list.json'
import * as Helpers from '../utils/helpers'
import * as Http from '../utils/http-mocks'

const path = /surveys/

const mockUnexpectedError = (delay?: number): void => {
  Http.mockServerError(path, 'GET', delay)
}

const mockAccessDeniedError = (delay?: number): void => {
  Http.mockForbiddenError(path, 'GET', delay)
}

const mockSuccess = (delay?: number): void => {
  Http.mockSuccess(path, 'GET', SurveyList, delay)
}

describe('Survey List', () => {
  beforeEach(() => {
    cy.fixture('account').then(account => {
      Helpers.setLocalStorageItem('account', account)
    })
  })

  it('Should present error on UnexpectedError', () => {
    mockUnexpectedError()
    cy.visit('/')
    cy.getByTestId('error').should(
      'contain.text',
      'Algo de errado aconteceu. Tente novamente em breve'
    )
  })

  it('Should logout on AccessDeniedError', () => {
    mockAccessDeniedError()
    cy.visit('/')
    Helpers.testUrl('/login')
  })

  it('Should present correct username', () => {
    mockUnexpectedError()
    cy.visit('/')
    const { name } = Helpers.getLocalStorageItem('account')
    cy.getByTestId('username').should('contain.text', name)
  })

  it('Should logout on logout link click', () => {
    mockUnexpectedError()
    cy.visit('/')
    cy.getByTestId('logout').click()
    Helpers.testUrl('/login')
  })

  it('Should present survey items', () => {
    mockSuccess(50)
    cy.visit('/')
    cy.get('li:empty').should('have.length', 4)
    cy.get('li:not(empty)').should('have.length', 2)
    cy.get('li:nth-child(1)').then(li => {
      assert.equal(li.find('[data-testid="day"]').text(), '23')
      assert.equal(li.find('[data-testid="month"]').text(), 'jan')
      assert.equal(li.find('[data-testid="year"]').text(), '2020')
      assert.equal(li.find('[data-testid="question"]').text(), 'Question 1')
      cy.fixture('icons').then(icons => {
        assert.equal(li.find('[data-testid="icon"]').attr('src'), icons.thumbUp)
      })
    })
    cy.get('li:nth-child(2)').then(li => {
      assert.equal(li.find('[data-testid="day"]').text(), '05')
      assert.equal(li.find('[data-testid="month"]').text(), 'fev')
      assert.equal(li.find('[data-testid="year"]').text(), '2020')
      assert.equal(li.find('[data-testid="question"]').text(), 'Question 2')
      cy.fixture('icons').then(icons => {
        assert.equal(
          li.find('[data-testid="icon"]').attr('src'),
          icons.thumbDown
        )
      })
    })
  })
})
