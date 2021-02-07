import { JSX } from 'solid-js'
import { ChildElement } from '../prelude'

export interface SidebarProperties {
  children?: ChildElement | ChildElement[]
}

export function Sidebar<T extends SidebarProperties>(props: T): JSX.Element {
  return <div>{props.children}</div>
}
