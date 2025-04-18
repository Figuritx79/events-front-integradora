import axios from 'axios';

const api = axios.create({
	baseURL: 'http://localhost:8000/api',
	headers: {
		'Content-Type': 'application/json',
	},
	withCredentials: true,
	timeout: 60000,
});

export { api };
