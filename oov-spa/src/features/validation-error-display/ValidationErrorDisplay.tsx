import { JSX } from 'solid-js'
import { ValidationResult } from '../../app/api'
import { ValidationErrorStatistics } from './ValidationErrorStatistics'

export interface ValidationErrorDisplayProperties {
  validationResults: ValidationResult
}

export function ValidationErrorDisplay<T extends ValidationErrorDisplayProperties>(props: T): JSX.Element {
  return <ValidationErrorStatistics validationResult={props.validationResults} />
}
