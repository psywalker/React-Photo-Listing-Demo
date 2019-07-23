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

  const propses = {
    ...initialProps,
  };
  const headerApp = global.mountWrap(<HeaderApp {...propses} />);
  console.log(headerApp.debug());

  describe('HeaderApp component initial', () => {
    it('renders without initial props', () => {
      // const errorComponent = global.mountWrap(<Error />);
      // const page = appSelector(errorComponent);

      // const error = page.getPageError();
        window.location.assign('http://localhost:3000/photo/HYjJ1_AZnqw');
        sinon.stub(window.location, 'assign');

    });
  });
});