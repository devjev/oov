import { For, createState, createEffect } from 'solid-js'
import { JSX } from 'solid-js/jsx-runtime'
import { Api } from '../../core'

/**
 * <OoxmlDiagnostics hash=HASH />
 * Component showing diagnostics from OOXML validation.
 * @param props
 */
export function OoxmlDiagnostics<T extends OoxmlErrorsViewProperties>(props: T): JSX.Element {
  const core = new Api()
  const [state, setState] = createState({
    errors: [] as any[],
    stats: {} as any,
  })

  createEffect(() => {
    if (props.hash) {
      // TODO this should go through redux-saga
      // TODO also, seems like it might be a function for core functionality?
      core.getByHash(props.hash).then((payload) => {
        setState('errors', payload.value.errors)
        const freqMap = state.errors.reduce((acc, x) => {
          if (acc.hasOwnProperty(x.id)) {
            acc[x.id] += 1
          } else {
            acc[x.id] = 1
          }
          return acc
        }, {})
        setState('stats', Object.entries(freqMap))
      })
    }
  })

  return (
    <section class="ooxml-error-statistics">
      <h2>Results</h2>
      <div>hash: {props.hash}</div>
      <For each={state.stats}>
        {([id, freq]: any[]) => (
          <div class="error-entry">
            <div>
              <b>{id}</b> &rarr; {freq}
            </div>
          </div>
        )}
      </For>
    </section>
  )
}

export interface OoxmlErrorsViewProperties {
  hash?: string
}

export default OoxmlDiagnostics
