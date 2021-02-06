import '../style/index.scss'
import { JSX } from 'solid-js'
import { HistoryList } from '../features/history-list/HistoryList'

export function App(): JSX.Element {
  return (
    <main>
      <HistoryList />
    </main>
  )
}

export default App
