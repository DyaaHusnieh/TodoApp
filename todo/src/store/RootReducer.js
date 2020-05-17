import { combineReducers } from 'redux';
import login from './login/Reducer';
import todoList from './todoList/Reducer';

const rootReducer = combineReducers({
	login,
	todoList,
});
export default rootReducer;
