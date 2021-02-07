import { JSX } from 'solid-js/jsx-runtime'
import { ValidationResult } from '../../app/api'

export interface ValidationErrorDisplayProperties {
  validationResults: ValidationResult
}

export function ValidationErrorDisplay<T extends ValidationErrorDisplayProperties>(props: T): JSX.Element {
  return <></>
}
