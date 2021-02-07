import '../style/index.scss'
import { JSX, createState } from 'solid-js'
import { HistoryList } from '../features/history-list/HistoryList'
import { NonSidebarContent, Sidebar, SidebarLayout } from '../ui'
import { ValidationResultView } from '../features'

export function App(): JSX.Element {
  const [state, setState] = createState({
    selectedHash: undefined as string | undefined,
  })

  return (
    <main>
      <SidebarLayout>
        <Sidebar>
          <HistoryList
            onSelect={(hash) => {
              setState('selectedHash', hash)
            }}
          />
        </Sidebar>
        <NonSidebarContent>
          <ValidationResultView hash={state.selectedHash} />
        </NonSidebarContent>
      </SidebarLayout>
    </main>
  )
}

export default App
