import initialStore from '../initialStore';

const userphotolisting = (state = initialStore, action) => {
  switch (action.type) {
    case 'USER_PHOTO_LISTING_FETCHING':
      return {
        ...state,
        isUserPhotoListingFetching: true,
      };
    case 'USER_PHOTO_LISTING_SUCCESS':
      return {
        ...state,
        ...action.dataForProps,
        isUserPhotoListingFetching: false,
        requestError: false,
      };
    case 'USER_PHOTO_LISTING_ERROR':
      return {
        ...state,
        isUserPhotoListingFetching: false,
        requestError: true,
      };
    default:
      return state;
  }
};

export default userphotolisting;
