import React, { useState } from "react";
import { CalendarX2, X, CalendarCheck2, CalendarArrowUp, Pen } from "lucide-react";
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
import { useAuth } from '../../auth/providers/AuthProvider';
import { Toast } from "../../global/components/Toast";
import { changeStatus, createWorkshop, updateWorkshop } from "../service/Workshop.service";

const WorkshopModal = ({ 
    isOpen, 
    onClose, 
    onConfirm, 
    action,
    data = {},
    status,
    workshopImage,
}) => {
    data.event = sessionStorage.getItem('event');
    console.log(data)
    console.log(status)
    console.log(workshopImage)
    const actionText = 
    action === "create" ? "registrar" :
    action === "update" ? "actualizar" :
    action === "status" ? (status ? "inhabilitar" : "habilitar") : "";

    const targetRef = React.useRef(null);
    const {moveProps} = useDraggable({targetRef, isDisabled: !isOpen});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { credentials } = useAuth();

    const handleAction = async () => {
        const formData = new FormData ();
        setIsSubmitting(true);

        try {
            let result;
            let successMessage; 
            let errorMessage;
            let description;

            if (action === "create") {
              if (action === "create" && !workshopImage) {
                throw new Error("Debes seleccionar una imagen");
            }
    
            // Validación de formato si hay imagen
            if (workshopImage && !workshopImage.type.match(/image\/(jpeg|png)/)) {
                throw new Error("Formato de imagen no válido (solo JPG/PNG)");
            }

            const workshopDto = {
              id: data.id,
              name: data.name,
              speakerName: data.speakerName, // Campo directo
              capacity: data.capacity,
              description: data.description,
              hour: data.hour,
              event: data.event || sessionStorage.getItem('event') // Obtener evento
          };
          console.log("DTO a enviar:", {
            id: data.id,
            name: data.name,
            speakerName: data.speakerName,
            event: data.event,
            capacity: data.capacity,
            description: data.description,
            hour: data.hour
        });
      
            const dtoBlob = new Blob([JSON.stringify(workshopDto)], {
              type: 'application/json'
            });
            formData.append('workshop', dtoBlob);

            if (workshopImage) {
                formData.append("workshopImage", workshopImage);
                formData.append("speakerImage", workshopImage);
            }
            console.log("Contenido de FormData:");
            formData.forEach((value, key) => console.log(key, value));

                result = await createWorkshop(formData);
                successMessage = "Se registró el taller";
                description = "Se ha registrado el taller correctamente"
                errorMessage = "No se pudo registrar el taller";
              } 
              else if (action === "update") {
                  console.log(data)

                  if (workshopImage && !workshopImage.type.match(/image\/(jpeg|png)/)) {
                    throw new Error("Formato de imagen no válido (solo JPG/PNG)");
                  }
                  if (workshopImage) {
                    formData.append("workshopImage", workshopImage);
                  }

                  const dtoBlob = new Blob([JSON.stringify(data)], {
                    type: 'application/json'
                  });

                  formData.append("workshop", dtoBlob)
                  console.log("Contenido de FormData:");
                  formData.forEach((value, key) => console.log(key, value));

                  result = await updateWorkshop(formData);
                  successMessage = "Se actualizó el taller";
                  description = "Se ha actualizado el taller correctamente"
                  errorMessage = "No se pudo actualizar el taller";
              } 
              else if (action === "status") {
                result = await changeStatus(data.id);
                successMessage = status 
                  ? "Se inhabilitó el taller" 
                  : "Se habilitó el taller";
                  description = status 
                  ? "Se inhabilitó el taller correctamente" 
                  : "Se habilitó el taller correctamente";
                errorMessage = status 
                  ? "No se pudo inhabilitar el taller" 
                  : "No se pudo habilitar el taller";
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
                title: `Error al ${actionText} el taller`,
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
          <h1 className="text-xl font-bold">¿Desea {actionText} el siguiente taller?</h1>
          <ButtonX onPress={onClose}></ButtonX>
        </ModalHeader>
        
        <ModalBody>
          <div className="text-sm space-y-3 pb-6 text-start">
            <p className="font-semibold">Nombre: <span className="font-normal break-words">{data.name}</span></p>
            <p className="font-semibold">Ponente: <span className="font-normal break-words">{data.speakerInfo?.speaker_name || data.speakerName}</span></p>
            <p className="font-semibold">Capacidad: <span className="font-normal break-words">{data.capacity}</span></p>
            <p className="font-semibold">Hora: <span className="font-normal break-words">{data.hour}</span></p>
            <p className="font-semibold">Descripción: <span className="font-normal break-words">{data.description}</span></p>
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
              action === "create" ? <CalendarArrowUp strokeWidth={2} className="w-5 h-5" /> : 
              action === "status" ? (status ? <CalendarX2 strokeWidth={2} className="w-5 h-5" /> : <CalendarCheck2 strokeWidth={2} className="w-5 h-5" />) :
              <Pen strokeWidth={2} className="w-5 h-5" />
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

export default WorkshopModal;