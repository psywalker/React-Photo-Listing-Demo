import React from 'react';
import { SmallPhotoListing } from '.';
import { mapStateToProps } from '.';

describe('Test of component of SmallPhotoListing', () => {
  // Default Data
  const initialProps = {
    isSmallPhotoListingFetching: true,
    cards: [],
    itemNum: 0,
    totalCards: 10,
    page: 1,
    perPage: 6,
    name: 'photos',
    smallPhotoListingRequestAction: () => {},
    requestError: false,
    history: {},
    userId: '',
  };
  
  const cards = [
    {
      photoID: 'id0',
      photoUrl: 'url0',
    },
    {
      photoID: 'id1',
      photoUrl: 'url1',
    },
  ];
  const smallPhotoListingContainer = 'div[data-test="smallPhotoListingContainer"]';
  const pageSpinner = '[data-test="spinner"]';
  const smallPhotoListingList = 'ul[data-test="smallPhotoListingList"]';
  const smallPhotoListingListItem = 'li[data-test="smallPhotoListingListItem"]';
  const smallPhotoListingListLinkPhotoRouter = 'Link[data-test="smallPhotoListingListLinkPhotoRouter"]';
  const smallPhotoListingListLinkPhoto = 'a[data-test="smallPhotoListingListLinkPhotoRouter"]';
  const smallPhotoListingListPhoto = 'img[data-test="smallPhotoListingListPhoto"]';
  const pagePaginationComponent = 'Pagination[data-test="pagination"]';
  const pagePaginationContainer = 'div[data-test="paginationContainer"]';
  const pagePaginationUl = 'ul[data-test="pagination"]';
  const pageError = 'ul[data-test="error"]';

  const appSelector = wrapper => ({
    getSmallPhotoListingContainer: () => wrapper.find(smallPhotoListingContainer),
    getPageSpinner: () => wrapper.find(pageSpinner),
    getSmallPhotoListingList: () => wrapper.find(smallPhotoListingList),
    getSmallPhotoListingListItem: () => wrapper.find(smallPhotoListingListItem),
    getNthSmallPhotoListingListItem: n => wrapper.find(smallPhotoListingListItem).at(n),
    getSmallPhotoListingListLinkPhotoRouter: () => wrapper.find(smallPhotoListingListLinkPhotoRouter),
    getSmallPhotoListingListLinkPhoto: () => wrapper.find(smallPhotoListingListLinkPhoto),
    getSmallPhotoListingListPhoto: () => wrapper.find(smallPhotoListingListPhoto),
    getPaginationComponent: () => wrapper.find(pagePaginationComponent),
    getPaginationContainer: () => wrapper.find(pagePaginationContainer),
    getPaginationUl: () => wrapper.find(pagePaginationUl),
    getError: () => wrapper.find(pageError),
  });

  // const propses = {
  //   ...initialProps,
  //   isSmallPhotoListingFetching: false,
  //   cards,
  // };
  // const pageSmallPhotoListing = global.mountWrap(<SmallPhotoListing {...propses} />);
  // console.log(pageSmallPhotoListing.debug())

  describe('User component initial', () => {
    it('renders without initial props', () => {
      const smallPhotoListing = global.mountWrap(<SmallPhotoListing />);
      const page = appSelector(smallPhotoListing);

      const container = page.getSmallPhotoListingContainer();
      const spinner = page.getPageSpinner();
      const photoListingList = page.getSmallPhotoListingList();
      const photoListingListItem = page.getSmallPhotoListingListItem();
      const photoListingListItem0 = page.getNthSmallPhotoListingListItem(0);
      const photoListingListLinkPhotoRouter = page.getSmallPhotoListingListLinkPhotoRouter();
      const photoListingListLinkPhoto = page.getSmallPhotoListingListLinkPhoto();
      const photoListingListPhoto = page.getSmallPhotoListingListPhoto();
      const paginationComponent = page.getPaginationComponent();
      const paginationContainer = page.getPaginationContainer();
      const paginationUl = page.getPaginationUl();
      const error = page.getError();
    });
  });
});