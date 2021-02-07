import '../style/index.scss'
import { JSX, createState } from 'solid-js'
import { HistoryList } from '../features/history-list/HistoryList'
import { NonSidebarContent, Sidebar, SidebarLayout, Link } from '../ui'
import { ValidationResultView } from '../features'
import { CommandBar } from '../features/command-bar/CommandBar'
import { store } from './store'
import { invertTheme } from './api'

export function App(): JSX.Element {
  const [state, setState] = createState({
    selectedHash: undefined as string | undefined,
  })

  store.subscribe(() => {
    const storeState = store.getState()

    // ensure correct theme
    const newTheme = storeState.commandBar.config.theme
    const oldTheme = invertTheme(newTheme)

    replaceBodyClass(oldTheme, newTheme)
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

function replaceBodyClass(oldValue: string, newValue: string) {
  const body = document.getElementsByTagName('body')[0]
  body.classList.replace(oldValue, newValue)
}

export default App
