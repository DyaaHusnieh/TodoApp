import { createReducer } from '@reduxjs/toolkit';
import { REQUEST_API_LOGIN, FETCH_USER_SUCCESS, FETCH_USER_FAIL } from './Action';
const initialState = {
	request: false,
	users: [],
};

const Reducer = createReducer(initialState, {
	[REQUEST_API_LOGIN]: (state, action) => ({
		...state,
		request: true,
	}),
	[FETCH_USER_SUCCESS]: (state, action) => ({
		...state,
		users: action.payload,
	}),
	[FETCH_USER_FAIL]: (state, action) => ({
		...state,
		users: action.payload,
	}),
});

export default Reducer;
