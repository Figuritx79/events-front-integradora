import React, { useEffect, useState } from "react";
import { parseDate, getLocalTimeZone, now } from "@internationalized/date";
import { ImageUp, CircleArrowRight, CircleArrowLeft, Info, X } from "lucide-react";
import { useDateFormatter } from "@react-aria/i18n";
import { addToast } from "@heroui/toast";
import { useLocation } from "react-router"; 

import {
  Button,
  Input,
  Tabs,
  Tab, 
  Image,
  Tooltip
} from "@heroui/react";
import { Link, useNavigate } from "react-router"; // Agregar useNavigate

export default function CreateEventStep2() {
    const location = useLocation(); 
    const formData = location.state?.formData || {};
    const [previewUrl, setPreviewUrl] = useState(null);
    const [previewUrls, setPreviewUrls] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate(); // Agregar hook de navegación

    console.log('Datos recibidos:', formData); 

    const handleLogoChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (!file.type.match('image/(jpeg|png)')) {
            console.error("Formato no válido");
            e.target.value = null;
            setPreviewUrl(null);
            return;
        }

        const objectUrl = URL.createObjectURL(file);
        setPreviewUrl(objectUrl);
    };

    const handleGalleryChange = (e) => {
        const files = Array.from(e.target.files);
        
        if (previewUrls.length + files.length > 3) {
            setErrorMessage("Máximo 3 imágenes");
            return;
        }
        
        const validFiles = files.filter(file => 
            file.type.match('image/(jpeg|png)')
        );
        
        if (validFiles.length !== files.length) {
            setErrorMessage("Solo JPG/PNG permitidos");
            return;
        }
        
        setErrorMessage("");
        setPreviewUrls(prev => [
            ...prev,
            ...validFiles.map(file => URL.createObjectURL(file))
        ]);
    };

    const removeImage = (index) => {
        setPreviewUrls(prev => {
            const newUrls = [...prev];
            URL.revokeObjectURL(newUrls[index]);
            newUrls.splice(index, 1);
            return newUrls;
        });
    };

    const handleContinue = () => {
        if (previewUrls.length === 0 || !previewUrl) {
            addToast({
                color: "danger",
                icon: <Info strokeWidth={2} className="w-5 h-5"/>,
                title: "Imágenes requeridas",
                description: "Debe subir al menos una imagen principal y una de galería",
                timeout: 5000,
            });
            return;
        }
        navigate('/AdminEvents/CreateEvent/Checkers'); // Navegación controlada
    };

    useEffect(() => {
        addToast({
            color: "primary",
            icon: <Info strokeWidth={2} className="w-5 h-5"/>,
            title: "Etapa 2: Imágenes del evento",
            description: "Suba las imágenes requeridas para su evento",
            timeout: 6000,
        });
        
        return () => {
            previewUrls.forEach(url => URL.revokeObjectURL(url));
            if (previewUrl) URL.revokeObjectURL(previewUrl);
        };
    }, []);

    return (
        <div className="h-full flex-1 lg:ml-12 xl:mx-20 py-6 flex flex-col text-text-50 bg-bg-50 dark:text-text-950 dark:bg-bg-950">
            <div className="flex-1 min-h-0 flex flex-col px-2">
                <div className="flex flex-col gap-4 pt-6">
                    <div className="flex justify-between gap-3 items-start">
                        <div>
                            <h1 className="text-4xl font-bold pb-2">Registrar evento</h1>
                            <p className="text-sm">Registrar imágenes del evento</p>
                        </div>
                        <Tabs key="md" aria-label="Secciones" size="sm" radius="md" variant="bordered">
                            <Tab key="evento" title="Evento" />
                            <Tab key="checadores" title="Checadores" />
                            <Tab key="talleres" title="Talleres" />
                        </Tabs>
                    </div>
                </div>
                
                <div className="flex-1 min-h-0 overflow-hidden mt-12 pb-6">
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
                                        input: "cursor-pointer file:text-text-50 file:bg-bg-50 dark:file:text-text-950 dark:file:bg-bg-950",
                                        inputWrapper: "border-dashed",
                                    }}
                                    startContent={<ImageUp strokeWidth={2} className="w-5 h-5" />}
                                />

                                <Input
                                    type="file"
                                    className="w-full pb-6 pt-3"
                                    variant="bordered"
                                    label="Galería (máx. 3)"
                                    labelPlacement="outside"
                                    size="md"
                                    radius="md"
                                    accept="image/*"
                                    isRequired
                                    multiple
                                    isDisabled={previewUrls.length >= 3}
                                    isInvalid={!!errorMessage}
                                    errorMessage={errorMessage}
                                    onChange={handleGalleryChange}
                                    classNames={{
                                        input: "cursor-pointer file:text-text-50 file:bg-bg-50 dark:file:text-text-950 dark:file:bg-bg-950",
                                        inputWrapper: "border-dashed",
                                    }}
                                    startContent={<ImageUp strokeWidth={2} className="w-5 h-5" />}
                                />

                                <div className="flex space-x-10 mt-4">
                                    {previewUrl && (
                                        <div className="mb-4">
                                            <p className="text-sm mb-2">Imagen principal:</p>
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
                                            <p className="text-sm mb-2">Galería:</p>
                                            <div className="flex flex-wrap gap-4">
                                                {previewUrls.map((url, index) => (
                                                    <div key={index} className="relative group">
                                                        <Image
                                                            src={url}
                                                            alt={`Previsualización ${index + 1}`}
                                                            radius="md"
                                                            className="object-cover w-48 h-32"
                                                        />
                                                        <div className="absolute top-1 right-1">
                                                            <Tooltip content="Eliminar">
                                                                <Button
                                                                    isIconOnly
                                                                    size="sm"
                                                                    variant="flat"
                                                                    color="danger"
                                                                    onPress={() => removeImage(index)}
                                                                >
                                                                    <X className="w-4 h-4" />
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
                                    as={Link}
                                    to="/AdminEvents/CreateEvent"
                                    size="md"
                                    radius="md"
                                    variant="light"
                                    color="primary"
                                    startContent={<CircleArrowLeft className="w-5 h-5" />}
                                >
                                    Regresar
                                </Button>
                                
                                <Button 
                                    size="md"
                                    radius="md"
                                    color="primary"
                                    variant="solid"
                                    onPress={handleContinue} // Usar handler controlado
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
    );
}