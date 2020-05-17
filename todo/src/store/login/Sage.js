import { takeEvery, put, call } from 'redux-saga/effects';
import { REQUEST_API_LOGIN, FETCH_USER_SUCCESS, FETCH_USER_FAIL } from './Action';
import { loginRequset } from '../../services/loginRequset';

export function* getApiData(action) {
	try {
		const results = yield call(loginRequset);
		// console.log('[saga.js login file]' + results.data);
		yield put(FETCH_USER_SUCCESS(results.data));
		// console.log(results);
	} catch (error) {
		yield put(FETCH_USER_FAIL(error));
		// console.log(error + 'from login');
	}
}

export function* watchLOGINREQUEST() {
	// console.log(' [saga.js] Login watchLOGINREQUEST lisner is work !');
	yield takeEvery(REQUEST_API_LOGIN, getApiData);
	// console.log(' [saga.js] Login after watchLOGINREQUEST lisner is work !');
}
