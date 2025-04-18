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
import { changeStatus } from "../../adminEvents/service/Events.service";
import { createChecker, updateChecker } from "../service/Checkers.service";
import { useAuth } from '../../auth/providers/AuthProvider';
import { Toast } from "../../global/components/Toast";

const EventsModal = ({ 
    isOpen, 
    onClose, 
    onConfirm, 
    action,
    data = {},
    status
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
              
            if (action === "status") {
                console.log(data.id)
                result = await changeStatus(data.id);
                successMessage = status 
                  ? "Se inhabilitó el evento" 
                  : "Se habilitó el evento";
                  description = status 
                  ? "Se inhabilitó el evento correctamente" 
                  : "Se habilitó el evento correctamente";
                errorMessage = status 
                  ? "No se pudo inhabilitar el evento" 
                  : "No se pudo habilitar el evento";
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
                title: `Error al ${actionText} el evento`,
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
          <h1 className="text-xl font-bold">¿Desea {actionText} el siguiente evento?</h1>
          <ButtonX onPress={onClose}></ButtonX>
        </ModalHeader>
        
        <ModalBody>
          <div className="text-sm space-y-3 pb-6 text-start">
            <p className="font-semibold">Nombre: <span className="font-normal break-words">{data.name + " " + data.lastname}</span></p>
            <p className="font-semibold">Fecha inicial: <span className="font-normal break-words">{data.startDate}</span></p>
            <p className="font-semibold">Fecha final: <span className="font-normal break-words">{data.endDate}</span></p>
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

export default EventsModal;