import React from 'react';
import Spinner from '.';

describe('Test of component of Spinner', () => {
  // Default Data
  const initialProps = {

  };

  const pageSpinnerContainer = 'div[data-test="spinnerContainer"]';
  const pageSpinnerInner = 'div[data-test="spinnerInner"]';
  const pageSpinnerInnerItem = 'div[data-test="spinnerInnerItem"]';

  const appSelector = wrapper => ({
    getSpinnerContainer: () => wrapper.find(pageSpinnerContainer),
    getPageSpinnerInner: () => wrapper.find(pageSpinnerInner),
    getPageSpinnerInnerItem: () => wrapper.find(pageSpinnerInnerItem),
  });

  // const propses = {
  //   ...initialProps,
  // };
  // const spinner = global.mountWrap(<Spinner {...propses} />);
  // console.log(spinner.debug());

  describe('Spinner component initial', () => {
    it('renders without initial props', () => {
      // const searchMount = global.mountWrap(<Search />);
      // const page = appSelector(searchMount);

      // const searchContainer = page.getPageSearchContainer();
      // const search = page.getPageSearch();
      // const searchInput = page.getPageSearchInput();
    });
  });
});