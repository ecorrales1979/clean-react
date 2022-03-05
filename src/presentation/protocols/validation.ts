export interface Validation {
  validate: (fieldname: string, input: Record<string, any>) => string | null
}
