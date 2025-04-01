import { Decoration } from '../components/Decoration';
import { FormLogin } from '../components/FormLogin';
import { SectionForm } from '../components/SectionForm';

function Login() {
	return (
		<main className="text-text-50 bg-bg-50 dark:text-text-950 dark:bg-bg-950 grid md:grid-cols-2 grid-cols-1 place-content-center place-items-center h-screen">
			<SectionForm />
			<div className="flex justify-center items-center flex-col">
				<h2 className="text-3xl font-bold">Ingresa a tu cuenta</h2>
				<p className="text-tiny mt-6 text-center">Coloca tu correo electrónico y contraseña para iniciar sesión</p>
				<FormLogin />
			</div>
			<div className="absolute bottom-0 right-0 rotate-180">
				<Decoration />
			</div>
		</main>
	);
}

export default Login;
