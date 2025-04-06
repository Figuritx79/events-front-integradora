import { api } from '../../global/config/api';

export const updateProfile = async ({currentEmail, user}) => {
	try {
		const response = await api.patch('/user/update-profile', JSON.stringify({
            currentEmail,
            newEmail: user.email || '',
            name: user.name || '',
            lastname: user.lastname || '',
            phone: user.phone || '',
            companyName: user.companyName || ''
        }));
        
		return response.status === 200 || response.status === 201 ? response.data : false;
	} catch (error) {
		console.error(error);
		return false;
	}
};	
