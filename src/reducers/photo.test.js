import * as t from '../constants/actionTypes';
import photoReducer from './photo';
import initialStore from '../initialStore';

const testInitialStore = initialStore.photo;

describe('Test of reducer `photo`', () => {
  it('without state', () => {
    expect(photoReducer({})).toEqual({});
  });
  it('case `PHOTO_FETCHING`', () => {
    const action = {
      type: t.PHOTO_FETCHING,
    };
    expect(photoReducer(initialStore, action)).toEqual({
      ...initialStore,
      isPhotoLoading: true,
      isSuccessPhotoRequest: true,
    });
  });
  it('case `PHOTO_REQUEST_SUCCESS`', () => {
    const action = {
      type: t.PHOTO_REQUEST_SUCCESS,
      dataForProps: {
        altDescriprion: 'orange and black motorcycle',
        heightPhoto: 5250,
        info: {
          lastUpdateInfo: '2019-07-28T01:15:05-04:00',
          photoDesc: null,
          views: 10807274,
          downloads: 133823,
          likes: 393,
          aperture: '',
          cameraMake: '',
          cameraModel: '',
          focalLength: '',
          height: '',
          iso: 0,
          shutterspeed: '',
          width: '',
        },
        photoProfile: 'https://',
        photoSrc: 'https://',
        tags: [],
        twitterName: 'harleydavidson',
        userFirstName: 'Harley-Davidson',
        userLastName: '',
        userName: 'harleydavidson',
        widthPhoto: 3502,
      },
    };
    expect(photoReducer(testInitialStore, action)).toEqual({
      ...testInitialStore,
      ...action.dataForProps,
      isPhotoLoading: true,
      isSuccessPhotoRequest: false,
      requestError: false,
    });
  });
  it('case `PHOTO_REQUEST_ERROR`', () => {
    const action = {
      type: t.PHOTO_REQUEST_ERROR,
    };
    expect(photoReducer(testInitialStore, action)).toEqual({
      ...testInitialStore,
      isPhotoLoading: false,
      isSuccessPhotoRequest: false,
      requestError: true,
    });
  });
  it('case `PHOTO_IMAGE_LOAD`', () => {
    const action = {
      type: t.PHOTO_IMAGE_LOAD,
    };
    expect(photoReducer(testInitialStore, action)).toEqual({
      ...testInitialStore,
      isPhotoLoading: false,
      isSuccessPhotoRequest: false,
      requestError: false,
    });
  });
});
