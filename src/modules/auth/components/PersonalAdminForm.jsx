import { Form, Input, Button } from '@heroui/react';
import { AlertAnimate } from '../../global/components/AlertAnimate';
import { Link, useNavigate } from 'react-router';
import { Eye, EyeOff, OctagonAlert } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRegisterFormContext } from '../providers/RegisterFormProvider';
import { RegisterEventAdmin } from '../service/registerAdmin.service';
import { partialUser } from '../../global/schemas/user.schema';
const PersonalAdminForm = () => {
	const [isVisible, setIsVisible] = useState(false);
	const changeVisibility = () => setIsVisible(!isVisible);
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();
	const [state, dispatch] = useRegisterFormContext();
	const [isValidForm, setIsValidForm] = useState(true);
	const { register, handleSubmit } = useForm();

	useEffect(() => {
		dispatch({ type: 'CHANGE_PERCENT', data: 50 });
	}, []);
	const onSubmit = async (values) => {
		setIsValidForm(true);
		const validPartialUser = partialUser({ user: values });
		if (!validPartialUser.success) {
			setIsValidForm(!isValidForm);
			console.error('NO es valido');
			return;
		}
		setIsLoading(!isLoading);
		dispatch({ type: 'SET_PERSONAL_DATA', data: values });
		const successRequest = await RegisterEventAdmin(state);
		if (!successRequest) {
			setIsValidForm(!isValidForm);
			setIsLoading(false);
			return;
		}
		dispatch({ type: 'CHANGE_PERCENT', data: 100 });
		setTimeout(() => {
			navigate('/login');
			``;
		}, 800);
	};
	return (
		<Form className="w-[432px] h-40 flex justify-center items-center mt-28" onSubmit={handleSubmit(onSubmit)}>
			<div>
				<p className="text-center text-text-50 bg-bg-50 dark:text-text-950 dark:bg-bg-950 text-sm">
					Último paso: crea tus credenciales de acceso
				</p>
				<p className="text-center text-text-50 bg-bg-50 dark:text-text-950 dark:bg-bg-950 text-sm">acceso</p>
			</div>
			<div>
				<Input
					{...register('company_name')}
					label="Nombre de la Empresa"
					isRequired
					labelPlacement="outside"
					color="success"
					maxLength={50}
					minLength={5}
					variant="bordered"
					placeholder="UTEZ"
					classNames={{
						inputWrapper: [
							'w-80',
							'dark:text-text-50 text-text-950',
							'font-light',
							'bg-transparent',
							'border-accent-300',
							'backdrop-blur-xl',
							'group-data-[focus=true]:border-accent-500',
						],
						label: ['dark:text-text-50 text-text-950', 'font-bold'],
					}}
				/>
			</div>
			<div>
				<Input
					{...register('email')}
					label="Correo"
					labelPlacement="outside"
					color="success"
					isRequired
					maxLength={50}
					minLength={5}
					variant="bordered"
					type="email"
					placeholder="joedoe@gmaill.com"
					classNames={{
						inputWrapper: [
							'w-80',
							'dark:text-text-50 text-text-950',
							'font-light',
							'bg-transparent',
							'border-accent-300',
							'backdrop-blur-xl',
							'group-data-[focus=true]:border-accent-500',
						],
						label: ['dark:text-text-50 text-text-950', 'font-bold'],
					}}
				/>
			</div>
			<div>
				<Input
					{...register('password')}
					label="Contraseña"
					labelPlacement="outside"
					color="success"
					type={isVisible ? 'text' : 'password'}
					isRequired
					maxLength={100}
					variant="bordered"
					placeholder="***"
					classNames={{
						inputWrapper: [
							'w-80',
							'dark:text-text-50 text-text-950',
							'font-light',
							'bg-transparent',
							'border-accent-300',
							'backdrop-blur-xl',
							'group-data-[focus=true]:border-accent-500',
						],
						label: ['dark:text-text-50 text-text-950', 'font-bold'],
					}}
					endContent={
						<button
							aria-label="toggle password visibility "
							className="focus:outline-none ease-in-out duration-300"
							type="button"
							onClick={changeVisibility}
						>
							{isVisible ? (
								<EyeOff className="text-2xl dark:text-default-400 pointer-events-none text-accent-600" />
							) : (
								<Eye className="text-2xl pointer-events-none text-accent-600" />
							)}
						</button>
					}
				/>
			</div>
			<div className="flex justify-center items-center gap-4 flex-row mt-6">
				<Button
					className="dark:bg-secondary-500 dark:text-text-50 bg-secondary-400 text-text-100 font-bold shadow-lg shadow-secondary-500/40 flex w-36"
					as={Link}
				>
					<Link to="/">Atras</Link>
				</Button>
				<Button
					className="dark:bg-accent-500 dark:text-text-50 font-bold shadow-lg shadow-accent-500/40 flex w-36 bg-accent-600 text-text-100"
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
					{isLoading ? 'Enviando' : 'Enviar'}
				</Button>
			</div>
			{!isValidForm ? (
				<AlertAnimate
					title={'Datos erroneos o vuelve a enviar el formulario'}
					description={'Por favor, completa los campos o vuelve a enviar el formulario'}
					icon={<OctagonAlert color="#f31260" />}
					color={'danger'}
					positon={'bottom-0 right-0 absolute'}
				/>
			) : (
				<div className="absolute hidden"></div>
			)}
		</Form>
	);
};

export { PersonalAdminForm };
