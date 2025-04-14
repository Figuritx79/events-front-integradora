import React, { useState, useEffect } from "react";
import { CalendarCheck2, CalendarCog, CalendarArrowUp, CalendarX2, ImageUp } from "lucide-react";
import { 
    Button, 
    Input, 
    Drawer, 
    DrawerContent,
    DrawerHeader, 
    DrawerBody, 
    DrawerFooter,
    Image,
    Textarea,
    TimeInput
} from "@heroui/react";
import { NumberInput } from "@heroui/number-input";
import WorkshopModal from "./WorkshopModal"
import { ButtonX, Spinner } from '../../global/components/Components';

const WorkshopDrawer = ({
    action = "create",
    data = {},
    isOpen,
    onOpenChange,
    onConfirm,
}) => {
    const [previewUrl, setPreviewUrl] = useState(null);
    const [selectedImageFile, setSelectedImageFile] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalAction, setModalAction] = useState(action); // Usamos la prop action como valor inicial
    const [formData, setFormData] = useState({
        name: "",
        speakerName: "", // Cambiar a campo directo
        capacity: 1,
        description: "",
        hour: "",   
        event: sessionStorage.getItem('event') // Añadir evento aquí
    });

    const handleModalConfirm = (confirmed) => {
        setIsModalOpen(false);
        if (confirmed) {
            onConfirm({ action: modalAction, data: formData });
            onOpenChange(false); // Cerrar el drawer después de confirmar
        }
    };

    const handleOpenModal = (actionType) => {
        setModalAction(actionType);
        setIsModalOpen(true);
    };

    // Resetear datos al abrir/cerrar el drawer
    useEffect(() => {
        if (isOpen) {
            setFormData({
                name: data.name || "",
                speakerName: data.speakerInfo?.speakerName || "", // Extraer nombre del ponente
                capacity: data.capacity || "",
                description: data.description || "",
                hour: data.hour || "",
                event: data.event || sessionStorage.getItem('event')
            });
            setPreviewUrl(data.image || null); // Previsualizar imagen existente
            setSelectedImageFile(null); // Resetear archivo al abrir
        }
    }, [isOpen, data]);

    useEffect(() => {
        return () => {
            if (previewUrl) URL.revokeObjectURL(previewUrl);
        };
    }, [previewUrl]);

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleClose = () => {
        onOpenChange(false);
        setFormData({
            name: data.name || "",
            speakerInfo: {speakerName: data.speakerName || ""},
            capacity: data.capacity || "",
            description: data.description || "",
            hour: data.hour || "",
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const fileType = file.type;
            if (!fileType.match('image/jpeg') && !fileType.match('image/png')) {
                console.error("Formato de archivo no válido");
                e.target.value = null;
                setPreviewUrl(null);
                setSelectedImageFile(null);
            } else {
                const objectUrl = URL.createObjectURL(file);
                setPreviewUrl(objectUrl);
                setSelectedImageFile(file); // Guardar archivo
            }
        }
    };

    const actionConfig = {
        create: {
            title: "Registrar taller",
            description: "Puede agregar nuevos talleres en cualquier momento.",
            icon: <CalendarArrowUp strokeWidth={2} className="w-5 h-5" />,
            buttonLabel: "Registrar",
            placeholders: {
                name: "Ingresa su nombre",
                hour: "Ingresa la hora",
                speakerName: "Ingresa el nombre del ponente",
                capacity: "Ingresa su capacidad",
                description: "Ingresa su descripción",
            }
        },
        update: {
            title: "Actualizar taller",
            description: "Puede modificar todos los talleres existentes de la tabla.",
            icon: <CalendarCog strokeWidth={2} className="w-5 h-5" />,
            buttonLabel: "Actualizar",
            placeholders: {
                name: data.name || "Nombre actual",
                speakerName: data.speakerInfo?.speakerName || "Ponente actual",                capacity: data.capacity || "Capacidad actual",
                description: data.description || "Descripción actual",
                hour: data.hour || "Hora",
                //image: data.image || "Imagen actual",
            }
        },
        read: {
            title: "Detalles del taller",
            description: "Puede ver todos los detalles de sus talleres almacenados en cualquier momento.",
            placeholders: {}
        }
    };

    const { title: actionTitle, description, icon, buttonLabel, placeholders } = actionConfig[action];

    return (
        <>
        <Drawer 
            isOpen={isOpen} 
            onOpenChange={onOpenChange} 
            size="sm" 
            backdrop="opaque" 
            placement="right" 
            hideCloseButton
            className="text-text-50 bg-bg-50 dark:dark dark:text-text-950 dark:bg-bg-950"
            motionProps={{ 
                variants: {
                    enter: {
                        x: 0,
                        opacity: 1,
                        transition: {
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 }
                        }
                    },
                    exit: {
                        x: 100,
                        opacity: 0,
                        transition: {
                            duration: 0.3,
                            ease: "easeIn"
                        }
                    }
                }
            }}>
            <DrawerContent>
                <DrawerHeader className="place-content-between pt-10 pb-6 text-4xl">
                    <h1 className="text-4xl font-bold">{actionTitle}</h1>
                    <ButtonX onPress={handleClose}/>
                </DrawerHeader>

                <DrawerBody>
                    <div className="flex-col items-center justify-center">
                        <div className="text-sm font-semibold pb-6">
                            <p>{description}</p>
                        </div>

                        <Input
                            className="w-full py-3 pt-6"
                            size="md"
                            radius="md"
                            variant="bordered"
                            type="text"
                            placeholder={placeholders.name}
                            label="Nombre"
                            value={formData.name}
                            isReadOnly={action === 'read'}
                            onValueChange={(value) => handleInputChange('name', value)}
                            labelPlacement="outside"
                            classNames={{ label: "font-bold" }}
                            isRequired={action !== 'read'}
                        />

                        <Input
                            className="w-full py-3"
                            size="md"
                            radius="md"
                            variant="bordered"
                            type="text"
                            placeholder={placeholders.speakerName}
                            label="Ponente"
                            value={formData.speakerName} // Usar campo directo
                            onValueChange={(value) => handleInputChange('speakerName', value)}
                            isReadOnly={action === 'read'}
                            labelPlacement="outside"
                            classNames={{ label: "font-bold" }}
                            isRequired={action !== 'read'}
                        />

                        <NumberInput
                            className="py-3"
                            fullWidth
                            size="md"
                            radius="md"
                            variant="bordered"
                            placeholder={placeholders.capacity}
                            label="capacidad"
                            value={formData.capacity}
                            isReadOnly={action === 'read'}
                            onValueChange={(value) => handleInputChange('capacity', value)}
                            labelPlacement="outside"
                            classNames={{ label: "font-bold" }}
                            isRequired={action !== 'read'}
                            minValue={1}
                        />

                        <Input 
                            className="w-full py-3"
                            size="md"
                            radius="md"
                            variant="bordered"
                            placeholder={placeholders.hour}
                            label="Hora"
                            value={formData.hour}
                            isReadOnly={action === 'read'}
                            onValueChange={(value) => handleInputChange('hour', value)}
                            labelPlacement="outside"
                            classNames={{ label: "font-bold" }}
                            isRequired={action !== 'read'}
                        />

                        <Textarea
                            isClearable
                            className="w-full py-3"
                            size="md"
                            radius="md"
                            variant="bordered"
                            type="text"
                            placeholder={placeholders.description}
                            label="Descripción"
                            value={formData.description}
                            isReadOnly={action === 'read'}
                            onValueChange={(value) => handleInputChange('description', value)}
                            labelPlacement="outside"
                            classNames={{ label: "font-bold" }}
                            isRequired={action !== 'read'}
                        />

                        <Input
                            className="w-full pb-6  pt-3"
                            accept=".jpg, .jpeg, .png, image/jpeg, image/png"
                            size="md"
                            radius="md"
                            variant="bordered"
                            type="file"
                            description="Formatos aceptados: jpg, jpeg, png"
                            label="Imagen del taller"
                            onChange={handleFileChange}
                            isReadOnly={action === 'read'}
                            //onValueChange={(value) => handleInputChange('image', value)}
                            labelPlacement="outside"
                            isRequired={action !== 'read'}
                            classNames={{
                                label: "font-bold",
                                input: "cursor-pointer file:text-text-50 file:bg-bg-50 dark:file:text-text-950 dark:file:bg-bg-950",
                                inputWrapper: "border-dashed",
                            }}
                            startContent={
                                <ImageUp strokeWidth={2} className="w-5 h-5" />
                            }
                        />
                        {previewUrl && (
                            <div className="pb-6">
                                <p className="text-sm mb-2 font-bold">Vista previa:</p>
                                <Image
                                    src={previewUrl}
                                    alt="Vista previa"
                                    width={320}
                                    height={200}
                                    radius="md"
                                    className="object-cover"
                                />
                            </div>
                        )}
                    </div>
                </DrawerBody>

                <DrawerFooter>
                    <div className="flex justify-between w-full items-center gap-4">
                        {action !== 'create' && (
                            <Button 
                                className="font-bold"
                                fullWidth
                                variant="bordered"
                                color={data.status === "activo" ? "danger" : "success"}
                                onPress={() => handleOpenModal("status")}
                                startContent={data.status === "activo" ? 
                                    <CalendarX2 strokeWidth={2} className="w-5 h-5"/> 
                                    : <CalendarCheck2 strokeWidth={2} className="w-5 h-5"/>
                                }>
                                {data.status === "activo" ? "Inhabilitar" : "Habilitar"}
                            </Button>
                        )}
                        {action !== 'read' && (
                            <Button 
                                spinner={<Spinner/>}
                                fullWidth
                                color="secondary"
                                variant="bordered"
                                onPress={() => handleOpenModal(action)}
                                className="font-bold"
                                startContent={icon}>
                                {buttonLabel}
                            </Button>
                        )}
                    </div>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>

        <WorkshopModal
            isOpen={isModalOpen}
            onClose={() => handleModalConfirm(false)}
            onConfirm={() => handleModalConfirm(true)}
            action={modalAction}
            data={formData}
            status={data.status === "activo"}
            workshopImage={selectedImageFile}
        />
        
        </>
    );
};

export default WorkshopDrawer;