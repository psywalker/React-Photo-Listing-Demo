import initialStore from '../initialStore';

const updatedApp = (state = initialStore, action = {}) => {
  switch (action.updatedApp) {
    case true:
      return true;
    case false:
      return false;
    default:
      return state;
  }
};

export default updatedApp;
