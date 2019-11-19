import { combineReducers } from 'redux';
import login from './login';
import photolisting from './photolisting';
import userstatistic from './userstatistic';
import photo from './photo';
import user from './user';
import smallphotolisting from './smallphotolisting';
import charts from './charts';
import lang from './lang';
import updatedApp from './updatedApp';

const allRedusers = combineReducers({
  login,
  photolisting,
  userstatistic,
  photo,
  user,
  smallphotolisting,
  charts,
  lang,
  updatedApp,
});

export default allRedusers;
