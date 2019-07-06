import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { createSerializer } from 'enzyme-to-json';
import get from 'lodash/get';
import { put, call } from 'redux-saga/effects';
import axios from 'axios';
import {
  fetchLoginData,
  fetchGetToken,
  loginSaga,
} from './login';
import {
  URL_FOR_PROFILE_ME,
  URL_FOR_TOKEN,
} from '../constants';

expect.addSnapshotSerializer(createSerializer({ mode: 'deep' }));
Enzyme.configure({ adapter: new Adapter() });

describe('Test of saga `login`', () => {
  const token = '0200094e573599ac92d2627288d98d4259c4e3a49402e0e9b0562beeadab8547';
  let action = {
    location: {
      search: '?code=d3b75c4fdb173c3058a8f1aa80dff6b89b59bf4231cb4183a178edd0c4275c0d',
    },
  };
  let code = (
    action && action.location && action.location.search
  )
    ? action.location.search.split('?code=')[1]
    : false;
  const response = {
    data: {
      access_token: '60e28dea945bad4a82cd97255a13fc1bac0c72ca1518612afa4c8ba31380f6c3',
    },
  };
  const axiosRequestForToken = {
    url: URL_FOR_TOKEN,
    body: {
      redirect_uri: process.env.REACT_APP_UNSPLASH_API_REDIRECT_URI,
      client_secret: process.env.REACT_APP_UNSPLASH_API_CLIENT_SECRET,
      code,
      grant_type: 'authorization_code',
      client_id: process.env.REACT_APP_UNSPLASH_API_KEY,
    },
  };
  const dataForProps = {
    profileEmail: '',
    profileFullName: '',
    profileName: '',
    profilePhotoUrl: 'http://localhost:3000/ava-placeholder.jpg',
  };
  describe('`fetchLoginData` saga test', () => {
    it('`fetchLoginData` with Login Success', () => {
      const gen = fetchLoginData(token);
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      expect(gen.next().value).toEqual(call(axios.get, URL_FOR_PROFILE_ME, { headers }));
      expect(gen.next(dataForProps).value).toEqual(put({ type: 'LOGIN_SUCCESS', dataForProps }));
      expect(gen.next()).toEqual({ done: true, value: undefined });
    });
    it('`fetchLoginData` with Login Error', () => { 
      const func = () => new Error('Login Error');
      const gen = fetchLoginData();
      const tokenEmpty = 'undefined';
      const headers = {
        Authorization: `Bearer ${tokenEmpty}`,
      };
      expect(gen.next().value).toEqual(call(axios.get, URL_FOR_PROFILE_ME, { headers }));
      gen.next(func());
      expect(gen.throw('LOGIN_ERROR').value).toEqual(put({ type: 'LOGIN_ERROR' }));
      expect(gen.next()).toEqual({ done: true, value: undefined });
    });
  });

  describe('`fetchGetToken` saga test', () => {
    it('`fetchGetToken` with Token Success', () => {
      const gen = fetchGetToken(code);
      expect(gen.next().value).toEqual(call(axios.post, axiosRequestForToken.url, axiosRequestForToken.body));
      expect(gen.next(response).value).toEqual(call(get, response, 'data.access_token', false));
      window.localStorage.clear();
      window.localStorage.setItem('token', token);
      expect(gen.next(token).value).toEqual(call(fetchLoginData, token));
      expect(gen.next()).toEqual({ done: true, value: undefined });
    });
    it('`fetchGetToken` without Token Error', () => {
      const func = () => new Error('Token Error');
      const gen = fetchGetToken(code);
      expect(gen.next().value).toEqual(call(axios.post, axiosRequestForToken.url, axiosRequestForToken.body));
      gen.next(func());
      expect(gen.throw('Login Error').value).toEqual(put({ type: 'LOGIN_ERROR' }));
      expect(gen.next()).toEqual({ done: true, value: undefined });
    });
  });

  describe('`loginSaga` saga test', () => {
    it('`loginSaga` with token in localStorage', () => {
      window.localStorage.setItem('token', token);
      const gen = loginSaga(action);
      expect(gen.next().value).toEqual(call(fetchLoginData, token));
      expect(gen.next()).toEqual({ done: true, value: undefined });
    });

    it('`loginSaga` without token in localStorage', () => {
      window.localStorage.clear();
      const gen = loginSaga(action);
      expect(gen.next().value).toEqual(call(fetchGetToken, code));
      expect(gen.next()).toEqual({ done: true, value: undefined });
    });

    it('`loginSaga` without `code`', () => {
      window.localStorage.clear();
      action = false;
      code = (
        action && action.location && action.location.search
      )
        ? action.location.search.split('?code=')[1]
        : false;
      const gen = loginSaga(action);
      expect(gen.next(code).value).toEqual(put({ type: 'LOGIN_ERROR' }));
      expect(gen.next()).toEqual({ done: true, value: undefined });
    });
  });
});
