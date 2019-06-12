import initialStore from '../initialStore';

const photo = (state = initialStore, action) => {
  switch (action.type) {
    case 'PHOTO_FETCHING':
      return {
        ...state,
        isPhotoLoading: true,
      };
    case 'PHOTO_REQUEST_SUCCESS':
      return {
        ...state,
        ...action.responceObj,
        isPhotoLoading: true,
        requestError: false,
      };
    case 'PHOTO_REQUEST_ERROR':
      return {
        ...state,
        isPhotoLoading: false,
        requestError: true,
      };
    case 'PHOTO_IMAGE_LOAD':
      return {
        ...state,
        isPhotoLoading: false,
        requestError: false,
      };
    default:
      return state;
  }
};

export default photo;