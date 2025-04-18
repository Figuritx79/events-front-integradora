import React, { useEffect, useState } from "react";
import { parseDate, getLocalTimeZone, now } from "@internationalized/date";
import { ImageUp, CircleArrowRight, CircleArrowLeft, Info, X } from "lucide-react";
import { useDateFormatter } from "@react-aria/i18n";
import { addToast } from "@heroui/toast";
import { useLocation } from "react-router"; 

import {
  Button,
  Input,
  Progress,
  Image,
  Tooltip,
  useDisclosure,
  useDraggable,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/react";
import { Link, useNavigate } from "react-router"; // Agregar useNavigate
import { Spinner, ButtonX } from "../../global/components/Components";
import { Toast } from "../../global/components/Toast";
import { createLandingPage } from "../service/Events.service";

export default function CreateEventStep2() {
    const [logoFile, setLogoFile] = useState(null);
    const [galleryFiles, setGalleryFiles] = useState([]);
    const location = useLocation(); 
    const [previewUrl, setPreviewUrl] = useState(null);
    const [previewUrls, setPreviewUrls] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate(); // Agregar hook de navegación
    const [nameEvent, setNameEvent] = useState(sessionStorage.getItem('nameEvent'))

    const {isOpen, onOpen, onClose} = useDisclosure();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const targetRef = React.useRef(null);
    const {moveProps} = useDraggable({targetRef, isDisabled: !isOpen});

    const handleAction = async () => {
            setIsSubmitting(true);
            try {
                let result;
                let successMessage; 
                let errorMessage;
                let description;
                
                const formData = new FormData();
                
                // Validaciones
                if (!logoFile || galleryFiles.length !== 3) {
                    throw new Error("Debes subir 1 imagen principal y 3 de galería");
                }
                console.log(logoFile)
                // Adjuntar imágenes
                formData.append("logo", logoFile);
                galleryFiles.forEach((file, index) => {
                    formData.append(`gallery${index + 1}`, file);
                    console.log(file)
                });

                    const eventName = sessionStorage.getItem('nameEvent')
                    console.log(eventName)
                    console.log(formData)
                    result = await createLandingPage({formData, eventName});
                    successMessage = "Se creo la landing page";
                    description = "Se ha creado la landing page correctamente"
                    errorMessage = "No se pudo crear la landing page";
    
                  if (result) {
                    Toast({
                      color: "success",
                      title: successMessage,
                      description: description
                    });
                  } else {
                    Toast({
                      color: "danger",
                      title: errorMessage,
                      description: "Revise que haya mandado los datos correctamente"
                    });
                  }
                } catch (error) {
                  Toast({
                    color: "danger",
                    title: `Error al crear la landing page`,
                    description: error.message
                  });
                  console.error(error);
                } finally {
                  setIsSubmitting(false);
                  onClose();
                  navigate('/AdminEvents/CreateEvent/Checkers', { replace: true });
                }
              };

              const handleLogoChange = (e) => {
                const file = e.target.files[0];
                if (!file) return;
            
                if (!file.type.match('image/(jpeg|png)')) {
                  console.error("Formato no válido");
                  e.target.value = null;
                  setPreviewUrl(null);
                  setLogoFile(null);
                  return;
                }
            
                const objectUrl = URL.createObjectURL(file);
                setPreviewUrl(objectUrl);
                setLogoFile(file);
              };

              const handleGalleryChange = (e) => {
                const files = Array.from(e.target.files);
                
                const validFiles = files.filter(file => 
                  file.type.match('image/(jpeg|png)')
                );
                
                setGalleryFiles(prev => [...prev, ...validFiles]);
                setPreviewUrls(prev => [
                  ...prev, 
                  ...validFiles.map(file => URL.createObjectURL(file))
                ]);
              };
            
              const removeImage = (index) => {
                setGalleryFiles(prev => prev.filter((_, i) => i !== index));
                setPreviewUrls(prev => {
                  const newUrls = [...prev];
                  URL.revokeObjectURL(newUrls[index]);
                  return newUrls.filter((_, i) => i !== index);
                });
              };

    return (
        <>
        <div className="h-full flex-1 lg:ml-12 xl:mx-20 py-6 shadow-xl rounded-3xl flex flex-col text-text-50 bg-bg-50 dark:text-text-950 dark:bg-bg-950">
            <div className="flex-1 min-h-0 overflow-hidden px-12">
                <div className="flex flex-col gap-4 pb-4 pt-6">
                    <div className="flex justify-between gap-3 items-start">
                        <div>
                            <h1 className="text-4xl font-bold">Imágenes para su landing page</h1>
                        </div>
                    </div>
                </div>
                <Progress
                    aria-label="Downloading..."
                    className="w-full"
                    color="primary"
                    size="sm"
                    value={50}
                />

                <div className="flex-1 min-h-0 overflow-hidden mt-8 pb-6">
                    <div className="h-full overflow-y-auto">
                        <div className="grid grid-cols-1 mx-2">
                            <div>
                                <Input
                                    type="file"
                                    className="w-full pb-6"
                                    variant="bordered"
                                    label="Imagen principal"
                                    labelPlacement="outside"
                                    size="md"
                                    radius="md"
                                    accept="image/*"
                                    isRequired
                                    onChange={handleLogoChange}
                                    classNames={{
                                        label: "font-bold",
                                        input: "cursor-pointer file:text-text-50 file:bg-bg-50 dark:file:text-text-950 dark:file:bg-bg-950",
                                        inputWrapper: "border-dashed",
                                    }}
                                    startContent={<ImageUp strokeWidth={2} className="w-5 h-5" />}
                                />

                                <Input
                                    type="file"
                                    className="w-full pb-6 pt-3"
                                    variant="bordered"
                                    label="Galería (3 imágenes)"
                                    labelPlacement="outside"
                                    size="md"
                                    radius="md"
                                    accept="image/*"
                                    isRequired
                                    multiple
                                    isInvalid={!!errorMessage}
                                    errorMessage={errorMessage}
                                    onChange={handleGalleryChange}
                                    classNames={{
                                        label: "font-bold",
                                        input: "cursor-pointer file:text-text-50 file:bg-bg-50 dark:file:text-text-950 dark:file:bg-bg-950",
                                        inputWrapper: "border-dashed",
                                    }}
                                    startContent={<ImageUp strokeWidth={2} className="w-5 h-5" />}
                                />

                                <div className="flex space-x-10 mt-4">
                                    {previewUrl && (
                                        <div className="mb-4">
                                            <p className="text-sm mb-2 font-bold">Imagen principal:</p>
                                            <Image
                                                src={previewUrl}
                                                alt="Previsualización"
                                                radius="md"
                                                className="object-cover w-64 h-36"
                                            />
                                        </div>
                                    )}
                                    
                                    {previewUrls.length > 0 && (
                                        <div className="flex-1">
                                            <p className="text-sm mb-2  font-bold">Galería:</p>
                                            <div className="flex flex-wrap gap-4">
                                                {previewUrls.map((url, index) => (
                                                    <div key={index} className="flex">
                                                        <Image
                                                            src={url}
                                                            alt={`Previsualización ${index + 1}`}
                                                            radius="md"
                                                            className="object-cover w-48 h-32"
                                                        />
                                                        <div>
                                                                    <Tooltip 
                                                                    content="Eliminar" 
                                                                    placement="top" 
                                                                    className="text-text-50 bg-bg-100 dark:text-text-950 dark:bg-bg-900 dark:dark"
                                                                    >
                                                                        <Button
                                                                            isIconOnly
                                                                            size="sm"
                                                                            variant="light"
                                                                            onPress={() => removeImage(index)}
                                                                        >
                                                                            <X strokeWidth={2} className="w-5 h-5"/>
                                                                        </Button>
                                                                    </Tooltip>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            
                            <div className="flex justify-end gap-4 mt-8">                                
                                <Button 
                                    size="md"
                                    radius="md"
                                    color="primary"
                                    variant="solid"
                                    className="font-bold"
                                    isDisabled={!logoFile || galleryFiles.length !== 3}
                                    onPress={onOpen} // Usar handler controlado
                                    startContent={<CircleArrowRight className="w-5 h-5" />}
                                >
                                    Continuar
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

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
                          <h1 className="text-xl font-bold">¿Desea continuar con el siguiente paso?</h1>
                          <ButtonX onPress={onClose}></ButtonX>
                        </ModalHeader>
                        
                        <ModalBody>
                            <div className="text-sm space-y-3 pb-6 text-start">
                                <p>Al continuar, la landing page será creada inmediatamente al evento que acaba de crear</p>
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
                            color="primary"
                            variant="ghost"
                            onPress={handleAction}
                            className="font-bold"
                            startContent={
                              isSubmitting ? null : 
                              <CircleArrowRight strokeWidth={2} className="w-5 h-5" />
                            }>
                            Confirmar
                          </Button>
                        </ModalFooter>
                      </ModalContent>
                    </Modal>

        </>
    );
}