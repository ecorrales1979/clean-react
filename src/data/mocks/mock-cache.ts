import { SetStorage } from '@/data/protocols/cache/set-storage'

export class SetStorageMock implements SetStorage {
  public key?: string
  public value: any

  async set (key: string, value: any): Promise<void> {
    this.key = key
    this.value = value
  }
}
