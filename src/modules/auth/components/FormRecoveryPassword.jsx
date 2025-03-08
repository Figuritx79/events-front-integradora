import { Form, Input, Button } from '@heroui/react';

export const FormRecoveryPassword = () => {
	return (
		<Form>
			<div>
				<h1>¿Olvidaste tu contraseña?</h1>
				<p>Ingresa tu correo para restablecer tu contraseña</p>
			</div>

			<div>
				<Input />
			</div>
			<div>
				<Input />
			</div>

			<div>
				<Button>Regresar</Button>
				<Button>Restablecer</Button>
			</div>
		</Form>
	);
};
