import faker from '@faker-js/faker'
import { fireEvent, screen } from '@testing-library/react'

export const testStatusForField = (fieldName: string, validationError?: string): void => {
  const wrap = screen.getByTestId(`${fieldName}-wrap`)
  expect(wrap).toHaveAttribute('data-status', validationError ? 'invalid' : 'valid')
  const field = screen.getByTestId(fieldName)
  expect(field).toHaveProperty('title', validationError ?? '')
  const label = screen.getByTestId(`${fieldName}-label`)
  expect(label).toHaveProperty('title', validationError ?? '')
}

export const populateField = (fieldName: string, value = faker.random.word()): void => {
  const input = screen.getByTestId(fieldName)
  fireEvent.input(input, { target: { value } })
}
