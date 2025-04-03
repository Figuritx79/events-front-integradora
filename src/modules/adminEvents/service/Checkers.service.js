import { api } from '../../global/config/api';

export const getCheckers = async (email) => {
	try {
		const response = await api.post('/checker/own', JSON.stringify({email}));
		return response.status === 200 ? response.data : false;
	} catch (error) {
		console.error(error);
		return false;
	}
};	

export const createChecker = async (assignedBy, checker) => {
	const {name, lastname, phone, email, idEvent} = checker

	try {
		const response = await api.post('/checker/create', JSON.stringify({name, lastname, phone, email, idEvent, assignedBy}));
		return response.status === 201 ? response.data : false;
	} catch (error) {
		console.error(error);
		return false;
	}
};	

