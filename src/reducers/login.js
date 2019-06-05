const login = (state = [], action) => {
  switch (action.type) {
    case 'LOGIN_FETCHING':
      return {
        ...state,
        fetching: true,
      };
    case 'LOGIN_SUCCESS':
      return {
        ...action.data,
        fetching: false,
      };
    case 'LOGOUT':
      return {
        profilePhotoUrl: '',
        profileName: '',
        profileEmail: '',
        fetching: false,
      };
    default:
      return state;
  }
};

export default login;
