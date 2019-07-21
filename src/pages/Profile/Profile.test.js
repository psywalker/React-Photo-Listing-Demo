import React from 'react';
import { Profile } from '.';
import { mapStateToProps } from '.';

describe('Test of component of Home', () => {
  // Default Data
  const initialProps = {
    logoutAction: () => {},
    loadingRequestAction: () => {},
    profilePhotoUrl: '',
    profileFullName: '',
    profileName: '',
    profileEmail: '',
    fetching: false,
    loginError: false,
    history: {},
  };

  const profile = 'div[data-test="profile"]';
  const spinner = '[data-test="spinner"]';
  const profileContent = 'div[data-test="profileContent"]';
  const profileContentAvatar = 'img[data-test="profileContentAvatar"]';
  const profileContentTitleWrap = 'div[data-test="profileContentTitleWrap"]';
  const profileContentTitle = 'h2[data-test="profileContentTitle"]';
  const profileContentEmail = 'p[data-test="profileContentEmail"]';
  const profileContentText = 'p[data-test="profileContentText"]';
  const error = 'p[data-test="error"]';

  const appSelector = wrapper => ({
    getProfile: () => wrapper.find(profile),
    getSpinner: () => wrapper.find(spinner),
    getProfileContent: () => wrapper.find(profileContent),
    getProfileContentAvatar: () => wrapper.find(profileContentAvatar),
    getProfileContentTitleWrap: () => wrapper.find(profileContentTitleWrap),
    getProfileContentTitle: () => wrapper.find(profileContentTitle),
    getProfileContentEmail: () => wrapper.find(profileContentEmail),
    getProfileContentText: () => wrapper.find(profileContentText),
    getError: () => wrapper.find(error),
  });

  // const propses = {
  //   ...initialProps,
  // }
  // const pageProfile = global.mountWrap(<Profile {...propses} />);
  // console.log(pageProfile.debug())

  describe('Photo component initial', () => {
    it('renders without initial props', () => {
      const profile = global.mountWrap(<Profile />);
      const page = appSelector(profile);

      const pageProfile = page.getProfile();
      const pageSpinner = page.getSpinner();
      const content = page.getProfileContent();
      const avatar = page.getProfileContentAvatar();
      const titleWrap = page.getProfileContentTitleWrap();
      const title = page.getProfileContentTitle();
      const email = page.getProfileContentEmail();
      const text = page.getProfileContentText();
      const pageError = page.getError();
    });
  });
});
