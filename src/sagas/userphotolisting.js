import axios from 'axios';
import { put } from 'redux-saga/effects';
import get from 'lodash/get';
import { URL_FOR_USER_PHOTO_LISTING_QUERY } from '../constants';

export default function* userPhotoListingRequestSaga(action) {
  const { userId, page, perPage } = action;
  if (userId) {
    try {
      const axiosRequestForcardsPhotos = {
        url: URL_FOR_USER_PHOTO_LISTING_QUERY(userId),
        params: {
          page,
          per_page: perPage,
          client_id: process.env.REACT_APP_UNSPLASH_API_KEY,
        },
      };
      const response = yield axios.get(axiosRequestForcardsPhotos.url, {
        params: axiosRequestForcardsPhotos.params,
      });
      const cards = get(response, 'data', []).map(item => ({
        photoName: get(item, 'urls.regular', ''),
        photoDesc: get(item, 'description', ''),
        title: get(item, 'user.first_name', ''),
        tags: get(item, 'tags', []),
        photoID: get(item, 'id', ''),
        userID: get(item, 'user.username', ''),
        userAvatar: get(item, 'user.profile_image.large', ''),
      }));

      const dataForProps = {
        page,
        perPage,
        cards,
        totalCards: parseInt(get(response, 'headers["x-total"]', 10), 10),
      };
      yield put({ type: 'USER_PHOTO_LISTING_SUCCESS', dataForProps });
    } catch (error) {
      yield put({ type: 'USER_PHOTO_LISTING_REQUEST_ERROR', error });
    }
  }
}
