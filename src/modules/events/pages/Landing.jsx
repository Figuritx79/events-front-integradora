import React from 'react';
import { EventInfo } from '../components/EventInfo';
import { NavBar } from '../components/NavBar';
import { useParams } from 'react-router';
import { LoadLanding } from '../service/LoadLanding.service';
import { Gallery } from '../components/Gallery';
import { CalendarPlus } from 'lucide-react';
import { Message } from '../components/Message';
import { Footer } from '../../landing/components/Footer';

function EventLandingPage() {
	const [landing, setLanding] = React.useState({
		id: '',
		logo: '',
		galleryJson: {},
		slug: '',
		name: '',
		description: '',
		workshops: [],
	});
	const { event } = useParams();
	React.useEffect(() => {
		const request = async () => {
			const landing = await LoadLanding({ slug: event });
			if (landing === null) {
				setLanding({
					id: '',
					logo: '',
					galleryJson: {},
					slug: '',
				});
			}
			const {
				logo,
				galleryJson,
				slug,
				event: { id, name, description, workshops },
			} = landing;
			const slugReplace = slug.replace('-', ' ');
			setLanding({ id, logo, galleryJson, slug: slugReplace, name, description, workshops: workshops });
		};

		request();
	}, []);

	return (
		<div className="bg-text-100 dark:bg-text-950 min-h-screen">
			<NavBar logo={landing.logo} />
			<main className="flex flex-col justify-center items-center">
				<EventInfo name={landing.name} linkId={`http://localhost:5173/landing/register/${landing.id}`} />
				<Gallery gallery={landing.galleryJson} />
				{landing.workshops.length > 0 ? (
					<section
						className="flex justify-center items-center mt-28 flex-col gap-8 w-full
          "
					>
						<h2 className="text-4xl font-bold text-text-950 dark:text-text-50">Horarios de talleres</h2>
						<div className="text-text-950 dark:text-text-50 text-center text-lg">
							<p>Agregue a su experiencia un placer de felicidad</p>
							<p>contamos con las siguientes actividades:</p>
						</div>
						{landing.workshops.map(({ id, name, capacity, hour, image }) => (
							<article
								key={id}
								className="flex items-center justify-evenly w-full max-w-2xl p-4 rounded-lg shadow-md dark:bg-[rgba(82,186,224,0.2)] bg-[rgba(82,186,224,.6)] hover:scale-110 ease-in-out duration-300"
							>
								<div>
									<p className="text-white text-5xl font-bold dark:text-text-50">{hour.substring(0, 5)}</p>
								</div>

								<div className="flex-1 ml-4 dark:text-text-50 text-text-950 flex justify-center items-center flex-col ">
									<h2 className="text-white font-semibold text-2xl">{name}</h2>
									<p className="text-white  opacity-80 dark:text-text-50 text-xl">Disponibilidad: {capacity} </p>
								</div>

								<div>
									<CalendarPlus className="dark:text-text-50 opacity-80" size={24} />
								</div>
								<img src={image} alt={name} className="w-20  h-20  object-cover rounded-md ml-4" />
							</article>
						))}
					</section>
				) : (
					<Message />
				)}

				<section className="flex justify-center items-center flex-col gap-4 mt-16">
					<h2 className="text-text-950 dark:text-text-50 text-3xl">Sobre nuestros Ponentes</h2>
					<p className="text-text-950 dark:text-text-50 text-base">
						Sientete en confianza y asesorate con nuestros amables ponentes...
					</p>
					<div className="grid md:grid-cols-3 grid-cols-2 gap-8">
						{landing.workshops.map(({ id, speakerInfo: { speaker_name, speaker_image } }) => (
							<article className="flex items-center justify-center dark:bg-[#0E0B0E] bg-text-100" key={id}>
								<div className="relative h-[237px] w-[207px] rounded-xl border border-solid border-[#B23BC4] hover:shadow-xl hover:shadow-[#B23BC4]/40 duration-700 ease-in-out hover:scale-125">
									<div className="absolute inset-0 rounded-md bg-[#3A2C3A] opacity-35"></div>
									<figure className="flex justify-center items-center flex-col z-10 relative">
										<img src={speaker_image} alt="ponente" className="w-40 mt-4 h-[160px] rounded-lg" />
										<h4 className="self-start ml-6 mt- text-text-50 font-bold ">{speaker_name}</h4>
									</figure>
								</div>
							</article>
						))}
					</div>
				</section>
			</main>
			<Footer />
		</div>
	);
}

export default EventLandingPage;
