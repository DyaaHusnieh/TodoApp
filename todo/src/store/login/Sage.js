import { takeEvery, put, call } from 'redux-saga/effects';
import { REQUEST_API_LOGIN, FETCH_USER_SUCCESS, FETCH_USER_FAIL } from './Action';
import { loginRequset } from '../../services/loginRequset';

export function* getApiData(action) {
	try {
		const results = yield call(loginRequset);
		yield put(FETCH_USER_SUCCESS(results.data));
	} catch (error) {
		yield put(FETCH_USER_FAIL(error));
	}
}

export function* watchLOGINREQUEST() {
	yield takeEvery(REQUEST_API_LOGIN, getApiData);
}
