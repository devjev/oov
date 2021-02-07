import { call, put, takeEvery } from 'redux-saga/effects'
import * as api from '../../app/api'

function* fetchHash(action: any) {
  // TODO type guard here for payload
  const result: api.ValidationResult = yield call(api.getByHash, action.payload)
  if (result) {
    yield put({ type: 'currentValidationResult/fetchSuccess', payload: result })
  } else {
    yield put({ type: 'currentValidationResult/fetchFailure', payload: null })
  }
}

function* validationResultSaga() {
  yield takeEvery('currentValidationResult/fetch', fetchHash)
}

export default validationResultSaga
