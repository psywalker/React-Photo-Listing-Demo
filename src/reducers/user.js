import initialStore from '../initialStore';

const user = (state = initialStore, action = {}) => {
  switch (action.type) {
    case 'USER_FETCHING':
      return {
        ...state,
        isUserFetching: true,
      };
    case 'USER_REQUEST_SUCCESS':
      return {
        ...state,
        ...action.dataForProps,
        isUserFetching: false,
        requestError: false,
      };
    case 'USER_REQUEST_ERROR':
      return {
        ...state,
        isUserFetching: false,
        requestError: true,
      };
    default:
      return state;
  }
};

export default user;
