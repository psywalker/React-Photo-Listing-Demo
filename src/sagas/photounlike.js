import axios from 'axios';
import { put, call } from 'redux-saga/effects';
import { URL_FOR_LIKES } from '../constants';

export const processResponse = (response) => {
};

export const getParamsRequest = (photoId) => {
  const tokenFirst = window.localStorage.getItem('token');
  const headers = {
    Authorization: `Bearer ${tokenFirst}`,
  };
  const axiosRequestPhotoUnlike = {
    method: 'delete',
    url: URL_FOR_LIKES(photoId),
    params: {
      client_id: process.env.REACT_APP_UNSPLASH_API_KEY,
    },
    headers,
  };
  return axiosRequestPhotoUnlike;
};

const photoUnlike = photoId => axios(getParamsRequest(photoId)).then(processResponse);

export const api = {
  photoUnlike,
};

export function* photoUnlikeSaga(action) {
  const { photoId } = action;
  if (photoId) {
    try {
      const dataForProps = yield call(api.photoUnlike, photoId);
      yield put({ type: 'PHOTO_UNLIKE_SUCCESS', dataForProps });
    } catch (error) {
      //const errorRateLimit = get(error, 'response.data', '');
      //yield put({ type: 'PHOTO_UNLIKE_ERROR', errorRateLimit });
    }
  } else {
    const error = {};
    yield put({ type: 'PHOTO_UNLIKE_ERROR', error });
  }
}
