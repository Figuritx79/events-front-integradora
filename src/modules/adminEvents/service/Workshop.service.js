import { api } from '../../global/config/api';

export const getWorkshops = async (eventId) => {
    console.log(eventId)
    try {
        const response = await api.get(`/workshop/event/${eventId}`);
        console.log(response)
        return response.status === 200 || response.status === 201 ? response.data : false;
    } catch (error) {
        console.error(error);
        return false;
    }
};	

export const createWorkshop = async (formData) => {
    console.log(formData)
    try {
        const response = await api.post('/workshop/workshops/create', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
        return response.status === 200 || response.status === 201 ? response.data : false;
    } catch (error) {
        console.error(error);
        return false;
    }
};	

export const updateWorkshop = async (formData) => {
	formData.forEach((value, key) => console.log(key, value));

    try {
        const response = await api.put('/workshop/workshop/update', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
        return response.status === 200 || response.status === 201 ? response.data : false;
    } catch (error) {
        console.error(error);
        return false;
    }
};	

export const changeStatus = async (id) => {
    console.log(id)
	try {
		const response = await api.patch('/workshop/status', JSON.stringify(id));
		return response.status === 200 || response.status === 201 ? response.data : false;
	} catch (error) {
		console.error(error);
		return false;
	}
};	
