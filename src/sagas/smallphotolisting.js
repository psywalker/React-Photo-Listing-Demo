import axios from 'axios';
import { put, call } from 'redux-saga/effects';
import get from 'lodash/get';
import { URL_FOR_USER_LIKES_QUERY, URL_FOR_USER_PHOTO_LISTING_QUERY } from '../constants';

export const api = {
  getSmallPhotoListing: (url, page, perPage) => {
    const axiosRequestForcardsPhotos = {
      url,
      params: {
        page,
        per_page: perPage,
        client_id: process.env.REACT_APP_UNSPLASH_API_KEY,
      },
    };
    return axios.get(axiosRequestForcardsPhotos.url, {
      params: axiosRequestForcardsPhotos.params,
    });
  },
};

export function* smallPhotoListingRequestSaga(action) {
  const {
    userId,
    page,
    perPage,
    name,
    itemNum,
  } = action;

  if (userId) {
    try {
      let url = URL_FOR_USER_LIKES_QUERY(userId);
      if (name === 'photos') url = URL_FOR_USER_PHOTO_LISTING_QUERY(userId);
      const response = yield call(api.getSmallPhotoListing, url, page, perPage);
      const cards = get(response, 'data', []).map(item => ({
        photoUrl: get(item, 'urls.regular', ''),
        photoID: get(item, 'id', ''),
      }));

      const dataForProps = {
        page,
        perPage,
        cards,
        totalCards: parseInt(get(response, 'headers["x-total"]', 10), 10),
        itemNum,
      };

      yield put({ type: 'SMALL_PHOTO_LISTING_SUCCESS', dataForProps });
    } catch (error) {
      yield put({ type: 'SMALL_PHOTO_LISTING_REQUEST_ERROR', error, itemNum });
    }
  } else {
    const error = {};
    yield put({ type: 'SMALL_PHOTO_LISTING_REQUEST_ERROR', error, itemNum });
  }
}
