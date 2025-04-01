import { Form, Input, Button, Link } from '@heroui/react';
import { Mail, Eye, EyeOff, OctagonAlert } from 'lucide-react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { partialUser } from '../../global/schemas/user.schema';
import { AlertAnimate } from '../../global/components/AlertAnimate';
import { useAuth } from '../providers/AuthProvider';
import { useNavigate } from 'react-router';
export const FormLogin = () => {
	const [isVisble, setIsVisible] = React.useState(false);
	const visibility = () => setIsVisible(!isVisble);
	const [isValidForm, setIsValidForm] = React.useState(true);
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = React.useState(false);
	const { register, handleSubmit } = useForm();
	const [title, setTitle] = React.useState('');
	const [description, setDescription] = React.useState('');
	const { login } = useAuth();
	const onSubmit = async (values) => {
		setIsValidForm(true);
		const validCredentials = partialUser({ user: values });
		if (!validCredentials.success) {
			setIsValidForm(!isValidForm);
			setDescription('Por favor, ingresa datos validos');
			setTitle('Datos Invalidos');
			return;
		}
		setIsLoading(true);
		const { email, password } = values;
		const validAuth = await login({ email, password });
		if (validAuth) {
			navigate('/AdminEvents');
			return;
		}
		setIsValidForm(!isValidForm);
		setTitle('Credenciales Incorrectas');
		setDescription('Favor de ingresar credenciales correctas');
		setIsLoading(false);
		return;
	};
	return (
		<Form className="mt-8  flex justify-center items-center text-text-50 bg-bg-50 dark:text-text-950 dark:bg-bg-950" onSubmit={handleSubmit(onSubmit)}>
			<div>
				<Input
					{...register('email')}
					type="email"
					labelPlacement="outside"
					label="Correo"
					placeholder="joeDoe@gmail.com"
					isRequired
					endContent={<Mail className="text-secondary" />}
					errorMessage="Ingres un correo valido"
					variant="bordered"
					classNames={{
						inputWrapper: [
							'w-80',
							'bg-transparent',
							'text-text-50 dark:text-text-950',
							'dark:border-secodary-300 border-secondary-600',
							'backdrop-blur-xl',
							'group-data-[focus=true]:border-secondary-500',
						],
						label: ['font-bold'],
					}}
					color="secondary"
					size="lg"
				/>
			</div>
			<div className="mt-6">
				<Input
					{...register('password')}
					variant="bordered"
					isRequired
					labelPlacement="outside"
					color="secondary"
					placeholder="****"
					label="Contraseña"
					endContent={
						<button
							aria-label="toggle password visibility "
							className="focus:outline-none"
							type="button"
							onClick={visibility}
						>
							{isVisble ? (
								<EyeOff className="text-2xl dark:text-text-50 pointer-events-none text-accent-600" />
							) : (
								<Eye className="text-2xl pointer-events-none dark:text-text-50 text-accent-600" />
							)}
						</button>
					}
					type={isVisble ? 'text' : 'password'}
					classNames={{
						inputWrapper: [
							'w-80',
							'shadow-xl',
							'bg-transparent',
							'text-text-50 dark:text-text-950',
							'dark:border-secodary-300 border-secondary-600',
							'backdrop-blur-xl',
							'group-data-[focus=true]:border-secondary-500',
						],
						label: ['font-bold'],
					}}
					size="lg"
				/>
				<p className="text-right mt-1">
					<Link
						className="text-[10px] dark:text-secondary-300 text-secondary-600"
						href="/recovery-password"
						viewTransition
					>
						¿Olvidaste tu contraseña?
					</Link>
				</p>
			</div>
			<Button
				className=" w-80 dakr:bg-accent-500 dark:text-text-50 bg-accent-600 text-text-100 font-bold text-base shadow-lg shadow-accent-500/40 "
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
				{isLoading ? 'Validando' : 'Iniciar Sesion'}
			</Button>
			<div className="mt-2 flex flex-row ">
				<hr className="w-[74px] border-1 dark:border-white border-text-950 relative mt-[14px] mr-2" />
				<p className="dark:text-text-50 text-text-950 font-light">¿No tienes una cuenta?</p>
				<hr className="w-[74px] border-1 dark:border-white  border-text-950 relative mt-[14px] ml-2" />
			</div>
			<Button
				className="mt-2 dark:text-text-50 text-text-100 w-80  font-bold text-base shadow-lg shadow-secondary-500/40 dark:bg-secondary-400 bg-secondary-600"
				size="lg"
			>
				<Link className="text-[#F2F2F2]" href="/admin-register" viewTransition>
					Registrate
				</Link>
			</Button>
			{!isValidForm ? (
				<AlertAnimate
					title={title}
					description={description}
					color={'danger'}
					icon={<OctagonAlert color="#f31260" />}
					positon={'top-0 right-0 absolute'}
				/>
			) : (
				<div className="hidden"></div>
			)}
		</Form>
	);
};
