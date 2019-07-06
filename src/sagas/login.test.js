import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { createSerializer } from 'enzyme-to-json';
import get from 'lodash/get';
import { put, call  } from 'redux-saga/effects';
import axios from 'axios';
import * as t from '../constants/actionTypes';
import initialStore from '../initialStore';
import { fetchLoginData, loginAfterToken, loginSaga, fetchLoginForTokenData } from './login';
import { URL_FOR_PROFILE_ME, URL_FOR_TOKEN, URL_FOR_AVATAR_PLACEHOLDER } from '../constants';

const initStore = initialStore.login;

expect.addSnapshotSerializer(createSerializer({ mode: 'deep' }));
Enzyme.configure({ adapter: new Adapter() });


describe('Test of saga `login`', () => {
  const axiosRequestForToken = {
    url: URL_FOR_TOKEN,
    body: {
      redirect_uri: process.env.REACT_APP_UNSPLASH_API_REDIRECT_URI,
      client_secret: process.env.REACT_APP_UNSPLASH_API_CLIENT_SECRET,
      code: 'd3b75c4fdb173c3058a8f1aa80dff6b89b59bf4231cb4183a178edd0c4275c0d',
      grant_type: 'authorization_code',
      client_id: process.env.REACT_APP_UNSPLASH_API_KEY,
    },
  };
  describe('loginAfterToken Saga test`', () => {
    it('loginAfterToken Saga test Passed', () => {
      const mockResponse = { profileEmail: 'email@email.com' };
      const gen = loginAfterToken('tokken');
      expect(gen.next().value).toEqual(call(fetchLoginData));
      expect(gen.next(mockResponse).value).toEqual(put({ type: 'LOGIN_SUCCESS', dataForProps: mockResponse }));
      expect(gen.next()).toEqual({ done: true, value: undefined });
    });

    it('loginAfterToken Saga test Failed 1', () => {
      const gen = loginAfterToken('tokken');
      gen.next();
      expect(gen.throw('product not found').value).toEqual(put({ type: 'LOGIN_ERROR' }));
    });

    it('loginAfterToken Saga test Failed 2', () => {
      try {
        const func = () => new Error('ответ не найден в моей базе данных');
        const gen = loginAfterToken('tokken');
        expect(gen.next().value).toEqual(call(fetchLoginData));
        gen.next(func());
      } catch (error) {
        expect(error).toEqual(put({ type: 'LOGIN_ERROR' }));
      }
    });

    it('loginAfterToken Saga test Failed 3', () => {
      const gen = loginAfterToken();
      expect(gen.next().value).toEqual(put({ type: 'LOGIN_ERROR' }));
    });
  });

  describe('loginSaga Saga test`', () => {
    it('loginSaga Saga test', () => {
      const token = '34uukj4349834983';
      const action = {
        location: {
          search: '?code=d3b75c4fdb173c3058a8f1aa80dff6b89b59bf4231cb4183a178edd0c4275c0d',
        },
      };
      const gen = loginSaga(action);
      expect(gen.next().value).toEqual(call(fetchLoginForTokenData));
      expect(gen.next(token).value).toEqual(call(loginAfterToken, token));

    });

    it('loginSaga Saga test tokenFirst and `call(loginAfterToken, tokenFirst)`: Passed', () => {
      const token = '34uukj4349834983';
      window.localStorage.setItem('token', token);
      const action = {
        location: {
          search: '?code=d3b75c4fdb173c3058a8f1aa80dff6b89b59bf4231cb4183a178edd0c4275c0d',
        },
      };
      const gen = loginSaga(action);
      expect(gen.next().value).toEqual(call(loginAfterToken, token));
    });
  });

  describe('fetchLoginForTokenData Saga test`', () => {
    it('fetchLoginForTokenData Saga test', () => {
      const gen = fetchLoginForTokenData();
      const token = '34uukj4349834983';
      expect(gen.next().value).toEqual(call(axios.post, axiosRequestForToken.url, axiosRequestForToken.body));
      expect(gen.next(token).value).toEqual(call(get, token, 'data.access_token', false));
    });
  });
});
