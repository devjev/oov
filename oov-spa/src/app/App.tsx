import '../style/index.scss'
import { JSX, For, createState } from 'solid-js'
import { Core, HistoryRecord } from '../core'

export function App(): JSX.Element {
  const core = new Core()
  const [state, setState] = createState({
    history: [] as HistoryRecord[],
  })

  core.getHistory().then((payload: HistoryRecord[]) => setState('history', payload))

  const clickHandler = (hash: string) => {
    return (_: Event) => {
      core.getByHash(hash).then((payload) => console.log(payload))
    }
  }

  return (
    <main>
      <ul>
        <For each={state.history}>
          {(record: HistoryRecord) => (
            <li>
              <div>
                hash:{' '}
                <a class="no-href" onClick={clickHandler(record.hash)}>
                  {record.hash}
                </a>
              </div>
              <div>fileName: {record.fileName}</div>
            </li>
          )}
        </For>
      </ul>
    </main>
  )
}

export default App
