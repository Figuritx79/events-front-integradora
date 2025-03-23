import { api } from '../../global/config/api';

export const RecoveryPassword = async ({ user }) => {
	const { email } = user;
	try {
		const request = await api.post('/auth/recovery-password', JSON.stringify({ email }));
		if (request.status === 200) return true;
	} catch (error) {
		console.log(`Error en la recuperacion de contra ${error}`);
	}

	return false;
};
