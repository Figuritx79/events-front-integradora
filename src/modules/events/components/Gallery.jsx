import React, { useEffect } from 'react';
export const Gallery = ({ gallery }) => {
	const [galleryJson, setGalleryJson] = React.useState({
		image1: '',
		image2: '',
		image3: '',
	});

	useEffect(() => {
		if (!gallery || gallery === null) {
			setGalleryJson({
				image1: 'https://cataas.com/cat/gif',
				image2: 'https://cataas.com/cat/orange,cute',
				image3: 'https://cataas.com/cat/cute/says/hello',
			});
		}
		const { gallery1, gallery2, gallery3 } = gallery;

		setGalleryJson({
			image1: gallery1,
			image2: gallery2,
			image3: gallery3,
		});
	}, [gallery]);

	return (
		<section className="py-8 ">
			<div className="container mx-auto px-4 flex flex-row justify-between items-center relative">
				<div className="z-10 px-12 lg:px-24">
					<img
						src={galleryJson.image1}
						alt=""
						className="w-96 h-80 rounded-xl grayscale hover:grayscale-0 ease-in-out duration-300	"
					/>
				</div>
				<div className="scale-125 absolute z-20 lg:mt-52 lg:ml-[390px]">
					<img
						src={galleryJson.image2}
						alt=""
						className="w-80 h-60 rounded-xl hover:grayscale ease-in-out duration-300"
					/>
				</div>
				<div className="z-10 px-12 lg:px-24">
					<img
						src={galleryJson.image3}
						alt=""
						className="w-96 h-80 rounded-xl grayscale hover:grayscale-0 ease-in-out duration-300"
					/>
				</div>
			</div>
		</section>
	);
};
