import axios from 'axios';
import moment from 'moment';
import 'moment-timezone';
import { put } from 'redux-saga/effects';
import get from 'lodash/get';
import { URL_FOR_USER_STATISTIC } from '../constants';

export default function* userStatisticRequestSaga(action) {
  const { userId } = action;
  if (userId) {
    try {
      const axiosRequestUserStatistic = {
        url: URL_FOR_USER_STATISTIC(userId),
        params: {
          client_id: process.env.REACT_APP_UNSPLASH_API_KEY,
        },
      };
      const responce = yield axios.get(axiosRequestUserStatistic.url, {
        params: axiosRequestUserStatistic.params,
      });

      const chartData = [
        get(responce, 'data.downloads.historical.values', []),
        get(responce, 'data.views.historical.values', []),
        get(responce, 'data.likes.historical.values', []),
      ].map(config => ({
        dates: config.map(item => moment(item.date).format('DD MMMM YYYY')),
        values: config.map(item => item.value),
      }));

      yield put({ type: 'USER_STATISTIC_REQUEST_SUCCESS', chartData });
    } catch (error) {
      yield put({ type: 'USER_STATISTIC_REQUEST_ERROR', error });
    }
  } else {
    yield put({ type: 'USER_STATISTIC_REQUEST_ERROR' });
  }
}
