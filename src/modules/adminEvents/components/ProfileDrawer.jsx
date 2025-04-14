import React, { useState, useEffect } from "react";
import { CircleArrowDown } from "lucide-react";
import { 
    Button, 
    Input, 
    Drawer, 
    DrawerContent,
    DrawerHeader, 
    DrawerBody, 
    DrawerFooter,
} from "@heroui/react";
import { ButtonX, ChangePassword, Logout, Spinner } from '../../global/components/Components';
import ProfileModal from "./ProfileModal";

const ProfileDrawer = ({
    data = {},
    isOpen,
    onOpenChange,
    onConfirm,
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleModalConfirm = () => {
        setIsModalOpen(false);
        onConfirm({ data: formData }); // Pasa los datos actualizados al padre
        onOpenChange(true); // Cierra el drawer después de confirmar
    };

    const [formData, setFormData] = useState({
        name: "",
        lastname: "",
        email: "",
        phone: "",
        companyName: ""
    });

    // Resetear datos al abrir/cerrar el drawer
    useEffect(() => {
        if (isOpen) {
            setFormData({
                name: data.name || "",
                lastname: data.lastname || "",
                email: data.email || "",
                phone: data.phone || "",
                companyName: data.companyName || ""
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
    };

    return (
        <>
        <Drawer 
            isDismissable={false}
            isKeyboardDismissDisabled={true}
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
                    <h1 className="text-4xl font-bold">Tu perfil</h1>
                    <div className="space-x-2">
                        <ChangePassword isIconO/>
                        <ButtonX onPress={handleClose}/>
                    </div>
                </DrawerHeader>

                <DrawerBody>
                    <div className="flex-col items-center justify-center">
                        <div className="text-sm font-semibold pb-6">
                            <p>Puede actualizar todos sus datos personales en cualquier momento.</p>
                        </div>
                        
                        <div className="flex space-x-6">
                            <Input
                                className="w-full py-3 pt-6"
                                size="md"
                                radius="md"
                                variant="bordered"
                                type="text"
                                placeholder={data.name}
                                label="Nombre"
                                value={formData.name}
                                onValueChange={(value) => handleInputChange('name', value)}
                                labelPlacement="outside"
                                isRequired
                                classNames={{ label: "font-bold" }}
                            />

                            <Input
                                className="w-full py-3 pt-6"
                                size="md"
                                radius="md"
                                variant="bordered"
                                type="text"
                                placeholder={data.lastname}
                                label="Apellido"
                                value={formData.lastname}
                                onValueChange={(value) => handleInputChange('lastname', value)}
                                labelPlacement="outside"
                                isRequired
                                classNames={{ label: "font-bold" }}
                            />
                        </div>

                        <Input
                            className="w-full py-3"
                            size="md"
                            radius="md"
                            variant="bordered"
                            type="email"
                            placeholder={data.email}
                            label="Correo electrónico"
                            value={formData.email}
                            onValueChange={(value) => handleInputChange('email', value)}
                            labelPlacement="outside"
                            isRequired
                            classNames={{ label: "font-bold" }}
                        />

                        <Input
                            className="w-full py-3"
                            size="md"
                            radius="md"
                            variant="bordered"
                            type="tel"
                            placeholder={data.phone}
                            label="Teléfono"
                            value={formData.phone}
                            onValueChange={(value) => handleInputChange('phone', value)}
                            labelPlacement="outside"
                            isRequired
                            classNames={{ label: "font-bold" }}
                        />

                        <Input
                            className="w-full py-3"
                            size="md"
                            radius="md"
                            variant="bordered"
                            type="text"
                            placeholder={data.companyName}
                            label="Nombre de la compañia"
                            value={formData.companyName}
                            onValueChange={(value) => handleInputChange('companyName', value)}
                            labelPlacement="outside"
                            isRequired
                            classNames={{ label: "font-bold" }}
                        />
                    </div>
                    <div className="pt-4">
                        <ChangePassword isIconO={false}/>
                    </div>
                </DrawerBody>

                <DrawerFooter>
                    <div className="flex justify-between w-full items-center gap-4">
                        <Logout isIconO={false} />
                        
                        <Button 
                            spinner={<Spinner/>}
                            fullWidth
                            color="secondary"
                            variant="bordered"
                            onPress={() => setIsModalOpen(true)}
                            className="font-bold"
                            startContent={<CircleArrowDown strokeWidth={2} className="w-5 h-5"/>}>
                            Actualizar
                        </Button>
                    </div>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>

        <ProfileModal
            isOpen={isModalOpen}
            onClose={handleModalConfirm}
            onConfirm={handleModalConfirm}
            isUpdateProfile={true}
            profileData={formData}
        />
        </>
    );
};

export default ProfileDrawer;