import { takeEvery, all } from 'redux-saga/effects';
import { loginSaga } from './login';
import cardsPhotosRequestSaga from './photolisting';
import userStatisticRequestSaga from './userstatistic';
import photoRequestSaga from './photo';

export default function* rootSaga() {
  yield all([
    yield takeEvery('LOGIN_FETCHING', loginSaga),
    yield takeEvery('CARDS_PHOTOS_FETCHING', cardsPhotosRequestSaga),
    yield takeEvery('USER_STATISTIC_FETCHING', userStatisticRequestSaga),
    yield takeEvery('PHOTO_FETCHING', photoRequestSaga),
  ]);
}
