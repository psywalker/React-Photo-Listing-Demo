import {
  LOGOUT,
  USER_FETCHING,
  SMALL_PHOTO_LISTING_FETCHING,
  PHOTO_FETCHING,
  PHOTO_IMAGE_LOAD,
  USER_STATISTIC_FETCHING,
  LOGIN_FETCHING,
  CARDS_PHOTOS_FETCHING,
  PAGINATION_CHANGE,
  FILTER_ITEM_VALUE,
  SEARCH_TEXT,
  SEARCH_TEXT_CHANGE_INPUT_VALUE,
  PHOTO_LIKE,
  PHOTO_UNLIKE,
  LIST_USER_LIKED_PHOTOS,
  GET_PHOTO,
} from '../constants';

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

export const getPhoto = photoId => ({
  type: GET_PHOTO,
  photoId,
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
