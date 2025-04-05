import React, { useEffect, useState } from "react";
import {parseDate, getLocalTimeZone, parseZonedDateTime, now} from "@internationalized/date";
import { CircleUser, House, Users, MapPinned, ImageUp, ImagePlus, CircleArrowRight, CircleArrowLeft, Info, ImportIcon} from "lucide-react";
import {useDateFormatter} from "@react-aria/i18n";
import { NumberInput } from "@heroui/number-input";
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { addToast } from "@heroui/toast";
import { api } from "../../global/config/api";
import { useAuth } from '../../auth/providers/AuthProvider';
import {
    Button,
    Input,
    Image,
    Tabs,
    Tab, 
    DateRangePicker,
    Textarea
} from "@heroui/react";
import { Link } from "react-router";

export default function CreateEventStep1() {
    const { credentials } = useAuth();
    const [previewUrl, setPreviewUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { 
        register, 
        handleSubmit, 
        formState: { errors }, 
        setValue,
        watch
    } = useForm();

    const [rangeValue, setRangeValue] = useState({
        start: now(getLocalTimeZone()),
        end: now(getLocalTimeZone()).add({ days: 7 }) 
    });

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (!file.type.match('image/(jpeg|png)')) {
            console.error("Formato de archivo no válido");
            e.target.value = null;
            setPreviewUrl(null);
            setValue('frontPage', null); // Limpiar valor en el formulario
            return;
        }
    

        const objectUrl = URL.createObjectURL(file);
        setPreviewUrl(objectUrl);
        setValue('frontPage', file, { shouldValidate: true }); // Forzar validación
    };

    const onSubmit = async (data) => {
      const formData = new FormData();
      
      try {
        setLoading(true);
        const startDate = rangeValue.start.toDate(getLocalTimeZone()).toISOString();
        const endDate = rangeValue.end.toDate(getLocalTimeZone()).toISOString();
    
        // Validación mejorada
        if (!data.frontPage || !data.frontPage.type.match('image/(jpeg|png)')) {
          throw new Error("Imagen inválida o no seleccionada");
        }
    
        // Crear DTO con estructura que espera el backend
        const eventDto = {
            name: data.name,
            description: data.description,
            startDate: startDate,
            endDate: endDate,
            email: credentials.email
        };
    
        // Crear Blob con tipo correcto
        const dtoBlob = new Blob([JSON.stringify(eventDto)], {
          type: 'application/json'
        });
    
        formData.append('eventDto', dtoBlob);
        formData.append('frontPage', data.frontPage);
    
        // Verificar contenido del FormData
        console.log("Contenido de FormData:");
        formData.forEach((value, key) => console.log(key, value));
    
        const response = await api.post('/event/event', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
    
        if (response.data.success) {
          navigate('/next-step');
        }
    
      } catch (error) {
          // Mejorar mensaje de error
          const errorMessage = error.response?.data?.message || 
                              error.message || 
                              "Error al subir la imagen";
          
          addToast({
              color: "danger",
              icon: <Info strokeWidth={2} className="w-5 h-5"/>,
              title: "Error",
              description: errorMessage,
              timeout: 5000,
          });
      } finally {
          setLoading(false);
      }
  };

    const showToast = (addToast) => {
        addToast({
            color: "primary",
            icon: <Info strokeWidth={2} className="w-5 h-5"/>,
            title: "Etapa 1: Registrar información general",
            description: "Paso 1: Proporcione información general necesario para registrar su evento",
            timeout: 60000,
        });
    };  

    useEffect(() => {
        console.log("El componente se ha cargado");
        showToast(addToast);
    }, []);

    let formatter = useDateFormatter({ dateStyle: "long", timeStyle: "short", hour12: true });

    return (      
        <div className="h-full flex-1 lg:ml-12 xl:mx-20 py-6 flex flex-col text-text-50 bg-bg-50 dark:text-text-950 dark:bg-bg-950">
            <form onSubmit={handleSubmit(onSubmit)} className="flex-1 min-h-0 flex flex-col px-2">
                <div className="flex flex-col gap-4 pt-6">
                    <div className="flex justify-between gap-3 items-start">
                        <div>
                            <h1 className="text-4xl font-bold pb-2">Registrar evento</h1>
                            <p className="text-sm">Registrar información general del evento</p>
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
                
                <div className="flex-1 min-h-0 overflow-hidden mt-12 pb-6">
                    <div className="h-full overflow-y-auto">
                        <div className="grid grid-cols-1 mx-2">
                            <div>
                                <DateRangePicker
                                    hourCycle={12}
                                    key="inicio"
                                    className="pb-2 dark:dark"
                                    hideTimeZone
                                    showMonthAndYearPickers
                                    defaultValue={rangeValue}
                                    label="Duración del evento"
                                    labelPlacement="outside"
                                    variant="bordered"
                                    value={rangeValue}
                                    onChange={setRangeValue}
                                    isRequired
                                    granularity="minute" 
                                    calendarWidth={280} 
                                    aria-label="Seleccionar rango de fechas"
                                    classNames={{
                                        popoverContent: "text-text-50 bg-bg-50 dark:text-text-950 dark:bg-bg-950 dark:dark",
                                        calendar: "text-text-50 bg-bg-50 dark:text-text-950 dark:bg-bg-950 dark:dark",
                                        calendarContent: "text-text-50 bg-bg-50 dark:text-text-950 dark:bg-bg-950 dark:dark",
                                    }}
                                />

                                <p className="text-default-500 text-xs pb-4">
                                    Duración:{" "}
                                    {rangeValue ? formatter.formatRange(
                                        rangeValue.start.toDate(getLocalTimeZone()),
                                        rangeValue.end.toDate(getLocalTimeZone())
                                    ) : "--"}
                                </p>

                                <Input
                                    {...register('name', { required: 'El nombre es obligatorio' })}
                                    id="eventName"
                                    name="name"
                                    autoComplete="off"
                                    className="w-full pb-6"
                                    size="md"
                                    radius="md"
                                    variant="bordered"
                                    type="text"
                                    placeholder="Ingrese el nombre de su evento"
                                    label="Nombre"
                                    labelPlacement="outside"
                                    isRequired
                                    isClearable
                                    errorMessage={errors.name?.message}
                                />

                                <Textarea
                                    {...register('description', { required: 'La descripción es obligatoria' })}
                                    id="eventDescription"
                                    name="description"
                                    autoComplete="off"
                                    isClearable
                                    className="w-full pb-6"
                                    label="Descripción"
                                    placeholder="Descripción de tu evento"
                                    variant="bordered"
                                    labelPlacement="outside"
                                    isRequired
                                    errorMessage={errors.description?.message}
                                />
                            </div>
                            
                            <div className="flex justify-between items-start text-text-50 bg-bg-50 dark:text-text-950 dark:bg-bg-950">
                                <div className="grid grid-cols-3 gap-3">
                                    <div className="col-span-1">
                                        <Input
                                       //     {...register('frontPage', { required: 'La imagen es obligatoria' })}
                                            id="eventImage"
                                            name="frontPage"
                                            autoComplete="off"
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
                                            startContent={<ImageUp strokeWidth={2} className="w-5 h-5" />}
                                            onChange={handleFileChange}
            
                                        />
                                    </div>
                                    
                                    <div className="col-span-1 pl-9">
                                        {previewUrl && (
                                            <div className="">
                                                <div>
                                                    <p className="text-sm mb-2">Vista previa de la portada:</p>
                                                    <Image
                                                        src={previewUrl}
                                                        alt="Vista previa"
                                                        radius="md"
                                                        className="object-cover w-full h-36"
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    
                                    <div className="col-span-1 flex items-end justify-end space-x-3">
                                        <Button 
                                            as={Link}
                                            to="/AdminEvents/Events"
                                            size="md"
                                            radius="md"
                                            variant="light"
                                            color="default"
                                            startContent={<CircleArrowLeft strokeWidth={2} className="w-5 h-5"/>}
                                        >
                                            Regresar
                                        </Button> 
                                        <Button 
                                            type="submit"
                                            aria-label="Button registrar"
                                            className="font-bold"
                                            size="md"
                                            radius="md"
                                            variant="ghost"
                                            color="primary"
                                            isLoading={loading}
                                            startContent={!loading && <CircleArrowRight strokeWidth={2} className="w-5 h-5"/>}
                                        >
                                            {loading ? 'Creando evento...' : 'Continuar'}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}