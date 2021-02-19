import './inline-monospace.css'
import { JSX } from 'solid-js/jsx-runtime'
import { ChildElement } from '../prelude'

export interface InlineMonospaceProperties {
  children?: ChildElement[] | ChildElement
}

export function InlineMonospace<T extends InlineMonospaceProperties>(props: T): JSX.Element {
  return <span class="inline-monospace">{props.children}</span>
}
