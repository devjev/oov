import './history-list.scss'
import { JSX, For, createState } from 'solid-js'
import { Api, HistoryRecord } from '../../core'
import { InlineMonospace } from '../../ui'

export function HistoryList(): JSX.Element {
  const api = new Api()
  const [state, setState] = createState({
    currentResultHash: undefined as string | undefined,
    history: [] as HistoryRecord[],
  })

  api.getHistory().then((payload: HistoryRecord[]) => setState('history', payload))

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
