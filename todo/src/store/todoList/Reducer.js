import { createReducer } from '@reduxjs/toolkit';
import {
	REQUEST_API_TODOLIST,
	FETCH_TODOLIST_SUCCESS,
	FETCH_TODOLIST_FAIL,
	DELETE_ITEM,
	EDIT_POST,
	ADD_ITEM,
} from './Action';
const initialState = {
	request: false,
	todoList: [],
};

const Reducer = createReducer(initialState, {
	[REQUEST_API_TODOLIST]: (state, action) => ({
		...state,
		request: true,
	}),
	[FETCH_TODOLIST_SUCCESS]: (state, action) => ({
		...state,
		todoList: action.payload,
	}),
	[FETCH_TODOLIST_FAIL]: (state, action) => ({
		...state,
		todoList: action.payload,
	}),
	[DELETE_ITEM]: (state, action) => {
		console.log('action.resultId' + action.resultId);

		const updatedArray = state.todoList.filter((result) => result.id !== action.resultId);
		return {
			...state,
			todoList: updatedArray,
		};
	},
	[EDIT_POST]: (state, action) => {
		const editedItem = {
			userId: action.currUserid,
			id: action.currId,
			title: action.currTitle,
			completed: action.currBody,
		};
		const updatedArray = state.todoList.map((item, index) => {
			if (index === action.currIndex) {
				return (item = { ...editedItem });
			} else {
				return item;
			}
		});
		return {
			...state,
			todoList: updatedArray,
		};
	},
	[ADD_ITEM]: (state, action) => {
		// console.log("newTitle" , action.newTitle , "newBody ",action.newBody, "newUserId", action.newUserId , "state.todoList.length",  state.todoList.length);
		const userID = parseInt(action.newUserId);
		const newElement = {
			userId: userID,
			id: state.todoList.length + 1,
			title: action.newTitle,
			completed: action.newBody,
		};

		return {
			...state,
			todoList: [...state.todoList, newElement],
		};
	},
});

export default Reducer;
