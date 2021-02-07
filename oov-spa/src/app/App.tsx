import '../style/index.scss'
import { JSX } from 'solid-js'
import { HistoryList } from '../features/history-list/HistoryList'
import { NonSidebarContent, Sidebar, SidebarLayout } from '../ui'

export function App(): JSX.Element {
  return (
    <main>
      <SidebarLayout>
        <Sidebar>
          <HistoryList />
        </Sidebar>
        <NonSidebarContent>Hello</NonSidebarContent>
      </SidebarLayout>
    </main>
  )
}

export default App
