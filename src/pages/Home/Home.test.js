import React from 'react';
import { Home } from '.';
import { mapStateToProps } from '.';
import { testDidUpdate } from '.';

describe('Test of component of Home', () => {
  // Default Data
  const initialProps = {
    cardsPhotosRequestAction: () => {},
    paginationChangeAction: () => {},
    filterItemValueAction: () => {},
    searchTextAction: () => {},
    searchChangeInputValueAction: () => {},
    filters: [],
    isListingLoading: false,
    cards: [],
    cardsData: {
      query: 'wallpapers',
      page: 1,
      per_page: 6,
    },
    totalCards: 0,
    navTopItemActive: 0,
    photolistingRequestError: false,
    match: {
      params: {
        tag: '',
      },
    },
  };

  const filters = [
    {
      filterValue: 'editorial',
      id: 0,
      label: 'Editorial',
    },
    {
      border: true,
      filterValue: 'following',
      id: 1,
      label: 'Following',
    },
  ];
  const cards = [
    {
      photoDesc: null,
      photoAltDesc: 'image',
      photoID: '1',
      tags: [
        {
          title: 'motorcycle',
        },
      ],
      photoName: 'https://images.unsplash.com/photo-1558981408-db0ecd8a1ee4?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjQzODA4fQ',
      title: 'Harley-Davidson',
      userAvatar: 'https://images.unsplash.com/profile-1556751276456-1561737ea797?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=128&w=128',
      userID: 'harleydavidson',
    },
  ];
  const match = {
    params: {
      tag: 'motorcycle',
    },
  };
  const homeErrorText = 'div[data-test="errorText"]';
  const homeSpinner = '[data-test="spinner"]';
  const homeSearch = 'Search[data-test="search"]';
  const homeNavTop = 'ul[data-test="navTop"]';
  const homeNavTopItem = 'li[data-test="navTopItem"]';
  const homeNavTopItemTag = 'div[data-test="navTopItemTag"]';
  const homePhotoCardList = 'ul[data-test="photoCardList"]';
  const homePhotoCardListItem = 'li[data-test="photoCardListItem"]';
  const homePhotoCardsTextEmpty = 'div[data-test="cardsTextEmpty"]';
  const homePaginationComponent = 'Pagination[data-test-id-pagination="pagination"]';
  const homePaginationDiv = 'div[data-test="pagination"]';
  const homePaginationUl = 'ul[data-test-id-pagination="pagination"]';

  const appSelector = wrapper => ({
    getHomeErrorText: () => wrapper.find(homeErrorText),
    getHomeSpinner: () => wrapper.find(homeSpinner),
    getHomeSearch: () => wrapper.find(homeSearch),
    getHomeNavTop: () => wrapper.find(homeNavTop),
    getHomeNavTopItem: () => wrapper.find(homeNavTopItem),
    getHomeNavTopItemTag: () => wrapper.find(homeNavTopItemTag),
    getNthHomeNavTopItem: n => wrapper.find(homeNavTopItem).at(n),
    getNthHomeNavTopItemTag: n => wrapper.find(homeNavTopItemTag).at(n),
    getHomePhotoCardList: () => wrapper.find(homePhotoCardList),
    getHomePhotoCardListItem: () => wrapper.find(homePhotoCardListItem),
    getNthHomePhotoCardListItem: n => wrapper.find(homePhotoCardListItem).at(n),
    getHomeCardsTextEmpty: () => wrapper.find(homePhotoCardsTextEmpty),
    getHomePaginationComponent: () => wrapper.find(homePaginationComponent),
    getHomePaginationDiv: () => wrapper.find(homePaginationDiv),
    getHomePaginationUl: () => wrapper.find(homePaginationUl),
  });

  describe('Home component initial', () => {
    it('renders without initial props', () => {
      const home = global.mountWrap(<Home />);
      const page = appSelector(home);
      const errorText = page.getHomeErrorText();
      const spinner = page.getHomeSpinner();
      const search = page.getHomeSearch();
      const navTop = page.getHomeNavTop();
      const navTopItem = page.getHomeNavTopItem();
      const photoCardList = page.getHomePhotoCardList();
      const photoCardListItem0 = page.getNthHomePhotoCardListItem(0);
      const cardsTextEmpty = page.getHomeCardsTextEmpty();
      const paginationComponent = page.getHomePaginationComponent();
      const paginationDiv = page.getHomePaginationDiv();
      const paginationUl = page.getHomePaginationUl();

      expect(home.instance().props.filters).toBeArray();
      expect(home.instance().props.filters).toBeArrayOfSize(0);
      expect(home.instance().props.match.params.tag).toBeString();
      expect(errorText).toHaveLength(0);
      expect(spinner).toHaveLength(0);
      expect(search.prop('queryText')).toEqual('wallpapers');
      expect(search.prop('onSearchInputValue')).toBeFunction();
      expect(search.prop('onChangeInputValue')).toBeFunction();
      expect(search.prop('queryText')).toBeString();
      expect(navTop).toHaveLength(1);
      expect(navTopItem).toHaveLength(0);
      expect(photoCardList).toHaveLength(1);
      expect(photoCardListItem0).toHaveLength(0);
      expect(cardsTextEmpty).toHaveLength(1);
      expect(paginationComponent).toHaveLength(0);
      expect(paginationDiv).toHaveLength(1);
      expect(paginationUl).toHaveLength(0);

      expect(home).toMatchSnapshot();
    });
  });

  describe('Test component `Home` with diff props ', () => {
    it('with `filters` data ', () => {
      const props = {
        ...initialProps,
        filters,
      };

      const home = global.mountWrap(<Home {...props} />);
      const page = appSelector(home);

      const navTop = page.getHomeNavTop();
      const navTopItem = page.getHomeNavTopItem();
      const navTopItem0 = page.getNthHomeNavTopItem(0);

      expect(navTopItem).toHaveLength(2);
      expect(navTop).toHaveLength(1);
      expect(navTopItem0).toHaveText('Editorial');

      expect(navTop).toMatchSnapshot();
    });
    it('test spinner with `isListingLoading` true ', () => {
      const props = {
        ...initialProps,
        isListingLoading: true,
      };

      const home = global.mountWrap(<Home {...props} />);
      const page = appSelector(home);
      const spinner = page.getHomeSpinner();

      expect(spinner).toHaveLength(1);

      expect(spinner).toMatchSnapshot();
    });
    it('test `cards` ', () => {
      const props = {
        ...initialProps,
        cards,
      };

      const home = global.mountWrap(<Home {...props} />);
      const page = appSelector(home);
      const photoCardList = page.getHomePhotoCardList();
      const photoCardListItem = page.getHomePhotoCardListItem();

      expect(photoCardList).toHaveLength(1);
      expect(photoCardListItem).toHaveLength(1);

      expect(photoCardList).toMatchSnapshot();
    });
    it('test `cardsTextEmpty` with totalCards` ', () => {
      const props = {
        ...initialProps,
        totalCards: 10,
      };

      const home = global.mountWrap(<Home {...props} />);
      const page = appSelector(home);
      const cardsTextEmpty = page.getHomeCardsTextEmpty();

      expect(cardsTextEmpty).toHaveLength(0);

      expect(cardsTextEmpty).toMatchSnapshot();
    });
    it('test `cardsTextEmpty` with totalCards` > `cardsData.per_page`', () => {
      const props = {
        ...initialProps,
        totalCards: 10,
      };

      const home = global.mountWrap(<Home {...props} />);
      const page = appSelector(home);
      const paginationDiv = page.getHomePaginationDiv();

      expect(paginationDiv).toHaveLength(1);

      expect(paginationDiv).toMatchSnapshot();
    });
    it('test `photolistingRequestError` true', () => {
      const props = {
        ...initialProps,
        photolistingRequestError: true,
      };

      const home = global.mountWrap(<Home {...props} />);
      const page = appSelector(home);
      const errorText = page.getHomeErrorText();

      expect(errorText).toHaveLength(1);

      expect(errorText).toMatchSnapshot();
    });
  });
  describe('Test action methods ', () => {
    it('Test `searchTextAction` and `searchChangeInputValueAction` actions', () => {
      const mockSearchTextAction = jest.fn();
      const mockSearchChangeInputValueAction = jest.fn();
      const props = {
        ...initialProps,
        searchTextAction: mockSearchTextAction,
        searchChangeInputValueAction: mockSearchChangeInputValueAction,
      };
      const home = global.mountWrap(<Home {...props} />);
      const page = appSelector(home);
      const search = page.getHomeSearch();

      search.props().onSearchInputValue('text1', 'tags1');
      expect(mockSearchTextAction.mock.calls.length).toBe(1)
      expect(mockSearchTextAction.mock.calls[0][0]).toBe('text1');
      expect(mockSearchTextAction.mock.calls[0][1]).toBe('tags1');

      search.props().onChangeInputValue('text2');
      expect(mockSearchChangeInputValueAction.mock.calls.length).toBe(1)
      expect(mockSearchChangeInputValueAction.mock.calls[0][0]).toBe('text2');
      expect(mockSearchChangeInputValueAction.mock.calls[0][1]).toBe(undefined);

      expect(search).toMatchSnapshot();
    });
    it('Test `filterItemValueAction` actions', () => {
      const mockFilterItemValueAction = jest.fn();
      const props = {
        ...initialProps,
        filters,
        filterItemValueAction: mockFilterItemValueAction,
      };
      const home = global.mountWrap(<Home {...props} />);
      const page = appSelector(home);
      const navTopItemTag0 = page.getNthHomeNavTopItemTag(0);

      navTopItemTag0.props().onClick();
      expect(mockFilterItemValueAction).toBeCalled();
      expect(mockFilterItemValueAction.mock.calls.length).toBe(1)
      expect(mockFilterItemValueAction.mock.calls[0][0]).toBe('editorial');
      expect(mockFilterItemValueAction.mock.calls[0][1]).toBe(0);

      expect(home).toMatchSnapshot();
    });
    it('Test `cardsPhotosRequestAction` actions', () => {
      const mockCardsPhotosRequestAction = jest.fn();
      const props = {
        ...initialProps,
        handleСardsPhotosAction: mockCardsPhotosRequestAction,
      };
      const home = global.mountWrap(<Home {...props} />);

      expect(mockCardsPhotosRequestAction).toHaveBeenCalledTimes(1);

      home.setProps({
        cardsData: {
          query: 'wallpapers',
          page: 1,
          per_page: 2,
        },
      });

      expect(mockCardsPhotosRequestAction).toHaveBeenCalledTimes(2);
      expect(mockCardsPhotosRequestAction).toHaveBeenCalledWith({
        query: 'wallpapers',
        page: 1,
        per_page: 2,
      });

      // The same `cardsData`
      const cardsData = {
        query: 'wallpapers',
        page: 1,
        per_page: 2,
      };

      home.setProps({
        cardsData,
      });
      expect(mockCardsPhotosRequestAction).toHaveBeenCalledTimes(3);

      home.setProps({
        cardsData,
      });
      expect(mockCardsPhotosRequestAction).toHaveBeenCalledTimes(3);

      const mockTestUpdate = jest.fn();
      testDidUpdate.get = mockTestUpdate;

      expect(mockTestUpdate).toHaveBeenCalledTimes(0);

      home.setProps({
        cardsData: {
          query: 'wallpapers',
          page: 1,
          per_page: 2,
        },
      });
      expect(mockTestUpdate).toHaveBeenCalledTimes(1);

      home.props().handleСardsPhotosAction();
      expect(mockCardsPhotosRequestAction).toHaveBeenCalledTimes(5);

      home.props().handleСardsPhotosAction();
      expect(mockCardsPhotosRequestAction).toHaveBeenCalledTimes(6);
      
    });
    it('Test `filterItemValueAction` actions', () => {
      const mockPaginationChangeAction = jest.fn();
      const props = {
        ...initialProps,
        totalCards: 10,
        paginationChangeAction: mockPaginationChangeAction,
      };
      const home = global.mountWrap(<Home {...props} />);
      const page = appSelector(home);
      const paginationComponent = page.getHomePaginationComponent();

      paginationComponent.at(0).props().onChange(1);
      expect(mockPaginationChangeAction).toBeCalled();
      expect(mockPaginationChangeAction.mock.calls.length).toBe(1)
      expect(mockPaginationChangeAction.mock.calls[0][0]).toBe(1);

      expect(paginationComponent).toMatchSnapshot();
    });
    it('Test `mapStateToProps` method', () => {
      const state = {
        photolisting: {
          cards: [],
          cardsData: { query: 'wallpapers', page: 1, per_page: 6 },
          filters: [],
          isListingLoading: false,
          navTopItemActive: 2,
          photolistingRequestError: false,
          totalCards: 25841,
        },
      };
      const { photolisting } = state;
      const result = mapStateToProps(state);
      expect(result).toEqual(photolisting);
    });
  });
});