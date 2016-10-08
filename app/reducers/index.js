import { combineReducers } from 'redux';
import taskReducer from './taskReducer';
import pushReducer from './pushReducer';

export default combineReducers({
  tasks: taskReducer,
  push: pushReducer,
});
