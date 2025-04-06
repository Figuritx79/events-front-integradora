import { api } from '../../global/config/api';

export const getCheckers = async (email) => {
	try {
		const response = await api.post('/checker/own', JSON.stringify({email}));
		return response.status === 200 || response.status === 201 ? response.data : false;
	} catch (error) {
		console.error(error);
		return false;
	}
};	

export const createChecker = async (checker) => {
	console.log(checker)
	const {name, lastname, phone, email} = checker

	try {
		const response = await api.post('/checker/register', JSON.stringify({name, lastname, phone, email}));
		return response.status === 200 || response.status === 201 ? response.data : false;
	} catch (error) {
		console.error(error);
		return false;
	}
};	

