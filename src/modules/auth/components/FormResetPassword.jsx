import { Form, Input, Button } from '@heroui/react';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

export const FormResetPassword = () => {
	const [isVisible, setIsVisible] = useState(false);
	const visibility = () => setIsVisible(!isVisible);

	return (
		<Form className="flex justify-center items-center gap-y-6 md:w-[400px] w-[360px]  h-96 dark:bg-blur-900 bg-blur-50 flex-col rounded-xl shadow-xl shadow-blur-800">
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
				>
					Restablecer
				</Button>
			</div>
		</Form>
	);
};
