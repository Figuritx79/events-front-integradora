const BackgroundLines = () => {
	return (
		<div className="z-0 flex flex-col gap-4 pt-48 relative">
			{' '}
			{/* Añadido relative */}
			<div className="h-[36px] bg-gradient-to-tr from-[#004E66] to-[#33CFFF]"></div>
			<div className="h-[36px] bg-gradient-to-tr from-[#FF33FF] to-[#660066]"></div>
			<div className="h-[36px] bg-gradient-to-tr from-[#660066] to-[#FF33FF]"></div>
		</div>
	);
};

export { BackgroundLines };
