import axios from 'axios';
import { put } from 'redux-saga/effects';
import get from 'lodash/get';
import { URL_FOR_PHOTO_QUERY } from '../constants';

export default function* photoRequestSaga(action) {
  const { match } = action;
  if (match) {
    try {
      const res = yield axios.get(URL_FOR_PHOTO_QUERY(match));
      const responceObj = {
        exif: get(res, 'data.exif') || {},
        likes: get(res, 'data.likes') || 0,
        tags: get(res, 'data.tags') || [],
        altDescriprion: get(res, 'data.alt_description') || '',
        photoSrc: get(res, 'data.urls.regular') || '',
        userNic: get(res, 'data.user.username') || 'No Name',
        userPortfolioUrl: get(res, 'data.user.portfolio_url') || '',
        photoDesc: get(res, 'data.description') || 'No Description',
        width: get(res, 'data.width') || '300',
        height: get(res, 'data.height') || '300',
      };

      console.log("1: ", res.data.urls)
      console.log("2: ", res.data)
      yield put({ type: 'PHOTO_REQUEST_SUCCESS', responceObj });
    } catch (error) {
      yield put({ type: 'PHOTO_REQUEST_ERROR', error });
    }
  }
}
