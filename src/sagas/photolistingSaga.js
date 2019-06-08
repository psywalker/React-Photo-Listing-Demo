import axios from 'axios';
import { put } from 'redux-saga/effects';

export default function* cardsPhotosRequestSaga(action) {
  const { cardsData } = action;
  if (cardsData) {
    try {
      const axiosRequestForcardsPhotos = {
        url: 'https://api.unsplash.com/search/photos?',
        params: {
          ...cardsData,
          client_id: process.env.REACT_APP_UNSPLASH_API_KEY,
        },
      };
      const response = yield axios.get(axiosRequestForcardsPhotos.url, {
        params: axiosRequestForcardsPhotos.params,
      });

      const responceObj = {
        cards: response?.data?.results || [],
        isListingLoading: false,
        totalCards: response?.data?.total || 10,
      };

      yield put({ type: 'CARDS_PHOTOS_REQUEST_SUCCESS', responceObj });
    } catch (error) {
      yield put({ type: 'CARDS_PHOTOS_REQUEST_ERROR', error });
    }
  }
}
