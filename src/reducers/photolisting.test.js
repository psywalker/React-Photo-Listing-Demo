import * as t from '../constants/actionTypes';
import photolistingReducer from './photolisting';
import initialStore from '../initialStore';

const testInitialStore = initialStore.photolisting;

describe('Test of reducer `photolisting`', () => {
  it('without state', () => {
    expect(photolistingReducer({})).toEqual({});
  });
  it('case `CARDS_PHOTOS_FETCHING`', () => {
    const action = {
      type: t.CARDS_PHOTOS_FETCHING,
    };
    expect(photolistingReducer(testInitialStore, action)).toEqual({
      ...testInitialStore,
      isListingLoading: true,
    });
  });
  it('case `PHOTO_REQUEST_SUCCESS`', () => {
    const action = {
      type: t.CARDS_PHOTOS_REQUEST_SUCCESS,
      dataForProps: {
        cards: [],
        isListingLoading: false,
        totalCards: 26753,
      },
    };
    expect(photolistingReducer(testInitialStore, action)).toEqual({
      ...testInitialStore,
      ...action.dataForProps,
      photolistingRequestError: false,
    });
  });
  it('case `PAGINATION_CHANGE`', () => {
    const action = {
      type: t.PAGINATION_CHANGE,
    };
    expect(photolistingReducer(testInitialStore, action)).toEqual({
      ...testInitialStore,
      cardsData: {
        ...testInitialStore.cardsData,
        page: action.page,
      },
    });
  });
  it('case `FILTER_ITEM_VALUE`', () => {
    const action = {
      type: t.FILTER_ITEM_VALUE,
      itemText: 'test',
      itemId: 0,
    };
    expect(photolistingReducer(testInitialStore, action)).toEqual({
      ...testInitialStore,
      navTopItemActive: action.itemId,
      cardsData: {
        ...testInitialStore.cardsData,
        page: 1,
        query: action.itemText,
      },
    });
  });
  it('case `SEARCH_TEXT`', () => {
    const action = {
      type: t.SEARCH_TEXT,
      itemText: 'test',
    };
    expect(photolistingReducer(testInitialStore, action)).toEqual({
      ...testInitialStore,
      navTopItemActive: action.tags ? -2 : testInitialStore.navTopItemActive,
      cardsData: {
        ...testInitialStore.cardsData,
        page: 1,
        query: action.text,
      },
    });
  });
  it('case `SEARCH_TEXT` with action.tags', () => {
    const action = {
      type: t.SEARCH_TEXT,
      itemText: 'test',
      tags: 'tagsTest',
    };
    expect(photolistingReducer(testInitialStore, action)).toEqual({
      ...testInitialStore,
      navTopItemActive: action.tags ? -2 : testInitialStore.navTopItemActive,
      cardsData: {
        ...testInitialStore.cardsData,
        page: 1,
        query: action.text,
      },
    });
  });
  it('case `SEARCH_TEXT_CHANGE_INPUT_VALUE`', () => {
    const action = {
      type: t.SEARCH_TEXT_CHANGE_INPUT_VALUE,
      text: 'test',
    };
    expect(photolistingReducer(testInitialStore, action)).toEqual({
      ...testInitialStore,
      cardsData: {
        ...testInitialStore.cardsData,
        query: action.text,
      },
    });
  });
  it('case `CARDS_PHOTOS_REQUEST_ERROR`', () => {
    const action = {
      type: t.CARDS_PHOTOS_REQUEST_ERROR,
      text: 'test',
    };
    expect(photolistingReducer(testInitialStore, action)).toEqual({
      ...testInitialStore,
      isListingLoading: false,
      photolistingRequestError: true,
    });
  });
});
