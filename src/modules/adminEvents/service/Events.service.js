import { api } from '../../global/config/api';
import { getCheckers } from './Checkers.service';

export const getEvents = async (email) => {
	console.log(email)
	try {
		const response = await api.post('/event/own', JSON.stringify({email}));
		return response.status === 200 || response.status === 201 ? response.data : false;
	} catch (error) {
		console.error(error);
		return false;
	}
};	

export const inscribeToEvent = async (email) => {
	console.log(email)
	try {
		const response = await api.post('/participant/register', JSON.stringify({email}));
		return response.status === 200 || response.status === 201 ? response.data : false;
	} catch (error) {
		console.error(error);
		return false;
	}
};	

export const getAllEvents = async () => {
	try {
		const response = await api.get('/event/events');
		return response.status === 200 || response.status === 201 ? response.data : false;
	} catch (error) {
		console.error(error);
		return false;
	}
};	

export const changeStatus = async (id) => {
	console.log(id)
	try {
		const response = await api.delete(`/event/events-delete/${id}`);
		return response.status === 200 || response.status === 201 ? response.data : false;
	} catch (error) {
		console.error(error);
		return false;
	}
};	


export const getEventByName = async (name) => {
	console.log(name)
	try {
		const response = await api.get(`/event/${name}`);
		return response.status === 200 || response.status === 201 ? response.data : false;
	} catch (error) {
		console.error(error);
		return false;
	}
};	

export const getLandingByEvent = async (id) => {
	console.log(id)
	try {
		const response = await api.get(`/landing-page/landing/event/${id}`);
		return response.status === 200 || response.status === 201 ? response.data : false;
	} catch (error) {
		console.error(error);
		return false;
	}
};	

export const getCheckersByEvent = async (id) => {
	console.log(id)
	try {
		const response = await api.get(`/checker/event/${id}`);
		return response.status === 200 || response.status === 201 ? response.data : false;
	} catch (error) {
		console.error(error);
		return false;
	}
};	

export const getEventById = async (id) => {
	console.log(id)
	try {
		const response = await api.get(`/event/events/${id}`);
		return response.status === 200 || response.status === 201 ? response.data : false;
	} catch (error) {
		console.error(error);
		return false;
	}
};	

export const assignChecker = async (assignedBy, checkers, idEvent) => {
	console.log(assignedBy)
	checkers = Array.from(checkers)
	console.log(checkers)
	console.log(idEvent)

		if(checkers[0] === "a" && checkers[1] === "l" && checkers[2] === "l") {
			const all = await getCheckers(assignedBy)
			if (all){
				const todos = all.result
				try {
					const requests = todos.map(async (checker) => {
						const idChecker = checker.checker.id
						console.log(idChecker)
						try {
						  const response = await api.post('/checker/assign',JSON.stringify({ assignedBy, idChecker, idEvent }));
						  console.log(response)
						  return response.status === 200 || response.status === 201 ? response.data : false;
						} catch (error) {
						  console.error(`Error en idChecker ${idChecker}:`, error);
						  return false; // Devuelve false para este idChecker fallido
						}
					});
					
					const results = await Promise.all(requests);
					console.log(results)
					return results;
			
				} catch (error) {
					// Manejar errores inesperados (ej. si idCheckers no es un arreglo)
					console.error('Error general:', error);
					return checkers.map(() => false); // Retorna un arreglo de false
				}
			}
		} else {
			try {
				const requests = checkers.map(async (checker) => {
					const idChecker  = checker
					console.log(idChecker)
					try {
					  const response = await api.post('/checker/assign',JSON.stringify({ assignedBy, idChecker, idEvent }));
					  console.log(response)
					  return response.status === 200 || response.status === 201 ? response.data : false;
					} catch (error) {
					  console.error(`Error en idChecker ${idChecker}:`, error);
					  return false; // Devuelve false para este idChecker fallido
					}
				});
				
				const results = await Promise.all(requests);
				console.log(results)
				return results;
		
			} catch (error) {
				// Manejar errores inesperados (ej. si idCheckers no es un arreglo)
				console.error('Error general:', error);
				return checkers.map(() => false); // Retorna un arreglo de false
			}
		}
};	


export const createLandingPage = async ({formData, eventName}) => {
    console.log(formData)
    console.log(eventName)
    try {
        const response = await api.post(`/landing-page/landing/create/${eventName}`, formData, {
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