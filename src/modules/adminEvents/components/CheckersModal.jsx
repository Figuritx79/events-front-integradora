import React from "react";
import { UserX, X, UserCheck } from "lucide-react";
import { 
    Button, 
    Tooltip, 
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter
} from "@heroui/react";

// Componente Modal de Confirmación
const CheckersModal = ({ 
    isOpen, 
    onClose, 
    onConfirm, 
    isEnabled,
    data = {}, 
}) => {
    // Determina el texto de acción basado en el estado actual (isEnabled)
    const actionTitle = isEnabled ? "inhabilitar" : "habilitar";

    return (
        <Modal 
            isOpen={isOpen} 
            onClose={onClose} 
            size="md" 
            backdrop="opaque" 
            hideCloseButton
            className="text-text-50 bg-bg-50 capitalize dark:dark dark:text-text-950 dark:bg-bg-950">
            <ModalContent>
                <ModalHeader className="place-content-between pt-10 pb-6 text-4xl">
                    <h1 className="text-2xl font-bold">¿desea {actionTitle} el siguiente checador?</h1>
                    <Tooltip 
                        content="Cerrar" 
                        placement="left" 
                        className="text-text-50 bg-bg-100 dark:text-text-950 dark:bg-bg-900 dark:dark">
                        <Button
                            isIconOnly
                            size="sm"
                            variant="light"
                            onPress={onClose}>
                            <X strokeWidth={2} className="w-5 h-5"/>
                        </Button>
                    </Tooltip>
                </ModalHeader>
                
                <ModalBody>
                    <div className="text-sm space-y-3 pb-6">
                        <p className="font-semibold">Nombre: <span className="font-normal">{data.name}</span></p>
                        <p className="font-semibold">Apellido: <span className="font-normal">{data.lastname}</span></p>
                        <p className="font-semibold">Correo: <span className="font-normal">{data.email}</span></p>
                        <p className="font-semibold">Teléfono: <span className="font-normal">{data.phone}</span></p>
                    </div>
                </ModalBody>
                
                <ModalFooter className="flex justify-center gap-4">
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
                        color={isEnabled ? "danger" : "success"}
                        variant="ghost"
                        onPress={onConfirm}
                        className="font-bold"
                        startContent={isEnabled ? 
                            <UserX className="w-5 h-5" /> : 
                            <UserCheck className="w-5 h-5" />
                        }>
                        Confirmar
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default CheckersModal;