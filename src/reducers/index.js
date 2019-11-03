import { combineReducers } from 'redux';
import login from './login';
import photolisting from './photolisting';
import userstatistic from './userstatistic';
import photo from './photo';
import user from './user';
import smallphotolisting from './smallphotolisting';
import charts from './charts';
import lang from './lang';

const allRedusers = combineReducers({
  login,
  photolisting,
  userstatistic,
  photo,
  user,
  smallphotolisting,
  charts,
  lang,
});

export default allRedusers;
