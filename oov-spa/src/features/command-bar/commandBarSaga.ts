import { call, put, takeEvery, all } from 'redux-saga/effects'
import * as api from '../../app/api'
import { update } from './commandBarSlice'

function* initializeCommandBar() {
  const config = yield call(api.getConfig)
  yield put(update(config))
}

function* updateCommandBarSaga(action: any) {
  yield call(api.setConfig, action.payload)
}

function* commandBarSaga() {
  yield all([
    takeEvery('commands/initialize', initializeCommandBar),
    takeEvery('commands/update', updateCommandBarSaga),
  ])
}

export default commandBarSaga
