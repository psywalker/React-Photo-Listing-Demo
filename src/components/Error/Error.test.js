import React from 'react';
import Error from '.';

describe('Test of component of ButtonBack', () => {
  // Default Data
  const initialProps = {
    text: '111',
    smallErrorFlag: false,
  };

  const pageError = 'div[data-test="error"]';
  const pageErrorContent = 'div[data-test="errorContent"]';
  const pageErrorContentInner = 'div[data-test="errorContentInner"]';
  const pageErrorTitle = 'h3[data-test="errorTitle"]';
  const pageErrorSubtitle = 'h2[data-test="erroSubtitle"]';
  const pageErrorLinkRouter = 'Link[data-test="errorLinkRouter"]';
  const pageErrorLink = 'a[data-test="errorLinkRouter"]';
  const pageErrorButton = 'button[data-test="errorButton"]';
  const pageBgImg = 'img[data-test="errorBgImg"]';

  const appSelector = wrapper => ({
    getPageError: () => wrapper.find(pageError),
    getPageErrorContent: () => wrapper.find(pageErrorContent),
    getPageErrorContentInner: () => wrapper.find(pageErrorContentInner),
    getPageErrorTitle: () => wrapper.find(pageErrorTitle),
    getPageErrorSubtitle: () => wrapper.find(pageErrorSubtitle),
    getPageErrorLinkRouter: () => wrapper.find(pageErrorLinkRouter),
    getPageErrorLink: () => wrapper.find(pageErrorLink),
    getPageErrorButton: () => wrapper.find(pageErrorButton),
    getPageErrorBgImg: () => wrapper.find(pageBgImg),
  });

  // const propses = {
  //   ...initialProps,
  // };
  // const error = global.mountWrap(<Error {...propses} />);
  // console.log(error.debug());

  describe('Error component initial', () => {
    it('renders without initial props', () => {
      const errorComponent = global.mountWrap(<Error />);
      const page = appSelector(errorComponent);

      const error = page.getPageError();
      const errorContent = page.getPageErrorContent();
      const errorContentInner = page.getPageErrorContentInner();
      const errorTitle = page.getPageErrorTitle();
      const errorSubtitle = page.getPageErrorSubtitle();
      const errorLinkRouter = page.getPageErrorLinkRouter();
      const errorLink = page.getPageErrorLink();
      const errorButton = page.getPageErrorButton();
      const errorBgImg = page.getPageErrorBgImg();
    });
  });
});