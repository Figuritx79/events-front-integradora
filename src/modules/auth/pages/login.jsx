import { FormLogin } from '../components/FormLogin';
import { SectionForm } from '../components/SectionForm';

function Login() {
	return (
		<main className="bg-[#0D0D0D] grid md:grid-cols-2 grid-cols-1 place-content-center place-items-center h-screen">
			<SectionForm />
			<div className="text-[#F2F2F2] flex justify-center items-center flex-col">
				<h2 className="text-3xl font-bold">Ingresa a tu cuenta</h2>
				<p className="text-tiny mt-6">Coloca tu correo electrónico y contraseña para iniciar sesión</p>
				<FormLogin />
			</div>
		</main>
	);
}

export default Login;
