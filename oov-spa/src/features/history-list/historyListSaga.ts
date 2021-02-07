import { call, put, takeEvery } from 'redux-saga/effects'
import * as api from '../../app/api'

function* initializeHistory() {
  const history = yield call(api.getHistory)
  yield put({ type: 'history/update', payload: history })
}

function* historyListSaga() {
  yield takeEvery('history/initialize', initializeHistory)
}

export default historyListSaga
