import { combineReducers } from 'redux';
import login from './login';
import photolisting from './photolisting';
import userstatistic from './userstatistic';

const allRedusers = combineReducers({
  login,
  photolisting,
  userstatistic,
});

export default allRedusers;
