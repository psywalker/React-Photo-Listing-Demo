import filters from './filters';

const initialStore = {
  login: {
    profilePhotoUrl: '',
    profileFullName: '',
    profileName: '',
    profileEmail: '',
    fetching: false,
    loginError: false,
  },
  photolisting: {
    filters,
    isListingLoading: false,
    cards: [],
    totalCards: 10,
    navTopItemActive: 2,
    cardsData: {
      query: 'wallpapers',
      page: 1,
      per_page: 6,
    },
    photolistingRequestError: false,
  },
  userstatistic: {
    isListingLoading: false,
    highchartsConfigs: {
      highchartsDownloadsConfig: {},
      highchartsViewsConfig: {},
      highchartsLikesConfig: {},
    },
    requestError: false,
  },
  photo: {
    info: {
      views: 0,
      downloads: 0,
      likes: 0,
      cameraMake: '',
      focalLength: '',
      aperture: '',
      shutterspeed: '',
      iso: 0,
      cameraModel: '',
    },
    userFirstName: '',
    userLastName: '',
    userName: '',
    twitterName: '',
    photoProfile: '',
    tags: [],
    altDescriprion: '',
    photoSrc: '',
    photoDesc: '',
    widthPhoto: 300,
    heightPhoto: 300,
    isPhotoLoading: true,
    isSuccessPhotoRequest: true,
    requestError: false,
  },
};
export default initialStore;
