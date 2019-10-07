import * as t from '../constants/actionTypes';
import userstatisticReducer from './userstatistic';
import initialStore from '../initialStore';

const testInitialStore = initialStore.userstatistic;

describe('Test of reducer `userstatistic`', () => {
  it('without state', () => {
    expect(userstatisticReducer({})).toEqual({});
  });
  it('case `USER_STATISTIC_FETCHING`', () => {
    const action = {
      type: t.USER_STATISTIC_FETCHING,
    };
    expect(userstatisticReducer(testInitialStore, action)).toEqual({
      ...testInitialStore,
      isListingLoading: true,
    });
  });
  it('case `USER_STATISTIC_REQUEST_SUCCESS`', () => {
    const action = {
      type: t.USER_STATISTIC_REQUEST_SUCCESS,
      dataForProps: [],
    };
    expect(userstatisticReducer(testInitialStore, action)).toEqual({
      ...testInitialStore,
      chartData: action.dataForProps,
      isListingLoading: false,
      requestError: false,
    });
  });
  it('case `USER_STATISTIC_REQUEST_ERROR`', () => {
    const action = {
      type: t.USER_STATISTIC_REQUEST_ERROR,
    };
    expect(userstatisticReducer(testInitialStore, action)).toEqual({
      ...testInitialStore,
      isListingLoading: false,
      requestError: true,
    });
  });
});