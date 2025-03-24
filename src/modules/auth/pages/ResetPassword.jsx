import { Decoration } from '../components/Decoration';
import { FormResetPassword } from '../components/FormResetPassword';
import { useState, useEffect } from 'react';
import { TokenExpired } from '../components/TokenExpired';
import { ValidToken, getUrlToken } from '../service/resetPassword.service';
function ResetPassword() {
	const [isTokenExist, setIsTokenExist] = useState(false);
	useEffect(() => {
		const validTokenRequest = async () => {
			try {
				const token = getUrlToken();

				if (token === null) {
					setIsTokenExist(false);
					return;
				}

				const validToken = await ValidToken({ token });

				setIsTokenExist(validToken === true);
			} catch (error) {
				console.error(error);

				setIsTokenExist(false);
			}
		};
		validTokenRequest();
	}, []);
	return (
		<main className="dark:bg-bg-950 bg-text-50 flex justify-center items-center h-screen">
			<div className="absolute top-0 left-0 ">
				<Decoration />
			</div>
			{isTokenExist ? <FormResetPassword /> : <TokenExpired />}
			<div className="absolute bottom-0 right-0 rotate-180">
				<Decoration />
			</div>
		</main>
	);
}

export default ResetPassword;
