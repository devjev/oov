import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { Api } from './api'

function* initializeHistory() {
  const api = new Api()

  // This is needed, because `this` value gets messed up by the saga call(fn) API
  const callback = async () => {
    return await api.getHistory()
  }

  const history = yield call(callback)
  yield put({ type: 'history/update', payload: history })
}

function* historySaga() {
  yield takeEvery('history/initialize', initializeHistory)
}

export default historySaga
