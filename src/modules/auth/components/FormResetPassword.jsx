import { Form, Input, Button } from '@heroui/react';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { completedPasssword } from '../../global/schemas/user.schema';
import { getUrlToken, ResetPassword } from '../service/resetPassword.service';
import { useNavigate } from 'react-router';
export const FormResetPassword = () => {
	const [isVisible, setIsVisible] = useState(false);
	const visibility = () => setIsVisible(!isVisible);
	const { register, handleSubmit } = useForm();
	const [isLoading, setIsLoading] = useState(false);
	const [isValidForm, setIsValidForm] = useState(true);
	const navigate = useNavigate();
	//  Falta hacer validaciones de que no este vacio y asi pero ya funcina
	const onSubmit = async (values) => {
		const { password, confirm_password } = values;
		setIsValidForm(true);
		// const validtPassword = completedPasssword({ password: values });
		// if (!validtPassword.success) {
		// 	setIsValidForm(!isValidForm);
		// 	console.log('No es igual');
		// 	return;
		// }
		setIsLoading(true);
		const token = getUrlToken();
		if (token === null) {
			console.log('Token null');

			return;
		}
		const requestNewPassword = await ResetPassword({ password, token });
		if (!requestNewPassword) {
			console.log('Peticon fallida');

			setIsValidForm(!isValidForm);
			setIsLoading(false);
			return;
		}
		setTimeout(() => {
			navigate('/login');
		}, 800);
	};
	return (
		<Form
			className="flex justify-center items-center gap-y-6 md:w-[400px] w-[360px]  h-96 dark:bg-blur-900 bg-blur-50 flex-col rounded-xl shadow-xl shadow-blur-800"
			onSubmit={handleSubmit(onSubmit)}
		>
			<div className="flex justify-center items-center flex-col gap-4">
				<h1 className="dark:text-text-50 text-text-950 text-center md:text-2xl text-xl font-bold">
					Restablece tu contraseña
				</h1>
				<p className="text-xs dark:text-text-50 text-text-950 font-normal text-center">
					Ingresa una nueva contraseña para tu cuenta
				</p>
			</div>

			<div className="gap-2">
				<Input
					{...register('password')}
					type={isVisible ? 'text' : 'password'}
					labelPlacement="outside"
					label="Contraseña"
					placeholder="***"
					isRequired
					endContent={
						<button
							aria-label="toggle password visibility "
							className="focus:outline-none"
							type="button"
							onClick={visibility}
						>
							{isVisible ? (
								<EyeOff className="text-2xl dark:text-text-50 text-accent-500  pointer-events-none" />
							) : (
								<Eye className="text-2xl dark:text-text-50 text-accent-500 pointer-events-none" />
							)}
						</button>
					}
					errorMessage="Por favor, ingresa tu correo"
					variant="bordered"
					classNames={{
						inputWrapper: [
							'w-80',
							'dark:text-text-50 text-text-950',
							'dark:border-accent-300 border-accent-500',
							'font-light',
							'bg-transparent',
							'backdrop-blur-xl',
							'group-data-[focus=true]:border-accent-500',
						],
						label: ['dark:text-text-50 text-text-950', 'font-bold'],
					}}
					color="secondary"
					size="lg"
					name="password"
				/>
			</div>

			<div className="gap-2">
				<Input
					{...register('confirm_password')}
					type={isVisible ? 'text' : 'password'}
					labelPlacement="outside"
					label="Confirmar Contraseña"
					placeholder="***"
					isRequired
					errorMessage="Por favor, ingresa tu correo"
					variant="bordered"
					classNames={{
						inputWrapper: [
							'w-80',
							'dark:text-text-50 text-text-950',
							'dark:border-accent-300 border-accent-500',
							'font-light',
							'bg-transparent',
							'backdrop-blur-xl',
							'group-data-[focus=true]:border-accent-500',
						],
						label: ['dark:text-text-50 text-text-950', 'font-bold'],
					}}
					color="secondary"
					size="lg"
					name="password"
				/>
			</div>
			<div className="flex justify-center items-center">
				<Button
					className=" w-80 dark:bg-accent-400 bg-accent-600  dark:text-text-50 text-text-100 font-bold text-base shadow-lg shadow-accent-500/40 "
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
					Restablecer
				</Button>
			</div>
		</Form>
	);
};
