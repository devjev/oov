import { JSX, createMemo, Show, For } from 'solid-js'
import { ValidationResult } from '../../app/api'
import { InlineMonospace } from '../../ui'

export interface ValidationErrorListProperties {
  validationResult: ValidationResult
  errorId?: string
}

export function ValidationErrorList<T extends ValidationErrorListProperties>(props: T): JSX.Element {
  const contents = createMemo(() => {
    if (props.errorId) {
      return props.validationResult.errors.filter((err) => err.id === props.errorId)
    } else {
      return []
    }
  })
  return (
    <Show when={contents().length > 0}>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>XML</th>
          </tr>
        </thead>
        <tbody>
          <For each={contents()}>
            {(err, i) => {
              return (
                <tr>
                  <td>{i()}</td>
                  <td>
                    <InlineMonospace>{err.xml}</InlineMonospace>
                  </td>
                </tr>
              )
            }}
          </For>
        </tbody>
      </table>
    </Show>
  )
}
