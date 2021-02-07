import { JSX } from 'solid-js/jsx-runtime'

// export { OoxmlDiagnostics } from './ooxml-diagnostics/OoxmlDiagnostics'
// export type { OoxmlErrorsViewProperties } from './ooxml-diagnostics/OoxmlDiagnostics'

export { HistoryList } from './history-list/HistoryList'
// export type { HistoryListProperties } from './history-list/HistoryList'

export { ValidationResultView } from './validation-result-view/ValidationResultView'

// Construct Root Saga
import { fork } from 'redux-saga/effects'
import historyListSaga from './history-list/historyListSaga'
import validationResultSaga from './validation-result-view/validationResultSaga'

export function* rootSaga() {
  yield fork(historyListSaga)
  yield fork(validationResultSaga)
}
