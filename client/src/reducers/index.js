import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import tasks from './tasks';
import pet from './pet'

export default combineReducers({
    alert,
    auth,
    tasks,
    pet
});