import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { createSerializer } from 'enzyme-to-json';
import get from 'lodash/get';
import { put, call } from 'redux-saga/effects';
import axios from 'axios';
import mockAxios from "axios";
import sinon from 'sinon';
import { runSaga } from 'redux-saga'
import smallPhotoListingRequestSaga from './smallphotolisting';
import {
  URL_FOR_USER_LIKES_QUERY,
  URL_FOR_USER_PHOTO_LISTING_QUERY,
} from '../constants';

var assert = require('assert');
describe('Test `smallphotolisting` saga', () => {
  // Default Setting Data
  let action = {
    isSmalPhotoListingFetching: true,
    itemNum: 0,
    name: 'photos',
    page: 1,
    perPage: 6,
    type: 'SMALL_PHOTO_LISTING_FETCHING',
    userId: 'harleydavidson',
  };
  const axiosRequestForcardsPhotos = {
    params: {
      client_id: process.env.REACT_APP_UNSPLASH_API_KEY,
      page: action.page,
      per_page: action.perPage,
    },
    url: 'https://api.unsplash.com/users/harleydavidson/photos',
  };
  const response = {
    data: [
      {
        id: '1HZcJjdtc9g',
        urls: {
          regular: 'https://images.unsplash.com/photo-1558981852-426c6c22a060?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjQzODA4fQ',
        },
      },
    ],
    headers: {
      'x-total': 53,
    },
  };
  const cards = [];
  const dataForProps = {
    cards,
    itemNum: action.itemNum,
    page: action.page,
    perPage: action.perPage,
    totalCards: 10,
  };

  // Tests
  describe('Test `smallPhotoListingRequestSaga` saga', () => {
    it('`smallPhotoListingRequestSaga` with full `action` and `userId` parametr', () => {
      const gen = smallPhotoListingRequestSaga(action);
      expect(gen.next().value).toEqual(call(axios.get, axiosRequestForcardsPhotos.url, {
        params: axiosRequestForcardsPhotos.params,
      }));
      expect(gen.next(dataForProps).value).toEqual(put({ type: 'SMALL_PHOTO_LISTING_SUCCESS', dataForProps }));
    });

    it('`smallPhotoListingRequestSaga`: Request Error', () => {
      const func = () => new Error('Request Error');
      const error = 'Request Error';
      const gen = smallPhotoListingRequestSaga(action);
      expect(gen.next().value).toEqual(call(axios.get, axiosRequestForcardsPhotos.url, {
        params: axiosRequestForcardsPhotos.params,
      }));
      gen.next(func());
      expect(gen.throw('Request Error').value).toEqual(put({ type: 'SMALL_PHOTO_LISTING_REQUEST_ERROR', error, itemNum: action.itemNum }));
      expect(gen.next()).toEqual({ done: true, value: undefined });
    });

    it('`smallPhotoListingRequestSaga` with full `action` and without `userId` parametr', () => {
      const error = {};
      action = {
        ...action,
        userId: null,
      };
      const gen = smallPhotoListingRequestSaga(action);
      expect(gen.next().value).toEqual(put({ type: 'SMALL_PHOTO_LISTING_REQUEST_ERROR', error, itemNum: action.itemNum }));
    });
  });

  // Mock
  describe('Test `smallPhotoListingRequestSaga` saga: mock request axios.get', () => {
    it('`smallPhotoListingRequestSaga`: Mock axios.get', async () => {

      // const request = async (url) => {
      //   const res = await axios.get(`https://api.unsplash.com/users/harleydavidson/${url}`, {
      //     params: {
      //       params: axiosRequestForcardsPhotos.params,
      //     },
      //   });
      //   return res;
      // };
      // const axiosGet = sinon.stub(axios, 'get').callsFake(() => {
      //   return response;
      // });

      // request('photos', () => {} );
      // axiosGet.restore();
      // sinon.assert.calledWith(axiosGet, axiosRequestForcardsPhotos.url, {
      //   params: { params: axiosRequestForcardsPhotos.params },
      // });
      // sinon.assert.calledOnce(axiosGet);
      // axiosGet.returns(54)

      // axios.get = jest.fn(() => Promise.resolve({ response }));
      // const request = async (url) => {
      //   const res = await axios.get(`https://api.unsplash.com/users/harleydavidson/${url}`, {
      //     params: {
      //       params: axiosRequestForcardsPhotos.params,
      //     },
      //   });
      //   return res;
      // };
      // mockAxios.get.mockImplementationOnce(() => Promise.resolve({
      //   response,
      // }));
      // let res = response;

      // // request with `photos`
      // request('photos').then((r) => {
      //   res = r.response;
      // });
      // expect(res).toEqual(response);
      // expect(mockAxios.get).toHaveBeenCalledTimes(1);
      // expect(mockAxios.get).toHaveBeenCalledWith(
      //   'https://api.unsplash.com/users/harleydavidson/photos',
      //   {
      //     params: { params: axiosRequestForcardsPhotos.params },
      //   },
      // );

      // // request with `likes`
      // request('likes').then((r) => {
      //   res = r.response;
      // });
      // expect(res).toEqual(response);
      // expect(mockAxios.get).toHaveBeenCalledTimes(2);
      // expect(mockAxios.get).toHaveBeenCalledWith(
      //   'https://api.unsplash.com/users/harleydavidson/likes',
      //   {
      //     params: { params: axiosRequestForcardsPhotos.params },
      //   },
      // );
    });
  });
});