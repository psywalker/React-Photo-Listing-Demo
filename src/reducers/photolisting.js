import initialStore from '../initialStore';

const photolisting = (state = initialStore, action) => {
  switch (action.type) {
    case 'CARDS_PHOTOS_FETCHING':
      return {
        ...state,
        isListingLoading: true,
      };
    case 'CARDS_PHOTOS_REQUEST_SUCCESS':
      return {
        ...state,
        ...action.responceObj,
        photolistingRequestError: false,
      };
    case 'PAGINATION_CHANGE':
      return {
        ...state,
        cardsData: {
          ...state.cardsData,
          page: action.page,
        },
      };
    case 'FILTER_ITEM_VALUE':
      return {
        ...state,
        navTopItemActive: action.itemId,
        cardsData: {
          ...state.cardsData,
          page: 1,
          query: action.itemText,
        },
      };
    case 'SEARCH_TEXT':
      return {
        ...state,
        navTopItemActive: action.tags ? -2 : state.navTopItemActive,
        cardsData: {
          ...state.cardsData,
          page: 1,
          query: action.text,
        },
      };
    case 'SEARCH_TEXT_CHANGE_INPUT_VALUE':
      return {
        ...state,
        cardsData: {
          ...state.cardsData,
          query: action.text,
        },
      };
    case 'CARDS_PHOTOS_REQUEST_ERROR':
      return {
        ...state,
        isListingLoading: false,
        photolistingRequestError: true,
      };
    default:
      return state;
  }
};

export default photolisting;
