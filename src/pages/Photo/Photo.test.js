import React from 'react';
import { Photo } from '.';
import { mapStateToProps } from '.';
import handleDowloadPhoto from '.';
import getPhotoSize from '.';

describe('Test of component of Home', () => {
  // Default Data
  const initialProps = {
    photoImageLoadAction: () => {},
    photoRequestAction: () => {},
    info: {},
    userFirstName: '',
    userLastName: '',
    userName: '',
    twitterName: '',
    photoProfile: '',
    tags: [],
    altDescriprion: '',
    photoSrc: '',
    widthPhoto: 300,
    heightPhoto: 300,
    isPhotoLoading: true,
    isSuccessPhotoRequest: true,
    requestError: false,
    match: {},
    history: {},
  };

  const info = {
    aperture: '1.4',
    cameraMake: 'SONY',
    cameraModel: 'ILCE-7RM2',
    downloads: 78329,
    focalLength: '85.0',
    height: 5304,
    iso: 200,
    lastUpdateInfo: '2019-07-21T01:10:23-04:00',
    likes: 149,
    photoDesc: null,
    shutterspeed: '1/500',
    views: 2663031,
    width: 7952,
  };
  const tags = [
    {
      title: 'transportation',
    },
  ];
  const tagsTwo = [
    {
      title: 'transportation',
    },
    {
      title: 'vehicle',
    },
  ];

  const match = {
    params: {
      id: 'HYjJ1_AZnqw',
    }
  };

  const photoPageContainer = 'div[data-test="photoContainer"]';
  const photoTwitterLinkRouter = 'Link[data-test="photoTwitterLinkRouter"]';
  const photoTwitterLink = 'a[data-test="photoTwitterLinkRouter"]';
  const photoTwitter = 'div[data-test="photoTwitter"]';
  const photoTwitterAvatar = 'img[data-test="photoTwitterAvatar"]';
  const photoTwitterContent = 'div[data-test="photoTwitterContent"]';
  const photoTwitterUserName = 'p[data-test="photoTwitterUserName"]';
  const photoTwitterName = 'p[data-test="photoTwitterName"]';
  const photoHeader = 'div[data-test="photoHeader"]';
  const photoHeaderButton = 'Button[data-test="photoHeaderButton"]';
  const photoHeaderButtonA = 'a[data-test="photoHeaderButton"]';
  const photoHeaderButtonIcon = 'a[data-test="photoHeaderButtonIcon"]';
  const photoSpinner = '[data-test="photoSpinner"]';
  const photoImageZoom = 'ImageZoom[data-test="photoImageZoom"]';
  const photoFooter = 'div[data-test="photoFooter"]';
  const photoFooterTags = 'div[data-test="photoFooterTags"]';
  const photoPopoverButton = 'Button[data-test="photoPopoverButton"]';
  const photoPopoverButtonA = 'a[data-test="photoPopoverButton"]';
  const photoPopoverButtonIcon = 'Icon[data-test="photoPopoverButtonIcon"]';
  const photoFooterBtns = 'div[data-test="photoFooterBtns"]';
  const photoFooterBtnsBtn = 'Button[data-test="photoFooterBtnsBtn"]';
  const photoFooterBtnsBtnA = 'a[data-test="photoFooterBtnsBtn"]';
  const photoInfoPhotoModal = '[data-test="photoInfoPhotoModal"]';
  const photoError = '[data-test="photoError"]';

  const appSelector = wrapper => ({
    getPhotoPageContainer: () => wrapper.find(photoPageContainer),
    getPhotoTwitterLinkRouter: () => wrapper.find(photoTwitterLinkRouter),
    getPhotoTwitterLink: () => wrapper.find(photoTwitterLink),
    getPhotoTwitter: () => wrapper.find(photoTwitter),
    getPhotoTwitterAvatar: () => wrapper.find(photoTwitterAvatar),
    getPhotoTwitterContent: () => wrapper.find(photoTwitterContent),
    getPhotoTwitterUserName: () => wrapper.find(photoTwitterUserName),
    getPhotoTwitterName: () => wrapper.find(photoTwitterName),
    getPhotoHeader: () => wrapper.find(photoHeader),
    getPhotoHeaderButton: () => wrapper.find(photoHeaderButton),
    getPhotoHeaderButtonA: () => wrapper.find(photoHeaderButtonA),
    getPhotoHeaderButtonIcon: () => wrapper.find(photoHeaderButtonIcon),
    getPhotoSpinner: () => wrapper.find(photoSpinner),
    getPhotoImageZoom: () => wrapper.find(photoImageZoom),
    getPhotoImageZoomImg: () => wrapper.find(photoImageZoom).find('img'),
    getPhotoFooter: () => wrapper.find(photoFooter),
    getPhotoFooterTags: () => wrapper.find(photoFooterTags),
    getPhotoPopoverButton: () => wrapper.find(photoPopoverButton),
    getPhotoPopoverButtonA: () => wrapper.find(photoPopoverButtonA),
    getPhotoPopoverButtonIcon: () => wrapper.find(photoPopoverButtonIcon),
    getPhotoFooterBtns: () => wrapper.find(photoFooterBtns),
    getPhotoFooterBtnsBtn: () => wrapper.find(photoFooterBtnsBtn),
    getPhotoFooterBtnsBtnA: () => wrapper.find(photoFooterBtnsBtnA),
    getPhotoInfoPhotoModal: () => wrapper.find(photoInfoPhotoModal),
    getPhotoError: () => wrapper.find(photoError),
  });

  // const propses = {
  //   ...initialProps,
  //   info,
  //   tags,
  //   match,
  //   isSuccessPhotoRequest: false,
  //   isPhotoLoading: false,
  //   requestError: true,
  // }
  // const photo = global.mountWrap(<Photo {...propses} />);
  // console.log(photo.debug())

  describe('Photo component initial', () => {
    it('renders without initial props', () => {
      const photo = global.mountWrap(<Photo />);
      const page = appSelector(photo);
      const pageContainer = page.getPhotoPageContainer();
      const twitterLinkRouter = page.getPhotoTwitterLinkRouter();
      const twitterLink = page.getPhotoTwitterLink();
      const twitter = page.getPhotoTwitter();
      const twitterAvatar = page.getPhotoTwitterAvatar();
      const twitterContent = page.getPhotoTwitterContent();
      const twitterUserName = page.getPhotoTwitterUserName();
      const twitterName = page.getPhotoTwitterName();
      const photoPageHeader = page.getPhotoHeader();
      const photoPageHeaderButton = page.getPhotoHeaderButton();
      const photoPageHeaderButtonA = page.getPhotoHeaderButtonA();
      const photoPageHeaderButtonIcon = page.getPhotoHeaderButtonIcon();
      const spinner = page.getPhotoSpinner();
      const imageZoom = page.getPhotoImageZoom();
      const imageZoomImg = page.getPhotoImageZoomImg();
      const photoPageFooter = page.getPhotoFooter();
      const photoPageFooterTags = page.getPhotoFooterTags();
      const popoverButton = page.getPhotoPopoverButton();
      const popoverButtonA = page.getPhotoPopoverButtonA();
      const popoverButtonIcon = page.getPhotoPopoverButtonIcon();
      const photoPageFooterBtns = page.getPhotoFooterBtns();
      const photoPageFooterBtnsBtn = page.getPhotoFooterBtnsBtn();
      const photoPageFooterBtnsBtnA = page.getPhotoFooterBtnsBtnA();
      const infoPhotoModal = page.getPhotoInfoPhotoModal();
      const error = page.getPhotoError();

    });
  });
});
