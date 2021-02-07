import { JSX } from 'solid-js'
export type ChildElement = ((...props: unknown[]) => JSX.Element) | JSX.Element | string | null
