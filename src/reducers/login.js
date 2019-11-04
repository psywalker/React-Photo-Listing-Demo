import initialStore from '../initialStore';

const login = (state = initialStore, action = {}) => {
  switch (action.type) {
    case 'LOGIN_FETCHING':
      return {
        ...state,
        fetching: true,
        loginError: false,
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        ...action.dataForProps,
        fetching: false,
        loginError: false,
      };
    case 'LOGIN_ERROR':
      return {
        ...state,
        fetching: false,
        loginError: true,
      };
    case 'LOGOUT':
      return {
        ...state,
        ...initialStore.login,
      };
    default:
      return state;
  }
};

export default login;
