import axios from 'axios';
import { put, takeEvery, all } from 'redux-saga/effects';

function* loginAfterToken(token) {
  if (token) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const responseEnd = yield axios.get(`${process.env.REACT_APP_PROFILE}/me`, { headers });

    const data = {
      profilePhotoUrl: responseEnd.data.profile_image.small,
      profileName: responseEnd.data.name,
      profileEmail: responseEnd.data.email,
    };

    yield put({ type: 'LOGIN_SUCCESS', data });
  }
}

function* loginSaga(action) {
  const tokenFirst = window.localStorage.getItem('token');
  if (tokenFirst) {
    yield loginAfterToken(tokenFirst);
  } else {
    const code = action.location.search.split('?code=')[1];
    const axiosRequestForToken = {
      url: 'https://unsplash.com/oauth/token',
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
  }
}

export default function* rootSaga() {
  yield all([
    yield takeEvery('LOGIN_FETCHING', loginSaga),
  ]);
}
