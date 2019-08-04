import * as t from '../constants/actionTypes';
import userReducer from './user';
import initialStore from '../initialStore';

const testInitialStore = initialStore.user;

describe('Test of reducer `user`', () => {
  it('without state', () => {
    expect(userReducer({})).toEqual({});
  });
  it('case `USER_FETCHING`', () => {
    const action = {
      type: t.USER_FETCHING,
    };
    expect(userReducer(testInitialStore, action)).toEqual({
      ...testInitialStore,
      isUserFetching: true,
    });
  });
  it('case `USER_REQUEST_SUCCESS`', () => {
    const action = {
      type: t.USER_REQUEST_SUCCESS,
      dataForProps: {
        userFirstPhoto: 'https://',
        userPhoto: 'https://',
      },
    };
    expect(userReducer(testInitialStore, action)).toEqual({
      ...testInitialStore,
      ...action.dataForProps,
      isUserFetching: false,
      requestError: false,
    });
  });
  it('case `USER_REQUEST_ERROR`', () => {
    const action = {
      type: t.USER_REQUEST_ERROR,
    };
    expect(userReducer(testInitialStore, action)).toEqual({
      ...testInitialStore,
      isUserFetching: false,
      requestError: true,
    });
  });
});