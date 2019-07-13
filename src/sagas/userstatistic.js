import axios from 'axios';
import moment from 'moment';
import 'moment-timezone';
import { put, call } from 'redux-saga/effects';
import get from 'lodash/get';
import { URL_FOR_USER_STATISTIC } from '../constants';

export const processResponse = (response) => {
  const chartData = [
    get(response, 'data.downloads.historical.values', []),
    get(response, 'data.views.historical.values', []),
    get(response, 'data.likes.historical.values', []),
  ].map(config => ({
    dates: config.map(item => moment(new Date(item.date)).format('DD MMMM YYYY')),
    values: config.map(item => item.value),
  }));
  return chartData;
};

export const getParamsRequest = (userId) => {
  const axiosRequestForUserStatistic = {
    method: 'get',
    url: URL_FOR_USER_STATISTIC(userId),
    params: {
      client_id: process.env.REACT_APP_UNSPLASH_API_KEY,
    },
  };
  return axiosRequestForUserStatistic;
};

const getUserStatistic = userId => axios(getParamsRequest(userId)).then(processResponse);

export const api = {
  getUserStatistic,
};

export function* userStatisticRequestSaga(action) {
  const { userId } = action;
  if (userId) {
    try {
      const dataForProps = yield call(api.getUserStatistic, userId);
      yield put({ type: 'USER_STATISTIC_REQUEST_SUCCESS', dataForProps });
    } catch (error) {
      yield put({ type: 'USER_STATISTIC_REQUEST_ERROR', error });
    }
  } else {
    yield put({ type: 'USER_STATISTIC_REQUEST_ERROR' });
  }
}
