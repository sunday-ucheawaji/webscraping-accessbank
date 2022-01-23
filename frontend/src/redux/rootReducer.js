import { combineReducers } from 'redux';
import { authReducerRegister, authReducerLogin } from './auth/authReducer';
import scraperReducer from './scraper/scraperReducer';
const rootReducer = combineReducers({
  register: authReducerRegister,
  login: authReducerLogin,
  scraper: scraperReducer,
});

export default rootReducer;
