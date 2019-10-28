import initialStore from '../initialStore';

const actionDefault = {
  type: '',
};

const getphoto = (state = initialStore, action = actionDefault) => {
  switch (action.type) {
    case 'GET_PHOTO_SUCCESS':
      return {
        ...state,
        ...action.dataForProps,
      };
    case 'GET_PHOTO_ERROR':
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default getphoto;
