import { Card, CardHeader, CardBody, Button } from '@heroui/react';
import { CircleAlert } from 'lucide-react';
import { Link } from 'react-router';
export const TokenExpired = () => {
	return (
		<Card className="py-4 max-w-md dark:bg-blur-900 bg-blur-50">
			<CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
				<div className="rounded-full bg-danger-50 p-3 mb-4 ">
					<CircleAlert className="text-danger-500 w-8 h-8" />
				</div>
				<h4 className="font-bold text-large text-center text-text-950 dark:text-text-50">
					Enlace no válido o expirado
				</h4>
			</CardHeader>
			<CardBody className="px-4 py-4 flex flex-col gap-4 items-center">
				<p className="text-center text-text-950 dark:text-text-50">
					El enlace para restablecer tu contraseña no es válido o ha expirado. Solicita uno nuevo si es necesario.
				</p>
				<Button className="mt-2 bg-accent-600 text-text-100 dark:bg-accent-400 dark:text-text-950 font-bold">
					<Link to={'/recovery-password'}>Solicitar cambio</Link>
				</Button>
			</CardBody>
		</Card>
	);
};
