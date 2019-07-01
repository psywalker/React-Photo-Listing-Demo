import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { BrowserRouter } from 'react-router-dom';
import { shape } from 'prop-types';
import { createSerializer } from 'enzyme-to-json';
import { Home } from '.';
import filters from '../../filters';

expect.addSnapshotSerializer(createSerializer({ mode: 'deep' }));
Enzyme.configure({ adapter: new Adapter() });

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
        tag: {},
      },
    },
  };
  const router = {
    history: new BrowserRouter().history,
    route: {
      location: {},
      match: {},
    },
  };

  const createContext = () => ({
    context: { router },
    childContextTypes: { router: shape({}) },
  });

  function mountWrap(node) {
    return mount(node, createContext());
  }

  describe('Home component initial', () => {
    it('renders with initial props', () => {
      const home = shallow(<Home {...initialProps} />);

      expect(home.find('.nav-top__item')).toHaveLength(0);
      expect(home.find('.cards__text-empty')).toHaveLength(1);
      expect(home.find('.pagination')).toHaveLength(1);
      expect(home.find('.spinner')).toHaveLength(0);
      expect(home).toMatchSnapshot();
    });

    it('renders with loading', () => {
      const props = {
        ...initialProps,
        isListingLoading: true,
      };

      const home = shallow(<Home {...props} />);
      expect(home.find('.spinner')).toHaveLength(1);
      expect(home).toMatchSnapshot();
    });

    it('renders with error', () => {
      const props = {
        ...initialProps,
        photolistingRequestError: true,
      };

      const home = shallow(<Home {...props} />);
      expect(home.find('.error-text').text()).toEqual('Error loading photolisting');
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

      const home = shallow(<Home {...props} />);
      home.setProps({
        cardsData: {
          query: 'wallpapers',
          page: 1,
          per_page: 2,
        },
      });
      expect(mockFetchRequestAction).toHaveBeenCalledTimes(1);
      expect(home).toMatchSnapshot();
    });

    it('dispatches the `getPaginationChange()` method it receives from props', () => {
      const mockFetchRequestAction = jest.fn();
      const props = {
        ...initialProps,
        paginationChangeAction: mockFetchRequestAction,
      };

      const home = shallow(<Home {...props} />);
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
    it('renders with cards', () => {
      const props = {
        ...initialProps,
        cards: [
          {
            photoDesc: null,
            photoID: 'kdGstD3te3M',
            photoName: 'https://images.unsplash.com/photo-1558981408-db0ecd8a1ee4?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjQzODA4fQ',
            title: 'Harley-Davidson',
            userAvatar: 'https://images.unsplash.com/profile-1556751276456-1561737ea797?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=128&w=128',
            userID: 'harleydavidson',
          },
        ],
      };
      const home = shallow(<Home {...props} />);
      expect(home.find('.photo-list__item')).toHaveLength(1);
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
      home.instance().getFilterItemValue = jest.fn();
      home.find('.ant-tag').first().simulate('click');
      expect(home.instance().getFilterItemValue).toHaveBeenCalledTimes(1);
      expect(home.instance().getFilterItemValue).toHaveBeenCalledWith(filterValue, id);
    });
  });
});