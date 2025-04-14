import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import { api } from '../../global/config/api';

const AuthContext = createContext();

export const useAuth = () => {
	return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
	const navigate = useNavigate();
	const [credentials, setCredentials] = useState(() => {
		const storedEmail = sessionStorage.getItem('email');
		const storedRole = sessionStorage.getItem('role');
		return storedEmail && storedRole 
		  ? { email: storedEmail, role: storedRole } 
		  : null;
	});

	const updateCredentials = (newCredentials) => {
        setCredentials(prev => {
            const updated = {
                ...prev,
                ...newCredentials
            };
            
            // Actualizar sessionStorage
            if (newCredentials.email) {
                sessionStorage.setItem('email', newCredentials.email);
            }
            if (newCredentials.role) {
                sessionStorage.setItem('role', newCredentials.role.toString());
            }
            
            return updated;
        });
    };

	const login = async ({ email, password }) => {
		try {
			const requestLogin = await api.post('/auth/login', JSON.stringify({ email, password }));
			if (requestLogin.status === 200) {
				const role = requestLogin.data.result.role;
				setCredentials({ email, role });
				sessionStorage.setItem('role', role);
				sessionStorage.setItem('email', email);

				return role;
			}
			throw new Error('Invalid Credentials');
		} catch (error) {
			console.error(error);
			return false;
		}
	};
	const logout = () => {
		setCredentials(null);
		sessionStorage.removeItem('role');
		sessionStorage.removeItem('email');
		navigate('/login');
	};
	return <AuthContext.Provider value={{ logout, login, credentials, setCredentials: updateCredentials  }}>{children}</AuthContext.Provider>;
};
