import { JSX, createSignal } from 'solid-js'
import { ValidationResult } from '../../app/api'
import { ValidationErrorList } from './ValidationErrorList'
import { ValidationErrorStatistics } from './ValidationErrorStatistics'

export interface ValidationErrorDisplayProperties {
  validationResults: ValidationResult
}

export function ValidationErrorDisplay<T extends ValidationErrorDisplayProperties>(props: T): JSX.Element {
  const [selectedErrorId, setErrorId] = createSignal(undefined as string | undefined)
  return (
    <>
      <ValidationErrorStatistics
        validationResult={props.validationResults}
        onClick={(errorId) => setErrorId(errorId)}
      />
      <ValidationErrorList validationResult={props.validationResults} errorId={selectedErrorId()} />
    </>
  )
}
