import { Progress } from '@heroui/react';
import { useRegisterFormContext } from '../providers/RegisterFormProvider';
export const ProgressBar = () => {
	const [state] = useRegisterFormContext();
	return (
		<Progress
			aria-label="Completado"
			className="w-64 md:w-96 dark:text-text-50 light:text-text-950"
			color={state.percet === 100 ? 'success' : 'secondary'}
			showValueLabel={true}
			size="md"
			value={state.percet}
		/>
	);
};
