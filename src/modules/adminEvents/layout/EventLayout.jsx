import { BackgroundLines } from '../components/BackgroundLines';
import { SideBar } from '../components/SideBar';
const AdminEventLayout = ({ children }) => {
	return (
		<div className="h-screen relative bg-bg-100 dark:bg-bg-950">
			<BackgroundLines />
			<div className="w-full z-10 absolute top-0 flex h-full">
				<SideBar />
				{children}
			</div>
		</div>
	);
};

export { AdminEventLayout };
