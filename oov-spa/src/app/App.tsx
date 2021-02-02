import '../style/index.scss'
import { JSX, For, createState } from 'solid-js'
import { Core, HistoryRecord } from '../core'
import OoxmlDiagnostics from './OoxmlDiagnostics'

export function App(): JSX.Element {
  const core = new Core()
  const [state, setState] = createState({
    hash: undefined as string | undefined,
    history: [] as HistoryRecord[],
  })

  core.getHistory().then((payload: HistoryRecord[]) => setState('history', payload))

  const clickHandler = (hash: string) => {
    return (_: Event) => setState('hash', hash)
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
      <OoxmlDiagnostics hash={state.hash} />
    </main>
  )
}

export default App
