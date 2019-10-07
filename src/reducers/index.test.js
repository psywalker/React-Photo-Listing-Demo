import * as Func from 'redux';
import allRedusers from './index';

import login from './login';
import photolisting from './photolisting';
import userstatistic from './userstatistic';
import photo from './photo';
import user from './user';
import smallphotolisting from './smallphotolisting';

describe('Test of reducer `index`', () => {
  it('', () => {
    Func.combineReducers = jest.fn();
    allRedusers({
      login,
      photolisting,
      userstatistic,
      photo,
      user,
      smallphotolisting,
    });
    expect(Func.combineReducers).not.toBeCalled();
  });
});