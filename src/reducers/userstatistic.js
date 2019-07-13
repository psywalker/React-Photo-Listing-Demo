import initialStore from '../initialStore';

const userstatistic = (state = initialStore, action) => {
  switch (action.type) {
    case 'USER_STATISTIC_FETCHING':
      return {
        ...state,
        isListingLoading: true,
      };
    case 'USER_STATISTIC_REQUEST_SUCCESS':
      return {
        ...state,
        chartData: action.dataForProps,
        isListingLoading: false,
        requestError: false,
      };
    case 'USER_STATISTIC_REQUEST_ERROR':
      return {
        ...state,
        isListingLoading: false,
        requestError: true,
      };
    default:
      return state;
  }
};

export default userstatistic;
