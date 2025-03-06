import { Title } from "./Title"
import { Button } from "@heroui/react"
import { MoveRight } from "lucide-react"
export const SectionOne = () => {
    return (
        <section>
            <article>
                <Title text={"Organiza Eventos con Facilidad"} />
            </article>
            <div className="text-base mt-6 flex justify-center items-center flex-col text-[#F2F2F2]">
                <p>
                    Optimiza tu gestión de eventos con nuestras soluciones avanzadas.
                </p>
                <p>
                    Desde la planificación hasta la ejecución, ofrecemos herramientas{" "}
                </p>
                <p>intuitivas que hacen que cada evento sea un éxito.</p>
            </div>
            <div className="flex justify-center items-center mt-6">
                <Button
                    endContent={<MoveRight />}
                    className="bg-[#FF00FF] text-base font-bold shadow-lg shadow-[#FF00FF]/40 text-[#F2F2F2] "
                >
                    Empieza Ya
                </Button>
            </div>
        </section>
    )
}