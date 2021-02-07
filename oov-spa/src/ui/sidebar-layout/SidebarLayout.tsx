import './sidebar-layout.scss'
import { JSX } from 'solid-js'
import { ChildElement } from '../prelude'

export interface SidebarLayoutProperties {
  children: ChildElement[]
}

export function SidebarLayout<T extends SidebarLayoutProperties>(props: T): JSX.Element {
  return (
    <div class="with-sidebar">
      <div>{props.children}</div>
    </div>
  )
}
