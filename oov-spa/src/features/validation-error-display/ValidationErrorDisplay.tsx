import { JSX, createSignal, createMemo, createEffect, on } from 'solid-js'
import { ValidationResult } from '../../app/api'
import { ValidationErrorList } from './ValidationErrorList'
import { ValidationErrorStatistics } from './ValidationErrorStatistics'

export interface ValidationErrorDisplayProperties {
  validationResults: ValidationResult
}

export function ValidationErrorDisplay<T extends ValidationErrorDisplayProperties>(props: T): JSX.Element {
  const [selectedErrorId, setErrorId] = createSignal(undefined as string | undefined)

  //The effect below is done, so that the <ValidationErrorList /> disappears
  //after we switch to another validation result, otherwise it might be a bit
  //confusing to the users
  const validationResult = createMemo(() => props.validationResults)
  createEffect(
    on(validationResult, (_) => {
      setErrorId(undefined)
    })
  )
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
