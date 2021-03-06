import i18next from 'i18next';
import filters from './filters';
import getLoginData from './utils/getLoginData';
import { INITIAL_LOGIN_DATA, NAV_TOP_ITEM_ACTIVE_DEFAULT, QUERY_TEXT_DEFAULT } from './constants';

const localStorageLang = window.localStorage.getItem('lang') || 'ru';
const localStorageloginData = getLoginData() || { ...INITIAL_LOGIN_DATA };
i18next.changeLanguage(localStorageLang);

const initialStore = {
  login: {
    ...INITIAL_LOGIN_DATA,
    ...localStorageloginData,
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
    chartData: [],
    requestError: false,
  },
  charts: {
    isChart: false,
  },
  lang: localStorageLang,
  updateTags: {
    id: NAV_TOP_ITEM_ACTIVE_DEFAULT,
    tagValue: QUERY_TEXT_DEFAULT,
    isUpdateTag: false,
  },
  photo: {
    info: {
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
      width: '',
      height: '',
    },
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
  },
  user: {
    isUserFetching: false,
    userPhoto: '',
    userFirstPhoto: '',
  },
  smallphotolisting: [
    {
      isSmallPhotoListingFetching: false,
      cards: [],
      totalCards: 10,
      page: 1,
      perPage: 6,
    },
    {
      isSmallPhotoListingFetching: false,
      cards: [],
      totalCards: 10,
      page: 1,
      perPage: 6,
    },
  ],
};

export default initialStore;
