export { HistoryList } from './history-list/HistoryList'
export type { HistoryListProperties } from './history-list/HistoryList'

export { NewValidation } from './new-validation/NewValidation'
export type { NewValidationProperties } from './new-validation/NewValidation'

export { ValidationResultView } from './validation-result-view/ValidationResultView'
export type { ValidationResultViewProperties } from './validation-result-view/ValidationResultView'

// Construct Root Saga
import { fork } from 'redux-saga/effects'
import historyListSaga from './history-list/historyListSaga'
import validationResultSaga from './validation-result-view/validationResultSaga'
import commandBarSaga from './command-bar/commandBarSaga'

export function* rootSaga() {
  yield fork(historyListSaga)
  yield fork(validationResultSaga)
  yield fork(commandBarSaga)
}
