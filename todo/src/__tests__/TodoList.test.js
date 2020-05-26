import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent, screen, cleanup } from '@testing-library/react';
import TodoList from '../pages/TodoList';
import { Provider } from 'react-redux';
import configStore from '../store/RootStore';
import { Router, MemoryRouter, Route } from 'react-router';
import { createMemoryHistory } from 'history';
import { createStore } from 'redux';
import { combineReducers } from 'redux';
import reducer, { initialState } from '../store/todoList/Reducer';
import CreateItem from '../component/CreateItem';

afterEach(cleanup);

test('check if the elements in the Dom does exist and the user is athenticated to login and the logout button', () => {
	window.localStorage.setItem('userid', '3');
	const history = createMemoryHistory();
	history.push('/todolist/3');
	const props = { match: { params: { userid: '3' } } };

	render(
		<Provider store={configStore}>
			<Router history={history}>
				<TodoList {...props}> </TodoList>
			</Router>
		</Provider>
	);

	expect(screen.queryByTestId('logout')).toBeInTheDocument(); //done
	expect(history.location.pathname).toBe('/todolist/3');
	fireEvent.click(screen.getByTestId('logout'));
	expect(history.location.pathname).toBe('/');
	expect(screen.getByTestId('Cards').children.length).toEqual(0);
});

test('check if the user can login without localStorage', () => {
	const history = createMemoryHistory();
	history.push('/todolist/3');
	const props = { match: { params: { userid: '3' } } };

	render(
		<Provider store={configStore}>
			<Router history={history}>
				<TodoList {...props}> </TodoList>
			</Router>
		</Provider>
	);

	expect(history.location.pathname).toBe('/');
});

const myNewState = {
	request: true,
	todoList: [
		{
			userId: 1,
			id: 1,
			title: 'delectus aut autem',
			completed: false,
		},
		{
			userId: 1,
			id: 2,
			title: 'quis ut nam facilis et officia qui',
			completed: false,
		},
		{
			userId: 2,
			id: 21,
			title: 'suscipit repellat esse quibusdam voluptatem incidunt',
			completed: false,
		},
		{
			userId: 2,
			id: 22,
			title: 'distinctio vitae autem nihil ut molestias quo',
			completed: true,
		},
		{
			userId: 2,
			id: 23,
			title: 'et itaque necessitatibus maxime molestiae qui quas velit',
			completed: false,
		},
	],
};

const todoList = reducer;
initialState.todoList = myNewState.todoList;

test('test if the elemets does rendering in the dom and check functionality  of the (Add, Delete edit) ', () => {
	window.localStorage.setItem('userid', '1');
	const rootReducer = combineReducers({
		todoList,
	});
	const mystore = createStore(rootReducer);
	const props = { match: { params: { userid: '1' } } };
	const history = createMemoryHistory();

	render(
		<Provider store={mystore}>
			<Router history={history}>
				<TodoList {...props}>
					<CreateItem />
				</TodoList>
			</Router>
		</Provider>
	);

	//test Delete button
	expect(screen.getByTestId('Cards').children.length).toEqual(2);
	const deleteButton = screen.getByTestId('todoList-2').children.item(0);
	fireEvent.click(deleteButton);
	expect(screen.getByTestId('Cards').children.length).toEqual(1);

	// //test add Button
	fireEvent.change(screen.queryByLabelText('Title'), {
		target: { value: 'diaa' },
	});
	fireEvent.change(screen.queryByLabelText('Body'), {
		target: { value: 'hassaniya' },
	});

	fireEvent.click(screen.getByTestId('Add-Button'));
	fireEvent.click(screen.getByTestId('Add-Button'));

	expect(screen.getByTestId('Cards').children.length).toEqual(3);

	//test edit button and check it from the redux store
	const editButton = screen.getByTestId('todoList-1').children.item(1);
	fireEvent.click(editButton);
	screen.getByTestId('post-title-1').innerHTML = 'task one ';
	screen.getByTestId('post-body-1').innerHTML = 'done';
	fireEvent.click(editButton);
	expect(screen.getByTestId('Cards').children.length).toEqual(3);
});
