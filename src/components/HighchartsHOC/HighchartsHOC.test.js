import React from 'react';
import HighchartsHOC from '.';
import { getConfigInitionalData, getNewConfig } from '.';

describe('Test of component of HighchartsHOC', () => {
  // Default Data
  const initialProps = {
    config: {},
    configNum: 0,
  };

  const config = {
    dates: [
      '21 June 2019',
      '22 June 2019',
    ],
    values: [
      69,
      73,
    ],
  };
  const configInitionalData = {
    title: 'My Downloads',
    seriesName: 'Downloads',
    colors: 'rgba(255, 0, 255, .5)',
  };
  const configNum = 0;
  const newConfig = {
    chart: { type: 'area' },
    colors: [configInitionalData.colors],
    legend: { layout: 'vertical', align: 'right', verticalAlign: 'middle' },
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
    responsive: { rules: [] },
    series: [
      {
        name: configInitionalData.seriesName,
        data: config.values,
      },
    ],
    title: { text: configInitionalData.title },
    xAxis: {
      categories: config.dates,
    },
  }
  const highchartsContainer = 'div[data-test="highchartsContainer"]';

  const appSelector = wrapper => ({
    getHighchartsContainer: () => wrapper.find(highchartsContainer),
  });

  // const propses = {
  //   ...initialProps,
  //   config,
  // };
  // const highchartsHOC = global.mountWrap(<HighchartsHOC {...propses} />);
  // console.log(highchartsHOC.debug());

  describe('User component initial', () => {
    it('renders without initial props', () => {
      const highchartsHOC = global.mountWrap(<HighchartsHOC />);
      const page = appSelector(highchartsHOC);

      const container = page.getHighchartsContainer();
    });
  });
});