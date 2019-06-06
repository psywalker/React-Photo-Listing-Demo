import { takeEvery, all } from 'redux-saga/effects';
import { loginSaga } from './loginSaga';

export default function* rootSaga() {
  yield all([
    yield takeEvery('LOGIN_FETCHING', loginSaga),
  ]);
}
