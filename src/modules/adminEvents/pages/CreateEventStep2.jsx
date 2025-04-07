import React, { useEffect, useState } from "react";
import { ImageUp, CircleArrowRight, CircleArrowLeft, Info, X } from "lucide-react";
import { useNavigate, useLocation, useParams } from 'react-router';
import { addToast } from "@heroui/toast";
import { api } from "../../global/config/api";
import {
    Button,
    Input,
    Image,
    Tabs,
    Tab,
    Tooltip
} from "@heroui/react";
import { Link } from "react-router";

export default function CreateEventStep2() {
    const { slug } = useParams(); // Obtener el slug de la URL
    const location = useLocation();
    const { eventName, eventId } = location.state || {};
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Estados para las previsualizaciones
    const [logoPreview, setLogoPreview] = useState(null);
    const [galleryPreviews, setGalleryPreviews] = useState([]);
    const [galleryFiles, setGalleryFiles] = useState([]);

    useEffect(() => {
        if (!eventName || !slug) {
            addToast({
                color: "danger",
                icon: <Info strokeWidth={2} className="w-5 h-5"/>,
                title: "Error",
                description: "No se recibió la información del evento",
                timeout: 5000,
            });
            navigate('/AdminEvents/CreateEvent');
            return;
        }

        addToast({
            color: "primary",
            icon: <Info strokeWidth={2} className="w-5 h-5"/>,
            title: "Configurar Landing Page",
            description: `Sube las imágenes para el evento: ${eventName}`,
            timeout: 6000,
        });
        
        return () => {
            if (logoPreview) URL.revokeObjectURL(logoPreview);
            galleryPreviews.forEach(url => URL.revokeObjectURL(url));
        };
    }, [eventName, slug]);

    const handleLogoChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (!file.type.match('image/(jpeg|png)')) {
            addToast({
                color: "danger",
                icon: <Info strokeWidth={2} className="w-5 h-5"/>,
                title: "Formato no válido",
                description: "Solo se permiten imágenes JPEG o PNG",
                timeout: 5000,
            });
            e.target.value = null;
            return;
        }

        setLogoPreview(URL.createObjectURL(file));
    };

    const handleGalleryChange = (e) => {
        const files = Array.from(e.target.files).slice(0, 3 - galleryFiles.length);
        
        const invalidFiles = files.filter(file => !file.type.match('image/(jpeg|png)'));
        if (invalidFiles.length > 0) {
            addToast({
                color: "danger",
                icon: <Info strokeWidth={2} className="w-5 h-5"/>,
                title: "Archivos no válidos",
                description: "Solo se permiten imágenes JPEG o PNG",
                timeout: 5000,
            });
            return;
        }

        const newPreviews = files.map(file => URL.createObjectURL(file));
        setGalleryPreviews(prev => [...prev, ...newPreviews]);
        setGalleryFiles(prev => [...prev, ...files]);
    };

    const removeGalleryImage = (index) => {
        URL.revokeObjectURL(galleryPreviews[index]);
        setGalleryPreviews(prev => prev.filter((_, i) => i !== index));
        setGalleryFiles(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async () => {
        if (!logoPreview || galleryPreviews.length === 0) {
            addToast({
                color: "danger",
                icon: <Info strokeWidth={2} className="w-5 h-5"/>,
                title: "Imágenes requeridas",
                description: "Debes subir al menos el logo y una imagen de galería",
                timeout: 5000,
            });
            return;
        }

        const formData = new FormData();
        
        try {
            setLoading(true);
            
            // Obtener el logo del input
            const logoInput = document.querySelector('input[name="logo"]');
            formData.append('logo', logoInput.files[0]);
            
            // Asegurar 3 archivos de galería
            for (let i = 0; i < 3; i++) {
                formData.append(`gallery${i+1}`, galleryFiles[i] || new Blob());
            }

            // Usar el slug de la URL para la petición
            const response = await api.post(
                `/api/landing-page/landing/create/${slug}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );

            if (response.data.success) {
                navigate('/AdminEvents/CreateEvent/Checkers', { 
                    state: { eventId, eventName } 
                });
            }

        } catch (error) {
            const errorMessage = error.response?.data?.message || 
                                error.message || 
                                "Error al crear la landing page";
            
            addToast({
                color: "danger",
                icon: <Info strokeWidth={2} className="w-5 h-5"/>,
                title: "Error",
                description: errorMessage,
                timeout: 5000,
            });
        } finally {
            setLoading(false);
        }
    };

    return (      
        <div className="h-full flex-1 lg:ml-12 xl:mx-20 py-6 flex flex-col text-text-50 bg-bg-50 dark:text-text-950 dark:bg-bg-950">
            <div className="flex-1 min-h-0 flex flex-col px-2">
                <div className="flex flex-col gap-4 pt-6">
                    <div className="flex justify-between gap-3 items-start">
                        <div>
                            <h1 className="text-4xl font-bold pb-2">Imágenes del Evento</h1>
                            <p className="text-sm">Evento: {eventName}</p>
                            <p className="text-xs text-primary-500">URL: /{slug}</p>
                        </div>
                        <div>
                            <Tabs key="md" aria-label="Tabs sizes" size="sm" radius="md" variant="bordered">
                                <Tab key="evento" title="Evento" />
                                <Tab key="checadores" title="Checadores" />
                                <Tab key="talleres" title="Talleres" />
                            </Tabs>
                        </div>
                    </div>
                </div>
                
                <div className="flex-1 min-h-0 overflow-hidden mt-12 pb-6">
                    <div className="h-full overflow-y-auto">
                        <div className="grid grid-cols-1 mx-2">
                            <div className="grid grid-cols-3 gap-4">
                                <div className="col-span-1">
                                    <Input
                                        name="logo"
                                        type="file"
                                        className="w-full pb-6"
                                        variant="bordered"
                                        label="Logo del evento"
                                        labelPlacement="outside"
                                        size="md"
                                        radius="md"
                                        accept=".jpg,.jpeg,.png"
                                        isRequired
                                        onChange={handleLogoChange}
                                        classNames={{
                                            input: "cursor-pointer file:text-text-50 file:bg-bg-50 dark:file:text-text-950 dark:file:bg-bg-950",
                                            inputWrapper: "border-dashed",
                                        }}
                                        startContent={<ImageUp strokeWidth={2} className="w-5 h-5" />}
                                    />

                                    {logoPreview && (
                                        <div className="mt-2">
                                            <p className="text-sm mb-2">Vista previa:</p>
                                            <Image
                                                src={logoPreview}
                                                alt="Logo del evento"
                                                radius="md"
                                                className="object-cover w-full h-36"
                                            />
                                        </div>
                                    )}
                                </div>
                                
                                <div className="col-span-2">
                                    <Input
                                        type="file"
                                        className="w-full pb-6"
                                        variant="bordered"
                                        label="Galería (máx. 3)"
                                        labelPlacement="outside"
                                        size="md"
                                        radius="md"
                                        accept=".jpg,.jpeg,.png"
                                        multiple
                                        onChange={handleGalleryChange}
                                        isDisabled={galleryPreviews.length >= 3}
                                        classNames={{
                                            input: "cursor-pointer file:text-text-50 file:bg-bg-50 dark:file:text-text-950 dark:file:bg-bg-950",
                                            inputWrapper: "border-dashed",
                                        }}
                                        startContent={<ImageUp strokeWidth={2} className="w-5 h-5" />}
                                    />

                                    {galleryPreviews.length > 0 && (
                                        <div className="mt-4">
                                            <p className="text-sm mb-2">Previsualización:</p>
                                            <div className="flex flex-wrap gap-4">
                                                {galleryPreviews.map((url, index) => (
                                                    <div key={index} className="relative group">
                                                        <Image
                                                            src={url}
                                                            alt={`Galería ${index + 1}`}
                                                            radius="md"
                                                            className="object-cover w-48 h-32"
                                                        />
                                                        <Tooltip content="Eliminar">
                                                            <Button
                                                                isIconOnly
                                                                size="sm"
                                                                variant="flat"
                                                                color="danger"
                                                                className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                                                onPress={() => removeGalleryImage(index)}
                                                            >
                                                                <X className="w-4 h-4" />
                                                            </Button>
                                                        </Tooltip>
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
                                    color="default"
                                    startContent={<CircleArrowLeft strokeWidth={2} className="w-5 h-5"/>}
                                >
                                    Regresar
                                </Button> 
                                <Button 
                                    onPress={handleSubmit}
                                    className="font-bold"
                                    size="md"
                                    radius="md"
                                    variant="ghost"
                                    color="primary"
                                    isLoading={loading}
                                    startContent={!loading && <CircleArrowRight strokeWidth={2} className="w-5 h-5"/>}
                                >
                                    {loading ? 'Guardando...' : 'Continuar'}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}