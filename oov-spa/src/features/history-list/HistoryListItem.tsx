import { JSX } from 'solid-js/jsx-runtime'
import { HistoryRecord } from '../../app/api'
import { Hash, InlineMonospace, Link } from '../../ui'

export interface HistoryListItemProperties {
  item: HistoryRecord
  onClick?: (historyRecord: HistoryRecord) => void
}

export function HistoryListItem<T extends HistoryListItemProperties>(props: T): JSX.Element {
  const handleClick = () => {
    if (props.onClick) {
      props.onClick(props.item)
    }
  }

  return (
    <li class="history-list-item">
      <div class="record-container">
        <div class="item-heading">
          <Link onClick={handleClick}>{props.item.fileName}</Link>
        </div>
        <div class="hash-container">
          <InlineMonospace>
            <Hash>{props.item.hash}</Hash>
          </InlineMonospace>
        </div>
      </div>
    </li>
  )
}
