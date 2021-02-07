import '../style/index.scss'
import { JSX, createState } from 'solid-js'
import { HistoryList } from '../features/history-list/HistoryList'
import { NonSidebarContent, Sidebar, SidebarLayout, Link } from '../ui'
import { ValidationResultView } from '../features'
import { CommandBar } from '../features/command-bar/CommandBar'

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
          <div class="full-height">
            <CommandBar />
            <section class="centered">
              <ValidationResultView hash={state.selectedHash} />
            </section>
          </div>
        </NonSidebarContent>
      </SidebarLayout>
    </main>
  )
}

export default App
