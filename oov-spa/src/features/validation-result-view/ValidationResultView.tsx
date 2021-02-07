import { JSX, createEffect, createSignal, Switch, Match } from 'solid-js'
import { fetch } from './validationResultSlice'
import { store } from '../../app/store'
import { ValidationResult } from '../../app/api'
import { Hash, InlineMonospace } from '../../ui'

export interface ValidationResultViewProperties {
  hash?: string
}

export function ValidationResultView<T extends ValidationResultViewProperties>(props: T): JSX.Element {
  const [resultData, setResultData] = createSignal(null as ValidationResult | null)
  const [mode, setMode] = createSignal('idle' as 'idle' | 'data-received')

  // this is necessary so that a Solid component dispatches the message
  // reactively to props change
  createEffect(() => {
    if (props.hash) {
      store.dispatch(fetch(props.hash))
    }
  })

  store.subscribe(() => {
    const storeState = store.getState()
    if (storeState.currentValidationResult !== null) {
      setResultData({ ...storeState.currentValidationResult })
      setMode('data-received')
    }
  })

  return (
    <section class="validation-result-view">
      <Switch>
        <Match when={mode() === 'data-received'}>
          <h1>{resultData()?.metadata.fileName}</h1>
          <table>
            <tbody>
              <tr>
                <th>File Hash</th>
                <td>
                  <InlineMonospace>
                    <Hash>{resultData()?.metadata.fileHash}</Hash>
                  </InlineMonospace>
                </td>
              </tr>
              <tr>
                <th>Validation Time</th>
                <td>{resultData()?.metadata.validationDateTime}</td>
              </tr>
            </tbody>
          </table>
        </Match>
      </Switch>
    </section>
  )
}
