import './drop-zone.scss'
import { JSX, createState, Show } from 'solid-js'

export interface DropZoneProperties {
  messageOnEmpty?: string
  onFile?: (f: File) => void
}

export function DropZone<T extends DropZoneProperties>(props: T): JSX.Element {
  const [state, setState] = createState({
    dragOver: false,
    fileDropped: false,
  })

  const handleDrop = (event: DragEvent) => {
    event.preventDefault()
    if (event.dataTransfer?.files) {
      const file = event.dataTransfer.files[0]
      if (props.onFile) {
        props.onFile(file)
      }
    }
    setState('dragOver', false)
    setState('fileDropped', true)
  }

  const handleDragOver = (event: DragEvent) => {
    event.preventDefault()
    setState('dragOver', true)
  }

  const handleDragExit = () => {
    setState('dragOver', false)
  }

  return (
    <div
      class="drop-zone"
      classList={{ 'is-active': state.dragOver }}
      onDragOver={handleDragOver}
      onDragExit={handleDragExit}
      onDragLeave={handleDragExit}
      onDrop={handleDrop}>
      <Show when={props.messageOnEmpty}>
        <p class="empty-message">{props.messageOnEmpty}</p>
      </Show>
    </div>
  )
}
