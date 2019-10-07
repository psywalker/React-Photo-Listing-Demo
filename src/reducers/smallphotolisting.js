import initialStore from '../initialStore';

const actionDefault = {
  type: '',
};

const smallphotolisting = (state = initialStore, action = actionDefault) => {
  switch (action.type) {
    case 'SMALL_PHOTO_LISTING_FETCHING':
      return {
        ...state,
        [action.itemNum]: {
          isSmallPhotoListingFetching: true,
        },
      };
    case 'SMALL_PHOTO_LISTING_SUCCESS':
      return {
        ...state,
        [action.dataForProps.itemNum]: {
          ...action.dataForProps,
          isSmallPhotoListingFetching: false,
          requestError: false,
        },
      };
    case 'SMALL_PHOTO_LISTING_REQUEST_ERROR':
      return {
        ...state,
        [action.itemNum]: {
          isSmallPhotoListingFetching: false,
          requestError: true,
        },
      };
    default:
      return state;
  }
};

export default smallphotolisting;
