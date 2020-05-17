import { takeEvery, put, call } from 'redux-saga/effects';
import { REQUEST_API_TODOLIST, FETCH_TODOLIST_SUCCESS, FETCH_TODOLIST_FAIL } from './Action';
import { todoRequset } from '../../services/todoListRequest';
export function* getApiData(action) {
	try {
		const results = yield call(todoRequset, action.payload);
		yield put(FETCH_TODOLIST_SUCCESS(results.data));
	} catch (error) {
		yield put(FETCH_TODOLIST_FAIL(error));
	}
}

export function* watchAPIREQUEST() {
	yield takeEvery(REQUEST_API_TODOLIST, getApiData);
}
