import { Listbox, ListboxItem, ListboxSection, Tooltip } from '@heroui/react';
// import { useEffect } from 'react';

export const EventList = () => {
	// useEffect(() => {}, []);
	return (
		<div className="flex-1 min-h-0 overflow-hidden">
			{' '}
			{/* Espacio restante */}
			<div className="h-full overflow-y-auto px-2">
				<Listbox aria-label="Eventos" onAction={(key) => alert(key)} className="">
					<ListboxSection title="">
						{Array.from({ length: 30 }).map((_, index) => (
							<ListboxItem
								key={`item-${index}`} // Usa un key único para cada elemento
								className="text-sm"
								color="light"
								textValue=""
							>
								<Tooltip
									placement="top"
									delay={1000}
									radius="md"
									size="md"
									className="text-text-50 bg-bg-100 dark:text-text-950 dark:bg-bg-900 dark:dark"
									content={
										<div className="p-2 w-48">
											<div className="text-xs">
												Lorem Ipsum is simply dummy text of the printing and typesetting industry.
											</div>
										</div>
									}
								>
									<div className="flex items-center py-[2px]">
										<img src="/icon.svg" className="w-5 h-5" alt="Logo" />
										<p className="pl-2 line-clamp-1 break-words w-[185px] dark:text-text-50 text-text-950">
											Lorem Ipsum is simply dummy text of the printing and typesetting industry.
										</p>
									</div>
								</Tooltip>
							</ListboxItem>
						))}
					</ListboxSection>
				</Listbox>
			</div>
		</div>
	);
};
