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
    isPhotoLoading: true,
    photoSrc: null,
    userNic: 'UserNic',
    userPortfolioUrl: '',
    photoDesc: '',
    requestError: false,
  },
};
export default initialStore;
