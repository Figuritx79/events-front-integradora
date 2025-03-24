import { Outlet, useNavigate } from 'react-router';
import { useAuth } from '../../auth/providers/AuthProvider';
import { useEffect } from 'react';

function DashboardAdminEvent() {
	const { credentials } = useAuth();
	const navigate = useNavigate();
	useEffect(() => {
		if (!credentials || credentials.role !== 'ADMIN_EVENTO') {
			navigate('/login');
		}
	}, [credentials, navigate]);
	if (!credentials || credentials.role !== 'ADMIN_EVENTO') {
		return null;
	}
	return (
		<div>
			<h1>Hello</h1>
			<Outlet />
		</div>
	);
}

export default DashboardAdminEvent;
