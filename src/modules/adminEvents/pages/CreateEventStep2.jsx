import React, { useEffect, useState } from "react";
import {parseDate, getLocalTimeZone, parseZonedDateTime, now} from "@internationalized/date";
import { CircleUser, House, Users, MapPinned, ImageUp, ImagePlus, CircleArrowRight, CircleArrowLeft, Info, X} from "lucide-react";
import {useDateFormatter} from "@react-aria/i18n";
import { NumberInput } from "@heroui/number-input";
import { addToast } from "@heroui/toast";
import {
  Button,
  Input,
  Tabs,
  Tab, 
  Image,
  Tooltip,
  DateRangePicker,
  DatePicker,
  Textarea
} from "@heroui/react";
import { Link } from "react-router";

export default function CreateEventStep2 () {
    const [previewUrl, setPreviewUrl] = useState(null);
  
    const handleLogoChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const fileType = file.type;
        if (!fileType.match('image/jpeg') && !fileType.match('image/png')) {
          // Mostrar error - formato no válido
          console.error("Formato de archivo no válido");
          e.target.value = null; // Limpiar la selección
          setPreviewUrl(null);
        } else {
          // Crear URL para previsualización
          const objectUrl = URL.createObjectURL(file);
          setPreviewUrl(objectUrl);
          
          // Opcional: Limpiar la URL cuando el componente se desmonte
          return () => URL.revokeObjectURL(objectUrl);
        }
      }
    };

  const [previewUrls, setPreviewUrls] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    
    // Verificar si ya tenemos 3 imágenes
    if (previewUrls.length + files.length > 3) {
      setErrorMessage("Solo puedes subir un máximo de 3 imágenes");
      return;
    }
    
    // Verificar tipos de archivo
    const validFiles = files.filter(file => 
      file.type.match('image/jpeg') || file.type.match('image/png')
    );
    
    if (validFiles.length !== files.length) {
      setErrorMessage("Solo se permiten archivos jpg, jpeg y png");
      return;
    }
    
    setErrorMessage("");
    
    // Crear URLs para previsualización
    const newPreviewUrls = validFiles.map(file => URL.createObjectURL(file));
    setPreviewUrls(prev => [...prev, ...newPreviewUrls]);
  };
  
  const removeImage = (index) => {
    setPreviewUrls(prev => {
      const newUrls = [...prev];
      // Revocar la URL para evitar fugas de memoria
      URL.revokeObjectURL(newUrls[index]);
      newUrls.splice(index, 1);
      return newUrls;
    });
  };

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
                  type="file"
                  className="w-full pb-6"
                  variant="bordered"
                  label="Subir imagen"
                  labelPlacement="outside"
                  size="md"
                  radius="md"
                  description="Formatos aceptados: jpg, jpeg, png"
                  accept=".jpg, .jpeg, .png, image/jpeg, image/png"
                  isRequired
                  classNames={{
                    input: "cursor-pointer file:text-text-50 file:bg-bg-50 dark:file:text-text-950 dark:file:bg-bg-950",
                    inputWrapper: "border-dashed",
                }}
                  startContent={
                    <ImageUp strokeWidth={2} className="w-5 h-5" />
                  }
                  onChange={handleLogoChange}
                />
                


                
                <Input
                  type="file"
                  className="w-full pb-6 pt-3"
                  variant="bordered"
                  label="Galería de imágenes (3)"
                  labelPlacement="outside"
                  size="md"
                  radius="md"
                  description={`Formatos aceptados: jpg, jpeg, png. ${previewUrls.length}/3 imágenes subidas`}
                  accept=".jpg, .jpeg, .png, image/jpeg, image/png"
                  isRequired
                  isDisabled={previewUrls.length >= 3}
                  isInvalid={!!errorMessage}
                  errorMessage={errorMessage}
                  multiple
                  classNames={{
                    input: "cursor-pointer file:text-text-50 file:bg-bg-50 dark:file:text-text-950 dark:file:bg-bg-950",
                    inputWrapper: "border-dashed",
                }}
                  startContent={
                    <ImageUp strokeWidth={2} className="w-5 h-5" />
                  }
                  onChange={handleFileChange}
                />
                <div className="flex space-x-10">
                {previewUrl && (
                        <div className="">
                          <div>
                          <p className="text-sm mb-2">Vista previa del logo:</p>
                          <Image
                            src={previewUrl}
                            alt="Vista previa"
                            radius="md"
                            className="object-cover w-full h-36"
                          />
                          </div>
                        </div>
                      )}
{previewUrls.length > 0 && (
        <div>
          <p className="text-sm mb-2">Vista previa de la galería:</p>
          <div className="flex space-x-3">
            {previewUrls.map((url, index) => (
              <div key={index} className="flex">
                <Image
                  src={url}
                  alt={`Vista previa ${index + 1}`}
                  radius="md"
                  className="object-cover w-full h-36"
                />
                  <Tooltip content="Eliminar" placement="top"  className="text-text-50 bg-bg-100 dark:text-text-950 dark:bg-bg-900 dark:dark">
                  <Button
                    isIconOnly
                    size="sm"
                    variant="light"
                    onPress={() => removeImage(index)}>
                    <X strokeWidth={2} className="w-5 h-5"/>
                  </Button>
                </Tooltip>
              </div>
            ))}
          </div>
        </div>
      )}
                </div>

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





