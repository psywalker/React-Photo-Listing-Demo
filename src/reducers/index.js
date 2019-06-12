import { combineReducers } from 'redux';
import login from './login';
import photolisting from './photolisting';
import userstatistic from './userstatistic';
import photo from './photo';

const allRedusers = combineReducers({
  login,
  photolisting,
  userstatistic,
  photo,
});

export default allRedusers;
