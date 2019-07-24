import React from 'react';
import sinon from 'sinon';
import { HeaderApp } from '.';
import mapStateToProps from '.';

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
  const pageBtnBackRoute = 'a[data-test="btnBackRoute"]';

  const appSelector = wrapper => ({
    getPageHeaderApp: () => wrapper.find(pageHeaderApp),
    getPageUserLayoutHeader: () => wrapper.find(pageUserLayoutHeader),
    getPageInner: () => wrapper.find(pageInner),
    getPageSiteLogoLinkRouter: () => wrapper.find(pageSiteLogoLinkRouter),
    getPageSiteLogoLink: () => wrapper.find(pageSiteLogoLink),
    getPageSiteLogoTitle: () => wrapper.find(pageSiteLogoTitle),
    getPageBtnBackRoute: () => wrapper.find(pageBtnBackRoute),
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
  });
});