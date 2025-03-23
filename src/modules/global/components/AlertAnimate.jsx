import { motion } from 'framer-motion';
import { Alert } from '@heroui/react';
import React from 'react';
const AlertAnimate = ({ title, description, icon, color, positon }) => {
	const [isVisible, setIsVisble] = React.useState(true);
	return (
		<motion.div
			initial={{ opacity: 0, scale: 0 }}
			animate={{ opacity: 1, scale: 1 }}
			transition={{
				duration: 0.4,
				scale: { type: 'spring', visualDuration: 0.4, bounce: 0.5 },
			}}
			className={positon}
		>
			<Alert
				color={color}
				description={description}
				title={title}
				variant="faded"
				isVisible={isVisible}
				onClose={() => setIsVisble(false)}
				icon={icon}
			/>
		</motion.div>
	);
};
export { AlertAnimate };
