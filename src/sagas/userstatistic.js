import axios from 'axios';
import moment from 'moment';
import 'moment-timezone';
import { put } from 'redux-saga/effects';
import get from 'lodash/get';
import { URL_FOR_USER_STATISTIC } from '../constants/urls';

const getInitialChartsConfigs = () => {
  const chartsConfigs = {
    highchartsDownloadsConfig: {
      title: 'My Downloads',
      seriesName: 'Downloads',
      colors: 'rgba(255, 0, 255, .5)',
    },
    highchartsViewsConfig: {
      title: 'My Views',
      seriesName: 'Views',
      colors: 'rgba(255, 165, 0, .5)',
    },
    highchartsLikesConfig: {
      title: 'My Likes',
      seriesName: 'Likes',
      colors: 'rgba(0, 255, 0, .5)',
    },
  };
  return chartsConfigs;
};

const createCharts = (config) => {
  const configArr = Object.entries(config);
  const newObj = {};

  configArr.forEach((item) => {
    newObj[item[0]] = {
      chart: {
        type: 'area',
      },
      colors: [item[1].colors],
      title: {
        text: item[1].title,
      },
      xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      },
      plotOptions: {
        area: {
          stacking: 'normal',
          lineColor: item[1].colors,
          lineWidth: 1,
          marker: {
            lineWidth: 6,
            lineColor: item[1].colors,
          },
        },
      },
      series: [
        {
          name: item[1].seriesName,
        },
      ],
      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle',
      },
      responsive: {
        rules: [{
          condition: {
            maxWidth: 700,
          },
          chartOptions: {
            legend: {
              layout: 'horizontal',
              align: 'center',
              verticalAlign: 'bottom',
            },
          },
        }],
      },
    };
  });
  return newObj;
};

export default function* userStatisticRequestSaga(action) {
  const { userId } = action;
  if (userId) {
    try {
      const chartsConfigs = getInitialChartsConfigs();
      const highchartsConfigs = createCharts(chartsConfigs);

      const axiosRequestUserStatistic = {
        url: URL_FOR_USER_STATISTIC(userId),
        params: {
          client_id: process.env.REACT_APP_UNSPLASH_API_KEY,
        },
      };
      const res = yield axios.get(axiosRequestUserStatistic.url, {
        params: axiosRequestUserStatistic.params,
      });

      const highchartsDownloadsConfigData = get(res, 'data.downloads.historical.values') || [];
      const highchartsViewsConfigData = get(res, 'data.views.historical.values') || [];
      const highchartsLikesConfigData = get(res, 'data.likes.historical.values') || [];

      const highchartsConfigsObject = {
        highchartsDownloadsConfig: {
          ...highchartsConfigs.highchartsDownloadsConfig,
          xAxis: {
            categories: highchartsDownloadsConfigData.map(item => moment(item.date).format('DD MMMM YYYY')),
          },
          series: [
            {
              ...highchartsConfigs.highchartsDownloadsConfig.series[0],
              data: highchartsDownloadsConfigData.map(item => item.value),
            },
          ],
        },
        highchartsViewsConfig: {
          ...highchartsConfigs.highchartsViewsConfig,
          xAxis: {
            categories: highchartsViewsConfigData.map(item => moment(item.date).format('DD MMMM YYYY')),
          },
          series: [
            {
              ...highchartsConfigs.highchartsViewsConfig.series[0],
              data: highchartsViewsConfigData.map(item => item.value),
            },
          ],
        },
        highchartsLikesConfig: {
          ...highchartsConfigs.highchartsLikesConfig,
          xAxis: {
            categories: highchartsLikesConfigData.map(item => moment(item.date).format('DD MMMM YYYY')),
          },
          series: [
            {
              ...highchartsConfigs.highchartsLikesConfig.series[0],
              data: highchartsLikesConfigData.map(item => item.value),
            },
          ],
        },
      };
      yield put({ type: 'USER_STATISTIC_REQUEST_SUCCESS', highchartsConfigsObject });
    } catch (error) {
      yield put({ type: 'USER_STATISTIC_REQUEST_ERROR', error });
    }
  } else {
    yield put({ type: 'USER_STATISTIC_REQUEST_ERROR' });
  }
}
