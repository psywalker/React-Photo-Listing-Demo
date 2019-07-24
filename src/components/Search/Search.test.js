import React from 'react';
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
  const pageSearchInput = 'input[data-test="searchInput"]';

  const appSelector = wrapper => ({
    getPageSearchContainer: () => wrapper.find(pageSearchContainer),
    getPageSearch: () => wrapper.find(pageSearch),
    getPageSearchInput: () => wrapper.find(pageSearchInput),
  });

  // const propses = {
  //   ...initialProps,
  //   queryText: '111',
  // };
  // const search = global.mountWrap(<Search {...propses} />);
  // console.log(search.debug());

  describe('Search component initial', () => {
    it('renders without initial props', () => {
      const searchMount = global.mountWrap(<Search />);
      const page = appSelector(searchMount);

      const searchContainer = page.getPageSearchContainer();
      const search = page.getPageSearch();
      const searchInput = page.getPageSearchInput();
    });
  });
});