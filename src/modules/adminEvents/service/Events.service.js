import { api } from '../../global/config/api';

export const getEvents = async (email) => {
	try {
		const response = await api.post('/event/own', JSON.stringify({email}));
		return response.status === 200 ? response.data : false;
	} catch (error) {
		console.error(error);
		return false;
	}
};	
