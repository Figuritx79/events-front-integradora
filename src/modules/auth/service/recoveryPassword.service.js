import { api } from '../../global/config/api';
import { partialUser } from '../../global/schemas/user.schema';
export const RecoveryPassword = async ({ email }) => {
	const validatedUser = partialUser(email);
	if (!validatedUser.success) {
		return null;
	}

	const request = await api.post('/recovery-password', JSON.stringify(email));
	if (request.status === 200) return true;

	return false;
};
