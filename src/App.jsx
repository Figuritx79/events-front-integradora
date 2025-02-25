import { Button, Image } from "@heroui/react";
import { Logo } from "./modules/global/components/Logo";
import { GlobalLayout } from "./modules/global/layouts/GlobalLayout";
import { MoveRight, Settings, Calendar } from "lucide-react";
import { Title } from "./modules/global/components/Title";
import CardLanding from "./modules/global/components/CardLanding";
function App() {
  return (
    <GlobalLayout>
      <main className="flex justify-center items-center mt-20 flex-col">
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
        <section className="flex justify-center items-center mt-10">
          <article className="flex justify-center items-center flex-col">
            <h3 className="text-2xl text-[#F2F2F2] font-bold">
              ¿Cómo empiezo?
            </h3>
            <div className="flex justify-center items-center flex-col mt-4">
              <p className="text-base font-normal text-[#F2F2F2]">
                ¡Muy fácil! primero debes crear tu cuenta en nuestra plataforma,
                luego puedes
              </p>
              <p className="text-base font-normal text-[#F2F2F2]">
                recorrerla a voluntad para conocer todas las funciones
                disponibles.
              </p>
            </div>
          </article>
        </section>
        <div className="flex flex-col md:flex-row md:gap-x-16  gap-y-16 justify-center items-center m-10 ">
          <CardLanding>
            <Calendar color="#26A9D9" className="m-4" />
            <h4 className="text-[#F2F2F2] font-bold m-4">Crea tu Evento</h4>
            <p className="m-4 font-normal text-[#F2F2F2] text-xs">
              Configura los detalles básicos de tu evento en minutos.
            </p>
          </CardLanding>

          <CardLanding>
            <Settings color="#26A9D9" className="m-2" />
            <h4 className="m-4 text-[#F2F2F2] font-bold">Personaliza</h4>
            <p className="m-4 font-normal text-[#F2F2F2] text-xs">
              Ajusta cada aspecto según tus necesidades específicas.
            </p>
          </CardLanding>

          <CardLanding>
            <Settings color="#26A9D9" className="m-2" />
            <h4 className="m-4 text-[#F2F2F2] font-bold">
              Gestiona Asistentes
            </h4>
            <p className="m-4 font-normal text-[#F2F2F2] text-xs">
              Administra registros y comunicaciones fácilmente.
            </p>
          </CardLanding>
        </div>
      </main>
    </GlobalLayout>
  );
}

export default App;
