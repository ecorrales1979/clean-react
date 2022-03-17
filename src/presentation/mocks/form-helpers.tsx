import faker from '@faker-js/faker'
import { fireEvent, screen } from '@testing-library/react'

export const testChildCount = (fieldName: string, count: number): void => {
  const element = screen.getByTestId(fieldName)
  expect(element.childElementCount).toBe(count)
}

export const testButtonIsDisabled = (fieldName: string, isDisabled: boolean): void => {
  const element = screen.getByTestId<HTMLButtonElement>(fieldName)
  expect(element.disabled).toBe(isDisabled)
}

export const testStatusForField = (fieldName: string, validationError?: string): void => {
  const wrap = screen.getByTestId(`${fieldName}-wrap`)
  expect(wrap.getAttribute('data-status')).toBe(validationError ? 'invalid' : 'valid')
  const field = screen.getByTestId(fieldName)
  expect(field.title).toBe(validationError ?? '')
  const label = screen.getByTestId(`${fieldName}-label`)
  expect(label.title).toBe(validationError ?? '')
}

export const populateField = (fieldName: string, value = faker.random.word()): void => {
  const input = screen.getByTestId(fieldName)
  fireEvent.input(input, { target: { value } })
}
