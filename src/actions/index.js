export const loginAction = code => ({
  type: 'LOGIN_SAGA',
  code,
  subType: 'LOGIN',
});

export const logoutAction = () => ({
  type: 'LOGOUT',
});

export const loadingRequestAction = location => ({
  type: 'LOGIN_FETCHING',
  fetching: true,
  location,
});
