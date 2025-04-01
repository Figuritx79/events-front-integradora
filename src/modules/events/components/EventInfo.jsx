import { Button } from '@heroui/react';
import { Title } from '../../landing/components/Title';
import { CalendarPlus } from 'lucide-react';
import { Link } from 'react-router';
export const EventInfo = ({ name, description, linkId }) => {
	return (
		<section className="flex justify-center items-center flex-col text-text-950 dark:text-text-50 gap-4 mt-10">
			<Title text={name ? name : 'No Tiene titulo'} />
			<article>
				<p className="text-lg text-center px-80 ">
					{description
						? description
						: 'Imagina un festival de globos aerostáticos al amanecer, con el cielo iluminado por decenas de colores vibrantes.La brisa fresca, el sonido del fuego inflando los globos y la emoción de los espectadores crean una atmósfera mágica. Describe este evento con detalles visuales y sensoriales envolventes.'}
				</p>
			</article>
			<Button
				startContent={<CalendarPlus className="text-text-50" />}
				className="bg-secondary-600 dark:bg-secondary-400 font-bold text-text-100"
				size="lg"
			>
				<Link to={linkId}>Registrarse</Link>
			</Button>
		</section>
	);
};
