import { Form, Input, Button, Link } from '@heroui/react';
import { Mail, Eye, EyeOff, OctagonAlert } from 'lucide-react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { partialUser } from '../../global/schemas/user.schema';
import { AlertAnimate } from '../../global/components/AlertAnimate';
import { useAuth } from '../providers/AuthProvider';
import { useNavigate } from 'react-router';
import { Spinner } from '../../global/components/Components';
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
		setIsLoading(true);
		const { email, password } = values;
		const validAuth = await login({ email, password });
		console.log(validAuth);
		if (validAuth) {
			if(validAuth === "SUPER_ADMIN"){
					navigate('/Admin');
			} else if(validAuth === "ADMIN_EVENTO"){
				navigate('/AdminEvents');
			} else if(validAuth === "NORMAL"){
				navigate('/User');
			}
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
					endContent={<Mail className="text-primary" />}
					errorMessage="Ingres un correo valido"
					variant="bordered"
					classNames={{
						inputWrapper: [
							'w-80',
							'bg-transparent',
							'text-text-50 dark:text-text-950',
							'dark:border-secodary-300 border-primary-600',
							'backdrop-blur-xl',
							'group-data-[focus=true]:border-primary-500',
						],
						label: ['font-bold'],
					}}
					color="primary"
					size="lg"
				/>
			</div>
			<div className="mt-6">
				<Input
					{...register('password')}
					variant="bordered"
					isRequired
					labelPlacement="outside"
					color="primary"
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
								<EyeOff className="text-2xl dark:text-text-50 pointer-events-none text-primary-600" />
							) : (
								<Eye className="text-2xl pointer-events-none dark:text-text-50 text-primary-600" />
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
							'dark:border-primary-300 border-primary-600',
							'backdrop-blur-xl',
							'group-data-[focus=true]:border-primary-500',
						],
						label: ['font-bold'],
					}}
					size="lg"
				/>
				<p className="text-right mt-1">
					<Link
						className="text-[10px] dark:text-primary-300 text-primary-600"
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
					<Spinner/>
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
				className="mt-2 dark:text-text-50 text-text-100 w-80  font-bold text-base shadow-lg shadow-primary-500/40 dark:bg-primary-400 bg-primary-600"
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
