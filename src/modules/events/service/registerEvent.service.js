import { api } from '../../global/config/api';

export const registerEvent = async ({ registerInfo }) => {
	try {
		const {
			personal: { name, lastname },
			common: { birthDate, residence, occupation, gender },
			final: { email, password },
			idEvent,
		} = registerInfo;

		const jsonBody = {
			idEvent,
			name,
			lastname,
			email,
			gender,
			birthDate,
			password,
			occupation,
			residence,
		};
		const requestRegister = await api.post('/registration/event-register', JSON.stringify(jsonBody));
		if (requestRegister.status === 201) {
			return true;
		}
		return false;
	} catch (error) {
		console.error(error);
		return false;
	}
};
