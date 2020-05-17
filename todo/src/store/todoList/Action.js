import { createAction } from '@reduxjs/toolkit';

const REQUEST_API_TODOLIST = createAction('REQUEST_API_TODOLIST');
const FETCH_TODOLIST_SUCCESS = createAction('FETCH_TODOLIST_SUCCESS');
const FETCH_TODOLIST_FAIL = createAction('FETCH_TODOLIST_FAIL');
const DELETE_ITEM = createAction('DELETE_ITEM');
const EDIT_POST = createAction('EDIT_POST');
const ADD_ITEM = createAction('ADD_ITEM');

export { REQUEST_API_TODOLIST, FETCH_TODOLIST_SUCCESS, FETCH_TODOLIST_FAIL, DELETE_ITEM, EDIT_POST, ADD_ITEM };
