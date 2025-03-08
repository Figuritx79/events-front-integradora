import { Button, Image } from '@heroui/react';
import { Logo } from './modules/global/components/Logo';
import { GlobalLayout } from './modules/landing/layouts/GlobalLayout';
import { MoveRight, Settings, Calendar } from 'lucide-react';
import { Title } from './modules/landing/components/Title';
import CardLanding from './modules/landing/components/CardLanding';
import { SectionOne } from './modules/landing/components/SectionOne';
import { SectionTwo } from './modules/landing/components/SectionTwo';
import { SectionThree } from './modules/landing/components/SectionThree';
import { CardGroup } from './modules/landing/components/CardGroup';
import { SectionFour } from './modules/landing/components/SectionFour';
function App() {
	return (
		<GlobalLayout>
			<main className="flex justify-center items-center mt-20 flex-col bg-[#0D0D0D]">
				<SectionOne />
				<SectionTwo />
				<SectionThree />
				<CardGroup />
				<SectionFour />
			</main>
		</GlobalLayout>
	);
}

export default App;
