import { takeEvery, all } from 'redux-saga/effects';
import { loginSaga } from './login';
import { cardsPhotosRequestSaga } from './photolisting';
import userStatisticRequestSaga from './userstatistic';
import photoRequestSaga from './photo';
import userRequestSaga from './user';
import { smallPhotoListingRequestSaga } from './smallphotolisting';

export default function* rootSaga() {
  yield all([
    yield takeEvery('LOGIN_FETCHING', loginSaga),
    yield takeEvery('CARDS_PHOTOS_FETCHING', cardsPhotosRequestSaga),
    yield takeEvery('USER_STATISTIC_FETCHING', userStatisticRequestSaga),
    yield takeEvery('PHOTO_FETCHING', photoRequestSaga),
    yield takeEvery('USER_FETCHING', userRequestSaga),
    yield takeEvery('SMALL_PHOTO_LISTING_FETCHING', smallPhotoListingRequestSaga),
  ]);
}
