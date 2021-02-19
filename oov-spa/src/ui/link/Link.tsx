import './link.css'
import { JSX, Switch, Match } from 'solid-js'
import { ChildElement } from '../prelude'

export interface LinkProperties {
  onClick: string | (() => void)
  children: ChildElement | ChildElement[]
}

export function Link<T extends LinkProperties>(props: T): JSX.Element {
  const actionType: 'href' | 'click' = typeof props.onClick === 'string' ? 'href' : 'click'

  return (
    <div class="link-container">
      <Switch>
        <Match when={actionType === 'href'}>
          <a href={props.onClick as string}>{props.children}</a>
        </Match>
        <Match when={actionType === 'click'}>
          <a class="no-href" onClick={props.onClick as () => void}>
            {props.children}
          </a>
        </Match>
      </Switch>
    </div>
  )
}
