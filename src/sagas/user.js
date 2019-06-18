import axios from 'axios';
import { put } from 'redux-saga/effects';
import get from 'lodash/get';
import { URL_FOR_USER_QUERY } from '../constants';

export default function* userRequestSaga(action) {
  const { match } = action;
  if (match) {
    try {
      const responce = yield axios.get(URL_FOR_USER_QUERY(match));
      const dataForProps = {
        userPhoto: get(responce, 'data.profile_image.large', 'No User Photo'),
        userFirstPhoto: get(responce, 'data.photos[0].urls.regular', 'No Photo'),
      };
      yield put({ type: 'USER_REQUEST_SUCCESS', dataForProps });
    } catch (error) {
      yield put({ type: 'USER_REQUEST_ERROR', error });
    }
  }
}
