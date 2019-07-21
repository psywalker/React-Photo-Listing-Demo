import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Highcharts from 'react-highcharts';
import {
  INITIONAL_CHARTS_CONFIGS,
  CHART_CONFIG,
} from '../../constants';

export const getConfigInitionalData = configNum => INITIONAL_CHARTS_CONFIGS[configNum];
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

const HighchartsHOC = memo(({ config, configNum }) => {
  const configInitionalData = getConfigInitionalData(configNum);
  const newConfig = getNewConfig(configInitionalData, config);
  console.log("1: ", configInitionalData)
  console.log("2: ", newConfig)
  return (
    <Highcharts
      data-test="highchartsContainer"
      config={newConfig}
    />
  );
});

HighchartsHOC.propTypes = {
  config: PropTypes.shape({}),
  configNum: PropTypes.number,
};
HighchartsHOC.defaultProps = {
  config: {},
  configNum: 0,
};

export default HighchartsHOC;
