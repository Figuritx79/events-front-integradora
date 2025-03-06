import { Image } from "@heroui/react"
// Faltan imagens para la galeria por favor crearlas 
export const SectionFour = () => {
    return (
        <section className="mt-10 flex justify-center items-center flex-row gap-60">
            <article className="">
                <h3 className="text-2xl text-[#F2F2F2] font-bold">
                    <span className="bg-gradient-to-r from-purple-500 to-cyan-700 text-transparent bg-clip-text">
                        UpEvent
                    </span>
                    {" "}para administradores
                </h3>
                <div className="text-white mt-4">
                    <p className="text-base">
                        UpEvent también te ayuda a dar a conocer tus eventos, además{" "}
                    </p>
                    <p className="text-base">
                        contamos  con una amplia gama de herramientas de{" "}
                    </p>
                    <p className="text-base">
                        administración que te permitirán  tener el control total de tu {" "}
                    </p>
                    <p className="text-base">
                        evento.
                    </p>
                </div>
            </article>
            <div className="md:grid-cols-2 md:grid-rows-2 gap-2 grid">

                <Image
                    alt="imaga"
                    src="/landing-1.webp"
                    width={190}
                    isZoomed
                />
                <Image
                    alt="imaga"
                    src="/landing-1.webp"
                    width={190}
                    isZoomed
                />

                <Image
                    alt="imaga"
                    src="/landing-1.webp"
                    width={190}
                    isZoomed
                />
                <Image
                    alt="imaga"
                    src="/landing-1.webp"
                    width={190}
                    isZoomed
                />
            </div>
        </section>
    )
}