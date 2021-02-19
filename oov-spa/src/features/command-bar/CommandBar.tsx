import './command-bar.css'
import { createSignal, Switch, Match } from 'solid-js'
import { CommandButton } from './CommandButton'
import { initialize } from './commandBarSlice'
import { store } from '../../app/store'
import { update } from './commandBarSlice'
import { AppConfig, invertTheme } from '../../app/api'

export function CommandBar() {
  const [currentConfig, setCurrentConfig] = createSignal({} as AppConfig)

  store.subscribe(() => {
    setCurrentConfig(store.getState().commandBar)
  })

  store.dispatch(initialize({}))

  const handleToggleLights = () => {
    const oldCfg = currentConfig()
    const newCfg = { ...oldCfg, config: { theme: invertTheme(oldCfg.config.theme) } }
    store.dispatch(update(newCfg))
  }

  const handleToggleView = () => {
    const oldCfg = currentConfig()
    const toggled = oldCfg.view === 'new' ? 'view' : 'new'
    const newCfg = { ...oldCfg, view: toggled }
    store.dispatch(update(newCfg))
  }

  return (
    <nav class="command-bar">
      <section class="centered">
        <div class="command-bar-buttons">
          <div>
            <CommandButton onClick={handleToggleView}>
              <Switch>
                <Match when={currentConfig().view === 'new'}>
                  <i class="fas fa-times"></i>
                </Match>
                <Match when={currentConfig().view === 'view'}>
                  <i class="fas fa-plus"></i>
                </Match>
              </Switch>
            </CommandButton>
            <CommandButton onClick={handleToggleLights}>
              <i class="far fa-lightbulb"></i>
            </CommandButton>
          </div>
        </div>
      </section>
    </nav>
  )
}
