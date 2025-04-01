import React, { useState, useEffect } from "react";
import { X, UserPlus, UserPen, UserX, UserCheck } from "lucide-react";
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
        lastname: "",
        email: "",
        phone: "",
    });

    // Resetear datos al abrir/cerrar el drawer
    useEffect(() => {
        if (isOpen) {
            setFormData({
                name: data.name || "",
                lastname: data.lastname || "",
                email: data.email || "",
                phone: data.phone || ""
            });
        }
    }, [isOpen, data.name, data.lastname, data.email, data.phone]);

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
            lastname: data.lastname || "",
            email: data.email || "",
            phone: data.phone || ""
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
            icon: <UserPlus strokeWidth={2} className="w-5 h-5" />,
            buttonLabel: "Registrar",
            placeholders: {
                name: "Ingresa su nombre",
                lastname: "Ingresa su apellido",
                email: "Ingresa su correo electrónico",
                phone: "Ingresa su teléfono"
            }
        },
        update: {
            title: "Actualizar checador",
            icon: <UserPen strokeWidth={2} className="w-5 h-5" />,
            buttonLabel: "Actualizar",
            placeholders: {
                name: data.name || "Nombre actual",
                lastname: data.lastname || "Apellido actual",
                email: data.email || "Correo actual",
                phone: data.phone || "Teléfono actual"
            }
        },
        read: {
            title: "Detalles del checador",
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
                            type="text"
                            placeholder={placeholders.lastname}
                            label="Apellido"
                            value={formData.lastname}
                            isReadOnly={action === 'read'}
                            onValueChange={(value) => handleInputChange('lastname', value)}
                            labelPlacement="outside"
                            isRequired={action !== 'read'}
                        />

                        <Input
                            className="w-full py-3"
                            size="md"
                            radius="md"
                            variant="bordered"
                            type="email"
                            placeholder={placeholders.email}
                            label="Correo electrónico"
                            value={formData.email}
                            isReadOnly={action === 'read'}
                            onValueChange={(value) => handleInputChange('email', value)}
                            labelPlacement="outside"
                            isRequired={action !== 'read'}
                        />

                        <Input
                            className="w-full py-3"
                            size="md"
                            radius="md"
                            variant="bordered"
                            type="tel"
                            placeholder={placeholders.phone}
                            label="Teléfono"
                            value={formData.phone}
                            isReadOnly={action === 'read'}
                            onValueChange={(value) => handleInputChange('phone', value)}
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
                                <UserX strokeWidth={2} className="w-5 h-5"/> 
                                : <UserCheck strokeWidth={2} className="w-5 h-5"/>
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