import './history-list.css'
import { JSX, For, createState } from 'solid-js'
import { HistoryRecord } from '../../app/api'
import { store } from '../../app/store'
import { initialize } from './historySlice'
import { HistoryListItem } from './HistoryListItem'

// TODO this should be fixed, the slice and saga that deal with general app
// state and configuration, should be handled independently of any particular
// graphical feature
import { update } from '../command-bar/commandBarSlice'

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
      // Selecting an item in the History List should reset the view of the app
      // to 'view', because we are **viewing** a set or results
      const cfg = store.getState().commandBar
      const newCfg = { ...cfg, view: 'view' }
      store.dispatch(update(newCfg))
    }
  }

  return (
    <ul class="history-list">
      <For each={state.history}>
        {(record: HistoryRecord) => <HistoryListItem item={record} onClick={clickHandler(record.hash)} />}
      </For>
    </ul>
  )
}
