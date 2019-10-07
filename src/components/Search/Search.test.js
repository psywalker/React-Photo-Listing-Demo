import React from 'react';
import sinon from 'sinon';
import Search from '.';

describe('Test of component of Search', () => {
  // Default Data
  const initialProps = {
    queryText: '',
    onSearchInputValue: () => {},
    onChangeInputValue: () => {},
  };

  const pageSearchContainer = 'div[data-test="searchContainer"]';
  const pageSearch = 'Search[data-test="searchInput"]';
  const pageSearchInputontainer = 'Input[data-test="searchInput"]';
  const pageSearchInput = 'input[data-test="searchInput"]';

  const appSelector = wrapper => ({
    getPageSearchContainer: () => wrapper.find(pageSearchContainer),
    getPageSearch: () => wrapper.find(pageSearch),
    getPageSearchInputContainer: () => wrapper.find(pageSearchInputontainer),
    getPageSearchInput: () => wrapper.find(pageSearchInput),
  });

  describe('Search component initial', () => {
    it('renders without initial props', () => {
      const searchMount = global.mountWrap(<Search />);
      const page = appSelector(searchMount);

      const searchContainer = page.getPageSearchContainer();
      const search = page.getPageSearch();
      const searchInput = page.getPageSearchInput();

      expect(searchContainer).toHaveLength(1);
      expect(searchInput.prop('value')).toEqual('');
      expect(searchInput.prop('placeholder')).toEqual('Wallpapers');
      expect(search.prop('onChange')).toBeFunction();
    });
  });

  describe('Test `queryText` prop ', () => {
    it('without text in `queryText`', () => {
      const props = {
        ...initialProps,
      };
      const searchMount = global.mountWrap(<Search {...props} />);
      expect(searchMount.state().inputValue).toEqual('');
    });
    it('with text in `queryText`', () => {
      const props = {
        ...initialProps,
        queryText: 'testText',
      };
      const searchMount = global.mountWrap(<Search {...props} />);
      expect(searchMount.state().inputValue).toEqual('testText');
    });
  });

  describe('Test state', () => {
    it('initial state', () => {
      const props = {
        ...initialProps,
        queryText: 'testText',
      };
      const searchMount = global.mountWrap(<Search {...props} />);
      const page = appSelector(searchMount);
      const searchInput = page.getPageSearchInput();

      expect(searchInput.prop('value')).toEqual('testText');
    });
  });

  describe('Test methods from props', () => {
    it('Test `onSearchInputValue` when empty `queryText`', () => {
      const mockSearchInputValue = jest.fn();
      const props = {
        ...initialProps,
        onSearchInputValue: mockSearchInputValue,
      };
      const searchMount = global.mountWrap(<Search {...props} />);
      const page = appSelector(searchMount);
      const search = page.getPageSearch();

      search.props().onSearch();
      expect(mockSearchInputValue.mock.calls.length).toBe(0);
    });
    it('Test `onSearchInputValue` when full `queryText`', () => {
      const mockSearchInputValue = jest.fn();
      const props = {
        ...initialProps,
        queryText: 'testText',
        onSearchInputValue: mockSearchInputValue,
      };
      const searchMount = global.mountWrap(<Search {...props} />);
      const page = appSelector(searchMount);
      const search = page.getPageSearch();

      search.props().onSearch();
      expect(mockSearchInputValue.mock.calls.length).toBe(1);
      expect(mockSearchInputValue.mock.calls[0][0]).toBe('testText');
    });

    it('Test `onChangeInputValue`', () => {
      const mockChangeInputValue = jest.fn();
      const props = {
        ...initialProps,
        onChangeInputValue: mockChangeInputValue,
      };
      const searchMount = global.mountWrap(<Search {...props} />);
      const page = appSelector(searchMount);
      const searchInput = page.getPageSearchInput();

      const event = {
        target: {
          value: 'testValue',
        },
      };

      searchInput.simulate('change', event);
      expect(mockChangeInputValue.mock.calls.length).toBe(0);
      setTimeout(() => {
        expect(mockChangeInputValue.mock.calls.length).toBe(1);
        expect(mockChangeInputValue.mock.calls[0][0]).toBe('testValue');
      }, 1000);

      const searchShallow = global.shallow(<Search {...props} />);
      const instance = searchShallow.instance();
      instance.onChangeDebounced('testValue');
      setTimeout(() => {
        expect(mockChangeInputValue.mock.calls.length).toBe(2);
        expect(mockChangeInputValue.mock.calls[0][0]).toBe('testValue');
      }, 1000);
    });
    it('Test `onChangeInputValue` with timer', () => {
      const mockChangeInputValue = jest.fn();
      const props = {
        ...initialProps,
        onChangeInputValue: mockChangeInputValue,
      };

      const searchShallow = global.shallow(<Search {...props} />);
      const instance = searchShallow.instance();

      const clock = sinon.useFakeTimers();
      instance.onChangeDebounced('testValue');
      clock.tick(1000);
      expect(mockChangeInputValue.mock.calls.length).toBe(1);
    });
  });
});