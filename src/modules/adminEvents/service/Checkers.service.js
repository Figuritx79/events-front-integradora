import { api } from '../../global/config/api';

export const findCheckers = async () => {
	try {
		const response = await api.get('/user/checkers');
		return response.status === 200 ? response.data : false;
	} catch (error) {
		console.error(error);
		return false;
	}
};	
