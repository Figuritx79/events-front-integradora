import CardLanding from './CardLanding';
import { Settings, Calendar, Users } from 'lucide-react';
export const CardGroup = () => {
	return (
		<div className="flex flex-col md:flex-row md:gap-x-16  gap-y-16 justify-center items-center m-10 text-text-50 bg-bg-50 dark:text-text-950 dark:bg-bg-950">
			<CardLanding>
				<Calendar color="#26A9D9" className="m-4" />
				<h4 className=" font-bold m-4">Crea tu Evento</h4>
				<p className="m-4 font-normal  text-xs">Configura los detalles básicos de tu evento en minutos.</p>
			</CardLanding>

			<CardLanding>
				<Settings color="#26A9D9" className="m-2" />
				<h4 className="m-4  font-bold">Personaliza</h4>
				<p className="m-4 font-normal  text-xs">Ajusta cada aspecto según tus necesidades específicas.</p>
			</CardLanding>

			<CardLanding>
				<Users color="#26A9D9" className="m-2" />
				<h4 className="m-4  font-bold">Gestiona Asistentes</h4>
				<p className="m-4 font-normal  text-xs">Administra registros y comunicaciones fácilmente.</p>
			</CardLanding>
		</div>
	);
};
