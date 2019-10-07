import React from 'react';
import { Profile } from '.';
import { mapStateToProps } from '.';

describe('Test of component of Profile', () => {
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
    history: {
      push: () => {},
    },
  };

  const profilePage = 'div[data-test="profile"]';
  const spinner = '[data-test="spinner"]';
  const profileContent = 'div[data-test="profileContent"]';
  const profileContentAvatar = 'img[data-test="profileContentAvatar"]';
  const profileContentTitleWrap = 'div[data-test="profileContentTitleWrap"]';
  const profileContentTitle = 'h2[data-test="profileContentTitle"]';
  const profileContentEmail = 'p[data-test="profileContentEmail"]';
  const profileContentText = 'p[data-test="profileContentText"]';
  const error = 'div[data-test="error"]';

  const appSelector = wrapper => ({
    getProfile: () => wrapper.find(profilePage),
    getSpinner: () => wrapper.find(spinner),
    getProfileContent: () => wrapper.find(profileContent),
    getProfileContentAvatar: () => wrapper.find(profileContentAvatar),
    getProfileContentTitleWrap: () => wrapper.find(profileContentTitleWrap),
    getProfileContentTitle: () => wrapper.find(profileContentTitle),
    getProfileContentEmail: () => wrapper.find(profileContentEmail),
    getProfileContentText: () => wrapper.find(profileContentText),
    getError: () => wrapper.find(error),
  });

  describe('Profile component initial', () => {
    it('renders without initial props', () => {
      const profile = global.mountWrap(<Profile />);
      const page = appSelector(profile);

      const pageSpinner = page.getSpinner();
      const content = page.getProfileContent();
      const avatar = page.getProfileContentAvatar();
      const titleWrap = page.getProfileContentTitleWrap();
      const title = page.getProfileContentTitle();
      const email = page.getProfileContentEmail();
      const text = page.getProfileContentText();
      const pageError = page.getError();


      expect(profile.instance().props.profileEmail).toBeString();
      expect(profile.instance().props.profilePhotoUrl).toBeString(0);
      expect(pageSpinner).toHaveLength(0);
      expect(content).toHaveLength(1);
      expect(titleWrap).toHaveLength(1);
      expect(avatar.prop('src')).toEqual('');
      expect(title).toHaveText('');
      expect(email).toHaveText('');
      expect(text).toHaveText('Download free, beautiful high-quality photos curated by ');
      expect(pageError).toHaveLength(0);
    });
  });
  describe('Error and Spinner', () => {
    it('with loginError true ', () => {
      const props = {
        ...initialProps,
        loginError: true,
      };
      const profile = global.mountWrap(<Profile {...props} />);
      const page = appSelector(profile);
      const pageError = page.getError();

      expect(pageError).toHaveLength(1);
    });
    it('with fetching true ', () => {
      const props = {
        ...initialProps,
        fetching: true,
      };
      const profile = global.mountWrap(<Profile {...props} />);
      const page = appSelector(profile);
      const pageSpinner = page.getSpinner();

      expect(pageSpinner).toHaveLength(1);
    });
  });
  describe('Test component `Home` with diff props ', () => {
    it('with full props data ', () => {
      const props = {
        ...initialProps,
        profilePhotoUrl: 'profilePhotoUrl',
        profileFullName: 'profileFullName',
        profileName: 'profileName',
        profileEmail: 'profileEmail',
      };
      const profile = global.mountWrap(<Profile {...props} />);
      const page = appSelector(profile);
      const avatar = page.getProfileContentAvatar();
      const title = page.getProfileContentTitle();
      const email = page.getProfileContentEmail();
      const text = page.getProfileContentText();

      expect(avatar.prop('src')).toEqual('profilePhotoUrl');
      expect(title).toHaveText('profileFullName');
      expect(email).toHaveText('profileEmail');
      expect(text).toHaveText('Download free, beautiful high-quality photos curated by profileName');
    });
  });
  describe('Test methods ', () => {
    it('Test `localStorage` ', () => {
      const props = {
        ...initialProps,
        profilePhotoUrl: 'profilePhotoUrl',
        profileFullName: 'profileFullName',
        profileName: 'profileName',
        profileEmail: 'profileEmail',
      };

      // jest.spyOn(window.localStorage.__proto__, 'clear');
      // window.localStorage.__proto__.clear = jest.fn();

      const profile = global.mountWrap(<Profile {...props} />);
      profile.instance().handleLoguotProfile();

      // expect(window.localStorage.clear.mock.calls.length).toBe(1);
    });
    it('Test `mapStateToProps` method', () => {
      const state = {
        login: {
          fetching: true,
          loginError: false,
          profileEmail: '',
          profileFullName: '',
          profileName: '',
          profilePhotoUrl: '',
        },
      };
      const { login } = state;
      const result = mapStateToProps(state);
      expect(result).toEqual(login);
    });
  });
});
