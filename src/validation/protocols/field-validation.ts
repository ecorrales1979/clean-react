export interface FieldValidation {
  field: string
  validate: (input: Record<string, any>) => Error | null
}
