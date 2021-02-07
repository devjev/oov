import '../style/index.scss'
import { JSX, createState } from 'solid-js'
import { HistoryList } from '../features/history-list/HistoryList'
import { NonSidebarContent, Sidebar, SidebarLayout, Link } from '../ui'
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
          <section class="centered">
            <ValidationResultView hash={state.selectedHash} />
          </section>
        </NonSidebarContent>
      </SidebarLayout>
    </main>
  )
}

export default App
