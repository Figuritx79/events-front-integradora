import { api } from '../../global/config/api';

export const getCheckers = async (email) => {
	try {
		const response = await api.post('/checker/own', JSON.stringify({email}));
		return response.status === 200 || response.status === 201 ? response.data : false;
	} catch (error) {
		console.error(error);
		return false;
	}
};	

export const createChecker = async (assignedBy, checker) => {
	console.log(checker)
	const {name, lastname, phone, email} = checker

	try {
		const response = await api.post('/checker/create', JSON.stringify({name, lastname, phone, email, assignedBy}));
		return response.status === 200 || response.status === 201 ? response.data : false;
	} catch (error) {
		console.error(error);
		return false;
	}
};	

export const updateChecker = async ({currentEmail, checker}) => {
	try {
		const response = await api.patch('/user/update-checker', JSON.stringify({
            currentEmail,
            newEmail: checker.email || '',
            name: checker.name || '',
            lastname: checker.lastname || '',
            phone: checker.phone || '',
            companyName: checker.companyName || ''
        }));
        
		return response.status === 200 || response.status === 201 ? response.data : false;
	} catch (error) {
		console.error(error);
		return false;
	}
};	


