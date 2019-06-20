import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Highcharts from 'react-highcharts';
import {
  INITIONAL_CHARTS_CONFIGS,
  CHART_CONFIG,
} from '../../constants';

const HighchartsHOC = memo(({ config, configNum }) => {
  const configInitionalData = INITIONAL_CHARTS_CONFIGS[configNum];
  const newConfig = {
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
  };

  return (
    <Highcharts config={newConfig} />
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
