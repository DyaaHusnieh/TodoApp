import React from 'react';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { REQUEST_API_LOGIN } from '../store/login/Action';
import { useHistory } from 'react-router-dom';

function Login(props) {
	const [userName, setUserName] = useState('');
	const [password, setPassword] = useState('');
	let history = useHistory();

	const handleSubmit = () => {
		props.sendApiRequst();
	};

	useEffect(() => {
		if (props.result.length > 0) {
			props.result.forEach((element) => {
				if (element.username === userName && element.username === password) {
					localStorage.setItem('userid', element.id);
					history.push(`/todolist/${element.id}`);
				}
			});
		}
	}, [props.result, userName, password, history]);

	return (
		<div>
			<h2 id="loginText">Login page</h2>
			<TextField
				id="user"
				label="Username"
				data-testid="Username"
				type="text"
				autoComplete="current-Username"
				onChange={(e) => setUserName(e.target.value)}
			/>
			<br />
			<TextField
				id="password"
				label="Password"
				data-testid="Password"
				type="password"
				autoComplete="current-password"
				onChange={(e) => setPassword(e.target.value)}
			/>
			<br />
			<br />

			<Button variant="contained" color="primary" onClick={handleSubmit} data-testid="submit">
				Login
			</Button>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		result: state.login.users,
		response: state.login.request,
	};
};

const DispatchToProps = (dispatch) => {
	return {
		sendApiRequst: () => dispatch(REQUEST_API_LOGIN()),
	};
};
export default connect(mapStateToProps, DispatchToProps)(Login);
