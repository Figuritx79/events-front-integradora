import { api } from '../../global/config/api';
import { partialUser } from '../../global/schemas/user.schema';

export const login = async ({ email, password }) => {
	const validatedUser = partialUser({ email, password });
	if (!validatedUser.success) {
		return null;
	}
	const request = await api.post('/login', JSON.stringify({ email, password }));

	if (request.status === 200) {
		return true;
	}
	return false;
};
