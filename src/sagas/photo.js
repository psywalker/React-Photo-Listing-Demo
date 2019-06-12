import axios from 'axios';
import { put, delay } from 'redux-saga/effects';
import get from 'lodash/get';
import { URL_FOR_PHOTO_QUERY } from '../constants';

export default function* photoRequestSaga(action) {
  const { match } = action;
  if (match) {
    try {
      const res = yield axios.get(URL_FOR_PHOTO_QUERY(match));
      const responceObj = {
        photoSrc: get(res, 'data.urls.full') || '',
        userNic: get(res, 'data.user.username') || 'No Name',
        userPortfolioUrl: get(res, 'data.user.portfolio_url') || '',
        photoDesc: get(res, 'data.description') || 'No Description',
      };
      yield put({ type: 'PHOTO_REQUEST_SUCCESS', responceObj });
      yield delay(500);
      yield put({ type: 'PHOTO_IMAGE_LOAD' });
    } catch (error) {
      yield put({ type: 'PHOTO_REQUEST_ERROR', error });
    }
  }
}
