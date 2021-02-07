import { JSX, createMemo, For } from 'solid-js'

export interface HashProperties {
  children?: string
}

export function Hash<T extends HashProperties>(props: T): JSX.Element {
  const content = createMemo(() => {
    const hashAsArrayOfChars = props.children ? props.children.split('') : []
    const chunks = chunky(hashAsArrayOfChars, 8)
    return chunks.map((chunk) => chunk.join(''))
  })
  return (
    <>
      <For each={content()}>
        {(chunk, i) => {
          const chaser = i() + 1 === content().length ? <></> : '-'
          return (
            <>
              <span>{chunk}</span>
              {chaser}
            </>
          )
        }}
      </For>
    </>
  )
}

function chunky(array: any[], size: number): any[][] {
  let result: any[][] = []
  let index = 0
  while (index < array.length) {
    const chunk = array.slice(index, index + size)
    result.push(chunk)
    index += size
  }
  return result
}
