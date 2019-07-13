import axios from 'axios';
import { put, call } from 'redux-saga/effects';
import get from 'lodash/get';
import { URL_FOR_CARDS_PHOTOS } from '../constants';

export const processResponse = (response) => {
  const cards = get(response, 'data.results', []).map(item => ({
    photoName: get(item, 'urls.regular', ''),
    photoDesc: get(item, 'description', ''),
    title: get(item, 'user.first_name', ''),
    tags: get(item, 'tags', []),
    photoID: get(item, 'id', ''),
    userID: get(item, 'user.username', ''),
    userAvatar: get(item, 'user.profile_image.large', ''),
  }));
  return {
    cards,
    isListingLoading: false,
    totalCards: get(response, 'data.total', 10),
  };
};

export const getParamsRequest = (cardsData) => {
  const axiosRequestForPhotoListing = {
    method: 'get',
    url: URL_FOR_CARDS_PHOTOS,
    params: {
      ...cardsData,
      client_id: process.env.REACT_APP_UNSPLASH_API_KEY,
    },
  };
  return axiosRequestForPhotoListing;
};

const getPhotoListing = cardsData => axios(getParamsRequest(cardsData)).then(processResponse);

export const api = {
  getPhotoListing,
};

export function* cardsPhotosRequestSaga(action) {
  const { cardsData } = action;
  if (cardsData) {
    try {
      const dataForProps = yield call(api.getPhotoListing, cardsData);
      yield put({ type: 'CARDS_PHOTOS_REQUEST_SUCCESS', dataForProps });
    } catch (error) {
      yield put({ type: 'CARDS_PHOTOS_REQUEST_ERROR', error });
    }
  } else {
    const error = {};
    yield put({ type: 'CARDS_PHOTOS_REQUEST_ERROR', error });
  }
}
