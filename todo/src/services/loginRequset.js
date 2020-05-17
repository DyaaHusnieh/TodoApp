import axios from 'axios';

const loginRequset = async () => {
	return axios({
		method: 'get',
		url: `https://jsonplaceholder.typicode.com/users`,
	});
};

export { loginRequset };
