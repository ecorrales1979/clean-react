import { SetStorage } from '@/data/protocols/cache'

export class SetStorageMock implements SetStorage {
  public key?: string
  public value: any

  set (key: string, value: any): void {
    this.key = key
    this.value = value
  }
}
