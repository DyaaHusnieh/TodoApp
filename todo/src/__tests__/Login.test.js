import '@testing-library/jest-dom';
import React from 'react';
import { render, fireEvent, screen, cleanup } from '@testing-library/react';
import Login from '../pages/Login';
import { Provider } from 'react-redux';
import configStore from '../store/RootStore';
import { createStore } from 'redux';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router';
import reducer, { initialState } from '../store/login/Reducer';
import { combineReducers } from 'redux';


afterEach(cleanup);

test('check if the elements in the Dom does exist', () => {
	const h2Text = 'Login page';

	render(
		<Provider store={configStore}>
			<Login>{h2Text}</Login>
		</Provider>
	);
	expect(screen.getByText(h2Text)).toBeInTheDocument();
	expect(screen.queryByTestId('Username')).toBeInTheDocument();
	expect(screen.queryByTestId('Password')).toBeInTheDocument();
	expect(screen.queryByTestId('submit')).toBeInTheDocument();
});

const myNewState = {
	request: true,
	users: [
		{
			id: 1,
			name: 'Leanne Graham',
			username: 'Bret',
			email: 'Sincere@april.biz',
		},
		{
			id: 2,
			name: 'Ervin Howell',
			username: 'Antonette',
			email: 'Shanna@melissa.tv',
			phone: '010-692-6593 x09125',
			website: 'anastasia.net',
		},
	],
};

const login = reducer;
initialState.users = myNewState.users;

test('it should check if the user can login  successfully', () => {
	const rootReducer = combineReducers({
		login,
	});
	const mystore = createStore(rootReducer);
	const history = createMemoryHistory();
	render(
		<Provider store={mystore}>
			<Router history={history}>
				<Login></Login>
			</Router>
		</Provider>
	);

	// fill out the form and submit the form
	fireEvent.change(screen.queryByLabelText('Username'), {
		target: { value: 'Antonette' },
	});
	fireEvent.change(screen.queryByLabelText('Password'), {
		target: { value: 'Antonette' },
	});
	fireEvent.click(screen.getByTestId('submit'));

	expect(window.localStorage.getItem('userid')).toEqual('2');
	expect(history.location.pathname).toBe('/todolist/2');
});
