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
        isPhotoLoading: false,
        requestError: false,
      };
    case 'PHOTO_REQUEST_ERROR':
      return {
        ...state,
        isPhotoLoading: false,
        requestError: true,
      };
    default:
      return state;
  }
};

export default photo;