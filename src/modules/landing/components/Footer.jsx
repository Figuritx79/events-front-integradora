export const Footer = () => {
	return (
		<footer className="mt-10  bg-blur-950 text-text-50  relative z-20 backdrop-blur-xl	">
			<hr className="ml-10 mr-10 border-accent-500" />
			<div className="container mx-auto flex flex-col justify-between px-4 py-6 md:flex-row md:items-center">
				<div className="mb-4 md:mb-0">
					<p className="text-sm">© 2025 UpEvent. Todos los derechos reservados.</p>
				</div>
				<div className="flex space-x-6">
					<a href="/terminos" className="text-sm hover:text-cyan-400 transition-colors">
						Terminos
					</a>
					<a href="/privacidad" className="text-sm hover:text-accent-500 transition-colors">
						Privacidad
					</a>
					<a href="/contacto" className="text-sm hover:text-accent-500 transition-colors">
						Contacto
					</a>
				</div>
			</div>
		</footer>
	);
};
