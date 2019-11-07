import initialStore from '../initialStore';
import { INITIAL_LOGIN_DATA } from '../constants';

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
        ...INITIAL_LOGIN_DATA,
      };
    default:
      return state;
  }
};

export default login;
