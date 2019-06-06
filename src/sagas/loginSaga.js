import axios from 'axios';
import { put } from 'redux-saga/effects';

export function* loginAfterToken(token) {
  if (token) {
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = yield axios.get(`${process.env.REACT_APP_PROFILE}/me`, { headers });
      const data = {
        profilePhotoUrl: response.data.profile_image.large || `${process.env.PUBLIC_URL}/ava-placeholder.jpg`,
        profileName: response.data.first_name || 'No first name',
        profileFullName: response.data.name || 'No name',
        profileEmail: response.data.email || 'No email',
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
          url: 'https://unsplash.com/oauth/token',
          body: {
            redirect_uri: process.env.REACT_APP_UNSPLASH_API_REDIRECT_URI,
            client_secret: process.env.REACT_APP_UNSPLASH_API_CLIENT_SECRET,
            code: '',
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
