import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import { api } from '../../global/config/api';

const AuthContext = createContext();

export const useAuth = () => {
	return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
	const navigate = useNavigate();
	const [credentials, setCredentials] = useState({
		email: '',
		role: '',
	});
	const login = async ({ email, password }) => {
		try {
			const requestLogin = await api.post('/auth/login', JSON.stringify({ email, password }));
			if (requestLogin.status === 200) {
				const role = requestLogin.data.result.role;

				setCredentials({ email, role });
				console.log('Autenticado');
				sessionStorage.setItem('role', role);
				sessionStorage.setItem('email', email);
				return true;
			}
			throw new Error('Invalid Credentials');
		} catch (error) {
			console.error(error);
			return;
		}
	};
	const logout = () => {
		setCredentials(null);
		navigate('/login');
	};
	return <AuthContext.Provider value={{ logout, login, credentials, setCredentials }}>{children}</AuthContext.Provider>;
};
