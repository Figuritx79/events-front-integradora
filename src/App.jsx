import { GlobalLayout } from './modules/landing/layouts/GlobalLayout';
import { SectionOne } from './modules/landing/components/SectionOne';
import { SectionTwo } from './modules/landing/components/SectionTwo';
import { SectionThree } from './modules/landing/components/SectionThree';
import { CardGroup } from './modules/landing/components/CardGroup';
import { SectionFour } from './modules/landing/components/SectionFour';
function App() {
	return (
		<GlobalLayout>
			<main className="flex justify-center items-center mt-20 flex-col text-text-50 bg-bg-50 dark:text-text-950 dark:bg-bg-950">
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
