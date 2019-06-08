/* eslint-disable camelcase */
import axios from 'axios';
import { put } from 'redux-saga/effects';
import { URL_FOR_PROFILE_ME, URL_FOR_TOKEN, URL_FOR_AVATAR_PLACEHOLDER } from '../constants/urls';

export function* loginAfterToken(token) {
  if (token) {
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = yield axios.get(URL_FOR_PROFILE_ME, { headers });
      const data = {
        profilePhotoUrl: response?.data?.profile_image?.large || URL_FOR_AVATAR_PLACEHOLDER,
        profileName: response?.data?.first_name || 'No first name',
        profileFullName: response?.data?.name || 'No name',
        profileEmail: response?.data?.email || 'No email',
      };

      yield put({ type: 'LOGIN_SUCCESS', data });
    } catch (error) {
      yield put({ type: 'LOGIN_ERROR' });
    }
  }
}
export function* loginSaga(action) {
  const tokenFirst = window.localStorage.getItem('token');
  if (tokenFirst) {
    yield loginAfterToken(tokenFirst);
  } else {
    const code = action.location.search.split('?code=')[1];
    if (code) {
      try {
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

        const response = yield axios.post(axiosRequestForToken.url, axiosRequestForToken.body);
        const token = response.data.access_token;
        window.localStorage.clear();
        window.localStorage.setItem('token', token);
        yield loginAfterToken(token);
      } catch (error) {
        yield put({ type: 'LOGIN_ERROR' });
      }
    } else {
      yield put({ type: 'LOGIN_ERROR' });
    }
  }
}
