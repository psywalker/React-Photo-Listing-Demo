import React from 'react';
import { Home } from '.';

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
    getNthHomeNavTopItem: n => wrapper.find(homeNavTopItem).at(n),
    getHomePhotoCardList: () => wrapper.find(homePhotoCardList),
    getHomePhotoCardListItem: () => wrapper.find(homePhotoCardListItem),
    getNthHomePhotoCardListItem: n => wrapper.find(homePhotoCardListItem).at(n),
    getHomeCardsTextEmpty: () => wrapper.find(homePhotoCardsTextEmpty),
    getHomePaginationComponent: () => wrapper.find(homePaginationComponent),
    getHomePaginationDiv: () => wrapper.find(homePaginationDiv),
    getHomePaginationUl: () => wrapper.find(homePaginationUl),
  });
  const propses = {
    ...initialProps,
    filters,
    cards,
    match,
    totalCards: 0,
  };
  describe('Home component initial', () => {
    it('renders without initial props', () => {
      const home = global.mountWrap(<Home {...propses} />);
      console.log(home.debug())
    });
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
      expect(navTopItem).toHaveLength(2);
      expect(navTopItem0).toHaveText('Editorial');
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
    });
  });
  // describe('Home component initial', () => {
  //   it('renders without initial props', () => {
  //     const home = global.shallow(<Home />);
  //     expect(home.instance().props.filters).toBeArray();
  //     expect(home.instance().props.filters).toBeArrayOfSize(0);
  //     expect(home.instance().props.match.params.tag).toBeString();
  //   });
  //   it('renders with initial props', () => {
  //     const home = global.shallow(<Home {...initialProps} />);

  //     expect(home.find('[data-test="navTopItem"]')).toHaveLength(0);
  //     expect(home.find('[data-test="CardsTextEmpty"]')).toHaveLength(1);
  //     expect(home.find('[data-test="pagination"]')).toHaveLength(1);
  //     expect(home.find('[data-test="spinner"]')).toHaveLength(0);
  //     expect(home).toMatchSnapshot();
  //   });

  //   it('renders with loading', () => {
  //     const props = {
  //       ...initialProps,
  //       isListingLoading: true,
  //     };

  //     const home = global.shallow(<Home {...props} />);
  //     expect(home.find('[data-test="spinner"]')).toHaveLength(1);
  //     expect(home).toMatchSnapshot();
  //   });

  //   it('renders without loading', () => {
  //     const props = {
  //       ...initialProps,
  //       isListingLoading: false,
  //     };

  //     const home = global.shallow(<Home {...props} />);
  //     expect(home.find('[data-test="spinner"]')).toHaveLength(0);
  //     expect(home).toMatchSnapshot();
  //   });

  //   it('renders with error', () => {
  //     const props = {
  //       ...initialProps,
  //       photolistingRequestError: true,
  //     };

  //     const home = global.shallow(<Home {...props} />);
  //     expect(home.find('[data-test="errorText"]').text()).toEqual('Error loading photolisting');
  //     expect(home).toMatchSnapshot();
  //   });

  //   it('renders Error if `totalCards` > `cardsData.per_page`', () => {
  //     const props = {
  //       ...initialProps,
  //       totalCards: 7,
  //       cardsData: {
  //         query: 'wallpapers',
  //         page: 1,
  //         per_page: 2,
  //       },
  //     };

  //     const home = mountWrap(<Home {...props} />);
  //     expect(home.find('[data-test-id-pagination="pagination"]')).toHaveLength(2);
  //     expect(home).toMatchSnapshot();
  //   });

  //   it('dispatches the `cardsPhotosRequestAction()` method it receives from props', () => {
  //     const mockFetchRequestAction = jest.fn();
  //     const props = {
  //       ...initialProps,
  //       cardsPhotosRequestAction: mockFetchRequestAction,
  //       cardsData: {
  //         query: 'wallpapers',
  //         page: 1,
  //         per_page: 2,
  //       },
  //     };

  //     const home = global.shallow(<Home {...props} />);
  //     home.setProps({
  //       cardsData: {
  //         query: 'wallpapers',
  //         page: 1,
  //         per_page: 2,
  //       },
  //     });
  //     expect(mockFetchRequestAction).toHaveBeenCalledTimes(2);
  //     expect(home).toMatchSnapshot();
  //   });

  //   it('dispatches the `getPaginationChange()` method it receives from props', () => {
  //     const mockFetchRequestAction = jest.fn();
  //     const props = {
  //       ...initialProps,
  //       paginationChangeAction: mockFetchRequestAction,
  //     };

  //     const home = global.shallow(<Home {...props} />);
  //     home.setProps({
  //       cardsData: {
  //         query: 'wallpapers',
  //         page: 1,
  //         per_page: 2,
  //       },
  //     });
  //     home.instance().getPaginationChange();
  //     expect(mockFetchRequestAction).toHaveBeenCalledTimes(1);
  //     expect(home).toMatchSnapshot();
  //   });
  // });

  // describe('Home component with content', () => {
  //   it('renders without filters for NavTop', () => {
  //     const props = {
  //       ...initialProps,
  //     };

  //     const home = global.shallow(<Home {...props} />);
  //     expect(home.find('.nav-top__item')).toHaveLength(0);
  //     expect(home).toMatchSnapshot();
  //   });
  // });

  // describe('Mount tests', () => {
  //   it('Test method of tags', () => {
  //     const { id, filterValue } = filters[0];
  //     const props = {
  //       ...initialProps,
  //       filters,
  //     };

  //     const home = global.mountWrap(<Home {...props} />);
  //     expect(home).toMatchSnapshot();
  //     home.instance().getFilterItemValue = jest.fn();
  //     home.instance().forceUpdate();
  //     home.find('.ant-tag').first().simulate('click');
  //     expect(home.instance().getFilterItemValue).toHaveBeenCalledTimes(1);
  //     expect(home.instance().getFilterItemValue).toHaveBeenCalledWith(filterValue, id);
  //   });
  // });
});