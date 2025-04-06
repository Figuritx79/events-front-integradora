import { api } from '../../global/config/api';

export const getUser = async (email) => {
	try {
		const response = await api.post('/user/profile', JSON.stringify({email}));
		return response.status === 200 || response.status === 201 ? response.data : false;
	} catch (error) {
		console.error(error);
		return false;
	}
};	

export const changeStatus = async (email) => {
	try {
		const response = await api.patch('/user/status', JSON.stringify({email}));
		return response.status === 200 || response.status === 201 ? response.data : false;
	} catch (error) {
		console.error(error);
		return false;
	}
};	

export const changePassword = async (email, currentPassword, newPassword) => {
	try {
		const response = await api.patch('/user/update-password', JSON.stringify({email, currentPassword, newPassword}));
		return response.status === 200 || response.status === 201 ? response.data : false;
	} catch (error) {
		console.error(error);
		return false;
	}
};	