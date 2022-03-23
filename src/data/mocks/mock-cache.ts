import faker from '@faker-js/faker'

import { GetStorage } from '@/data/protocols/cache'

export class GetStorageSpy implements GetStorage {
  public key?: string
  public value = JSON.parse(faker.datatype.json())

  get (key: string): any {
    this.key = key
    return this.value
  }
}
