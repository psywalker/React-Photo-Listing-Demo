import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { createSerializer } from 'enzyme-to-json';
import * as t from '../constants/actionTypes';
import loginReducer from './login';
import initialStore from '../initialStore';

const initLoginState = initialStore.login;

expect.addSnapshotSerializer(createSerializer({ mode: 'deep' }));
Enzyme.configure({ adapter: new Adapter() });

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
      })
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
      })
    });

    it('LOGIN_SUCCESS 2', () => {
      const action = {
        type: 'LOGIN_SUCCESS',
      };

      expect(loginReducer(initLoginState, action)).not.toEqual({
        ...initLoginState,
        fetching: true,
      })
    });
  });

});