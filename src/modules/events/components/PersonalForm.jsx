import { Form, Input, Button } from '@heroui/react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router';
import { useRegisterEvent } from '../provider/RegisterEventProvider';
import { partialUser } from '../../global/schemas/user.schema';
import { useEffect, useState } from 'react';
import { AlertAnimate } from '../../global/components/AlertAnimate';
import { OctagonAlert } from 'lucide-react';
export const PersonalForm = () => {
	const [, dispatch] = useRegisterEvent();
	const { register, handleSubmit } = useForm();
	const { id } = useParams();
	const [isValid, setIsValid] = useState(true);
	const navigate = useNavigate();
	useEffect(() => {
		dispatch({ type: 'CHANGE_PERCENT', data: 0 });
	}, []);
	const onSubmit = (data) => {
		const dataValite = partialUser({ user: data });
		setIsValid(true);

		if (!dataValite.success) {
			setIsValid(!isValid);
			return;
		}
		setIsValid(true);
		dispatch({ type: 'SET_ID_EVENT', data: id });
		dispatch({ type: 'SET_PERSONAL_DATA', data: data });
		navigate('common');
	};
	return (
		<Form className="w-[432px] h-40 flex justify-center items-center mt-28" onSubmit={handleSubmit(onSubmit)}>
			<div>
				<h1 className="text-center dark:text-text-50 text-text-950 font-bold text-2xl">Crea tu cuenta</h1>
				<p className="text-center dark:text-text-50 text-text-950 text-sm">Regístrate para acceder a tu cuenta y</p>
				<p className="text-center dark:text-text-50 text-text-950 text-sm">disfrutar de una mejor experiencia</p>
			</div>
			<div>
				<Input
					{...register('name')}
					label="Nombre"
					isRequired
					labelPlacement="outside"
					color="success"
					maxLength={50}
					minLength={5}
					variant="bordered"
					placeholder="Pedro"
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
					{...register('lastname')}
					label="Apellido"
					labelPlacement="outside"
					color="success"
					isRequired
					maxLength={50}
					minLength={5}
					variant="bordered"
					placeholder="Hernandez"
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
				>
					Siguiente
				</Button>
			</div>
			{!isValid ? (
				<AlertAnimate
					title={'Datos Erroneos'}
					description={'Por favor, ingresa los datos solicidatos'}
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
