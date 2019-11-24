import {
  LOGOUT,
  USER_FETCHING,
  SMALL_PHOTO_LISTING_FETCHING,
  PHOTO_FETCHING,
  PHOTO_IMAGE_LOAD,
  USER_STATISTIC_FETCHING,
  LOGIN_FETCHING,
  LOGIN_SUCCESS,
  CARDS_PHOTOS_FETCHING,
  PAGINATION_CHANGE,
  FILTER_ITEM_VALUE,
  SEARCH_TEXT,
  SEARCH_TEXT_CHANGE_INPUT_VALUE,
  PHOTO_LIKE,
  PHOTO_UNLIKE,
  LIST_USER_LIKED_PHOTOS,
  UPDATE_CHARTS_START,
  UPDATE_CHARTS_END,
  LANG_RU,
  LANG_EN,
  LANG,
  UPDATE_TAGS_START,
  UPDATE_TAGS_END,
} from '../constants';

export const updateTagsStartAction = value => ({
  type: UPDATE_TAGS_START,
  isUpdateTag: true,
  newTagvalue: value,
});

export const updateTagsEndAction = () => ({
  type: UPDATE_TAGS_END,
  isUpdateTag: false,
});

export const changeLang = lang => ({
  type: LANG,
  lang,
});

export const setLangRu = () => ({
  type: LANG_RU,
});

export const setLangEn = () => ({
  type: LANG_EN,
});

export const updateChartsStart = () => ({
  type: UPDATE_CHARTS_START,
  isChart: true,
});

export const updateChartsEnd = () => ({
  type: UPDATE_CHARTS_END,
  isChart: false,
});

export const logoutAction = () => ({
  type: LOGOUT,
});

export const userRequestAction = match => ({
  type: USER_FETCHING,
  isUserFetching: true,
  match,
});

export const smallPhotoListingRequestAction = (userId, page, perPage, name, itemNum) => ({
  type: SMALL_PHOTO_LISTING_FETCHING,
  isSmalPhotoListingFetching: true,
  userId,
  page,
  perPage,
  name,
  itemNum,
});

export const listUserLikedPhotos = userName => ({
  type: LIST_USER_LIKED_PHOTOS,
  userName,
});

export const photoLike = photoId => ({
  type: PHOTO_LIKE,
  photoId,
});

export const photoUnlike = photoId => ({
  type: PHOTO_UNLIKE,
  photoId,
});

export const photoRequestAction = match => ({
  type: PHOTO_FETCHING,
  isPhotoLoading: true,
  match,
});
export const photoImageLoadAction = () => ({
  type: PHOTO_IMAGE_LOAD,
});

export const userStatistingRequestAction = userId => ({
  type: USER_STATISTIC_FETCHING,
  isListingLoading: true,
  userId,
});

export const loadingRequestAction = location => ({
  type: LOGIN_FETCHING,
  fetching: true,
  location,
});
export const loginSuccess = action => ({
  type: LOGIN_SUCCESS,
  dataForProps: action,
});

export const cardsPhotosRequestAction = cardsData => ({
  type: CARDS_PHOTOS_FETCHING,
  isListingLoading: true,
  cardsData,
});

export const paginationChangeAction = currentPage => ({
  type: PAGINATION_CHANGE,
  page: currentPage,
});

export const filterItemValueAction = (itemText, itemId) => ({
  type: FILTER_ITEM_VALUE,
  itemText,
  itemId,
});

export const searchTextAction = (text, tags) => ({
  type: SEARCH_TEXT,
  tags,
  text,
});

export const searchChangeInputValueAction = text => ({
  type: SEARCH_TEXT_CHANGE_INPUT_VALUE,
  text,
});
