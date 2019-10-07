import initialStore from '../initialStore';

const actionDefault = {
  type: '',
};

const photo = (state = initialStore, action = actionDefault) => {
  switch (action.type) {
    case 'PHOTO_FETCHING':
      return {
        ...state,
        isPhotoLoading: true,
        isSuccessPhotoRequest: true,
      };
    case 'PHOTO_REQUEST_SUCCESS':
      return {
        ...state,
        ...action.dataForProps,
        isPhotoLoading: true,
        isSuccessPhotoRequest: false,
        requestError: false,
      };
    case 'PHOTO_REQUEST_ERROR':
      return {
        ...state,
        isPhotoLoading: false,
        isSuccessPhotoRequest: false,
        requestError: true,
      };
    case 'PHOTO_IMAGE_LOAD':
      return {
        ...state,
        isPhotoLoading: false,
        isSuccessPhotoRequest: false,
        requestError: false,
      };
    default:
      return state;
  }
};

export default photo;
