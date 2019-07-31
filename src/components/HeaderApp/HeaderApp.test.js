import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { HeaderApp } from '.';
import { mapStateToProps } from '.';

describe('Test of component of ButtonBack', () => {
  // Default Data
  const initialProps = {
    history: {},
    logoutAction: () => {},
    profilePhotoUrl: '',
    profileName: '',
    profileEmail: '',
    fetching: false,
  };

  const pageHeaderApp = 'div[data-test="headerApp"]';
  const pageUserLayoutHeader = 'header[data-test="userLayoutHeader"]';
  const pageInner = 'div[data-test="page"]';
  const pageSiteLogoLinkRouter = 'Link[data-test="siteLogoLinkRouter"]';
  const pageSiteLogoLink = 'a[data-test="siteLogoLinkRouter"]';
  const pageSiteLogoTitle = 'h1[data-test="siteLogoTitle"]';
  const pageBtnBackRoute = 'Route[data-test="btnBackRoute"]';
  const pageBtnLogout = 'button[data-test="btnLogout"]';

  const appSelector = wrapper => ({
    getPageHeaderApp: () => wrapper.find(pageHeaderApp),
    getPageUserLayoutHeader: () => wrapper.find(pageUserLayoutHeader),
    getPageInner: () => wrapper.find(pageInner),
    getPageSiteLogoLinkRouter: () => wrapper.find(pageSiteLogoLinkRouter),
    getPageSiteLogoLink: () => wrapper.find(pageSiteLogoLink),
    getPageSiteLogoTitle: () => wrapper.find(pageSiteLogoTitle),
    getPageBtnBackRoute: () => wrapper.find(pageBtnBackRoute),
    getPageBtnLogout: () => wrapper.find(pageBtnLogout),
  });

  // const propses = {
  //   ...initialProps,
  // };
  // const headerApp = global.mountWrap(<HeaderApp {...propses} />);
  // console.log(headerApp.debug());

  describe('HeaderApp component initial', () => {
    it('renders without initial props', () => {
      const headerApp = global.mountWrap(<HeaderApp />);
      const page = appSelector(headerApp);

      const header = page.getPageHeaderApp();
      const userLayoutHeader = page.getPageUserLayoutHeader();
      const pgInner = page.getPageInner();
      const siteLogoLinkRouter = page.getPageSiteLogoLinkRouter();
      const siteLogoLink = page.getPageSiteLogoLink();
      const siteLogoTitle = page.getPageSiteLogoTitle();
      const btnBackRoute = page.getPageBtnBackRoute();

    });
    it('renders ButtonBack', () => {
      const wrapper = global.mountWrap(
        <MemoryRouter initialEntries={['/random']}>
          <HeaderApp />
        </MemoryRouter>,
      );
    });
  });
  describe('Test action methods ', () => {
    it('Test `handleLoguotHeader`', () => {
      const props = {
        ...initialProps,
        profileName: 'profileName',
      };
      const headerApp = global.mountWrap(<HeaderApp {...props} />);
      const page = appSelector(headerApp);
      const btnBtnLogout = page.getPageBtnLogout();

      btnBtnLogout.props().onClick();
      
    });
    it('Test `mapStateToProps` method', () => {
      const state = {
        login: {
          fetching: false,
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