import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { Api } from './api'

function* fetchHistory() {
  try {
    const api = new Api()
    const history = yield call(api.getHistory)
    yield put({ type: 'history/update', history: history })
  } catch (e) {
    yield put({ type: 'history/failed', message: e.message })
  }
}

function* historySaga() {
  yield takeLatest('history/update', fetchHistory)
}

export default historySaga
