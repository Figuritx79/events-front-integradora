import React, { useEffect } from "react";
import {parseDate, getLocalTimeZone, parseZonedDateTime, now} from "@internationalized/date";
import { CircleUser, House, Users, MapPinned, ImageUp, ImagePlus, CircleArrowRight, CircleArrowLeft, Info} from "lucide-react";
import {useDateFormatter} from "@react-aria/i18n";
import { NumberInput } from "@heroui/number-input";
import { addToast } from "@heroui/toast";
import {
    Button,
    Input,
    Tabs,
    Tab, 
    DateRangePicker,
    DatePicker,
    Textarea
} from "@heroui/react";
import { Link } from "react-router";

export default function CreateEventStep2 () {
  const showToast = (addToast) => {
    addToast({
        color: "primary",
        icon: <Info strokeWidth={2} className="w-5 h-5"/>,
        title: "Etapa 1: Registrar Información general",
        description: "Paso 2: Proporcione imagenes de su evento",
        timeout: 60000,
    });
};  

  useEffect(() => {
    // Tu código aquí se ejecutará después del montaje del componente
    console.log("El componente se ha cargado");
    showToast(addToast);
  }, []); 

    const [rangeValue, setRangeValue] = React.useState({
        start: now(getLocalTimeZone()),
        end: now(getLocalTimeZone()).add({ days: 7 }) 
      });
      
      let formatter = useDateFormatter({dateStyle: "long", timeStyle: "short", hour12: true});
      
  return (
        <>        
      <div className="h-full flex-1 lg:ml-12 xl:mx-20 py-6 flex flex-col text-text-50 bg-bg-50 dark:text-text-950 dark:bg-bg-950">
      <div className="flex-1 min-h-0 flex flex-col px-2">
          {/* Encabezado */}
          <div className="flex flex-col gap-4 pt-6">
            <div className="flex justify-between gap-3 items-start">
              <div>
                <h1 className="text-4xl font-bold pb-2">Registrar evento</h1>
                <p className="text-sm">Registrar imágenes del evento</p>
              </div>
              <div>
                <Tabs key="md" aria-label="Tabs sizes" size="sm" radius="md" variant="bordered">
                <Tab key="evento" title="Evento" />
                <Tab key="checadores" title="Checadores" />
                <Tab key="talleres" title="Talleres" />
              </Tabs>
              </div>
              
            </div>
          </div>
          <div className="flex-1 min-h-0 overflow-hidden mt-12 pb-6 "> {/* Espacio restante */}
          <div className="h-full overflow-y-auto">
            <div className="grid grid-cols-1 mx-2">
              {/* Columna izquierda */}
              <div>
              <Input
              className="pb-6"
                size="md"
                radius="md"
                variant="bordered"
                type="file"
                label="Imagen del logo"
                labelPlacement="outside"
                isRequired
                classNames={{
                    input: "cursor-pointer file:text-text-50 file:bg-bg-50 dark:file:text-text-950 dark:file:bg-bg-950",
                    inputWrapper: "border-dashed",
                }}
                startContent={
                    <ImageUp strokeWidth={2} className="w-5 h-5"/>
                }
                />
                <p className="pb-6 font-bold">Galería de imágenes</p>
                <Input
                className="pb-6"
                size="md"
                radius="md"
                variant="bordered"
                type="file"
                label="Imagen 1"
                labelPlacement="outside"
                isRequired
                classNames={{
                    input: "cursor-pointer file:text-text-50 file:bg-bg-50 dark:file:text-text-950 dark:file:bg-bg-950",
                    inputWrapper: "border-dashed",
                }}
                startContent={
                    <ImagePlus strokeWidth={2} className="w-5 h-5"/>
                }
                />

                <Input
                className="pb-6"
                size="md"
                radius="md"
                variant="bordered"
                type="file"
                label="Imagen 2"
                labelPlacement="outside"
                isRequired
                classNames={{
                    input: "cursor-pointer file:text-text-50 file:bg-bg-50 dark:file:text-text-950 dark:file:bg-bg-950",
                    inputWrapper: "border-dashed",
                }}
                startContent={
                    <ImagePlus strokeWidth={2} className="w-5 h-5"/>
                }
                />

              <Input
                className="pb-6"
                size="md"
                radius="md"
                variant="bordered"
                type="file"
                label="Imagen 3"
                labelPlacement="outside"
                isRequired
                classNames={{
                    input: "cursor-pointer file:text-text-50 file:bg-bg-50 dark:file:text-text-950 dark:file:bg-bg-950",
                    inputWrapper: "border-dashed",
                }}
                startContent={
                    <ImagePlus strokeWidth={2} className="w-5 h-5"/>
                }
                />
              </div>
              
              <div className="flex space-x-3 justify-end items-start text-text-50 bg-bg-50 dark:text-text-950 dark:bg-bg-950 pt-6">
              <Button 
                  as={Link}
                   to="/AdminEvents/CreateEvent"
                  className="font-bold"
                  size="md"
                  radius="md"
                  variant="light"
                  color="primary"
                    startContent={<CircleArrowLeft strokeWidth={2} className="w-5 h-5"/>}>
                    
                    Regresar
                  </Button> 
              <Button 
              as={Link}
              to="/AdminEvents/CreateEvent/Checkers"
              className="font-bold text-text-950 bg-primario-500 dark:text-text-50"
                    size="md"
                    radius="md"
                    variant="solid"
                    startContent={<CircleArrowRight strokeWidth={2} className="w-5 h-5"/>}>
                    Continuar
                  </Button>
              </div>
          </div>
          </div>
          </div>
        </div>
      </div>
    </>
  ); 

}





