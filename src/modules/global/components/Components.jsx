import React, { useState, useEffect } from "react";
import { Eye, EyeClosed, KeyRound, LogOut, X, User } from "lucide-react";
import { useAuth } from "../../auth/providers/AuthProvider";
import { 
    Button, 
    Tooltip, 
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure,
    useDraggable, 
    Drawer, 
    DrawerContent,
    DrawerHeader, 
    DrawerBody, 
    DrawerFooter,
    Input,
    Divider
} from "@heroui/react";
import ProfileModal from "../../adminEvents/components/ProfileModal";

export const Spinner = () => {{
    return (
        <svg
			className="animate-spin h-5 w-5 text-current"
			fill="none"
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
            >
			<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
			<path
				className="opacity-75"
				d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
				fill="currentColor"
			/>
		</svg>
    );
}}

export const ButtonX = ({ onPress }) => {
    return (
        <Tooltip 
        content="Cerrar" 
        placement="left" 
        className="text-text-50 bg-bg-100 dark:text-text-950 dark:bg-bg-900 dark:dark"
        >
            <Button
                isIconOnly
                size="sm"
                variant="light"
                onPress={onPress}
            >
                <X strokeWidth={2} className="w-5 h-5"/>
            </Button>
        </Tooltip>
    );
};

export const Profile = ({ onPress, isIconO }) => {
    return (
        <Tooltip 
        isDisabled={!isIconO}
        content="Perfil" 
        className="text-text-50 bg-bg-100 dark:text-text-950 dark:bg-bg-900 dark:dark"
        placement="top"
        >
            <Button 
                isIconOnly={isIconO}
                fullWidth
                aria-label="Button User"
                onPress={onPress}
                className="font-bold"
                size="md"
                radius="md"
                variant="ghost"
                color="primary"
                startContent={ isIconO ? "" : <User strokeWidth={2} className="w-5 h-5"/>}>
                { isIconO ? <User strokeWidth={2} className="w-5 h-5"/> : "Tu perfil"}
            </Button>
        </Tooltip>
    );
};

export const Logout = ({isIconO}) => {
    const { logout } = useAuth();
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const targetRef = React.useRef(null);
    const {moveProps} = useDraggable({targetRef, isDisabled: !isOpen});

    const handleLogout = () => {
        logout(); // Ejecutamos la función de logout del AuthProvider
    };

    return (
        <>
        <Tooltip 
        isDisabled={!isIconO}
        content="Cerrar sesión" 
        className="text-text-50 bg-bg-100 dark:text-text-950 dark:bg-bg-900 dark:dark"
        placement="top"
        >
            <Button 
                isIconOnly={isIconO}
                fullWidth
                aria-label="Button logout"
                onPress={onOpen}
                className="font-bold"
                size="md"
                radius="md"
                variant="bordered"
                color="danger"
                startContent={ isIconO ? "" : <LogOut strokeWidth={2} className="w-5 h-5"/>}>
                { isIconO ? <LogOut strokeWidth={2} className="w-5 h-5"/> : "Cerrar sesión"}
            </Button>
        </Tooltip>

        <Modal 
            classNames={{
                backdrop: "bg-gradient-to-t from-[#FF33FF]/20 to-[#004E66]/20 backdrop-opacity-20",
            }}
            isDismissable={false}
            isKeyboardDismissDisabled={true}
            ref={targetRef} 
            isOpen={isOpen} 
            onOpenChange={onOpenChange} 
            size="md"
            backdrop="opaque" 
            hideCloseButton
            className="text-text-50 bg-bg-50 dark:dark dark:text-text-950 dark:bg-bg-950">
            <ModalContent>
            {(onClose) => (
                <>
                <ModalHeader {...moveProps} className="place-content-between pt-10 pb-6 text-4xl">
                    <h1 className="text-xl font-bold">¿Desea cerrar la sesión actual?</h1>
                    <ButtonX onPress={onClose}></ButtonX>
                </ModalHeader>

                <ModalBody>
                    <div className="text-sm space-y-3 pb-6 text-center">
                        <p>Está a punto de cerrar sesión, sin embargo, puede ingresar de nuevo sin problema.</p>
                    </div>
                </ModalBody>

                <ModalFooter>
                    <Button 
                        fullWidth
                        variant="light"
                        color="default"
                        onPress={onClose}
                        startContent={<X strokeWidth={2} className="w-5 h-5"/>}>
                        Cancelar
                    </Button>
                    
                    <Button 
                        fullWidth
                        variant="ghost"
                        color="danger"
                        className="font-bold"
                        onPress={handleLogout}
                        startContent={<LogOut strokeWidth={2} className="w-5 h-5"/>}>
                        Confirmar
                    </Button>
                </ModalFooter>
                </>
            )}
            </ModalContent>
        </Modal>
        </>
    );
}

