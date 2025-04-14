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
    console.log(formData)
    try {
        const response = await api.post('/event/event', formData, {
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

export const changeStatus = async (formData) => {
    console.log(formData)
    try {
        const response = await api.post('/event/event', formData, {
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