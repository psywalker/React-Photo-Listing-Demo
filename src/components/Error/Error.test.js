import React from 'react';
import Error from '.';

describe('Test of component of ButtonBack', () => {
  // Default Data
  const initialProps = {
    text: '111',
    smallErrorFlag: false,
  };

  const pageError = 'div[data-test="error"]';

  const appSelector = wrapper => ({
    getPageError: () => wrapper.find(pageError),
  });

  const propses = {
    ...initialProps,
  };
  const error = global.mountWrap(<Error {...propses} />);
  console.log(error.debug());

  describe('ButtonBack component initial', () => {
    it('renders without initial props', () => {
      // const buttonBack = global.mountWrap(<ButtonBack />);
      // const page = appSelector(buttonBack);

      // const button = page.getBtnBack();
    });
  });
});