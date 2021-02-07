import { JSX } from 'solid-js/jsx-runtime'
import { ValidationResult } from '../../app/api'

export interface ValidationErrorStatisticsProperties {
  validationResult: ValidationResult
}

export function ValidationErrorStatistics<T extends ValidationErrorStatisticsProperties>(props: T): JSX.Element {
  return <></>
}
