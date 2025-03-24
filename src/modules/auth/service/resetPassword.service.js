import { api } from '../../global/config/api';

export const ResetPassword = async ({ password, token }) => {
	try {
		const requestResetPassword = await api.patch('/auth/reset-password', JSON.stringify({ token, password }));
		return requestResetPassword.status === 200;
	} catch (err) {
		console.error(err);
		return false;
	}
};

export const ValidToken = async ({ token }) => {
	try {
		const requestValidToken = await api.post('/token/valid', JSON.stringify({ token }));
		return requestValidToken.status === 200;
	} catch (error) {
		console.error(`Error`, error);
		return false;
	}
};

export const getUrlToken = () => {
	const url = window.location.search;
	const searchUrl = new URLSearchParams(url);

	const token = searchUrl.get('context');

	if (token === '' || token === null) {
		return null;
	}
	return token;
};
