import { Form, Input, Button, DateInput, RadioGroup, Radio } from '@heroui/react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import { partialUser } from '../../global/schemas/user.schema';
import { useRegisterEvent } from '../provider/RegisterEventProvider';
import { useEffect, useState } from 'react';
import { parseDate } from '@internationalized/date';
import { OctagonAlert } from 'lucide-react';
import { AlertAnimate } from '../../global/components/AlertAnimate';
export const CommonForm = () => {
	const [selected, setSelected] = useState('Mujer');
	const [, dispatch] = useRegisterEvent();
	const [defaultDate, setDefaultDate] = useState(parseDate('1990-04-04'));
	const { register, handleSubmit } = useForm();
	const navigate = useNavigate();
	const [isValid, setIsValid] = useState(true);
	useEffect(() => {
		dispatch({ type: 'CHANGE_PERCENT', data: 33 });
	}, []);
	const onSubmit = (data) => {
		data.gender = selected;
		const validInfo = partialUser({ user: data });

		if (!validInfo.success) {
			setIsValid(!isValid);
			return;
		}
		setIsValid(true);
		dispatch({ type: 'SET_COMMON_DATA', data: data });
		navigate('../final');
	};
	return (
		<Form className="w-[432px] h-40 flex justify-center items-center mt-28" onSubmit={handleSubmit(onSubmit)}>
			<div>
				<p className="text-center dark:text-text-50 text-text-950 text-sm">Queremos conocerte mejor. Agrega tu </p>
				<p className="text-center dark:text-text-50 text-text-950 text-sm">información personal</p>
			</div>
			<div>
				<DateInput
					{...register('birthDate')}
					label="Fecha de nacimiento"
					isRequired
					labelPlacement="outside"
					color="secondary"
					maxLength={50}
					minLength={5}
					variant="bordered"
					placeholder="Pedro"
					value={defaultDate}
					onChange={setDefaultDate}
					className="text-text-950 dark:text-text-50"
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
						innerWrapper: ['dark:text-text-50 text-text-950'],
						base: ['dark:text-tex-50 text-text-950'],
						input: ['dark:text-text-50 text-text-950'],
					}}
				/>
			</div>
			<div>
				<Input
					{...register('residence')}
					label="Direccion"
					labelPlacement="outside"
					color="success"
					isRequired
					maxLength={50}
					minLength={5}
					variant="bordered"
					placeholder="Mondragon 1516"
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
					{...register('occupation')}
					label="Trabajo Actual"
					labelPlacement="outside"
					color="success"
					isRequired
					maxLength={50}
					minLength={5}
					variant="bordered"
					placeholder="Programador"
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

			<div className="self-start ml-16">
				<RadioGroup
					color="secondary"
					label="Genero"
					{...register('gender')}
					orientation="horizontal"
					classNames={{
						label: 'text-text-950 dark:text-text-50 font-bold',
					}}
					value={selected}
					onValueChange={setSelected}
				>
					<Radio
						classNames={{
							label: 'text-text-950 dark:text-text-50 font-bold',
						}}
						value={'Hombre'}
					>
						Hombre
					</Radio>
					<Radio
						classNames={{
							label: 'text-text-950 dark:text-text-50 font-bold',
						}}
						value={'Mujer'}
					>
						Mujer
					</Radio>
				</RadioGroup>
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
