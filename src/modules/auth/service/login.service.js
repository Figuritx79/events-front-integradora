import { api } from '../../global/config/api';

export const login = async ({ user }) => {
	try {
		const { email, password } = user;

		const request = await api.post('/auth/login', JSON.stringify({ email, password }));

		return request.status === 200;
	} catch (error) {
		console.error(error);
		return false;
	}
};
