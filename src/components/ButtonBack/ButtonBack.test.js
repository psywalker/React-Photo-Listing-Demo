import React from 'react';
import { MemoryRouter } from 'react-router-dom';
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
    it('renders ButtonBack', () => {
      const props = {
        ...initialProps,
        lastLocation: {},
      };
      const buttonBack = global.mountWrap(<ButtonBack {...props} />);
      const page = appSelector(buttonBack);

      const button = page.getBtnBack();
      button.props().onClick();
      console.log(button.debug());

      // const wrapper = global.mountWrap(
      //   <MemoryRouter initialEntries={['/random']}>
      //     <ButtonBack />
      //   </MemoryRouter>,
      // );

      // console.log(wrapper.debug());
    });
  });
});