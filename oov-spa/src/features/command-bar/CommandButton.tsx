import { JSX } from 'solid-js/jsx-runtime'
import { ChildElement } from '../../ui/prelude'

export interface CommandButtonProperties {
  onClick?: () => void
  children: ChildElement | ChildElement[]
}

export function CommandButton<T extends CommandButtonProperties>(props: T): JSX.Element {
  return (
    <div class="command-button" onClick={props.onClick}>
      {props.children}
    </div>
  )
}
