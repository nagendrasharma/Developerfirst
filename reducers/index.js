import { combineReducers } from 'redux';
import authReducer from './authReducer';
import textReelReducer from './textReelReducer';

export default combineReducers({
  auth: authReducer,
  textReel: textReelReducer
});
