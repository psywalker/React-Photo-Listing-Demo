import initialStore from '../initialStore';

const userlikesphotos = (state = initialStore, action) => {
  switch (action.type) {
    case 'USER_LIKES_FETCHING':
      return {
        ...state,
        isUserLikesFetching: true,
      };
    case 'USER_LIKES_SUCCESS':
      return {
        ...state,
        ...action.dataForProps,
        isUserLikesFetching: false,
        requestError: false,
      };
    case 'USER_LIKES_ERROR':
      return {
        ...state,
        isUserLikesFetching: false,
        requestError: true,
      };
    default:
      return state;
  }
};

export default userlikesphotos;
