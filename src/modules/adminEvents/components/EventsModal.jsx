import React from "react";
import { CircleX, X, CircleCheck } from "lucide-react";
import { 
    Button, 
    Tooltip, 
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter
} from "@heroui/react";
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
    
    return (
        <>
        <Modal 
            isOpen={isOpen} 
            onClose={onClose} 
            size="md" 
            backdrop="opaque" 
            hideCloseButton
            className="text-text-50 bg-bg-50 normal-case dark:dark dark:text-text-950 dark:bg-bg-950">
            <ModalContent>
                <ModalHeader className="place-content-between pt-10 pb-6 text-4xl">
                    <h1 className="text-2xl font-bold">¿Desea {actionTitle} el siguiente evento?</h1>
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
                        <p className="font-semibold">Fecha inicial: <span className="font-normal">{data.startDate}</span></p>
                        <p className="font-semibold">Fecha final: <span className="font-normal">{data.endDate}</span></p>
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
                            <CircleX className="w-5 h-5" /> : 
                            <CircleCheck className="w-5 h-5" />
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