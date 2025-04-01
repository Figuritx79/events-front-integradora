import { Divider } from '@heroui/react';
import { useAuth } from '../../auth/providers/AuthProvider';
export const UserInfo = () => {
	const { credentials } = useAuth();
	return (
		<div className="pt-4 pb-5 px-4 dark:text-text-50 text-text-950">
			<Divider className="my-2" />
			<p className="text-base">{credentials.email}</p>
		</div>
	);
};
