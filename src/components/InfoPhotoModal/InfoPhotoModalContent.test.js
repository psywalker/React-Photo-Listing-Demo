import React from 'react';
import InfoPhotoModalContent from './InfoPhotoModalContent';

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
    aperture: null,
    cameraMake: null,
    cameraModel: null,
    'data-test': 'photoInfoPhotoModal',
    downloads: 102632,
    focalLength: null,
    height: 5250,
    iso: null,
    lastUpdateInfo: '2019-07-21T01:07:46-04:00',
    likes: 344,
    photoDesc: null,
    shutterspeed: null,
    views: 9808487,
    width: 3502,
  };
  
  const pagePhotoInfoHeader = 'header[data-test="photoInfoHeader"]';

  const appSelector = wrapper => ({
    getPagePhotoInfoHeader: () => wrapper.find(pagePhotoInfoHeader),

  });

  const propses = {
    ...propsFull,
  };
  const infoPhotoModalContent = global.mountWrap(<InfoPhotoModalContent {...propses} />);
  console.log(infoPhotoModalContent.debug());

  describe('InfoPhotoModal component initial', () => {
    it('renders without initial props', () => {
      // const infoPhotoModal = global.mountWrap(<InfoPhotoModal {...propsFull} />);  
      // const page = appSelector(infoPhotoModal);
      // const photoModalContent = setInfoPhotoModalContent(propsFull);

      // const photoInfoWrap = page.getPagePhotoInfoWrap();
      // const openModalBtn = page.getPageOpenModalBtn();
      // const openModalBtnIcon = page.getPageOpenModalBtnIcon();
      // const modal = page.getPageModal();

    });
  });
});