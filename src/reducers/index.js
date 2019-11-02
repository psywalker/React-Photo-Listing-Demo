import { combineReducers } from 'redux';
import login from './login';
import photolisting from './photolisting';
import userstatistic from './userstatistic';
import photo from './photo';
import user from './user';
import smallphotolisting from './smallphotolisting';
import charts from './charts';

const allRedusers = combineReducers({
  login,
  photolisting,
  userstatistic,
  photo,
  user,
  smallphotolisting,
  charts,
});

export default allRedusers;
