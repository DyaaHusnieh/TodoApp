import { createAction } from '@reduxjs/toolkit';

const REQUEST_API_LOGIN = createAction('REQUEST_API_LOGIN');
const FETCH_USER_SUCCESS = createAction('FETCH_USER_SUCCESS');
const FETCH_USER_FAIL = createAction('FETCH_USER_FAIL');

export { REQUEST_API_LOGIN, FETCH_USER_SUCCESS, FETCH_USER_FAIL };
