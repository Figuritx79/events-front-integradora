import { Listbox, ListboxItem, ListboxSection } from '@heroui/react';
import { Link } from 'react-router';
import { House, CircleUser, Users, MapPinned } from 'lucide-react';
export const SideBarItems = () => {
	return (
		<div className="">
			<Listbox aria-label="Menu" className="">
				<ListboxSection className="px-2 dark:text-text-50 text-text-950">
					<ListboxItem as={Link} to="/" viewTransition key="UpEvent" href="" className="" color="light" textValue="">
						<div className="flex items-center pt-4">
							<img src="/icon.svg" alt="" className="w-7 h-7" />
							<p className="pl-2 text-xl font-bold">UpEvent</p>
						</div>
					</ListboxItem>
				</ListboxSection>
				<ListboxSection title="Tus páginas" className="text-xs px-2 pt-2 text-text-950 dark:text-text-50">
					<ListboxItem
						as={Link}
						to="/AdminEvents"
						viewTransition
						key="Inicio"
						href=""
						className=""
						color="light"
						textValue=""
					>
						<div className="flex items-center py-[2px]">
							<House strokeWidth={2.5} className="w-5 h-5" />
							<p className="pl-2 font-bold">Inicio</p>
						</div>
					</ListboxItem>
					<ListboxItem
						as={Link}
						to="/AdminEvents/Profile"
						viewTransition
						key="Perfil"
						href=""
						className=""
						color="light"
						textValue=""
					>
						<div className="flex items-center py-[2px]">
							<CircleUser strokeWidth={2.5} className="w-5 h-5" />
							<p className="pl-2 font-bold">Perfil</p>
						</div>
					</ListboxItem>
					<ListboxItem
						key="Eventos"
						as={Link}
						to="/AdminEvents/Events"
						viewTransition
						className=""
						color="light"
						textValue=""
					>
						<div className="flex items-center py-[2px]">
							<MapPinned strokeWidth={2.5} className="w-5 h-5" />
							<p className="pl-2 font-bold">Eventos</p>
						</div>
					</ListboxItem>
					<ListboxItem
						as={Link}
						to="/AdminEvents/Checkers"
						viewTransition
						key="Checadores"
						href=""
						className=""
						color="light"
						textValue=""
					>
						<div className="flex items-center py-[2px]">
							<Users strokeWidth={2.5} className="w-5 h-5" />
							<p className="pl-2 font-bold">Checadores</p>
						</div>
					</ListboxItem>
				</ListboxSection>
			</Listbox>

			<div className="px-4 pt-2 text-text-500 dark:text-text-500">
				<p className="text-xs">Tus eventos</p>
			</div>
		</div>
	);
};
