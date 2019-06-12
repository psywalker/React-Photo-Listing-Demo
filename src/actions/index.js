export const logoutAction = () => ({
  type: 'LOGOUT',
});

export const photoRequestAction = match => ({
  type: 'PHOTO_FETCHING',
  isPhotoLoading: true,
  match,
});
export const photoImageLoadAction = () => ({
  type: 'PHOTO_IMAGE_LOAD',
});

export const userStatistingRequestAction = userId => ({
  type: 'USER_STATISTIC_FETCHING',
  isListingLoading: true,
  userId,
});

export const loadingRequestAction = location => ({
  type: 'LOGIN_FETCHING',
  fetching: true,
  location,
});

export const cardsPhotosRequestAction = cardsData => ({
  type: 'CARDS_PHOTOS_FETCHING',
  isListingLoading: true,
  cardsData,
});

export const paginationChangeAction = currentPage => ({
  type: 'PAGINATION_CHANGE',
  page: currentPage,
});

export const filterItemValueAction = (itemText, itemId) => ({
  type: 'FILTER_ITEM_VALUE',
  itemText,
  itemId,
});

export const searchTextAction = (text, tags) => ({
  type: 'SEARCH_TEXT',
  tags,
  text,
});

export const searchChangeInputValueAction = text => ({
  type: 'SEARCH_TEXT_CHANGE_INPUT_VALUE',
  text,
});
