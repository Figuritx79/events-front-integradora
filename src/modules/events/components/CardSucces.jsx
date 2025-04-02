import { CircleCheckBig, Mail } from 'lucide-react';
import { Card, CardBody, Button } from '@heroui/react';
export const CardSucces = () => {
	return (
		<Card className="w-full max-w-md mx-4 dark:bg-blur-900 bg-blur-50">
			<CardBody className="flex flex-col items-center gap-4 p-6 text-center">
				<div className="rounded-full bg-success-100 p-3">
					<CircleCheckBig />
				</div>

				<h2 className="text-xl font-semibold text-text-950 dark:text-text-50">¡Registro Exitoso!</h2>

				<p className="text-text-950 dark:text-text-50">
					Te has registrado correctamente al evento. Hemos enviado un correo de confirmación con los detalles.
				</p>

				<div className="bg-secondary-100 rounded-lg p-4 w-full mt-2">
					<div className="flex items-center gap-2">
						<Mail />
						<p className="text-sm text-text-950 ">Por favor revisa tu bandeja de entrada para más información</p>
					</div>
				</div>

				<Button color="primary" className="w-full mt-2 bg-primary-400">
					Volver al Inicio
				</Button>
			</CardBody>
		</Card>
	);
};
