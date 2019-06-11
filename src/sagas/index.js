import { takeEvery, all } from 'redux-saga/effects';
import { loginSaga } from './loginSaga';
import cardsPhotosRequestSaga from './photolistingSaga';
import userStatisticRequestSaga from './userstatistic';

export default function* rootSaga() {
  yield all([
    yield takeEvery('LOGIN_FETCHING', loginSaga),
    yield takeEvery('CARDS_PHOTOS_FETCHING', cardsPhotosRequestSaga),
    yield takeEvery('USER_STATISTIC_FETCHING', userStatisticRequestSaga),
  ]);
}
