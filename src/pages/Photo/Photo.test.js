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
    },
  };

  const photoPageContainer = 'div[data-test="photoContainer"]';
  const photoPageCard = 'div[data-test="photoCard"]';
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
  const photoImageZoomImg = 'img[data-test="photoImageZoomImg"]';
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
    getPhotoPageCard: () => wrapper.find(photoPageCard),
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
    getPhotoImageZoomImg: () => wrapper.find(photoImageZoomImg),
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
  //   requestError: false,
  // }
  // const photo = global.mountWrap(<Photo {...propses} />);
  // console.log(photo.debug())

  describe('Photo component initial', () => {
    it('renders without initial props', () => {
      const photo = global.mountWrap(<Photo />);
      const page = appSelector(photo);
      const pageContainer = page.getPhotoPageContainer();
      const pageCard = page.getPhotoPageCard();
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

      expect(pageContainer).toHaveLength(1);
      expect(pageCard).toHaveLength(0);

    });
  });

  describe('Test component `Photo` with diff request', () => {
    it('Successful request photo', () => {
      const props = {
        ...initialProps,
        isSuccessPhotoRequest: false,
      };
      const photo = global.mountWrap(<Photo {...props} />);
      const page = appSelector(photo);
      const pageContainer = page.getPhotoPageContainer();
      const pageCard = page.getPhotoPageCard();
      const twitterLinkRouter = page.getPhotoTwitterLinkRouter();
      const twitterAvatar = page.getPhotoTwitterAvatar();
      const twitterName = page.getPhotoTwitterName();
      const twitterUserName = page.getPhotoTwitterUserName();
      const photoPageHeader = page.getPhotoHeader();
      const photoPageHeaderButton = page.getPhotoHeaderButton();
      const spinner = page.getPhotoSpinner();
      const imageZoom = page.getPhotoImageZoom();
      const imageZoomImg = page.getPhotoImageZoomImg();
      const photoPageFooterTags = page.getPhotoFooterTags();
      const popoverButton = page.getPhotoPopoverButton();
      const photoPageFooterBtns = page.getPhotoFooterBtns();
      const infoPhotoModal = page.getPhotoInfoPhotoModal();
      const error = page.getPhotoError();

      expect(pageContainer).toHaveLength(1);
      expect(pageCard).toHaveLength(1);
      expect(twitterLinkRouter).toHaveLength(1);
      expect(twitterAvatar).toHaveLength(1);
      expect(twitterLinkRouter.prop('to')).toEqual('/users/');
      expect(twitterAvatar.prop('alt')).toEqual('Avatar');
      expect(twitterUserName).toHaveLength(1);
      expect(twitterUserName).toHaveText(' ');
      expect(twitterName).toHaveLength(1);
      expect(twitterName).toHaveText('@');
      expect(photoPageHeader).toHaveLength(1);
      expect(photoPageHeaderButton).toHaveLength(1);
      expect(photoPageHeaderButton.prop('onClick')).toBeFunction();
      expect(spinner).toHaveLength(1);
      expect(imageZoom).toHaveLength(1);
      expect(imageZoomImg).toHaveLength(1);
      expect(imageZoomImg.prop('src')).toEqual('');
      expect(imageZoomImg.prop('alt')).toEqual('');
      expect(photoPageFooterTags).toHaveLength(1);
      expect(photoPageFooterTags).toHaveText('0');
      expect(popoverButton).toHaveLength(0);
      expect(photoPageFooterBtns).toHaveLength(1);
      expect(infoPhotoModal).toHaveLength(2);
      expect(error).toHaveLength(0);
      
    });
    it('Error request photo', () => {
      const props = {
        ...initialProps,
        isPhotoLoading: false,
        isSuccessPhotoRequest: false,
        requestError: true,
      };
      const photo = global.mountWrap(<Photo {...props} />);
      const page = appSelector(photo);
      const pageContainer = page.getPhotoPageContainer();
      const error = page.getPhotoError();

      expect(pageContainer).toHaveLength(1);
      expect(error).toHaveLength(1);
    });
    it('Before uploading a photo with spinner', () => {
      const props = {
        ...initialProps,
        isSuccessPhotoRequest: false,
      };
      const photo = global.mountWrap(<Photo {...props} />);
      const page = appSelector(photo);
      const pageContainer = page.getPhotoPageContainer();
      const spinner = page.getPhotoSpinner();

      expect(pageContainer).toHaveLength(1);
      expect(spinner).toHaveLength(1);
    });
  });

  describe('Test component `Photo` with full props', () => {
    it('Successful request photo', () => {
      const props = {
        ...initialProps,
        userFirstName: 'userFirstName',
        userLastName: 'userLastName',
        userName: 'userName',
        twitterName: 'twitterName',
        photoProfile: 'photoProfile',
        altDescriprion: 'altDescriprion',
        photoSrc: 'htttp/imgSrc',
        info,
        tags,
        match,
        isSuccessPhotoRequest: false,
        isPhotoLoading: false,
        requestError: false,
      };

      const photo = global.mountWrap(<Photo {...props} />);
      photo.setState({
        photoWidth: '500px',
        photoHeight: '100px',
      });
      const page = appSelector(photo);
      const pageContainer = page.getPhotoPageContainer();
      const twitterLink = page.getPhotoTwitterLink();
      const twitterAvatar = page.getPhotoTwitterAvatar();
      const twitterUserName = page.getPhotoTwitterUserName();
      const twitterName = page.getPhotoTwitterName();
      const imageZoomImg = page.getPhotoImageZoomImg();
      const infoPhotoModal = page.getPhotoInfoPhotoModal();

      expect(pageContainer).toHaveLength(1);
      expect(twitterLink.prop('href')).toEqual('/users/userName');
      expect(twitterAvatar.prop('src')).toEqual('photoProfile');
      expect(twitterUserName).toHaveText('userFirstName userLastName');
      expect(twitterName).toHaveText('@twitterName');
      expect(imageZoomImg.prop('src')).toEqual('htttp/imgSrc');
      expect(imageZoomImg.prop('alt')).toEqual('altDescriprion');
      expect(imageZoomImg.prop('style').width).toEqual('500px');
      expect(imageZoomImg.prop('style').height).toEqual('100px');

      expect(infoPhotoModal.at(0).prop('cameraMake')).toEqual('SONY');
      expect(infoPhotoModal.at(0).prop('downloads')).toEqual(78329);
      console.log(pageContainer.debug())
      //console.log(imageZoomImg.prop())
    });
  });
});
