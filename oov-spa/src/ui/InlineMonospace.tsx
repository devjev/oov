import { JSX } from 'solid-js/jsx-runtime'

export interface InlineMonospaceProperties {
  children?: ((...props: unknown[]) => JSX.Element) | JSX.Element | string | null
}

export function InlineMonospace<T extends InlineMonospaceProperties>(props: T): JSX.Element {
  return <span class="inline-monospace">{props.children}</span>
}
