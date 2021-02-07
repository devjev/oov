import { JSX, For, createMemo } from 'solid-js'
import { ValidationResult } from '../../app/api'
import { Link } from '../../ui'

export interface ValidationErrorStatisticsProperties {
  validationResult: ValidationResult
  order?: 'descending' | 'ascending'
  onClick?: (errorId: string) => void
}

export function ValidationErrorStatistics<T extends ValidationErrorStatisticsProperties>(props: T): JSX.Element {
  const stats = createMemo(() => {
    // Create a statistics object
    let statistics: { [key: string]: number } = {}
    for (const error of props.validationResult.errors) {
      if (Object.keys(statistics).includes(error.id)) {
        statistics[error.id] += 1
      } else {
        statistics[error.id] = 1
      }
    }

    const ordering = props.order === 'ascending' ? (a: number, b: number) => a - b : (a: number, b: number) => b - a

    // Convert it to array of records and sort in descending order
    let statisticsRecords = Object.entries(statistics).sort(([key1, freq1], [key2, freq2]) => ordering(freq1, freq2))
    return statisticsRecords
  })
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Error ID</th>
            <th>Frequency</th>
          </tr>
        </thead>
        <tbody>
          <For each={stats()}>
            {([key, freq]) => {
              const handleClick = () => {
                if (props.onClick) {
                  props.onClick(key)
                }
              }
              return (
                <tr>
                  <td>
                    <Link onClick={handleClick}>{key}</Link>
                  </td>
                  <td>{freq}</td>
                </tr>
              )
            }}
          </For>
        </tbody>
      </table>
    </>
  )
}
