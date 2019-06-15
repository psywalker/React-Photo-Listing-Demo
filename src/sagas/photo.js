import axios from 'axios';
import { put } from 'redux-saga/effects';
import get from 'lodash/get';
import { URL_FOR_PHOTO_QUERY } from '../constants';

export default function* photoRequestSaga(action) {
  const { match } = action;
  if (match) {
    try {
      const res = yield axios.get(URL_FOR_PHOTO_QUERY(match));
      const responceObj = {
        info: {
          views: get(res, 'data.views') || 0,
          downloads: get(res, 'data.downloads') || 0,
          likes: get(res, 'data.likes') || 0,
          cameraMake: get(res, 'data.exif.make') || '',
          focalLength: get(res, 'data.exif.focal_length') || '',
          aperture: get(res, 'data.exif.aperture') || '',
          shutterspeed: get(res, 'data.exif.exposure_time') || '',
          iso: get(res, 'data.exif.iso') || 0,
          cameraModel: get(res, 'data.exif.model') || '',
        },
        userFirstName: get(res, 'data.user.first_name') || '',
        userLastName: get(res, 'data.user.last_name') || '',
        userName: get(res, 'data.user.username') || '',
        twitterName: get(res, 'data.user.instagram_username') || '',
        photoProfile: get(res, 'data.user.profile_image.large') || '',
        tags: get(res, 'data.tags') || [],
        altDescriprion: get(res, 'data.alt_description') || '',
        photoSrc: get(res, 'data.urls.regular') || '',
        photoDesc: get(res, 'data.description') || '',
        widthPhoto: get(res, 'data.width') || 300,
        heightPhoto: get(res, 'data.height') || 300,
      };
      console.log("1: ", res)
      yield put({ type: 'PHOTO_REQUEST_SUCCESS', responceObj });
    } catch (error) {
      yield put({ type: 'PHOTO_REQUEST_ERROR', error });
    }
  }
}
