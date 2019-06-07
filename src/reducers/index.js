import { combineReducers } from 'redux';
import login from './login';
import photolisting from './photolisting';

const allRedusers = combineReducers({
  login,
  photolisting,
});

export default allRedusers;
