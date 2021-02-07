import './command-bar.scss'
import { createSignal } from 'solid-js'
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

  return (
    <nav class="command-bar">
      <section class="centered">
        <div class="command-bar-buttons">
          <div>
            <CommandButton>
              <i class="fas fa-plus"></i>
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
