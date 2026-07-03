import { combineReducers } from 'redux';
import application from './application';
import auth from './auth';
import shopping from './shopping';
import general from './general';
import payment from './payment';
import history from './history';

const rootReducer = combineReducers({
	application,
	auth,
	history,
	general,
	shopping,
	payment
});

export default rootReducer;