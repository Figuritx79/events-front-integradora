import React from "react";
import { LogOut, X } from "lucide-react";
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
} from "@heroui/react";

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

export const Logout = () => {
    const { logout } = useAuth();
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const targetRef = React.useRef(null);
    const {moveProps} = useDraggable({targetRef, isDisabled: !isOpen});

    const handleLogout = () => {
        logout(); // Ejecutamos la función de logout del AuthProvider
        onClose(); // Cerramos el modal
    };

    return (
        <>
        <Button 
            fullWidth
            aria-label="Button logout"
            onPress={onOpen}
            className="font-bold"
            size="md"
            radius="md"
            variant="bordered"
            color="danger"
            startContent={<LogOut strokeWidth={2} className="w-5 h-5"/>}>
            Cerrar sesión
        </Button>

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