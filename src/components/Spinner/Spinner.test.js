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
      const spinnerMount = global.mountWrap(<Spinner />);
      const page = appSelector(spinnerMount);

      const spinnerContainer = page.getSpinnerContainer();
      const spinnerInner = page.getPageSpinnerInner();
      const spinnerInnerItem = page.getPageSpinnerInnerItem();
    });
  });
});