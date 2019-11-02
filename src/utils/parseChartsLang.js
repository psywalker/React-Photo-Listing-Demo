import { localization as localRu } from 'moment/locale/ru';
import { localization as localEn } from 'moment/locale/en-au';
import i18next from 'i18next';

const parseChartsLang = (data) => {
  const isLangRu = i18next.language.includes('ru');

  if (isLangRu) {
    const seriesName = data.series[0].name;
    const title = data.title.text;
    const yAxisTitle = data.yAxis.text;

  } else {

  }

  console.log("10: ", i18next.language)

  return data;
};
export default parseChartsLang;
