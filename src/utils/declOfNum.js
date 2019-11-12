import i18n from '../i18n';

const declOfNum = (number) => {
  const cases = [2, 0, 1, 1, 1, 2];
  const titles = [i18n.t('search.oneTime'), i18n.t('search.oneTimes'), i18n.t('search.oneTime')];
  return titles[(number % 100 > 4 && number % 100 < 20)
    ? 2
    : cases[(number % 10 < 5) ? number % 10 : 5]];
};

export default declOfNum;
