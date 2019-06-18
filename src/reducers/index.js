import { combineReducers } from 'redux';
import login from './login';
import photolisting from './photolisting';
import userstatistic from './userstatistic';
import photo from './photo';
import user from './user';
import userlikesphotos from './userlikesphotos';
import userphotolisting from './userphotolisting';

const allRedusers = combineReducers({
  login,
  photolisting,
  userstatistic,
  photo,
  user,
  userlikesphotos,
  userphotolisting,
});

export default allRedusers;
