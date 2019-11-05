import axios from 'axios';
import { put, call } from 'redux-saga/effects';
import get from 'lodash/get';
import { URL_FOR_PHOTO_QUERY } from '../constants';

export const processResponse = (response) => {
  const dataForProps = {
    info: {
      lastUpdateInfo: get(response, 'data.updated_at', ''),
      photoDesc: get(response, 'data.description', ''),
      views: get(response, 'data.views', 0),
      downloads: get(response, 'data.downloads', 0),
      likes: get(response, 'data.likes', 0),
      cameraMake: get(response, 'data.exif.make', ''),
      focalLength: get(response, 'data.exif.focal_length', ''),
      aperture: get(response, 'data.exif.aperture', ''),
      shutterspeed: get(response, 'data.exif.exposure_time', ''),
      iso: get(response, 'data.exif.iso', 0),
      cameraModel: get(response, 'data.exif.model', ''),
      width: get(response, 'data.width', 300),
      height: get(response, 'data.height', 300),
    },
    photoUrlSizes: [
      {
        url: get(response, 'data.urls.thumb', ''),
        value: 'photoSizeNames.thumb',
      },
      {
        url: get(response, 'data.urls.small', ''),
        value: 'photoSizeNames.small',
      },
      {
        url: get(response, 'data.urls.regular', ''),
        value: 'photoSizeNames.regular',
      },
      {
        url: get(response, 'data.urls.raw', ''),
        value: 'photoSizeNames.raw',
      },
      {
        url: get(response, 'data.urls.full', ''),
        value: 'photoSizeNames.full',
      },
    ],
    userFirstName: get(response, 'data.user.first_name', ''),
    userLastName: get(response, 'data.user.last_name', ''),
    userName: get(response, 'data.user.username', ''),
    twitterName: get(response, 'data.user.instagram_username', ''),
    photoProfile: get(response, 'data.user.profile_image.large', ''),
    tags: get(response, 'data.tags', []),
    altDescriprion: get(response, 'data.alt_description', ''),
    photoSrc: get(response, 'data.urls.regular', ''),
    widthPhoto: get(response, 'data.width', 300),
    heightPhoto: get(response, 'data.height', 300),
  };
  return dataForProps;
};

export const getParamsRequest = (match) => {
  const axiosRequestForPhoto = {
    method: 'get',
    url: URL_FOR_PHOTO_QUERY(match),
  };
  return axiosRequestForPhoto;
};

const getPhoto = match => axios(getParamsRequest(match)).then(processResponse);

export const api = {
  getPhoto,
};

export function* photoRequestSaga(action) {
  const { match } = action;
  if (match) {
    try {
      const dataForProps = yield call(api.getPhoto, match);
      yield put({ type: 'PHOTO_REQUEST_SUCCESS', dataForProps });
    } catch (error) {
      yield put({ type: 'PHOTO_REQUEST_ERROR', error });
    }
  } else {
    yield put({ type: 'PHOTO_REQUEST_ERROR' });
  }
}
