
import { runSaga } from 'redux-saga';
import { put, call } from 'redux-saga/effects';
import sinon from 'sinon';
import {
  userStatisticRequestSaga,
  api,
  processResponse,
  getParamsRequest,
} from './userstatistic';
import { URL_FOR_USER_STATISTIC} from '../constants';

describe('Test of saga `userstatistic`', () => {
  // Default
  let action = {
    isListingLoading: true,
    type: 'USER_STATISTIC_FETCHING',
    userId: 'harleydavidson',
  };
  const { userId } = action;
  const axiosRequestForUserStatistic = {
    method: 'get',
    url: URL_FOR_USER_STATISTIC(userId),
    params: {
      client_id: process.env.REACT_APP_UNSPLASH_API_KEY,
    },
  };
  let response = {
    data: {
      downloads: {
        historical: {
          values: [
            {
              date: '2019-06-13',
              value: 7805,
            },
          ],
        },
      },
      views: {
        historical: {
          values: [
            {
              date: '2019-06-13',
              value: 907773,
            },
          ],
        },
      },
      likes: {
        historical: {
          values: [
            {
              date: '2019-06-13',
              value: 7805,
            },
          ],
        },
      },
    },
  };
  let dataForProps = [
    {
      dates: ['13 June 2019', '14 June 2019'],
      values: [7805, 8623],
    },
    {
      dates: ['13 June 2019', '14 June 2019'],
      values: [907773, 912106],
    },
    {
      dates: ['13 June 2019', '14 June 2019'],
      values: [112, 73],
    },
  ];

  describe('`userStatisticRequestSaga` saga test', () => {
    it('`userStatisticRequestSaga`: Success', () => {
      const gen = userStatisticRequestSaga(action);
      expect(gen.next().value).toEqual(call(api.getUserStatistic, userId));
      expect(gen.next(dataForProps).value).toEqual(put({ type: 'USER_STATISTIC_REQUEST_SUCCESS', dataForProps }));
      expect(gen.next()).toEqual({ done: true, value: undefined });
    });
    it('`userStatisticRequestSaga` with Error', () => {
      const func = () => new Error('User Statistic Error');
      const error = 'User Statistic Error';
      const gen = userStatisticRequestSaga(action);
      const tokenEmpty = 'undefined';
      expect(gen.next().value).toEqual(call(api.getUserStatistic, userId));
      gen.next(func());
      expect(gen.throw('User Statistic Error').value).toEqual(put({ type: 'USER_STATISTIC_REQUEST_ERROR', error }));
      expect(gen.next()).toEqual({ done: true, value: undefined });
    });
    it('`userStatisticRequestSaga` without `userId`', () => {
      const actionClone = {
        ...action,
        userId: null,
      };
      const gen = userStatisticRequestSaga(actionClone);
      expect(gen.next().value).toEqual(put({ type: 'USER_STATISTIC_REQUEST_ERROR' }));
      expect(gen.next()).toEqual({ done: true, value: undefined });
    });
  });

  describe('Test `processResponse` and `getParamsRequest` functions', () => {
    it('`processResponse`', () => {
      const processResponseResultDefault = [
        {
          dates: [],
          values: [],
        },
        {
          dates: [],
          values: [],
        },
        {
          dates: [],
          values: [],
        },
      ]
      expect(processResponse()).toEqual(processResponseResultDefault);
      const responseDefaultClone = {
        data: {
          ...response.data,
          likes: {
            historical: {
              values: [
                {
                  date: '01.01.1999',
                  value: 9999,
                },
              ],
            },
          },
        },
      };
      const processResponseResult = [
        {
          dates: ['13 June 2019'],
          values: [7805],
        },
        {
          dates: ['13 June 2019'],
          values: [907773],
        },
        {
          dates: ['01 January 1999'],
          values: [9999],
        },
      ];

      expect(processResponse(responseDefaultClone)).toEqual(processResponseResult);
      expect(getParamsRequest(userId)).toEqual(axiosRequestForUserStatistic);
    });
  });

  // Mock
  describe('Test `userStatisticRequestSaga` saga: stub api', () => {
    it('test acync', async () => {
      const dispatched = [];
      const stub = sinon.stub(api, 'getUserStatistic');
      stub.returns(
        [
          {
            dates: ['13 June 2019', '14 June 2019'],
            values: [7805, 8623],
          },
          {
            dates: ['13 June 2019', '14 June 2019'],
            values: [907773, 912106],
          },
          {
            dates: ['13 June 2019', '14 June 2019'],
            values: [112, 73],
          },
        ],
      );

      const result = await runSaga({
        dispatch: a => dispatched.push(a),
      }, userStatisticRequestSaga, action).toPromise();

      expect(stub.calledWith(userId)).toBe(true);
      expect(dispatched).toEqual([{
        dataForProps:
        [
          {
            dates: ['13 June 2019', '14 June 2019'],
            values: [7805, 8623],
          },
          {
            dates: ['13 June 2019', '14 June 2019'],
            values: [907773, 912106],
          },
          {
            dates: ['13 June 2019', '14 June 2019'],
            values: [112, 73],
          },
        ],
        type: 'USER_STATISTIC_REQUEST_SUCCESS',
      }]);
    });
  });
});