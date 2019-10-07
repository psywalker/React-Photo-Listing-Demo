import * as t from '../constants/actionTypes';
import loginReducer from './login';
import initialStore from '../initialStore';

const initLoginState = initialStore.login;

describe('Test of reducer `login`', () => {
 
  const initialState = {
    fetching: false,
    loginError: false,
  };

  describe('Test of `LOGIN_FETCHING`', () => {
    it('LOGIN_FETCHING', () => {
      const action = {
        type: t.LOGIN_FETCHING,
      };

      expect(loginReducer(initLoginState, action)).toEqual({
        ...initLoginState,
        fetching: true,
        loginError: false,
      });
    });
  });
  describe('Test of `LOGIN_FETCHING`', () => {
    it('LOGIN_SUCCESS', () => {
      const action = {
        type: 'LOGIN_SUCCESS',
        dataForProps: {
          profilePhotoUrl: 'http://net.com',
          profileName: 'Name',
          profileFullName: 'FirstName LastName',
          profileEmail: 'psywalker09@gmail.com',
        }
      };

      expect(loginReducer(initLoginState, action)).toEqual({
        ...initLoginState,
        ...action.dataForProps,
        fetching: false,
        loginError: false,
      });
    });

    it('LOGIN_SUCCESS 2', () => {
      const action = {
        type: 'LOGIN_SUCCESS',
      };

      expect(loginReducer(initLoginState, action)).not.toEqual({
        ...initLoginState,
        fetching: true,
      });
    });

    it('LOGIN_ERROR', () => {
      const action = {
        type: 'LOGIN_ERROR',
      };

      expect(loginReducer(initLoginState, action)).toEqual({
        ...initLoginState,
        fetching: false,
        loginError: true,
      });
    });
    it('LOGOUT', () => {
      const action = {
        type: 'LOGOUT',
      };

      expect(loginReducer(initLoginState, action)).toEqual(
        initLoginState,
      );
    });
    it('return default state', () => {
      const action = {};

      expect(loginReducer(initialStore, action)).toEqual(initialStore);
    });
    it('', () => {
      expect(loginReducer(initialStore)).toEqual(initialStore);
    });
    it('return default state', () => {
      const action = {
        type: 'Test',
      };

      expect(loginReducer(initialStore, action)).toEqual(initialStore);
      expect(loginReducer()).toEqual(initialStore);
    });
  });

});