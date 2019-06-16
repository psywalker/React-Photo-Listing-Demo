import axios from 'axios';
import { put } from 'redux-saga/effects';
import get from 'lodash/get';
import { URL_FOR_CARDS_PHOTOS } from '../constants';

export default function* cardsPhotosRequestSaga(action) {
  const { cardsData } = action;
  if (cardsData) {
    try {
      const axiosRequestForcardsPhotos = {
        url: URL_FOR_CARDS_PHOTOS,
        params: {
          ...cardsData,
          client_id: process.env.REACT_APP_UNSPLASH_API_KEY,
        },
      };
      const response = yield axios.get(axiosRequestForcardsPhotos.url, {
        params: axiosRequestForcardsPhotos.params,
      });
      
      const cards = get(response, 'data.results', []);
      const newCards = [];
      if (cards.length) {
        console.log("0: ", response);
        cards.forEach((item, i) => {
          console.log("01: ", item, i);
          let newCardsItem = {
            photoName: get(item, 'urls.regular', ''),
            photoDesc: get(item, 'description', ''),
            title: get(item, 'user.first_name', ''),
            tags: get(item, 'tags', []),
            photoID: get(item, 'id', ''),
            userID: get(item, 'user.username', ''),
            userAvatar: get(item, 'user.profile_image.large', ''),
          };
          console.log("02: ", newCardsItem);
          newCards.push(newCardsItem)
          console.log("03: ", newCards);
        });
      }
      const dataForProps = {
        cards: newCards,
        isListingLoading: false,
        totalCards: get(response, 'data.total', 10),
      };
      console.log("1: ", dataForProps);
      yield put({ type: 'CARDS_PHOTOS_REQUEST_SUCCESS', dataForProps });
    } catch (error) {
      yield put({ type: 'CARDS_PHOTOS_REQUEST_ERROR', error });
    }
  }
}
