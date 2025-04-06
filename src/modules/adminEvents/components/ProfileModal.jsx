import React, { useState } from "react";
import { UserX, X, UserCheck, CircleArrowDown, KeyRound } from "lucide-react";
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
import { changePassword } from "../../auth/service/user.service";
import { updateProfile } from "../service/AdminEvent.service";
import { useAuth } from '../../auth/providers/AuthProvider';
import { Toast } from "../../global/components/Toast";

const ProfileModal = ({ 
    isOpen, 
    onClose, 
    onConfirm, 
    isUpdateProfile,
    profileData = {}, 
    passwordData = {}, 
}) => {
    const currentData = isUpdateProfile ? profileData : passwordData;
    const { credentials, setCredentials } = useAuth();
    const title = isUpdateProfile ? "¿Desea actualizar su perfil?" : "¿Desea actualizar su contraseña?"
    const description = isUpdateProfile ? "Asegúrese de que toda la información sea correcta antes de continuar. Una vez confirmado, los nuevos datos se reflejarán en su cuenta." : "Asegúrese de recordar la nueva contraseña para futuros inicios de sesión."
    const targetRef = React.useRef(null);
    const {moveProps} = useDraggable({targetRef, isDisabled: !isOpen});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChangePassword = async () => {        
        setIsSubmitting(true);
        try {
            const result = await changePassword(credentials.email, passwordData.password, passwordData.newPassword);
            
            if (result) {
                Toast({
                    onConfirm: () => {onConfirm()},
                    color: "success",
                    title: "Se actualizó su contraseña",
                    description: "Su contraseña se ha actualizado correctamente"
                });
            } else {
                Toast({
                    onConfirm: () => {onConfirm()},
                    color: "danger",
                    title: "No se actualizó su contraseña",
                    description: "Revise que haya mandado los datos correctamente"
                });
            }
        } catch (error) {
            Toast({
                onConfirm: () => {onConfirm()},
                color: "danger",
                title: "Ocurrió un error al actualizar su contraseña",
                description: error.message
            });
            console.log(error)
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleUpdateProfile = async () => {        
        setIsSubmitting(true);
        try {
            const result = await updateProfile({
                currentEmail: credentials.email,
                user: profileData // Envía el objeto completo
            });
            
            if (result) {
				setCredentials({
                    email: profileData.email,
                    role: credentials.role // Mantenemos el mismo rol
                });
                
                Toast({
                    onConfirm: () => {onConfirm()},
                    color: "success",
                    title: "Se actualizó su perfil",
                    description: "Su perfil se ha actualizado correctamente"
                });
            } else {
                Toast({
                    onConfirm: () => {onConfirm()},
                    color: "danger",
                    title: "No se actualizó su perfil",
                    description: "Revise que haya mandado los datos correctamente"
                });
            }
        } catch (error) {
            Toast({
                onConfirm: () => {onConfirm()},
                color: "danger",
                title: "Ocurrió un error al actualizar su perfil",
                description: error.message
            });
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
                    <h1 className="text-xl font-bold">{title}</h1>
                    <ButtonX onPress={onClose}></ButtonX>
                </ModalHeader>
                
                <ModalBody>
                    <div className="text-sm space-y-3 pb-6 text-center">
                        <p>{description}</p>
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
                            isUpdateProfile ? handleUpdateProfile() : handleChangePassword()
                        }}
                        className="font-bold"
                        startContent={isSubmitting ? "" : isUpdateProfile ? 
                            <CircleArrowDown strokeWidth={2} className="w-5 h-5" /> : 
                            <KeyRound strokeWidth={2} className="w-5 h-5" />
                        }>
                        {isUpdateProfile ? "Guardar" : "Actualizar"}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
        </>
    );
};

export default ProfileModal;