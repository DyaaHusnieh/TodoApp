import { all } from 'redux-saga/effects';
import { watchLOGINREQUEST } from './login/Sage';
import { watchAPIREQUEST } from './todoList/Saga';

export default function* RootSage() {
	yield all([watchLOGINREQUEST(), watchAPIREQUEST()]);
}
