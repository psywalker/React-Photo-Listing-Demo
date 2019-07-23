import React from 'react';
import { ButtonBack } from '.';

describe('Test of component of ButtonBack', () => {
  // Default Data
  const initialProps = {
    history: {},
  };

  const btnBack = 'button[data-test="btnBack"]';

  const appSelector = wrapper => ({
    getBtnBack: () => wrapper.find(btnBack),
  });

  // const propses = {
  //   ...initialProps,
  //   lastLocation: {},
  // };
  // const buttonBack = global.mountWrap(<ButtonBack {...propses} />);
  // console.log(buttonBack.debug());

  describe('ButtonBack component initial', () => {
    it('renders without initial props', () => {
      const buttonBack = global.mountWrap(<ButtonBack />);
      const page = appSelector(buttonBack);

      const button = page.getBtnBack();
    });
  });
});