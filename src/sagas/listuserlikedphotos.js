import axios from 'axios';
import { put, call } from 'redux-saga/effects';
import get from 'lodash/get';
import { LIST_USER_LIKED_PHOTOS } from '../constants';

export const processResponse = (response) => {
};

export const getParamsRequest = (userName) => {
  const tokenFirst = window.localStorage.getItem('token');
  const headers = {
    Authorization: `Bearer ${tokenFirst}`,
  };
  const axiosRequestListUserLikedPhotos = {
    method: 'delete',
    url: LIST_USER_LIKED_PHOTOS(userName),
    params: {
      client_id: process.env.REACT_APP_UNSPLASH_API_KEY,
    },
    headers,
  };
  return axiosRequestListUserLikedPhotos;
};

const listUserLikedPhotos = userName => axios(getParamsRequest(userName)).then(processResponse);

export const api = {
  listUserLikedPhotos,
};

export function* listUserLikedPhotosSaga(action) {
  const { userName } = action;
  if (userName) {
    try {
      const dataForProps = yield call(api.listUserLikedPhotos, userName);
      yield put({ type: 'LIST_USER_LIKED_PHOTOS_SUCCESS', dataForProps });
    } catch (error) {
      //const errorRateLimit = get(error, 'response.data', '');
      //yield put({ type: 'PHOTO_UNLIKE_ERROR', errorRateLimit });
    }
  } else {
    const error = {};
    yield put({ type: 'PHOTO_UNLIKE_ERROR', error });
  }
}
