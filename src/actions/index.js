export const logoutAction = () => ({
  type: 'LOGOUT',
});

export const loadingRequestAction = location => ({
  type: 'LOGIN_FETCHING',
  fetching: true,
  location,
});

