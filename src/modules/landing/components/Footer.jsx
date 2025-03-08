import Rectangule from './Rectangule';

export const Footer = () => {
	return (
		<footer className="mt-10  bg-[rgba(14, 11, 14, .4)] text-[#F2F2F2]  relative z-20 backdrop-blur-xl	">
			{/* <Rectangule /> */}
			<hr className="ml-10 mr-10 border-[#00C3FF]" />
			<div className="container mx-auto flex flex-col justify-between px-4 py-6 md:flex-row md:items-center">
				<div className="mb-4 md:mb-0">
					<p className="text-sm">© 2025 UpEvent. Todos los derechos reservados.</p>
				</div>
				<div className="flex space-x-6">
					<a href="/terminos" className="text-sm hover:text-cyan-400 transition-colors">
						Terminos
					</a>
					<a href="/privacidad" className="text-sm hover:text-cyan-400 transition-colors">
						Privacidad
					</a>
					<a href="/contacto" className="text-sm hover:text-cyan-400 transition-colors">
						Contacto
					</a>
				</div>
			</div>
		</footer>
	);
};
