import { Image, Navbar, NavbarBrand, NavbarContent } from '@heroui/react';
import { Link } from 'react-router';
export const NavBar = ({ logo }) => {
	return (
		<Navbar className="dark:bg-blur-900 bg-blur-50 text-text-950 dark:text-text-50">
			<NavbarBrand>
				<Image src={logo ? logo : '/icon.svg'} radius="full" width={64} />
			</NavbarBrand>
			<NavbarContent>
				<NavbarContent>
					<Link color="foreground" href="#">
						Sobre el Evento
					</Link>
				</NavbarContent>
				<NavbarContent>
					<Link color="foreground" href="#">
						Horarios
					</Link>
				</NavbarContent>
				<NavbarContent>
					<Link color="foreground" href="#">
						Ponentes
					</Link>
				</NavbarContent>
			</NavbarContent>
		</Navbar>
	);
};
