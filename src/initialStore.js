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
};
export default initialStore;
