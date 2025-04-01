import { Outlet } from 'react-router';
import { ProgressBar } from '../components/Progress';
import { Decoration } from '../../auth/components/Decoration';
import { RegisterEventProvider } from '../provider/RegisterEventProvider';
function RegisterEvent() {
	return (
		<RegisterEventProvider>
			<main className="flex justify-center items-center flex-col h-screen dark:bg-text-950 bg-bg-100 ">
				<ProgressBar />
				<Outlet />
				<div className="absolute top-0 left-0 ">
					<Decoration />
				</div>
			</main>
		</RegisterEventProvider>
	);
}

export default RegisterEvent;
