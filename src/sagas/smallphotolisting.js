import axios from 'axios';
import { put, call } from 'redux-saga/effects';
import get from 'lodash/get';
import { URL_FOR_USER_LIKES_QUERY, URL_FOR_USER_PHOTO_LISTING_QUERY } from '../constants';

export const processResponse = (response, page, perPage, itemNum) => {
  const cards = get(response, 'data', []).map(item => ({
    photoUrl: get(item, 'urls.regular', ''),
    photoID: get(item, 'id', ''),
  }));

  return {
    page,
    perPage,
    cards,
    totalCards: parseInt(get(response, 'headers["x-total"]', 10), 10),
    itemNum,
  };
};
export const getParamsRequest = (name, page, userId, perPage) => {
  let url = URL_FOR_USER_LIKES_QUERY(userId);
  if (name === 'photos') url = URL_FOR_USER_PHOTO_LISTING_QUERY(userId);
  const axiosRequestForcardsPhotos = {
    method: 'get',
    url,
    params: {
      page,
      per_page: perPage,
      client_id: process.env.REACT_APP_UNSPLASH_API_KEY,
    },
  };
  return axiosRequestForcardsPhotos;
};

export const api = {
  getSmallPhotoListing: ({
    page,
    perPage,
    itemNum,
    userId,
    name,
  }) => axios(getParamsRequest(name, page, userId, perPage))
    .then(response => processResponse(response, page, perPage, itemNum)),
};

export function* smallPhotoListingRequestSaga(action) {
  const {
    userId,
    itemNum,
  } = action;
  if (userId) {
    try {
      const dataForProps = yield call(api.getSmallPhotoListing, action);
      yield put({ type: 'SMALL_PHOTO_LISTING_SUCCESS', dataForProps });
    } catch (error) {
      yield put({ type: 'SMALL_PHOTO_LISTING_REQUEST_ERROR', error, itemNum });
    }
  } else {
    const error = {};
    yield put({ type: 'SMALL_PHOTO_LISTING_REQUEST_ERROR', error, itemNum });
  }
}
