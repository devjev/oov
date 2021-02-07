import './command-bar.scss'
import { CommandButton } from './CommandButton'

export function CommandBar() {
  return (
    <nav class="command-bar">
      <section class="centered">
        <div class="command-bar-buttons">
          <div>
            <CommandButton>
              <i class="fas fa-plus"></i>
            </CommandButton>
            <CommandButton>
              <i class="far fa-lightbulb"></i>
            </CommandButton>
          </div>
        </div>
      </section>
    </nav>
  )
}
