import axios from 'axios';
import { put, call } from 'redux-saga/effects';
import get from 'lodash/get';
import {
  URL_FOR_PROFILE_ME,
  URL_FOR_TOKEN,
  URL_FOR_AVATAR_PLACEHOLDER,
} from '../constants';

export const api = {
  getProfile: (token) => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return axios.get(URL_FOR_PROFILE_ME, { headers }).then(response => ({
      profilePhotoUrl: get(response, 'data.profile_image.large', URL_FOR_AVATAR_PLACEHOLDER),
      profileName: get(response, 'data.first_name', ''),
      profileFullName: get(response, 'data.name', ''),
      profileEmail: get(response, 'data.email', ''),
    }));
  },
};

export function* fetchLoginData(token) {
  try {
    const dataForProps = yield call(api.getProfile, token);
    yield put({ type: 'LOGIN_SUCCESS', dataForProps });
  } catch {
    yield put({ type: 'LOGIN_ERROR' });
  }
}

export function* fetchGetToken(code) {
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
  try {
    const response = yield call(axios.post, axiosRequestForToken.url, axiosRequestForToken.body);
    const token = yield call(get, response, 'data.access_token', false);
    window.localStorage.clear();
    window.localStorage.setItem('token', token);
    yield call(fetchLoginData, token);
  } catch {
    yield put({ type: 'LOGIN_ERROR' });
  }
}

export function* loginSaga(action) {
  const tokenFirst = window.localStorage.getItem('token');
  const code = (
    action && action.location && action.location.search
  )
    ? action.location.search.split('?code=')[1]
    : false;
  if (tokenFirst && tokenFirst !== 'undefined') {
    yield call(fetchLoginData, tokenFirst);
  } else if (code) {
    yield call(fetchGetToken, code);
  } else {
    yield put({ type: 'LOGIN_ERROR' });
  }
}
