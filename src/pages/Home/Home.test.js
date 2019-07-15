import React from 'react';
import { Home } from '.';
import filters from '../../filters';
import mountWrap from '../../setupTests';

describe('Test of component of Home', () => {
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
    navTopItemActive: 2,
    photolistingRequestError: false,
    match: {
      params: {
        tag: '',
      },
    },
  };

  describe('Home component initial', () => {
    it('renders without initial props', () => {
      const home = global.shallow(<Home />);
      expect(home.instance().props.filters).toBeArray();
      expect(home.instance().props.filters).toBeArrayOfSize(0);
      expect(home.instance().props.match.params.tag).toBeString();
    });
    it('renders with initial props', () => {
      const home = global.shallow(<Home {...initialProps} />);

      expect(home.find('[data-test="navTopItem"]')).toHaveLength(0);
      expect(home.find('[data-test="CardsTextEmpty"]')).toHaveLength(1);
      expect(home.find('[data-test="pagination"]')).toHaveLength(1);
      expect(home.find('[data-test="spinner"]')).toHaveLength(0);
      expect(home).toMatchSnapshot();
    });

    it('renders with loading', () => {
      const props = {
        ...initialProps,
        isListingLoading: true,
      };

      const home = global.shallow(<Home {...props} />);
      expect(home.find('[data-test="spinner"]')).toHaveLength(1);
      expect(home).toMatchSnapshot();
    });

    it('renders without loading', () => {
      const props = {
        ...initialProps,
        isListingLoading: false,
      };

      const home = global.shallow(<Home {...props} />);
      expect(home.find('[data-test="spinner"]')).toHaveLength(0);
      expect(home).toMatchSnapshot();
    });

    it('renders with error', () => {
      const props = {
        ...initialProps,
        photolistingRequestError: true,
      };

      const home = global.shallow(<Home {...props} />);
      expect(home.find('[data-test="errorText"]').text()).toEqual('Error loading photolisting');
      expect(home).toMatchSnapshot();
    });

    it('renders Error if `totalCards` > `cardsData.per_page`', () => {
      const props = {
        ...initialProps,
        totalCards: 7,
        cardsData: {
          query: 'wallpapers',
          page: 1,
          per_page: 2,
        },
      };

      const home = mountWrap(<Home {...props} />);
      expect(home.find('[data-test-id-pagination="pagination"]')).toHaveLength(2);
      expect(home).toMatchSnapshot();
    });

    it('dispatches the `cardsPhotosRequestAction()` method it receives from props', () => {
      const mockFetchRequestAction = jest.fn();
      const props = {
        ...initialProps,
        cardsPhotosRequestAction: mockFetchRequestAction,
        cardsData: {
          query: 'wallpapers',
          page: 1,
          per_page: 2,
        },
      };

      const home = global.shallow(<Home {...props} />);
      home.setProps({
        cardsData: {
          query: 'wallpapers',
          page: 1,
          per_page: 2,
        },
      });
      expect(mockFetchRequestAction).toHaveBeenCalledTimes(2);
      expect(home).toMatchSnapshot();
    });

    it('dispatches the `getPaginationChange()` method it receives from props', () => {
      const mockFetchRequestAction = jest.fn();
      const props = {
        ...initialProps,
        paginationChangeAction: mockFetchRequestAction,
      };

      const home = global.shallow(<Home {...props} />);
      home.setProps({
        cardsData: {
          query: 'wallpapers',
          page: 1,
          per_page: 2,
        },
      });
      home.instance().getPaginationChange();
      expect(mockFetchRequestAction).toHaveBeenCalledTimes(1);
      expect(home).toMatchSnapshot();
    });
  });

  describe('Home component with content', () => {
    it('renders without filters for NavTop', () => {
      const props = {
        ...initialProps,
      };

      const home = global.shallow(<Home {...props} />);
      expect(home.find('.nav-top__item')).toHaveLength(0);
      expect(home).toMatchSnapshot();
    });
  });

  describe('Mount tests', () => {
    it('Test method of tags', () => {
      const { id, filterValue } = filters[0];
      const props = {
        ...initialProps,
        filters,
      };

      const home = mountWrap(<Home {...props} />);
      expect(home).toMatchSnapshot();
      home.instance().getFilterItemValue = jest.fn();
      home.instance().forceUpdate();
      home.find('.ant-tag').first().simulate('click');
      expect(home.instance().getFilterItemValue).toHaveBeenCalledTimes(1);
      expect(home.instance().getFilterItemValue).toHaveBeenCalledWith(filterValue, id);
    });
  });
});