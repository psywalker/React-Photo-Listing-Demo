import * as t from '../constants/actionTypes';
import smallphotolistingReducer from './smallphotolisting';
import initialStore from '../initialStore';

const testInitialStore = initialStore.smallphotolisting;

describe('Test of reducer `smallphotolisting`', () => {
  it('without state', () => {
    expect(smallphotolistingReducer({})).toEqual({});
  });
  it('case `SMALL_PHOTO_LISTING_FETCHING`', () => {
    const action = {
      type: t.SMALL_PHOTO_LISTING_FETCHING,
      itemNum: 0,
    };
    expect(smallphotolistingReducer(testInitialStore, action)).toEqual({
      ...testInitialStore,
      [action.itemNum]: {
        isSmallPhotoListingFetching: true,
      },
    });
  });
  it('case `SMALL_PHOTO_LISTING_SUCCESS`', () => {
    const action = {
      type: t.SMALL_PHOTO_LISTING_SUCCESS,
      dataForProps: {
        cards: [],
        itemNum: 0,
        page: 1,
        perPage: 6,
        totalCards: 53,
      }
    };
    expect(smallphotolistingReducer(testInitialStore, action)).toEqual({
      ...testInitialStore,
      [action.dataForProps.itemNum]: {
        ...action.dataForProps,
        isSmallPhotoListingFetching: false,
        requestError: false,
      },
    });
  });
  it('case `SMALL_PHOTO_LISTING_REQUEST_ERROR`', () => {
    const action = {
      type: t.SMALL_PHOTO_LISTING_REQUEST_ERROR,
      itemNum: 0,
    };
    expect(smallphotolistingReducer(testInitialStore, action)).toEqual({
      ...testInitialStore,
      [action.itemNum]: {
        isSmallPhotoListingFetching: false,
        requestError: true,
      },
    });
  });
});
