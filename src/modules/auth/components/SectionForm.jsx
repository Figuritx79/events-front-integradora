import logo from '/icon.svg'
import letters from '/logo-letters.svg'

export const SectionForm = () => {
	return (
		<div className="text-text-50 bg-bg-50 dark:text-text-950 dark:bg-bg-950 hidden md:flex md:flex-col md:justify-center md:items-center ">
			<div className='flex items-center space-x-4'>
			<img src={logo} alt="" className="w-20 h-20"/>
			<img src={letters} alt="" className="w-full h-16"/>
			</div>
			<div className="text-lg mt-4">
				<p>Inscribete en eventos con UpEvent que sean de tu</p>
				<p>interés para asistir y visitar los talleres disponibles,</p>
				<p>además de escuchar los temas que abordarán los</p>
				<p>ponentes principales.</p>
			</div>
		</div>
	);
};
