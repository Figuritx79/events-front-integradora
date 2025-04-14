import React, { useState, useEffect } from "react";
import { UserCheck, UserPen, UserPlus, UserX } from "lucide-react";
import { 
    Button, 
    Input, 
    Drawer, 
    DrawerContent,
    DrawerHeader, 
    DrawerBody, 
    DrawerFooter,
} from "@heroui/react";
import CheckersModal from "./CheckersModal"
import { ButtonX, Spinner } from '../../global/components/Components';

const CheckersDrawer = ({
    action = "create",
    data = {},
    isOpen,
    onOpenChange,
    onConfirm,
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalAction, setModalAction] = useState(action); // Usamos la prop action como valor inicial
    const [formData, setFormData] = useState({
        name: "",
        lastname: "",
        email: "",
        phone: "",
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
                lastname: data.lastname || "",
                email: data.email || "",
                phone: data.phone || "",
            });
        }
    }, [isOpen, data]);

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
            lastname: data.lastname || "",
            email: data.email || "",
            phone: data.phone || ""
        });
    };

    const actionConfig = {
        create: {
            title: "Registrar checador",
            description: "Puede agregar nuevos checadores en cualquier momento.",
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
            description: "Puede modificar todos los checadores existentes de la tabla.",
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
            description: "Puede ver todos los detalles de sus checadores almacenados en cualquier momento.",
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
                            placeholder={placeholders.lastname}
                            label="Apellido"
                            value={formData.lastname}
                            isReadOnly={action === 'read'}
                            onValueChange={(value) => handleInputChange('lastname', value)}
                            labelPlacement="outside"
                            classNames={{ label: "font-bold" }}
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
                            classNames={{ label: "font-bold" }}
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
                            classNames={{ label: "font-bold" }}
                            isRequired={action !== 'read'}
                        />
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
                                    <UserX strokeWidth={2} className="w-5 h-5"/> 
                                    : <UserCheck strokeWidth={2} className="w-5 h-5"/>
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

        <CheckersModal
            isOpen={isModalOpen}
            onClose={() => handleModalConfirm(false)}
            onConfirm={() => handleModalConfirm(true)}
            action={modalAction}
            data={formData}
            status={data.status === "activo"}
            email={data.email}
        />
        
        </>
    );
};

export default CheckersDrawer;