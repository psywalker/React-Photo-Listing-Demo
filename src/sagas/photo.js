import axios from 'axios';
import { put } from 'redux-saga/effects';
import get from 'lodash/get';
import { URL_FOR_PHOTO_QUERY } from '../constants';

export default function* photoRequestSaga(action) {
  const { match } = action;
  if (match) {
    try {
      const responce = yield axios.get(URL_FOR_PHOTO_QUERY(match));
      const dataForProps = {
        info: {
          lastUpdateInfo: get(responce, 'data.updated_at', ''),
          photoDesc: get(responce, 'data.description', ''),
          views: get(responce, 'data.views', 0),
          downloads: get(responce, 'data.downloads', 0),
          likes: get(responce, 'data.likes', 0),
          cameraMake: get(responce, 'data.exif.make', ''),
          focalLength: get(responce, 'data.exif.focal_length', ''),
          aperture: get(responce, 'data.exif.aperture', ''),
          shutterspeed: get(responce, 'data.exif.exposure_time', ''),
          iso: get(responce, 'data.exif.iso', 0),
          cameraModel: get(responce, 'data.exif.model', ''),
          width: get(responce, 'data.width', 300),
          height: get(responce, 'data.height', 300),
        },
        userFirstName: get(responce, 'data.user.first_name', ''),
        userLastName: get(responce, 'data.user.last_name', ''),
        userName: get(responce, 'data.user.username', ''),
        twitterName: get(responce, 'data.user.instagram_username', ''),
        photoProfile: get(responce, 'data.user.profile_image.large', ''),
        tags: get(responce, 'data.tags', []),
        altDescriprion: get(responce, 'data.alt_description', ''),
        photoSrc: get(responce, 'data.urls.regular', ''),
        widthPhoto: get(responce, 'data.width', 300),
        heightPhoto: get(responce, 'data.height', 300),
      };
      yield put({ type: 'PHOTO_REQUEST_SUCCESS', dataForProps });
    } catch (error) {
      yield put({ type: 'PHOTO_REQUEST_ERROR', error });
    }
  }
}
