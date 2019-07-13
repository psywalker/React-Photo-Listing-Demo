import axios from 'axios';
import { put, call } from 'redux-saga/effects';
import get from 'lodash/get';
import { URL_FOR_USER_QUERY } from '../constants';

export const processResponse = (response) => {
  const dataForProps = {
    userPhoto: get(response, 'data.profile_image.large', 'No User Photo'),
    userFirstPhoto: get(response, 'data.photos[0].urls.regular', 'No Photo'),
  };
  return dataForProps;
};

export const getParamsRequest = (match) => {
  const axiosRequestForUser = {
    method: 'get',
    url: URL_FOR_USER_QUERY(match),
  };
  return axiosRequestForUser;
};

const getUser = match => axios(getParamsRequest(match)).then(processResponse);

export const api = {
  getUser,
};

export function* userRequestSaga(action) {
  const { match } = action;
  if (match) {
    try {
      const dataForProps = yield call(api.getUser, match);
      yield put({ type: 'USER_REQUEST_SUCCESS', dataForProps });
    } catch (error) {
      yield put({ type: 'USER_REQUEST_ERROR', error });
    }
  } else {
    yield put({ type: 'USER_REQUEST_ERROR' });
  }
}
