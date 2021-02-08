import { JSX } from 'solid-js'
import { DropZone } from '../../ui'
import * as api from '../../app/api'
import { store } from '../../app/store'
import { prepend } from '../history-list/historySlice'

export interface NewValidationProperties {}

export function NewValidation<T extends NewValidationProperties>(props: T): JSX.Element {
  const handleFile = (f: File) => {
    api.validate({ name: f.name, file: f }).then((validationResult) => {
      const record: api.HistoryRecord = {
        hash: validationResult.metadata.fileHash,
        fileName: validationResult.metadata.fileName,
      }
      store.dispatch(prepend(record))
    })
  }

  return (
    <>
      <DropZone messageOnEmpty="Drop your docs here" onFile={handleFile} />
    </>
  )
}
