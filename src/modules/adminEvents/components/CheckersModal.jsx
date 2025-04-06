import React, { useState } from "react";
import { UserX, X, UserCheck, CircleArrowDown, KeyRound, UserPlus } from "lucide-react";
import { 
    Button, 
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDraggable, 
} from "@heroui/react";
import { ButtonX, Spinner } from "../../global/components/Components";
import { changeStatus } from "../../auth/service/user.service";
import { updateProfile } from "../service/AdminEvent.service";
import { createChecker } from "../service/Checkers.service";
import { useAuth } from '../../auth/providers/AuthProvider';
import { Toast } from "../../global/components/Toast";

const CheckersModal = ({ 
    isOpen, 
    onClose, 
    onConfirm, 
    action,
    data = {},
}) => {
    console.log(data)
    const actionTitle = action === "create" ? "registrar" : data.status ? "inhabilitar" : "habilitar";
    const targetRef = React.useRef(null);
    const {moveProps} = useDraggable({targetRef, isDisabled: !isOpen});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChangeStatus = async () => {        
        setIsSubmitting(true);
        try {
            const result = await changeStatus(data.email);
            
            if (result) {
                Toast({
                    onConfirm: () => {onConfirm()},
                    color: "success",
                    title: `Se ${ data.status ? "inhabilitó" : "habilitó"} el checador`,
                    description: `Se ${ data.status ? "inhabilitó" : "habilitó"} el checador correctamente`
                });
            } else {
                Toast({
                    onConfirm: () => {onConfirm()},
                    color: "danger",
                    title: `No se ${ data.status ? "inhabilitó" : "habilitó"} el checador`,
                    description: "Algo salió mal :("
                });
            }
        } catch (error) {
            Toast({
                onConfirm: () => {onConfirm()},
                color: "danger",
                title: `Ocurrió un error al ${actionTitle} el checador`,
                description: error.message
            });
            console.log(error)
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCreateChecker = async () => {        
        setIsSubmitting(true);
        try {
            const result = await createChecker(data);
            
            if (result) {
                Toast({
                    onConfirm: () => {onConfirm()},
                    color: "success",
                    title: `Se registró el checador`,
                    description: `Se registró el checador correctamente`
                });
            } else {
                Toast({
                    onConfirm: () => {onConfirm()},
                    color: "danger",
                    title: `No se registró el checador`,
                    description: "Revise que haya mandado los datos correctamente"
                });
            }
        } catch (error) {
            Toast({
                onConfirm: () => {onConfirm()},
                color: "danger",
                title: `Ocurrió un error al registrar el checador`,
                description: error.message
            });
            console.log(error)
        } finally {
            setIsSubmitting(false);
        }
    };
    
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
                    <div className="text-sm space-y-3 pb-6 text-center">
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
                        isLoading={isSubmitting}
                        spinner={<Spinner/>}
                        fullWidth
                        color="secondary"
                        variant="ghost"
                        onPress={() => {
                            action === "create" ? handleCreateChecker() : handleChangeStatus()
                        }}
                        className="font-bold"
                        startContent={isSubmitting ? "" : action === "create" ? 
                            <UserPlus strokeWidth={2} className="w-5 h-5" /> : data.status ? 
                            <UserX strokeWidth={2} className="w-5 h-5" /> : 
                            <UserCheck strokeWidth={2} className="w-5 h-5" />  
                        }>
                        {action === "create" ? "Registrar" : "Actualizar"}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
        </>
    );
};

export default CheckersModal;