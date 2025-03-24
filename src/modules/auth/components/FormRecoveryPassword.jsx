import { Form, Input, Button } from '@heroui/react';
import { Mail, OctagonAlert } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { RecoveryPassword } from '../service/recoveryPassword.service';
import { partialUser } from '../../global/schemas/user.schema';
import { AlertAnimate } from '../../global/components/AlertAnimate';
import { useForm } from 'react-hook-form';

export const FormRecoveryPassword = () => {
	const navigate = useNavigate();
	const { register, handleSubmit } = useForm();
	const [isLoading, setIsLoading] = useState(false);
	let [isValidForm, setIsValidForm] = useState(true);
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	// const handleChange = (event) => {
	// 	const { name, value } = event.target;
	// 	setFormData((prevState) => ({ ...prevState, [name]: value }));
	// };

	const onSubmit = async (values) => {
		setIsValidForm(true);
		const validadEmial = partialUser({ user: values });
		if (!validadEmial.success) {
			setIsValidForm(!isValidForm);
			setTitle('Formato invalido o ingresa el email');
			setDescription('Por favor, ingresa un formato valido o ingresa el email');
			return;
		}
		setIsLoading(true);
		const requestRecovery = await RecoveryPassword({ user: values });
		if (!requestRecovery) {
			setTitle('Correo no encontrado');
			setDescription('Por favor, registrate');
			setIsValidForm(!isValidForm);
			setIsLoading(false);
		}
		setTimeout(() => {
			navigate('/success');
		}, 800);
		return;
	};

	return (
		<Form
			onSubmit={handleSubmit(onSubmit)}
			className="flex justify-center items-center gap-y-6 md:w-[350px] w-[360px]  h-80 dark:bg-blur-900 bg-blur-50 flex-col rounded-xl shadow-xl shadow-blur-800"
		>
			<div className="flex justify-center items-center flex-col gap-4">
				<h1 className="dark:text-text-50 text-text-950 text-center md:text-2xl text-xl font-bold">
					¿Olvidaste tu contraseña?
				</h1>
				<p className="text-xs dark:text-text-50 text-text-950 font-normal text-center">
					Ingresa tu correo para restablecer tu contraseña
				</p>
			</div>

			<div className="gap-2">
				<Input
					{...register('email')}
					type="email"
					labelPlacement="outside"
					label="Correo"
					placeholder="joeDoe@gmail.com"
					isRequired
					endContent={<Mail className="text-2xl dark:text-text-50 pointer-events-none text-accent-600" />}
					variant="bordered"
					classNames={{
						inputWrapper: [
							'w-80',
							'text-text-50',
							'font-light',
							'bg-transparent',
							'dark:text-text-50 text-text-950',
							'dark:border-accent-300 border-accent-500',
							'backdrop-blur-xl',
							'group-data-[focus=true]:border-accent-500',
						],
						label: ['dark:text-text-50 text-text-950', 'font-bold'],
					}}
					color="secondary"
					size="lg"
				/>
			</div>
			<div className="flex justify-center items-center flex-row gap-2">
				<Button
					className="dark:bg-secondary-400 bg-secondary-600 shadow-lg shadow-secondary-500/40 font-bold"
					size="lg"
				>
					<Link to={'/login'} viewTransition className="dark:text-text-50 text-text-100">
						Regresar
					</Link>
				</Button>
				<Button
					className="dark:bg-accent-500 shadow-lg shadow-accent-500/40 dark:text-text-50 text-text-100 bg-accent-600 font-bold"
					size="lg"
					type="submit"
					isLoading={isLoading}
					spinner={
						<svg
							className="animate-spin h-5 w-5 text-current"
							fill="none"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
							<path
								className="opacity-75"
								d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
								fill="currentColor"
							/>
						</svg>
					}
				>
					{isLoading ? 'Enviado' : 'Enviar'}
				</Button>
			</div>
			{!isValidForm ? (
				<AlertAnimate
					title={title}
					description={description}
					color={'danger'}
					icon={<OctagonAlert color="#f31260" />}
					positon={'absolute top-0 right-0'}
				/>
			) : (
				<div className="hidden"></div>
			)}
		</Form>
	);
};
