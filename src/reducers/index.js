import { combineReducers } from 'redux';
import login from './login';

const allRedusers = combineReducers({
  login,
});

export default allRedusers;
