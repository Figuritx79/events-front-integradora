import { Form, Input, Button, Link } from '@heroui/react';
import { Mail, Eye, EyeOff } from 'lucide-react';
import React from 'react';
export const FormLogin = () => {
	const [isVisble, setIsVisible] = React.useState(false);
	const visibility = () => setIsVisible(!isVisble);
	return (
		<Form className="mt-10 flex justify-center items-center">
			<div>
				<Input
					type="email"
					labelPlacement="outside"
					label="Correo"
					placeholder="joeDoe@gmail.com"
					isRequired
					endContent={<Mail />}
					errorMessage="Ingres un correo valido"
					variant="bordered"
					classNames={{
						inputWrapper: [
							'w-80',
							'bg-transparent',
							'border-secodary-300',
							'backdrop-blur-xl',
							'group-data-[focus=true]:border-secondary-500',
						],
						label: ['text-text-50', 'font-bold'],
					}}
					color="success"
					size="lg"
				/>
			</div>
			<div className="mt-6">
				<Input
					variant="bordered"
					isRequired
					labelPlacement="outside"
					color="success"
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
								<EyeOff className="text-2xl text-default-400 pointer-events-none" />
							) : (
								<Eye className="text-2xl pointer-events-none" />
							)}
						</button>
					}
					type={isVisble ? 'text' : 'password'}
					classNames={{
						inputWrapper: [
							'w-80',
							'shadow-xl',
							'bg-transparent',
							'border-secondary-300',
							'backdrop-blur-xl',
							'group-data-[focus=true]:border-secondary-500',
						],
						label: ['text-text-50', 'font-bold'],
					}}
					size="lg"
				/>
				<p className="text-right mt-1">
					<Link className="text-[10px] text-secondary-300" href="/recovery-password" viewTransition>
						¿Olvidaste tu contraseña?
					</Link>
				</p>
			</div>
			<Button
				className=" w-80 bg-accent-500 text-text-50 font-bold text-base shadow-lg shadow-accent-500/40 "
				size="lg"
			>
				Iniciar Sesion
			</Button>
			<div className="mt-2 flex flex-row ">
				<hr className="w-[74px] border-1 border-white relative mt-[14px] mr-2" />
				<p className="text-text-50 font-light">¿No tienes una cuenta?</p>
				<hr className="w-[74px] border-1 border-white relative mt-[14px] ml-2" />
			</div>
			<Button
				className="mt-2 border-secondary-500 text-text-50 w-80  font-bold text-base shadow-lg shadow-secondary-500/40 bg-secondary-500"
				size="lg"
			>
				<Link className="text-[#F2F2F2]" href="/register" viewTransition>
					Registrate
				</Link>
			</Button>
		</Form>
	);
};
