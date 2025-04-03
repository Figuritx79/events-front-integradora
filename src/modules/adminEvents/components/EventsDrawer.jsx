import React, { useState, useEffect } from "react";
import { X, CirclePlus, Pen, CircleX, CircleCheck } from "lucide-react";
import { 
    Button, 
    Input, 
    Tooltip, 
    Drawer, 
    DrawerContent,
    DrawerHeader, 
    DrawerBody, 
    DrawerFooter
} from "@heroui/react";
import CheckersModal from "./CheckersModal"

const CheckersDrawer = ({
    action = "create",
    data = {},
    isOpen,
    onOpenChange,
    onConfirm,
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleModalConfirm = () => {
        setIsModalOpen(false);
        if(action === "read"){
            handleClose();
        }
    };

    const [formData, setFormData] = useState({
        name: "",
        endDate: "",
        startDate: "",
    });

    // Resetear datos al abrir/cerrar el drawer
    useEffect(() => {
        if (isOpen) {
            setFormData({
                name: data.name || "",
                endDate: data.endDate || "",
                startDate: data.startDate || "",
            });
        }
    }, [isOpen, data.name, data.endDate, data.startDate]);

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleClose = () => {
        onOpenChange(false);
        // Resetear a los valores originales
        setFormData({
            name: data.name || "",
            endDate: data.endDate || "",
            startDate: data.startDate || "",
        });
    };

    const handleSubmit = () => {
        onConfirm({
            action,
            data: formData
        });
        handleClose();
    };

    const actionConfig = {
        create: {
            title: "Registrar checador",
            icon: <CirclePlus strokeWidth={2} className="w-5 h-5" />,
            buttonLabel: "Registrar",
            placeholders: {
                name: "Ingresa su nombre",
                endDate: "Ingresa su apellido",
                startDate: "Ingresa su correo electrónico",
                phone: "Ingresa su teléfono"
            }
        },
        update: {
            title: "Actualizar evento",
            icon: <Pen strokeWidth={2} className="w-5 h-5" />,
            buttonLabel: "Actualizar",
            placeholders: {
                name: data.name || "Nombre actual",
                endDate: data.endDate || "Apellido actual",
                startDate: data.startDate || "Correo actual",
                phone: data.phone || "Teléfono actual"
            }
        },
        read: {
            title: "Detalles del evento",
            placeholders: {}
        }
    };

    const { title: actionTitle, icon, buttonLabel, placeholders } = actionConfig[action];

    return (
        <>
        <Drawer 
            isOpen={isOpen} 
            onOpenChange={onOpenChange} 
            size="sm" 
            backdrop="opaque" 
            placement="right" 
            hideCloseButton
            className="text-text-50 bg-bg-50 capitalize dark:dark dark:text-text-950 dark:bg-bg-950"
            motionProps={{ 
                variants: {
                    enter: { opacity: 1, x: 0, duration: 0.3 },
                    exit: { opacity: 0, x: 100, duration: 0.3 },
                },
            }}>
            <DrawerContent>
                <DrawerHeader className="place-content-between pt-10 pb-6 text-4xl">
                    <h1 className="text-4xl font-bold">{actionTitle}</h1>
                    <Tooltip 
                        content="Cerrar" 
                        placement="left" 
                        className="text-text-50 bg-bg-100 dark:text-text-950 dark:bg-bg-900 dark:dark">
                        <Button
                            isIconOnly
                            size="sm"
                            variant="light"
                            onPress={handleClose}>
                            <X strokeWidth={2} className="w-5 h-5"/>
                        </Button>
                    </Tooltip>
                </DrawerHeader>

                <DrawerBody>
                    <div className="flex-col items-center justify-center">
                        <Input
                            className="w-full pb-3"
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
                            isRequired={action !== 'read'}
                        />
                        
                        <Input
                            className="w-full py-3"
                            size="md"
                            radius="md"
                            variant="bordered"
                            type="startDate"
                            placeholder={placeholders.startDate}
                            label="Fecha inicial"
                            value={formData.startDate}
                            isReadOnly={action === 'read'}
                            onValueChange={(value) => handleInputChange('startDate', value)}
                            labelPlacement="outside"
                            isRequired={action !== 'read'}
                        />

                        <Input
                            className="w-full py-3"
                            size="md"
                            radius="md"
                            variant="bordered"
                            type="text"
                            placeholder={placeholders.endDate}
                            label="Fecha final"
                            value={formData.endDate}
                            isReadOnly={action === 'read'}
                            onValueChange={(value) => handleInputChange('endDate', value)}
                            labelPlacement="outside"
                            isRequired={action !== 'read'}
                        />
                    </div>
                </DrawerBody>

                <DrawerFooter>
                    <div className="flex justify-between w-full items-center gap-4">
                    {action !== 'create' && (
                        <Button 
                            fullWidth
                            variant="bordered"
                            color={data.status === "activo" ? "danger" : "success"}
                            onPress={() => setIsModalOpen(true)}
                            startContent={ data.status  === "activo" ? 
                                <CircleX strokeWidth={2} className="w-5 h-5"/> 
                                : <CircleCheck strokeWidth={2} className="w-5 h-5"/>
                            }>
                            { data.status === "activo" ? "Inhabilitar" : "Habilitar"}
                        </Button>
                    )}
                    {action !== 'read' && (
                        <Button 
                            fullWidth
                            color="secondary"
                            variant="ghost"
                            onPress={handleSubmit}
                            className="font-bold"
                            startContent={icon}>
                            {buttonLabel}
                        </Button>
                    )}
                    </div>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>

        <CheckersModal
            isOpen={isModalOpen}
            onClose={handleModalConfirm}
            onConfirm={handleModalConfirm}
            isEnabled={data.status === "activo"}
            data={data}
        />
        </>
    );
};

export default CheckersDrawer;