export const ChangePassword = ({isIconO}) => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [isVisible1, setIsVisible1] = React.useState(false);    
    const [isVisible2, setIsVisible2] = React.useState(false);    
    const [isVisible3, setIsVisible3] = React.useState(false);  
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleVisibility1 = () => setIsVisible1(!isVisible1);
    const toggleVisibility2 = () => setIsVisible2(!isVisible2); 
    const toggleVisibility3 = () => setIsVisible3(!isVisible3); 

    const handleModalConfirm = () => {
        setIsModalOpen(false);
        handleClose();
    };

    const [formData, setFormData] = useState({
        password: "",
        newPassword: "",
        confirmPassword: "",
    });

    useEffect(() => {
        if (isOpen) {
            setFormData({
                password: "",
                newPassword: "",
                confirmPassword: "",
            });
        }
    }, [isOpen]);

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
            password: "",
            newPassword: "",
            confirmPassword: "",
        });
    };

    return (
        <>  
        <Tooltip 
        isDisabled={!isIconO}
        content="Actualizar contraseña" 
        placement="left" 
        className="text-text-50 bg-bg-100 dark:text-text-950 dark:bg-bg-900 dark:dark"
        >
            <Button
                color="default"
                className="font-bold"
                aria-label="Button password"
                isIconOnly={isIconO}
                size={isIconO ? "sm" : "md"}
                variant={isIconO ? "light" : "bordered"}
                onPress={onOpen}
                startContent={ isIconO ? "" : <KeyRound strokeWidth={2} className="w-5 h-5"/>}>
                { isIconO ? <KeyRound strokeWidth={2} className="w-5 h-5"/> : "Actualizar contraseña"}
            </Button>
        </Tooltip>

        <Drawer 
            isDismissable={false}
            isKeyboardDismissDisabled={true}
            isOpen={isOpen} 
            onOpenChange={onOpenChange} 
            size="sm"
            backdrop="transparent" 
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
            {(onClose) => (
                <>
                <DrawerHeader className="place-content-between pt-10 pb-6 text-4xl">
                    <h1 className="text-4xl font-bold">Actualizar contraseña</h1>
                    <ButtonX onPress={handleClose}></ButtonX>
                </DrawerHeader>

                <DrawerBody>
                    <div className="flex-col items-center justify-center">
                        <div className="text-sm font-semibold pb-6">
                            <p>Esta acción reemplazará tu contraseña actual por una nueva.</p>
                        </div>
                        <Input
                            className="w-full pb-3 pt-6"
                            size="md"
                            radius="md"
                            variant="bordered"
                            type={isVisible1 ? "text" : "password"}
                            label="Contraseña actual"
                            classNames={{ label: "font-bold" }}
                            onValueChange={(value) => handleInputChange('password', value)}
                            labelPlacement="outside"
                            isRequired
                            value={formData.password}
                            startContent={
                                <Button
                                size="sm"
                                isIconOnly
                                variant="light"
                                onPress={toggleVisibility1}
                                >
                                {isVisible1 ? (
                                    <EyeClosed strokeWidth={2} className="w-5 h-5"/>
                                ) : (
                                    <Eye strokeWidth={2} className="w-5 h-5"/>
                                )}
                                </Button>
                            }
                        />

                        <Input
                            className="w-full py-3"
                            size="md"
                            radius="md"
                            variant="bordered"
                            type={isVisible2 ? "text" : "password"}
                            label="Contraseña nueva"
                            onValueChange={(value) => handleInputChange('newPassword', value)}
                            labelPlacement="outside"
                            isRequired
                            value={formData.newPassword}
                            classNames={{ label: "font-bold" }}
                            startContent={
                                <Button
                                size="sm"
                                isIconOnly
                                variant="light"
                                onPress={toggleVisibility2}
                                >
                                {isVisible2 ? (
                                    <EyeClosed strokeWidth={2} className="w-5 h-5"/>
                                ) : (
                                    <Eye strokeWidth={2} className="w-5 h-5"/>
                                )}
                                </Button>
                            }
                        />

                        <Input
                            className="w-full py-3"
                            size="md"
                            radius="md"
                            variant="bordered"
                            type={isVisible3 ? "text" : "password"}
                            label="Confirmar contraseña nueva"
                            onValueChange={(value) => handleInputChange('confirmPassword', value)}
                            labelPlacement="outside"
                            classNames={{ label: "font-bold" }}
                            isRequired
                            value={formData.confirmPassword}
                            startContent={
                                <Button
                                size="sm"
                                isIconOnly
                                variant="light"
                                onPress={toggleVisibility3}
                                >
                                {isVisible3 ? (
                                    <EyeClosed strokeWidth={2} className="w-5 h-5"/>
                                ) : (
                                    <Eye strokeWidth={2} className="w-5 h-5"/>
                                )}
                                </Button>
                            }
                        />
                    </div>
                </DrawerBody>

                <DrawerFooter>
                <div className="flex justify-between w-full items-center gap-4">
                    <Button 
                        fullWidth
                        variant="light"
                        color="default"
                        onPress={onClose}
                        startContent={<X strokeWidth={2} className="w-5 h-5"/>}>
                        Cancelar
                    </Button>
                    
                    <Button 
                        fullWidth
                        variant="bordered"
                        color="secondary"
                        className="font-bold"
                        onPress={() => setIsModalOpen(true)}
                        startContent={<KeyRound strokeWidth={2} className="w-5 h-5"/>}>
                        Actualizar
                    </Button>
                    </div>
                </DrawerFooter>
                </>
            )}
            </DrawerContent>
        </Drawer>

        <ProfileModal
            isOpen={isModalOpen}
            onClose={handleModalConfirm}
            onConfirm={handleModalConfirm}
            isUpdateProfile={false}
            passwordData={formData}
        />
        
        </>
    );
}