import { runSaga } from 'redux-saga';
import { put, call } from 'redux-saga/effects';
import sinon from 'sinon';
import {
  photoRequestSaga,
  api,
  processResponse,
  getParamsRequest,
} from './photo';
import { URL_FOR_PHOTO_QUERY } from '../constants';

describe('Test of saga `user`', () => {
  // Default
  const action = {
    isPhotoLoading: true,
    match: {
      isExact: true,
      params: {
        id: 'kdGstD3te3M',
        path: '/photo/:id',
        url: '/photo/kdGstD3te3M',
      },
    },
    type: 'PHOTO_FETCHING',
  };
  const { match } = action;
  const dataForProps = {
    altDescriprion: 'orange and black motorcycle',
    heightPhoto: 5250,
    widthPhoto: 3502,
    info: {
      lastUpdateInfo: '2019-07-11T12:01:19-04:00',
      aperture: null,
      cameraMake: null,
      cameraModel: null,
      downloads: 89860,
      focalLength: null,
      height: 5250,
      iso: null,
      likes: 322,
      photoDesc: null,
      shutterspeed: null,
      views: 9333017,
      width: 3502,
    },
    photoProfile: 'https://images.unsplash.com/profile-1556751276456-1561737ea797?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=128&w=128',
    photoSrc: 'https://images.unsplash.com/photo-1558981408-db0ecd8a1ee4?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjQzODA4fQ',
    tags: [],
    twitterName: 'harleydavidson',
    userFirstName: 'Harley-Davidson',
    userLastName: '',
    userName: 'harleydavidson',
  };
  const response = {
    data: {
      tags: [],
      updated_at: '2019-07-11T12:01:19-04:00',
      alt_description: 'orange and black motorcycle',
      description: null,
      views: 9333017,
      downloads: 89860,
      likes: 322,
      width: 3502,
      height: 5250,
      exif: {
        make: null,
        focal_length: null,
        aperture: null,
        exposure_time: null,
        iso: null,
        model: null,
      },
      user: {
        first_name: 'Harley-Davidson',
        last_name: '',
        username: 'harleydavidson',
        instagram_username: 'harleydavidson',
        profile_image: {
          large: 'https://images.unsplash.com/profile-1556751276456-1561737ea797?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=128&w=128',
        },
      },
      urls: {
        regular: 'https://images.unsplash.com/photo-1558981408-db0ecd8a1ee4?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjQzODA4fQ',
      },
    },
  };
  const defaultDataForProps = {
    info: {
      lastUpdateInfo: '',
      views: 0,
      downloads: 0,
      likes: 0,
      cameraMake: '',
      focalLength: '',
      aperture: '',
      shutterspeed: '',
      iso: 0,
      cameraModel: '',
      width: 300,
      height: 300,
      photoDesc: '',
    },
    userFirstName: '',
    userLastName: '',
    userName: '',
    twitterName: '',
    photoProfile: '',
    tags: [],
    altDescriprion: '',
    photoSrc: '',
    widthPhoto: 300,
    heightPhoto: 300,
  };
  const axiosRequestForPhoto = {
    method: 'get',
    url: URL_FOR_PHOTO_QUERY(match),
  };
  describe('`userRequestSaga` saga test', () => {
    it('`userRequestSaga`: Success', () => {
      const gen = photoRequestSaga(action);
      expect(gen.next().value).toEqual(call(api.getPhoto, match));
      expect(gen.next(dataForProps).value).toEqual(put({ type: 'PHOTO_REQUEST_SUCCESS', dataForProps }));
      expect(gen.next()).toEqual({ done: true, value: undefined });
    });
    it('`userRequestSaga` with Error', () => {
      const func = () => new Error('User Statistic Error');
      const error = 'User Statistic Error';
      const gen = photoRequestSaga(action);
      expect(gen.next().value).toEqual(call(api.getPhoto, match));
      gen.next(func());
      expect(gen.throw('User Statistic Error').value).toEqual(put({ type: 'PHOTO_REQUEST_ERROR', error }));
      expect(gen.next()).toEqual({ done: true, value: undefined });
    });
    it('`userRequestSaga` without `match`', () => {
      const actionClone = {
        ...action,
        match: null,
      };
      const gen = photoRequestSaga(actionClone);
      expect(gen.next().value).toEqual(put({ type: 'PHOTO_REQUEST_ERROR' }));
      expect(gen.next()).toEqual({ done: true, value: undefined });
    });
  });
  describe('Test `processResponse` and `getParamsRequest` functions', () => {
    it('`processResponse`', () => {
      expect(processResponse()).toEqual(defaultDataForProps);
      const processResponseResultDefault = {
        data: {
          ...response.data,
          updated_at: '26.04.1984',
        },
      };
      const processResponseResult = {
        ...dataForProps,
        info: {
          ...dataForProps.info,
          lastUpdateInfo: '26.04.1984',
        },
      };

      expect(processResponse(processResponseResultDefault)).toEqual(processResponseResult);
      expect(getParamsRequest(match)).toEqual(axiosRequestForPhoto);

    });
  });

  // Mock
  describe('Test `userRequestSaga` saga: stub api', () => {
    it('test acync', async () => {
      const dispatched = [];
      const stub = sinon.stub(api, 'getPhoto');
      stub.returns({ ...dataForProps, heightPhoto: 10 });

      const result = await runSaga({
        dispatch: a => dispatched.push(a),
      }, photoRequestSaga, action).toPromise();

      expect(stub.calledWith(match)).toBe(true);
      expect(dispatched).toEqual([{
        dataForProps: {
          ...dataForProps,
          heightPhoto: 10,
        },
        type: 'PHOTO_REQUEST_SUCCESS',
      }]);
    });
  });
});