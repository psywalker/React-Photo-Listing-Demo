import React from 'react';
import InfoPhotoModalContent from '.';
import {
  getDate,
  getViewsFormat,
  getDownloadsFormat,
  getLikesFormat,
} from '.';

describe('Test of component of SmallPhotoListing', () => {
  // Default Data
  const initialProps = {
    lastUpdateInfo: '',
    photoDesc: '',
    views: 0,
    downloads: 0,
    likes: 0,
    cameraMake: '',
    focalLength: '',
    aperture: '',
    shutterspeed: '',
    iso: 0,
    cameraModel: '',
    width: 0,
    height: 0,
  };

  const propsFull = {
    aperture: '1.4',
    cameraMake: 'SONY',
    cameraModel: 'ILCE-7RM2',
    downloads: 102632,
    focalLength: '85.0',
    height: 5250,
    iso: 200,
    lastUpdateInfo: '2019-07-21T01:07:46-04:00',
    likes: 344,
    photoDesc: 'El Capitan on a sunny afternoon',
    shutterspeed: '1/500',
    views: 9808487,
    width: 3502,
  };
  
  const pagePhotoInfoHeader = 'header[data-test="photoInfoHeader"]';
  const photoInfoTitle = 'h2[data-test="photoInfoTitle"]';
  const photoInfoDesc = 'b[data-test="photoInfoDesc"]';
  const photoInfoDate = 'p[data-test="photoInfoDate"]';
  const photoInfoContent = 'div[data-test="photoInfoContent"]';
  const photoInfoListHead = 'ul[data-test="photoInfoListHead"]';
  const photoInfoListHeadItem = 'li[data-test="photoInfoListHeadItem"]';
  const photoInfoListHeadTitle = 'h3[data-test="photoInfoListHeadTitle"]';
  const photoInfoListHeadTextMain = 'p[data-test="photoInfoListHeadTextMain"]';
  const photoInfoListHeadText = 'p[data-test="photoInfoListHeadText"]';
  const photoInfoListContent = 'ul[data-test="photoInfoListContent"]';
  const photoInfoListItem = 'li[data-test="photoInfoListItem"]';
  const photoInfoListTitle = 'h3[data-test="photoInfoListTitle"]';
  const photoInfoListText = 'p[data-test="photoInfoListText"]';
  const photoInfo = 'p[data-test="photoInfo"]';

  const appSelector = wrapper => ({
    getPagePhotoInfoHeader: () => wrapper.find(pagePhotoInfoHeader),
    getPagePhotoInfoTitle: () => wrapper.find(photoInfoTitle),
    getPagePhotoInfoDesc: () => wrapper.find(photoInfoDesc),
    getPagePhotoInfoDate: () => wrapper.find(photoInfoDate),
    getPagePhotoInfoContent: () => wrapper.find(photoInfoContent),
    getPagePhotoListHead: () => wrapper.find(photoInfoListHead),
    getPagePhotoListHeadItem: () => wrapper.find(photoInfoListHeadItem),
    getPagePhotoListHeadTitle: () => wrapper.find(photoInfoListHeadTitle),
    getPagePhotoListHeadTextMain: () => wrapper.find(photoInfoListHeadTextMain),
    getPagePhotoListHeadText: () => wrapper.find(photoInfoListHeadText),
    getPagePhotoInfoListContent: () => wrapper.find(photoInfoListContent),
    getPagePhotoInfoListItem: () => wrapper.find(photoInfoListItem),
    getPagePhotoInfoListTitle: () => wrapper.find(photoInfoListTitle),
    getPagePhotoInfoListText: () => wrapper.find(photoInfoListText),
    getPagePhotoInfo: () => wrapper.find(photoInfo),
  });

  // const propses = {
  //   ...propsFull,
  // };
  // const infoPhotoModalContent = global.mountWrap(<InfoPhotoModalContent {...propses} />);
  // console.log(infoPhotoModalContent.debug());

  describe('InfoPhotoModal component initial', () => {
    it('renders without initial props', () => {
      const infoPhotoModalContent = global.mountWrap(<InfoPhotoModalContent />);
      const page = appSelector(infoPhotoModalContent);

      const infoHeader = page.getPagePhotoInfoHeader();
      const infoTitle = page.getPagePhotoInfoTitle();
      const infoDesc = page.getPagePhotoInfoDesc();
      const infoDate = page.getPagePhotoInfoDate();
      const infoContent = page.getPagePhotoInfoContent();
      const listHead = page.getPagePhotoListHead();
      const listHeadItem = page.getPagePhotoListHeadItem();
      const listHeadTitle = page.getPagePhotoListHeadTitle();
      const listHeadTextMain = page.getPagePhotoListHeadTextMain();
      const listHeadText = page.getPagePhotoListHeadText();
      const listContent = page.getPagePhotoInfoListContent();
      const listItem = page.getPagePhotoInfoListItem();
      const listTitle = page.getPagePhotoInfoListTitle();
      const listText = page.getPagePhotoInfoListText();
      const info = page.getPagePhotoInfo();
    });
  });
});