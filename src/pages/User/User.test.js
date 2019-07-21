import React from 'react';
import { User } from '.';
import { mapStateToProps } from '.';

describe('Test of component of User', () => {
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
        id: 'harleydavidson',
      },
    },
  };

  const userContainer = 'div[data-test="userContainer"]';
  const spinner = '[data-test="spinner"]';
  const userAvatar = 'img[data-test="userAvatar"]';
  const userCardPhotoWrap = 'div[data-test="userCardPhotoWrap"]';
  const userCardPhotoAvatar = 'Avatar[data-test="userCardPhotoAvatar"]';
  const userTabs = 'div[data-test="userTabs"]';
  const userTabsItem = 'div[data-test="userTabsItem"]';
  const smallPhotoListing = 'div[data-test="smallPhotoListing"]';
  const userStatistic = 'div[data-test="userStatistic"]';
  const userError = '[data-test="photoError"]';

  const appSelector = wrapper => ({
    getUserContainer: () => wrapper.find(userContainer),
    getSpinner: () => wrapper.find(spinner),
    getUserAvatar: () => wrapper.find(userAvatar),
    getUserCardPhotoWrap: () => wrapper.find(userCardPhotoWrap),
    getUserCardPhotoAvatar: () => wrapper.find(userCardPhotoAvatar),
    getUserTabs: () => wrapper.find(userTabs),
    getUserTabsItem: () => wrapper.find(userTabsItem),
    getSmallPhotoListing: () => wrapper.find(smallPhotoListing),
    getUserStatistic: () => wrapper.find(userStatistic),
    getUserError: () => wrapper.find(userError),
  });

  // const propses = {
  //   ...initialProps,
  //   isUserFetching: false,
  // }
  // const pageUser = global.shallow(<User {...propses} />);
  // console.log(pageUser.debug())

  describe('User component initial', () => {
    it('renders without initial props', () => {
      const pageUser = global.mountWrap(<User />);
      const page = appSelector(pageUser);

      const user = page.getUserContainer();
      const spinner = page.getSpinner();
      const userPageAvatar = page.getUserAvatar();
      const userPageCardPhotoWrap = page.getUserCardPhotoWrap();
      const userPageCardPhotoAvatar = page.getUserCardPhotoAvatar();
      const userPageTabs = page.getUserTabs();
      const userPageTabsItem = page.getUserTabsItem();
      const smallPhotoListingComponent = page.getSmallPhotoListing();
      const userPageStatistic = page.getUserStatistic();
      const error = page.getUserError();
    });
  });
});
