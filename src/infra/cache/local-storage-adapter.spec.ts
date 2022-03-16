import faker from '@faker-js/faker'
import 'jest-localstorage-mock'

import { LocalStorageAdapter } from './local-storage-adapter'

const makeSut = (): LocalStorageAdapter => new LocalStorageAdapter()

describe('LocalStorageAdapter', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('Should call localStorage.setItem with correct values', () => {
    const sut = makeSut()
    const key = faker.database.column()
    const value = JSON.parse(faker.datatype.json())
    sut.set(key, value)
    expect(localStorage.setItem).toHaveBeenCalledWith(key, JSON.stringify(value))
  })

  it('Should call localStorage.getItem with correct value', () => {
    const sut = makeSut()
    const key = faker.database.column()
    const value = faker.datatype.json()
    jest.spyOn(localStorage, 'getItem').mockReturnValueOnce(value)
    const objString = sut.get(key)
    expect(objString).toEqual(JSON.parse(value))
    expect(localStorage.getItem).toHaveBeenCalledWith(key)
  })
})
