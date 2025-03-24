import { Card, CardHeader, CardBody, Button } from '@heroui/react';
import { Link } from 'react-router';
import { Check } from 'lucide-react';
function Succes() {
	return (
		<main className="flex justify-center items-center h-screen dark:bg-text-950 bg-bg-50">
			<Card className="py-4 max-w-md dark:bg-blur-900 bg-blur-50">
				<CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
					<div className="rounded-full bg-success-50 p-3 mb-4 ">
						<Check className="text-success " />
					</div>
					<h4 className="font-bold text-large text-center text-text-950 dark:text-text-50">
						¡Solicitud enviada con éxito!
					</h4>
				</CardHeader>
				<CardBody className="px-4 py-4 flex flex-col gap-4 items-center">
					<p className="text-center text-text-950 dark:text-text-50">
						Hemos enviado un correo con un enlace para restablecer tu contraseña. Por favor, revisa tu bandeja de
						entrada y sigue las instrucciones. Si no ves el correo, revisa tu carpeta de spam o intenta nuevamente.
					</p>
				</CardBody>
				<Button className="mt-2 bg-accent-600 text-text-100 dark:bg-accent-400 dark:text-text-950 font-bold">
					<Link to={'/login'}>Iniciar Sesion</Link>
				</Button>
			</Card>
		</main>
	);
}

export default Succes;
