import { Form, Input, Button /*addToast*/ } from '@heroui/react';
import { Mail } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router';
export const FormRecoveryPassword = () => {
	const [formData, setFormData] = useState({
		email: '',
	});
	const [isCorrect, setIsCorrect] = useState(false);

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormData((prevState) => ({ ...prevState, [name]: value }));
	};
	const handleSubmit = async (event) => {
		if (formData.email === ' ' || formData.email.length === 0) {
			setIsCorrect(true);
			return;
		}
		event.preventDefault();
		console.log(formData);
	};

	return (
		<Form
			onSubmit={handleSubmit}
			className="flex justify-center items-center gap-y-6 md:w-[350px] w-[360px]  h-80 bg-blur-900 flex-col rounded-xl shadow-xl shadow-blur-800"
		>
			<div className="flex justify-center items-center flex-col gap-4">
				<h1 className="text-text-50 text-center md:text-2xl text-xl font-bold">¿Olvidaste tu contraseña?</h1>
				<p className="text-xs text-text-50 font-normal text-center">Ingresa tu correo para restablecer tu contraseña</p>
			</div>

			<div className="gap-2">
				<Input
					type="email"
					labelPlacement="outside"
					label="Correo"
					placeholder="joeDoe@gmail.com"
					isRequired
					isInvalid={isCorrect}
					endContent={<Mail color="#F2F2F2" />}
					errorMessage="Por favor, ingresa tu correo"
					variant="bordered"
					classNames={{
						inputWrapper: [
							'w-80',
							'text-text-50',
							'font-light',
							'bg-transparent',
							'border-accent-300',
							'backdrop-blur-xl',
							'group-data-[focus=true]:border-accent-500',
						],
						label: ['text-text-50', 'font-bold'],
					}}
					color="secondary"
					size="lg"
					name="email"
					onChange={handleChange}
				/>
			</div>

			<div className="flex justify-center items-center flex-row gap-2">
				<Button className="bg-secondary-500 shadow-lg shadow-secondary-500/40 text-text-100 font-bold" size="lg">
					<Link to={'/login'} viewTransition color="#F2F2F2">
						Regresar
					</Link>
				</Button>
				<Button
					className="bg-accent-500 shadow-lg shadow-accent-500/40 text-text-100 font-bold"
					size="lg"
					type="submit"
				>
					Restablecer
				</Button>
			</div>
		</Form>
	);
};
