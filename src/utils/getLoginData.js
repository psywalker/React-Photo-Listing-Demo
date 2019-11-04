const getLoginData = () => {
  const localStorageloginData = JSON.parse(window.localStorage.getItem('loginData'));
  return localStorageloginData;
};
export default getLoginData;
