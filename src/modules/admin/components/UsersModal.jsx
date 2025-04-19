import React, { useState } from "react";
import { UserX, X, UserCheck, UserPlus, UserPen } from "lucide-react";
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
import { useAuth } from '../../auth/providers/AuthProvider';
import { Toast } from "../../global/components/Toast";
import { updateAdmin, updateProfile } from "../../adminEvents/service/AdminEvent.service";

const UsersModal = ({ 
    isOpen, 
    onClose, 
    onConfirm, 
    action,
    data = {},
    status,
    email
}) => {
    console.log(data)
    const actionText = 
    action === "create" ? "registrar" :
    action === "update" ? "actualizar" :
    action === "status" ? (status ? "inhabilitar" : "habilitar") : 
    "";

    const targetRef = React.useRef(null);
    const {moveProps} = useDraggable({targetRef, isDisabled: !isOpen});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { credentials } = useAuth();

    const handleAction = async () => {
        setIsSubmitting(true);
        try {
            let result;
            let successMessage; 
            let errorMessage;
            let description;

            if (action === "create") {
                result = await createChecker(credentials.email, data);
                successMessage = "Se registró el administrador";
                description = "Se ha registrado el administrador correctamente"
                errorMessage = "No se pudo registrar el administrador";
              } 
              else if (action === "update") {
                console.log(data)
                result = await updateAdmin({
                    currentEmail: email,
                    user: data // Envía el objeto completo
                });
                successMessage = "Se actualizó el administrador";
                description = "Se ha actualizado el administrador correctamente"
                errorMessage = "No se pudo actualizar el administrador";
            } 
            else if (action === "status") {
                result = await changeStatus(data.email);
                successMessage = status 
                  ? "Se inhabilitó el administrador" 
                  : "Se habilitó el administrador";
                  description = status 
                  ? "Se inhabilitó el administrador correctamente" 
                  : "Se habilitó el administrador correctamente";
                errorMessage = status 
                  ? "No se pudo inhabilitar el administrador" 
                  : "No se pudo habilitar el administrador";
              }

              if (result) {
                Toast({
                  onConfirm: () => onConfirm(true),
                  color: "success",
                  title: successMessage,
                  description: description
                });
              } else {
                Toast({
                  onConfirm: () => onConfirm(false),
                  color: "danger",
                  title: errorMessage,
                  description: "Revise que haya mandado los datos correctamente"
                });
              }
            } catch (error) {
              Toast({
                onConfirm: () => onConfirm(false),
                color: "danger",
                title: `Error al ${actionText} el checador`,
                description: error.message
              });
              console.error(error);
            } finally {
              setIsSubmitting(false);
              onClose();
            }
          };
    
    return (
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
          <h1 className="text-xl font-bold">¿Desea {actionText} el siguiente administrador?</h1>
          <ButtonX onPress={onClose}></ButtonX>
        </ModalHeader>
        
        <ModalBody>
          <div className="text-sm space-y-3 pb-6 text-start">
            <p className="font-semibold">Nombre: <span className="font-normal break-words">{data.name + " " + data.lastname}</span></p>
            <p className="font-semibold">Correo: <span className="font-normal break-words">{data.email}</span></p>
            <p className="font-semibold">Teléfono: <span className="font-normal break-words">{data.phone}</span></p>
            <p className="font-semibold">Empresa: <span className="font-normal break-words">{data.companyName}</span></p>
            {action === "status" && (
              <p className="font-semibold">Estado actual: <span className="font-normal">{status ? "Activo" : "Inactivo"}</span></p>
            )}
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
            color={
              action === "status" 
                ? (status ? "danger" : "success")
                : "secondary"
            }
            variant="ghost"
            onPress={handleAction}
            className="font-bold"
            startContent={
              isSubmitting ? null : 
              action === "create" ? <UserPlus strokeWidth={2} className="w-5 h-5" /> : 
              action === "status" ? (status ? <UserX strokeWidth={2} className="w-5 h-5" /> : <UserCheck strokeWidth={2} className="w-5 h-5" />) :
              <UserPen strokeWidth={2} className="w-5 h-5" />
            }>
            {action === "create" ? "Registrar" : 
             action === "status" ? (status ? "Inhabilitar" : "Habilitar") : 
             "Actualizar"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
    );
};

export default UsersModal;