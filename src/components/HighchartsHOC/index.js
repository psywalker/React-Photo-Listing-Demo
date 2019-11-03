import React from 'react';
import PropTypes from 'prop-types';
import Highcharts from 'react-highcharts';
import { localization as localRu } from 'moment/locale/ru';
import { localization as localEn } from 'moment/locale/en-gb';
import moment from 'moment';
import i18next from 'i18next';
import i18n from '../../i18n';
import {
  INITIONAL_CHARTS_CONFIGS,
  CHART_CONFIG,
} from '../../constants';

export const getConfigInitionalData = configNum => INITIONAL_CHARTS_CONFIGS(configNum);
export const getNewConfig = (configInitionalData, config) => ({
  chart: {
    type: 'area',
  },
  colors: [configInitionalData.colors],
  title: {
    text: configInitionalData.title,
  },
  xAxis: {
    categories: config.dates,
  },
  yAxis: {
    title: {
      text: i18n.t('chartsConfig.yAxisTitle'),
    },
  },
  plotOptions: {
    area: {
      stacking: 'normal',
      lineColor: configInitionalData.colors,
      lineWidth: 1,
      marker: {
        lineWidth: 6,
        lineColor: configInitionalData.colors,
      },
    },
  },
  series: [
    {
      name: configInitionalData.seriesName,
      data: config.values,
    },
  ],
  ...CHART_CONFIG,
});

const HighchartsHOC = ({ config, configNum }) => {
  const isLangRu = i18next.language.includes('ru');
  const configInitionalData = getConfigInitionalData(configNum);
  const newConfig = getNewConfig(configInitionalData, config);
  const { categories } = newConfig.xAxis;

  newConfig.xAxis.categories = categories.map(item => (
    moment(new Date(item))
      .locale(isLangRu ? 'ru' : 'en', isLangRu ? localRu : localEn)
      .format('DD MMMM YYYY')));

  return (
    <Highcharts
      data-test="highchartsContainer"
      config={newConfig}
    />
  );
};

HighchartsHOC.propTypes = {
  config: PropTypes.shape({}),
  configNum: PropTypes.number,
};
HighchartsHOC.defaultProps = {
  config: {},
  configNum: 0,
};

export default HighchartsHOC;
