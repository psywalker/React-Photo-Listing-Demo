
import { all, takeEvery, fork } from 'redux-saga/effects';
import rootSaga from './index';
import { loginSaga } from './login';
import { cardsPhotosRequestSaga } from './photolisting';
import userStatisticRequestSaga from './userstatistic';
import photoRequestSaga from './photo';
import userRequestSaga from './user';
import { smallPhotoListingRequestSaga } from './smallphotolisting';

describe('Test of saga `rootSaga`', () => {
  it('`rootSaga`', () => {
    // const gen = rootSaga();
    // expect(gen.next().value).toEqual(all([takeEvery('LOGIN_FETCHING', loginSaga)]));
  });
});
