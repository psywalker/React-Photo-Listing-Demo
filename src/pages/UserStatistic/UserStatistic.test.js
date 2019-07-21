import React from 'react';
import { UserStatistic } from '.';
import { mapStateToProps } from '.';

describe('Test of component of User', () => {
  // Default Data
  const initialProps = {
    userStatistingRequestAction: () => {},
    isListingLoading: false,
    userId: '',
    chartData: [],
    requestError: false,
  };

  const chartData = [
    {
      dates: ['21 June 2019'],
      values: [7463],
    },
    {
      dates: ['21 June 2019'],
      values: [827940],
    },
    {
      dates: ['21 June 2019'],
      values: [69],
    },
  ];

  const userStatisticContainer = 'div[data-test="userStatistic"]';
  const spinner = '[data-test="spinner"]';
  const userStatisticCharts = 'div[data-test="userStatisticCharts"]';
  const highchartsHOC = '[data-test="highchartsHOC"]';
  const userStatisticError = '[data-test="error"]';

  const appSelector = wrapper => ({
    getUserContainer: () => wrapper.find(userStatisticContainer),
    getSpinner: () => wrapper.find(spinner),
    getUserStatisticCharts: () => wrapper.find(userStatisticCharts),
    getHighchartsHOC: () => wrapper.find(highchartsHOC),
    getHighchartsHOCItem: n => wrapper.find(highchartsHOC).at(n),
    getPhotoError: () => wrapper.find(userStatisticError),
  });

  // const propses = {
  //   ...initialProps,
  //   chartData,
  // }
  // const pageUserStatistic = global.mountWrap(<UserStatistic {...propses} />);
  // console.log(pageUserStatistic.debug())

  describe('User component initial', () => {
    it('renders without initial props', () => {
      const pageUserStatistic = global.shallow(<UserStatistic />);
      const page = appSelector(pageUserStatistic);

    });
  });
});
