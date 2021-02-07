import { JSX } from 'solid-js/jsx-runtime'
import { ChildElement } from '../prelude'

export interface NonSidebarContentProperties {
  children?: ChildElement | ChildElement[]
}

export function NonSidebarContent<T extends NonSidebarContentProperties>(props: T): JSX.Element {
  return <div>{props.children}</div>
}
