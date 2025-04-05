import React from "react";
import { UserX, X, UserCheck } from "lucide-react";
import { 
    Button, 
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDraggable, 
} from "@heroui/react";
import { ButtonX } from "../../global/components/Components";
//import {CheckersToast} from './CheckersToast';

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
    const targetRef = React.useRef(null);
    const {moveProps} = useDraggable({targetRef, isDisabled: !isOpen});
    
    return (
        <>
        <Modal 
            ref={targetRef} 
            isOpen={isOpen} 
            onClose={onClose} 
            size="md" 
            backdrop="opaque" 
            hideCloseButton
            className="text-text-50 bg-bg-50 dark:dark dark:text-text-950 dark:bg-bg-950">
            <ModalContent>
                <ModalHeader {...moveProps} className="place-content-between pt-10 pb-6 text-4xl">
                    <h1 className="text-xl font-bold">¿Desea {actionTitle} el siguiente checador?</h1>
                    <ButtonX onPress={onClose}></ButtonX>
                </ModalHeader>
                
                <ModalBody>
                    <div className="text-sm space-y-3 pb-6">
                        <p className="font-semibold">Nombre: <span className="font-normal break-words">{data.name + " " + data.lastname}</span></p>
                        <p className="font-semibold">Correo: <span className="font-normal break-words">{data.email}</span></p>
                        <p className="font-semibold">Teléfono: <span className="font-normal break-words">{data.phone}</span></p>
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
                        onPress={() => {
                            onConfirm();
                            /*CheckersToast({
                                action: isEnabled ? "disable" : "enable",
                                data
                            })*/
                            
                        }}
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
        </>
    );
};

export default CheckersModal;