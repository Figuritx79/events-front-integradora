import React, { useState, useEffect } from "react";
import { X, UserPlus, UserPen, UserX, UserCheck } from "lucide-react";
import { 
    Select,
    SelectItem,
    Button, 
    Input, 
    Drawer, 
    DrawerContent,
    DrawerHeader, 
    DrawerBody, 
    DrawerFooter
} from "@heroui/react";
import CheckersModal from "./CheckersModal"
import { createChecker } from "../service/Checkers.service"; // Importar función de API
import { useAuth } from '../../auth/providers/AuthProvider';
import { getEvents } from "../service/Events.service";
import { CheckersToast } from "./CheckersToast";
import { ButtonX, Spinner } from '../../global/components/Components';

const CheckersDrawer = ({
    action = "create",
    data = {},
    isOpen,
    onOpenChange,
    onConfirm,
}) => {
    const { credentials } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getEvents(credentials.email);
                if (data) {
                    setEvents(data.result);
                    setSuccess(true);
                    console.log(data)
                } else {
                    setError("No se pudieron obtener los datos");
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleModalConfirm = () => {
        setIsModalOpen(false);
        if(action === "read"){
            handleClose();
        }
    };

    const [formData, setFormData] = useState({
        name: "",
        lastname: "",
        email: "",
        phone: "",
        idEvent: ""
    });

    // Resetear datos al abrir/cerrar el drawer
    useEffect(() => {
        if (isOpen) {
            setFormData({
                name: data.name || "",
                lastname: data.lastname || "",
                email: data.email || "",
                phone: data.phone || "",
                idEvent: ""
            });
        }
    }, [isOpen, data.name, data.lastname, data.email, data.phone]);

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleClose = () => {
        onOpenChange(false);
        // Resetear a los valores originales
        setFormData({
            name: data.name || "",
            lastname: data.lastname || "",
            email: data.email || "",
            phone: data.phone || ""
        });
    };

    const handleSubmit = async () => {
        if (action !== "create") return;
        
        setIsSubmitting(true);
        
        try {
            const result = await createChecker(credentials.email, formData);
            
            if (result) {
                CheckersToast({
                    onConfirm: () => {
                        onConfirm({
                            action,
                            data: formData
                        });
                        handleClose();
                    },
                    action: "create",
                    isSuccess: true
                });
            } else {
                // Esto maneja casos donde la API devuelve un status diferente a 200
                CheckersToast({
                    action: "create",
                    isSuccess: false
                });
            }
        } catch (error) {
            CheckersToast({
                action: "create",
                isSuccess: false,
                errorMessage: error.message // Pasa el mensaje de error específico
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const actionConfig = {
        create: {
            title: "Registrar checador",
            icon: <UserPlus strokeWidth={2} className="w-5 h-5" />,
            buttonLabel: "Registrar",
            placeholders: {
                name: "Ingresa su nombre",
                lastname: "Ingresa su apellido",
                email: "Ingresa su correo electrónico",
                phone: "Ingresa su teléfono"
            }
        },
        update: {
            title: "Actualizar checador",
            icon: <UserPen strokeWidth={2} className="w-5 h-5" />,
            buttonLabel: "Actualizar",
            placeholders: {
                name: data.name || "Nombre actual",
                lastname: data.lastname || "Apellido actual",
                email: data.email || "Correo actual",
                phone: data.phone || "Teléfono actual"
            }
        },
        read: {
            title: "Detalles del checador",
            placeholders: {}
        }
    };

    const { title: actionTitle, icon, buttonLabel, placeholders } = actionConfig[action];

    return (
        <>
        <Drawer 
            isOpen={isOpen} 
            onOpenChange={onOpenChange} 
            size="sm" 
            backdrop="opaque" 
            placement="right" 
            hideCloseButton
            className="text-text-50 bg-bg-50 dark:dark dark:text-text-950 dark:bg-bg-950"
            motionProps={{ 
                variants: {
                    enter: { opacity: 1, x: 0, duration: 0.3 },
                    exit: { opacity: 0, x: 100, duration: 0.3 },
                },
            }}>
            <DrawerContent>
                <DrawerHeader className="place-content-between pt-10 pb-6 text-4xl">
                    <h1 className="text-4xl font-bold">{actionTitle}</h1>
                    <ButtonX onPress={handleClose}/>
                </DrawerHeader>

                <DrawerBody>
                    <div className="flex-col items-center justify-center">
                        <Input
                            className="w-full pb-3"
                            size="md"
                            radius="md"
                            variant="bordered"
                            type="text"
                            placeholder={placeholders.name}
                            label="Nombre"
                            value={formData.name}
                            isReadOnly={action === 'read'}
                            onValueChange={(value) => handleInputChange('name', value)}
                            labelPlacement="outside"
                            isRequired={action !== 'read'}
                        />

                        <Input
                            className="w-full py-3"
                            size="md"
                            radius="md"
                            variant="bordered"
                            type="text"
                            placeholder={placeholders.lastname}
                            label="Apellido"
                            value={formData.lastname}
                            isReadOnly={action === 'read'}
                            onValueChange={(value) => handleInputChange('lastname', value)}
                            labelPlacement="outside"
                            isRequired={action !== 'read'}
                        />

                        <Input
                            className="w-full py-3"
                            size="md"
                            radius="md"
                            variant="bordered"
                            type="email"
                            placeholder={placeholders.email}
                            label="Correo electrónico"
                            value={formData.email}
                            isReadOnly={action === 'read'}
                            onValueChange={(value) => handleInputChange('email', value)}
                            labelPlacement="outside"
                            isRequired={action !== 'read'}
                        />

                        <Input
                            className="w-full py-3"
                            size="md"
                            radius="md"
                            variant="bordered"
                            type="tel"
                            placeholder={placeholders.phone}
                            label="Teléfono"
                            value={formData.phone}
                            isReadOnly={action === 'read'}
                            onValueChange={(value) => handleInputChange('phone', value)}
                            labelPlacement="outside"
                            isRequired={action !== 'read'}
                        />
                        {action === 'create' && (
                            <Select
                                aria-label="Select eventos"
                                label="Evento"
                                labelPlacement="outside"
                                isRequired
                                disallowEmptySelection
                                className="w-full"
                                selectionMode="single"
                                variant="bordered"
                                selectedKeys={formData.idEvent ? [formData.idEvent] : []}
                                onSelectionChange={(keys) => {
                                    const selectedKey = Array.from(keys)[0];
                                    handleInputChange('idEvent', selectedKey);
                                }}
                                classNames={{
                                    popoverContent: "text-text-50 bg-bg-50 dark:dark dark:text-text-950 dark:bg-bg-950", // Estilo para el popover
                                    //value: "text-primario-500 font-bold" // Estilo para el valor seleccionado
                                }}>
                                {events.map((event) => (
                                    <SelectItem key={event.id} value={event.id} className="text-text-50 bg-bg-50 dark:dark dark:text-text-950 dark:bg-bg-950">
                                        {event.name}
                                    </SelectItem>
                                ))}
                            </Select>
                        )}
                    </div>
                </DrawerBody>

                <DrawerFooter>
                    <div className="flex justify-between w-full items-center gap-4">
                    {action !== 'create' && (
                        <Button 
                            fullWidth
                            variant="bordered"
                            color={data.status === "activo" ? "danger" : "success"}
                            onPress={() => setIsModalOpen(true)}
                            startContent={ data.status  === "activo" ? 
                                <UserX strokeWidth={2} className="w-5 h-5"/> 
                                : <UserCheck strokeWidth={2} className="w-5 h-5"/>
                            }>
                            { data.status === "activo" ? "Inhabilitar" : "Habilitar"}
                        </Button>
                    )}
                    {action !== 'read' && (
                        <Button 
                            isLoading={isSubmitting}
                            spinner={<Spinner/>}
                            fullWidth
                            color="secondary"
                            variant="ghost"
                            onPress={handleSubmit}
                            className="font-bold"
                            startContent={isSubmitting ? "" : icon}>
                            {buttonLabel}
                        </Button>
                    )}
                    </div>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>

        <CheckersModal
            isOpen={isModalOpen}
            onClose={handleModalConfirm}
            onConfirm={handleModalConfirm}
            isEnabled={data.status === "activo"}
            data={data}
        />
        </>
    );
};

export default CheckersDrawer;