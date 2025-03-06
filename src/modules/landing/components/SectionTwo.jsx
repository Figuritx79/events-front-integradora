
import { Image } from "@heroui/react"
export const SectionTwo = () => {
    return (
        <section className="mt-10 flex justify-center items-center flex-row gap-80">
            <article className="">
                <h3 className="text-2xl text-[#F2F2F2] font-bold">
                    ¿Qué es{" "}
                    <span className="bg-gradient-to-r from-purple-500 to-cyan-700 text-transparent bg-clip-text">
                        UpEvent
                    </span>
                    ?
                </h3>
                <div className="text-white mt-4">
                    <p className="text-base">
                        UpEvent es una plataforma integral para la gestión y{" "}
                    </p>
                    <p className="text-base">
                        promoción de tu evento, sin objetos ocultos encontrarás{" "}
                    </p>
                    <p className="text-base">
                        todo lo que necesitas para administrar cada detalle,{" "}
                    </p>
                    <p className="text-base">
                        desde la planificación hasta la ejecución.
                    </p>
                </div>
            </article>
            <div>
                <Image
                    isBlurred
                    alt="imaga"
                    src="/landing-1.webp"
                    width={256}
                    isZoomed
                />
            </div>
        </section>
    )
}