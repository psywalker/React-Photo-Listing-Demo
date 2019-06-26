import axios from 'axios';
import moment from 'moment';
import 'moment-timezone';
import { put, call, delay } from 'redux-saga/effects';
import get from 'lodash/get';
import { URL_FOR_USER_STATISTIC } from '../constants';

function* fetchSaga(userId) {
  try {
    const responce = yield call(axios.get, URL_FOR_USER_STATISTIC(userId), {
      params: {
        client_id: process.env.REACT_APP_UNSPLASH_API_KEY,
      },
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
}

function* fetchSagaPeriodically(userId) {
  // while (true) {
  //   yield call(() => fetchSaga(userId));
  //   yield delay(2000);
  // }
  yield call(() => fetchSaga(userId));
}

export default function* userStatisticRequestSaga(action) {
  const { userId } = action;
  if (userId) {
    yield call(() => fetchSagaPeriodically(userId));
  } else {
    yield put({ type: 'USER_STATISTIC_REQUEST_ERROR' });
  }
}

// export default function* userStatisticRequestSaga(action) {
//   const { userId } = action;
//   if (userId) {
//     try {
//       function* getRes(userId) {
//         while (true) {
//           yield axios.get(URL_FOR_USER_STATISTIC(userId), {
//             params: {
//               client_id: process.env.REACT_APP_UNSPLASH_API_KEY,
//             },
//           });
//         }
//       }
//       function* putRes(chartData) {
//         console.log("1: ", chartData);
//         yield put({ type: 'USER_STATISTIC_REQUEST_SUCCESS', chartData });
//       }
//       function fetchChartData(userId, generator) {
//         const gen = generator || getRes(userId);
//         const responce = gen.next();
//         responce.value.then((res) => {
//           const chartData = [
//             get(res, 'data.downloads.historical.values', []),
//             get(res, 'data.views.historical.values', []),
//             get(res, 'data.likes.historical.values', []),
//           ].map(config => ({
//             dates: config.map(item => moment(item.date).format('DD MMMM YYYY')),
//             values: config.map(item => item.value),
//           }));

//           putRes(chartData);
          
//           //setTimeout(() => fetchChartData(userId, gen), 2000);
//         });
//       }
      
//       fetchChartData(userId);
//       // const axiosRequestUserStatistic = {
//       //   url: URL_FOR_USER_STATISTIC(userId),
//       //   params: {
//       //     client_id: process.env.REACT_APP_UNSPLASH_API_KEY,
//       //   },
//       // };
//       // const responce = yield axios.get(axiosRequestUserStatistic.url, {
//       //   params: axiosRequestUserStatistic.params,
//       // });

//       // const chartData = [
//       //   get(responce, 'data.downloads.historical.values', []),
//       //   get(responce, 'data.views.historical.values', []),
//       //   get(responce, 'data.likes.historical.values', []),
//       // ].map(config => ({
//       //   dates: config.map(item => moment(item.date).format('DD MMMM YYYY')),
//       //   values: config.map(item => item.value),
//       // }));

//       // yield put({ type: 'USER_STATISTIC_REQUEST_SUCCESS', chartData });
//     } catch (error) {
//       yield put({ type: 'USER_STATISTIC_REQUEST_ERROR', error });
//     }
//   } else {
//     yield put({ type: 'USER_STATISTIC_REQUEST_ERROR' });
//   }
// }
