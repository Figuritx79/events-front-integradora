import { Progress } from '@heroui/react';
import { useRegisterEvent } from '../provider/RegisterEventProvider';
export const ProgressBar = () => {
	const [state] = useRegisterEvent();
	return (
		<Progress
			aria-label="Completado"
			className="w-64 md:w-96 dark:text-text-50 light:text-text-950"
			color={state === 100 ? 'success' : 'secondary'}
			showValueLabel={true}
			size="md"
			value={state.percet}
		/>
	);
};
