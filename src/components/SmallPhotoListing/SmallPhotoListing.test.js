import React from 'react';
import { SmallPhotoListing } from '.';
import { mapStateToProps } from '.';

describe('Test of component of SmallPhotoListing', () => {
  // Default Data
  const initialProps = {
    isUserFetching: true,
    userPhoto: '',
    userFirstPhoto: '',
    userRequestAction: () => {},
    requestError: false,
    history: {},
    match: {
      params: {
        id: '',
      },
    },
  };

  const userContainer = 'div[data-test="userContainer"]';


  const appSelector = wrapper => ({
    getUserContainer: () => wrapper.find(userContainer),

  });

  const propses = {
    ...initialProps,
    isUserFetching: false,
  }
  const pageSmallPhotoListing = global.mountWrap(<SmallPhotoListing {...propses} />);
  // console.log(pageUser.debug())

  describe('User component initial', () => {
    it('renders without initial props', () => {
      // const pageUser = global.mountWrap(<User />);
      // const page = appSelector(pageUser);

      // const user = page.getUserContainer();

    });
  });
});