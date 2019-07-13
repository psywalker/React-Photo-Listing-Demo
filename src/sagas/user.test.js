import { runSaga } from 'redux-saga';
import { put, call } from 'redux-saga/effects';
import sinon from 'sinon';
import {
  userRequestSaga,
  api,
  processResponse,
  getParamsRequest,
} from './user';
import { URL_FOR_USER_QUERY } from '../constants';

describe('Test of saga `user`', () => {
  // Default
  const action = {
    isUserFetching: true,
    match: {
      isExact: true,
      params: {
        id: 'harleydavidson',
      },
      path: '/users/:id',
      url: '/users/harleydavidson',
    },
    type: 'USER_FETCHING',
  };
  const { match } = action;
  const dataForProps = {
    userFirstPhoto: 'https://images.unsplash.com/photo-1558981408-db0ecd8a1ee4?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max',
    userPhoto: 'https://images.unsplash.com/profile-1556751276456-1561737ea797?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=128&w=128',
  };
  const response = {
    data: {
      profile_image: {
        large: 'https://images.unsplash.com/profile-1556751276456-1561737ea797?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=128&w=128',
      },
      photos: [
        {
          urls: {
            regular: 'https://images.unsplash.com/photo-1558981408-db0ecd8a1ee4?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max',
          },
        },
      ],
    },
  };
  const defaultDataForProps = {
    userPhoto: 'No User Photo',
    userFirstPhoto: 'No Photo',
  };
  const axiosRequestForUser = {
    method: 'get',
    url: URL_FOR_USER_QUERY(match),
  };
  describe('`userRequestSaga` saga test', () => {
    it('`userRequestSaga`: Success', () => {
      const gen = userRequestSaga(action);
      expect(gen.next().value).toEqual(call(api.getUser, match));
      expect(gen.next(dataForProps).value).toEqual(put({ type: 'USER_REQUEST_SUCCESS', dataForProps }));
      expect(gen.next()).toEqual({ done: true, value: undefined });
    });
    it('`userRequestSaga` with Error', () => {
      const func = () => new Error('User Statistic Error');
      const error = 'User Statistic Error';
      const gen = userRequestSaga(action);
      expect(gen.next().value).toEqual(call(api.getUser, match));
      gen.next(func());
      expect(gen.throw('User Statistic Error').value).toEqual(put({ type: 'USER_REQUEST_ERROR', error }));
      expect(gen.next()).toEqual({ done: true, value: undefined });
    });
    it('`userRequestSaga` without `match`', () => {
      const actionClone = {
        ...action,
        match: null,
      };
      const gen = userRequestSaga(actionClone);
      expect(gen.next().value).toEqual(put({ type: 'USER_REQUEST_ERROR' }));
      expect(gen.next()).toEqual({ done: true, value: undefined });
    });
  });
  describe('Test `processResponse` and `getParamsRequest` functions', () => {
    it('`processResponse`', () => {
      expect(processResponse()).toEqual(defaultDataForProps);
      const processResponseResultDefault = {
        data: {
          ...response.data,
          photos: [
            {
              urls: {
                regular: 'psywalker',
              },
            },
          ],
        },
      };
      const processResponseResult = {
        ...dataForProps,
        userFirstPhoto: 'psywalker',
      };

      expect(processResponse(processResponseResultDefault)).toEqual(processResponseResult);
      expect(getParamsRequest(match)).toEqual(axiosRequestForUser);
    });
  });

  // Mock
  describe('Test `userRequestSaga` saga: stub api', () => {
    it('test acync', async () => {
      const dispatched = [];
      const stub = sinon.stub(api, 'getUser');
      stub.returns({ ...dataForProps, userFirstPhoto: 'psywalker' });

      const result = await runSaga({
        dispatch: a => dispatched.push(a),
      }, userRequestSaga, action).toPromise();

      expect(stub.calledWith(match)).toBe(true);
      expect(dispatched).toEqual([{
        dataForProps: {
          ...dataForProps,
          userFirstPhoto: 'psywalker',
        },
        type: 'USER_REQUEST_SUCCESS',
      }]);
    });
  });
});