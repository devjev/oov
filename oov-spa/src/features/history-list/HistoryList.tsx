import './history-list.scss'
import { JSX, For, createState } from 'solid-js'
import { Hash, InlineMonospace, Link } from '../../ui'
import { HistoryRecord } from '../../app/api'
import { store } from '../../app/store'
import { initialize } from './historySlice'

export interface HistoryListProperties {
  onSelect?: (hash: string) => void
}

/**
 * Component showing the list of validation result
 */
export function HistoryList<T extends HistoryListProperties>(props: T): JSX.Element {
  const [state, setState] = createState({
    currentResultHash: undefined as string | undefined,
    history: [] as HistoryRecord[],
  })

  store.subscribe(() => {
    const storeState = store.getState()
    setState('history', storeState.history)
  })

  store.dispatch(initialize({}))

  const clickHandler = (hash: string) => {
    return () => {
      if (props.onSelect) {
        props.onSelect(hash)
      }
    }
  }

  return (
    <ul class="history-list">
      <For each={state.history}>
        {(record: HistoryRecord) => (
          <li>
            <div>
              <Link onClick={clickHandler(record.hash)}>{record.fileName}</Link>
            </div>
            <div>
              <InlineMonospace>
                <Hash>{record.hash}</Hash>
              </InlineMonospace>
            </div>
          </li>
        )}
      </For>
    </ul>
  )
}