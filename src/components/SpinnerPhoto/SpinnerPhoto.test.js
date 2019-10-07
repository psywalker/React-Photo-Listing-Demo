import React from 'react';
import SpinnerPhoto from '.';

describe('Test of component of Spinner', () => {
  // Default Data
  const initialProps = {

  };

  const pageSpinnerPhotoContainer = 'div[data-test="spinnerPhotoContainer"]';
  const pageSpinnerPhotoInner = 'div[data-test="spinnerPhotoInner"]';
  const pageSpinnerPhotoInnerItem = 'div[data-test="spinnerInnerPhotoItem"]';

  const appSelector = wrapper => ({
    getSpinnerPhotoContainer: () => wrapper.find(pageSpinnerPhotoContainer),
    getPageSpinnerPhotoInner: () => wrapper.find(pageSpinnerPhotoInner),
    getPageSpinnerPhotoInnerItem: () => wrapper.find(pageSpinnerPhotoInnerItem),
  });

  // const propses = {
  //   ...initialProps,
  // };
  // const spinner = global.mountWrap(<Spinner {...propses} />);
  // console.log(spinner.debug());

  describe('Spinner component initial', () => {
    it('renders without initial props', () => {
      const spinnerPhotoMount = global.mountWrap(<SpinnerPhoto />);
      const page = appSelector(spinnerPhotoMount);

      const spinnerPhotoContainer = page.getSpinnerPhotoContainer();
      const spinnerPhotoInner = page.getPageSpinnerPhotoInner();
      const spinnerPhotoInnerItem = page.getPageSpinnerPhotoInnerItem();
    });
  });
});