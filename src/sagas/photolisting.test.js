import get from 'lodash/get';
import { put, call } from 'redux-saga/effects';
import axios from 'axios';
import mockAxios from 'axios';
import sinon from 'sinon';
import { runSaga } from 'redux-saga';
import {
  cardsPhotosRequestSaga,
  api,
  processResponse,
  getParamsRequest,
} from './photolisting';
import { URL_FOR_CARDS_PHOTOS } from '../constants';

describe('Test `cardsPhotosRequestSaga` saga', () => {
  // Default Setting Data
  let action = {
    cardsData: {
      page: 1,
      per_page: 6,
      query: 'wallpapers',
    },
    isListingLoading: true,
    type: 'CARDS_PHOTOS_FETCHING',
  };
  const cardsData = action.cardsData;
  const axiosRequestForPhotoListing = {
    method: 'get',
    url: URL_FOR_CARDS_PHOTOS,
    params: {
      ...cardsData,
      client_id: process.env.REACT_APP_UNSPLASH_API_KEY,
    },
  };
  const response = {
    data: {
      results: [
        {
          id: 'kdGstD3te3M',
          tags: [],
          description: '',
          urls: {
            regular: 'https://images.unsplash.com/photo-1558981408-db0ecd8a1ee4?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjQzODA4fQ',
          },
          user: {
            first_name: 'Harley-Davidson',
            username: 'harleydavidson',
            profile_image: {
              large: 'https://images.unsplash.com/profile-1556751276456-1561737ea797?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=128&w=128',
            },
          },
        },
      ],
      total: 25312,
    },
  };
  const cards = [
    {
      photoName: response.data.results[0].urls.regular,
      photoDesc: response.data.results[0].description,
      title: response.data.results[0].user.first_name,
      tags: response.data.results[0].tags,
      photoID: response.data.results[0].id,
      userID: response.data.results[0].user.username,
      userAvatar: response.data.results[0].user.profile_image.large,
    },
  ];
  const dataForProps = {
    cards,
    isListingLoading: false,
    totalCards: get(response, 'data.total', 10),
  };

  describe('Test `cardsPhotosRequestSaga` saga', () => {
    it('`cardsPhotosRequestSaga` with full `action` and `cardsData` parametr', () => {
      const gen = cardsPhotosRequestSaga(action);
      expect(gen.next().value).toEqual(call(api.getPhotoListing, cardsData));
      expect(gen.next(dataForProps).value).toEqual(put({ type: 'CARDS_PHOTOS_REQUEST_SUCCESS', dataForProps }));
      expect(gen.next()).toEqual({ done: true, value: undefined });
    });

    it('`cardsPhotosRequestSaga`: Request Error', () => {
      const func = () => new Error('Request Error');
      const error = 'Request Error';
      const gen = cardsPhotosRequestSaga(action);
      expect(gen.next().value).toEqual(call(api.getPhotoListing, cardsData));
      gen.next(func());
      expect(gen.throw('Request Error').value).toEqual(put({ type: 'CARDS_PHOTOS_REQUEST_ERROR', error }));
      expect(gen.next()).toEqual({ done: true, value: undefined });
    });

    it('`cardsPhotosRequestSaga` with full `action` and without `cardsData` parametr', () => {
      const error = {};
      action = {
        ...action,
        cardsData: null,
      };
      const gen = cardsPhotosRequestSaga(action);
      expect(gen.next().value).toEqual(put({ type: 'CARDS_PHOTOS_REQUEST_ERROR', error }));
      expect(gen.next()).toEqual({ done: true, value: undefined });
    });
  });

  describe('Test `processResponse` and `getParamsRequest` functions', () => {
    it('`processResponse`', () => {
      expect(processResponse(response)).toEqual(dataForProps);
      expect(processResponse()).toEqual({
        cards: [],
        isListingLoading: false,
        totalCards: 10,
      });

      expect(getParamsRequest(cardsData)).toEqual(axiosRequestForPhotoListing);
    });
  });

  // Mock
  describe('Test `cardsPhotosRequestSaga` saga: mock axios.get and stub api', () => {
    it('`cardsPhotosRequestSaga`: Stub api', async () => {
      action = {
        cardsData: {
          page: 1,
          per_page: 6,
          query: 'wallpapers',
        },
        isListingLoading: true,
        type: 'CARDS_PHOTOS_FETCHING',
      };
      const dispatched = [];
      const stub = sinon.stub(api, 'getPhotoListing');
      stub.returns({ ...dataForProps, totalCards: 5 });

      const result = await runSaga({
        dispatch: a => dispatched.push(a),
      }, cardsPhotosRequestSaga, action).toPromise();

      expect(stub.calledWith(cardsData)).toBe(true);
      expect(dispatched).toEqual([{
        dataForProps: {
          ...dataForProps,
          totalCards: 5,
        },
        type: 'CARDS_PHOTOS_REQUEST_SUCCESS',
      }]);
    });

    it('`smallPhotoListingRequestSaga`: Mock axios.get', async () => {
      axios.get = jest.fn(() => Promise.resolve({ response }));
      const request = async (url) => {
        const res = await axios.get(URL_FOR_CARDS_PHOTOS, {
          params: {
            params: axiosRequestForPhotoListing.params,
          },
        });
        return res;
      };
      mockAxios.get.mockImplementationOnce(() => Promise.resolve({
        response,
      }));
      let res = response;

      // request with `photos`
      request('photos').then((r) => {
        res = r.response;
      });
      expect(res).toEqual(response);
      expect(mockAxios.get).toHaveBeenCalledTimes(1);
      expect(mockAxios.get).toHaveBeenCalledWith(
        URL_FOR_CARDS_PHOTOS,
        {
          params: { params: axiosRequestForPhotoListing.params },
        },
      );

      // request with `likes`
      request('likes').then((r) => {
        res = r.response;
      });
      expect(res).toEqual(response);
      expect(mockAxios.get).toHaveBeenCalledTimes(2);
      expect(mockAxios.get).toHaveBeenCalledWith(
        URL_FOR_CARDS_PHOTOS,
        {
          params: { params: axiosRequestForPhotoListing.params },
        },
      );
    });
  });
});
