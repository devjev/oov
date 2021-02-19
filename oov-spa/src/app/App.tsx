import '../style/index.css'
import { JSX, createState, Switch, Match } from 'solid-js'
import { HistoryList } from '../features/history-list/HistoryList'
import { NonSidebarContent, Sidebar, SidebarLayout, Link, DropZone } from '../ui'
import { ValidationResultView, NewValidation } from '../features'
import { CommandBar } from '../features/command-bar/CommandBar'
import { store } from './store'
import { invertTheme } from './api'

export function App(): JSX.Element {
  const [state, setState] = createState({
    selectedHash: undefined as string | undefined,
    view: undefined as 'new' | 'view' | undefined,
  })

  store.subscribe(() => {
    const storeState = store.getState()

    // ensure correct theme
    const newTheme = storeState.commandBar.config.theme
    const oldTheme = invertTheme(newTheme)

    setState('view', storeState.commandBar.view)

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
              <Switch>
                <Match when={state.view === 'view'}>
                  <ValidationResultView hash={state.selectedHash} />
                </Match>
                <Match when={state.view === 'new'}>
                  <NewValidation />
                </Match>
              </Switch>
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
