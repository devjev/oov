import './history-list.scss'
import { JSX, For, createState } from 'solid-js'
import { InlineMonospace } from '../../ui'
import { HistoryRecord } from '../../app/api'
import { store } from '../../app/store'

export function HistoryList(): JSX.Element {
  const [state, setState] = createState({
    currentResultHash: undefined as string | undefined,
    history: [] as HistoryRecord[],
  })

  store.subscribe(() => {
    const storeState = store.getState()
    setState('history', storeState.history.value)
  })

  return (
    <ul class="history-list">
      <For each={state.history}>
        {(record: HistoryRecord) => (
          <li>
            <div>
              <InlineMonospace>
                <a class="no-href">{record.hash}</a>
              </InlineMonospace>
            </div>
            <div>
              <InlineMonospace>{record.fileName}</InlineMonospace>
            </div>
          </li>
        )}
      </For>
    </ul>
  )
}
