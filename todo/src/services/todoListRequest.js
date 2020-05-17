import axios from 'axios';

const todoRequset = async () => {
	return axios({
		method: 'get',
		url: `https://jsonplaceholder.typicode.com/todos/`,
	});
};

export { todoRequset };
