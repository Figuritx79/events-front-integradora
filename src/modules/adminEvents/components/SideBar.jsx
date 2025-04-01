import { EventList } from './EventList';
import { SideBarItems } from './SideBarItems';
import { UserInfo } from './UserInfo';

export const SideBar = () => {
	return (
		<div className="hidden lg:flex w-[220px] h-full flex flex-col justify-between rounded-r-2xl border border-bg-200 text-text-50 bg-bg-100  dark:text-text-950 dark:bg-bg-950 dark:dark dark:border-bg-900">
			<SideBarItems />
			<EventList />
			<UserInfo />
		</div>
	);
};
