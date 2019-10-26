import axios from 'axios';
import { put, call } from 'redux-saga/effects';
import get from 'lodash/get';
import { URL_FOR_PHOTO } from '../constants';

export const processResponse = (response) => {
  const { data } = response;
  console.log("4.1 GET_PHOTO: ", response)
  return {
    liked: data.liked_by_user,
  };
};

export const getParamsRequest = (photoId) => {
  const tokenFirst = window.localStorage.getItem('token');
  const headers = {
    Authorization: `Bearer ${tokenFirst}`,
  };
  const axiosRequestGetPhoto = {
    method: 'get',
    url: URL_FOR_PHOTO(photoId),
    params: {
      client_id: process.env.REACT_APP_UNSPLASH_API_KEY,
    },
    headers,
  };
  return axiosRequestGetPhoto;
};

const getPhoto = photoId => axios(getParamsRequest(photoId)).then(processResponse);

export const api = {
  getPhoto,
};

export function* getPhotoSaga(action) {
  const { photoId } = action;
  if (photoId) {
    try {
      const dataForProps = yield call(api.getPhoto, photoId);
      console.log("4.2 GET_PHOTO:", dataForProps)
      yield put({ type: 'GET_PHOTO_SUCCESS', dataForProps });
    } catch (error) {
      console.log("4.3 GET_PHOTO:", error)
      //const errorRateLimit = get(error, 'response.data', '');
      //yield put({ type: 'PHOTO_UNLIKE_ERROR', errorRateLimit });
    }
  } else {
    const error = {};
    yield put({ type: 'PHOTO_UNLIKE_ERROR', error });
  }
}
