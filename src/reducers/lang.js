import initialStore from '../initialStore';

const lang = (state = initialStore, action = {}) => {
  switch (action.lang) {
    case 'ru':
      return 'ru';
    case 'en':
      return 'en';
    default:
      return state;
  }
};

export default lang;
