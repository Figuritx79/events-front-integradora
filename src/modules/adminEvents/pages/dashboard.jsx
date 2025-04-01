import { Outlet, useNavigate } from 'react-router';
import { useAuth } from '../../auth/providers/AuthProvider';
import { useEffect } from 'react';
import { AdminEventLayout } from '../layout/EventLayout';

function DashboardAdminEvent() {
	const { credentials, setCredentials } = useAuth();

	const navigate = useNavigate();
	useEffect(() => {
		const role = sessionStorage.getItem('role');
		const email = sessionStorage.getItem('email');
		if (!role || role !== 'ADMIN_EVENTO') {
			navigate('/login');
			return;
		}
		setCredentials({
			email,
			role,
		});
	}, [navigate]);
	if (!credentials || credentials.role !== 'ADMIN_EVENTO') {
		return null;
	}
	return (
		<AdminEventLayout>
			<Outlet />
		</AdminEventLayout>
	);
}

export default DashboardAdminEvent;
