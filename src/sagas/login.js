import axios from 'axios';
import { put, call } from 'redux-saga/effects';
import get from 'lodash/get';
import { URL_FOR_PROFILE_ME, URL_FOR_TOKEN, URL_FOR_AVATAR_PLACEHOLDER } from '../constants';

let headers = {};
let axiosRequestForToken = {};
export const fetchLoginData = () => axios.get(URL_FOR_PROFILE_ME, { headers }).then(response => ({
  profilePhotoUrl: get(response, 'data.profile_image.large', URL_FOR_AVATAR_PLACEHOLDER),
  profileName: get(response, 'data.first_name', ''),
  profileFullName: get(response, 'data.name', ''),
  profileEmail: get(response, 'data.email', ''),
}));

// export const fetchLoginForTokenData = () => (
//   axios.post(axiosRequestForToken.url, axiosRequestForToken.body)
//     .then(response => (
//       get(response, 'data.access_token', false)
//     )));

export function* loginAfterToken(token) {
  if (token) {
    try {
      headers = {
        Authorization: `Bearer ${token}`,
      };
      const dataForProps = yield call(fetchLoginData);
      yield put({ type: 'LOGIN_SUCCESS', dataForProps });
    } catch (error) {
      yield put({ type: 'LOGIN_ERROR' });
    }
  } else {
    yield put({ type: 'LOGIN_ERROR' });
  }
}

export function* fetchLoginForTokenData() {
  const response = yield call(axios.post, axiosRequestForToken.url, axiosRequestForToken.body);
  const token = yield call(get, response, 'data.access_token', false);
  // yield token;
  // return get(response, 'data.access_token', false);
  window.localStorage.clear();
  window.localStorage.setItem('token', token);
  yield call(loginAfterToken, token);
}

export function* loginSaga(action) {
  const tokenFirst = window.localStorage.getItem('token');
  if (tokenFirst && tokenFirst !== 'undefined') {
    yield call(loginAfterToken, tokenFirst);
  } else {
    const code = action.location.search.split('?code=')[1];
    if (code) {
      try {
        axiosRequestForToken = {
          url: URL_FOR_TOKEN,
          body: {
            redirect_uri: process.env.REACT_APP_UNSPLASH_API_REDIRECT_URI,
            client_secret: process.env.REACT_APP_UNSPLASH_API_CLIENT_SECRET,
            code,
            grant_type: 'authorization_code',
            client_id: process.env.REACT_APP_UNSPLASH_API_KEY,
          },
        };
        yield call(fetchLoginForTokenData);
        // const token = yield call(fetchLoginForTokenData);
        // window.localStorage.clear();
        // window.localStorage.setItem('token', token);
        // yield call(loginAfterToken, token);
      } catch (error) {
        yield put({ type: 'LOGIN_ERROR' });
      }
    } else {
      yield put({ type: 'LOGIN_ERROR' });
    }
  }
}
