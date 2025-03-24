import { api } from '../../global/config/api';
import { partialUser } from '../../global/schemas/user.schema';

export const RegisterEventAdmin = async (user) => {
	try {
		const {
			common: { name, lastname, phone },
			personal: { company_name, email, password },
		} = user;

		const userJson = {
			name,
			lastname,
			email,
			password,
			phone,
			company_name,
		};
		const validUser = partialUser({ user: userJson });
		if (!validUser.success) {
			console.error('Invalid user');
			return false;
		}
		const requestRegister = await api.post('/user/register-admin-event', JSON.stringify(userJson));
		return requestRegister.status === 201;
	} catch (error) {
		console.error(`Error`, error);
		return false;
	}
};
