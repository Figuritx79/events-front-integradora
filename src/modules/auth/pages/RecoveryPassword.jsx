import { Decoration } from '../components/Decoration';
import { FormRecoveryPassword } from '../components/FormRecoveryPassword';

function RecoveryPassword() {
	return (
		<main className="bg-bg-950 flex justify-center items-center h-screen">
			<div className="absolute top-0 left-0 ">
				<Decoration />
			</div>
			<FormRecoveryPassword />
			<div className="absolute bottom-0 right-0 rotate-180">
				<Decoration />
			</div>
		</main>
	);
}

export default RecoveryPassword;
