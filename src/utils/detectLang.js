const detectLang = () => {
  const userLang = window.navigator.language || window.navigator.userLanguage;
  const isLangRu = userLang.includes('ru');
  return isLangRu ? 'ru' : 'en';
};
export default detectLang;
