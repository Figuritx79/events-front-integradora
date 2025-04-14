import React, { useState, useEffect } from "react";
import { CalendarCheck, X, UserCheck, Eye, EyeOff } from "lucide-react";
import { 
    Button, 
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Input,
    Select,
    SelectItem,
    DatePicker
} from "@heroui/react";
import { ButtonX, Spinner } from "../../global/components/Components";
import { inscribeToEvent } from "../service/Events.service";
import { useAuth } from '../../auth/providers/AuthProvider';
import { Toast } from "../../global/components/Toast";

const EventsModal = ({ 
    isOpen, 
    onClose, 
    onConfirm, 
    data = {},
    genderOptions = [],
    occupationOptions = []
}) => {
    const [formData, setFormData] = useState({
        birthDate: null,
        residence: '',
        genderId: '',
        occupationId: '',
        password: ''
    });
    
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { credentials } = useAuth();
    const [loadingOptions, setLoadingOptions] = useState(true);

    useEffect(() => {
        // Cargar opciones si no vienen por props
        if(genderOptions.length === 0 || occupationOptions.length === 0) {
            fetchOptions();
        }
    }, []);

    const fetchOptions = async () => {
        try {
            // Simular carga de opciones
            const genders = await fetch('/api/genders');
            const occupations = await fetch('/api/occupations');
            // setGenderOptions(await genders.json());
            // setOccupationOptions(await occupations.json());
        } finally {
            setLoadingOptions(false);
        }
    };

    const validateForm = () => {
        const newErrors = {};
        const today = new Date();

        if(!formData.birthDate) newErrors.birthDate = "Campo obligatorio";
        else if(new Date(formData.birthDate) >= today) {
            newErrors.birthDate = "La fecha debe ser en el pasado";
        }

        if(!formData.residence) newErrors.residence = "Campo obligatorio";
        if(!formData.genderId) newErrors.genderId = "Seleccione una opción";
        if(!formData.occupationId) newErrors.occupationId = "Seleccione una opción";
        if(!formData.password) newErrors.password = "Campo obligatorio";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInscription = async () => {
        if(!validateForm()) return;

        setIsSubmitting(true);
        try {
            const payload = {
                eventId: data.id,
                userId: credentials.id,
                ...formData,
                birthDate: new Date(formData.birthDate).toISOString(),
                genderId: Number(formData.genderId),
                occupationId: Number(formData.occupationId)
            };

            const result = await inscribeToEvent(payload);

            if(result.success) {
                Toast({
                    color: "success",
                    title: "¡Inscripción exitosa!",
                    description: `Datos registrados correctamente para ${data.name}`
                });
                onConfirm(true);
                onClose();
            }
        } catch (error) {
            Toast({
                color: "danger",
                title: "Error en inscripción",
                description: error.message
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Modal 
            isOpen={isOpen} 
            onClose={onClose} 
            size="lg" 
            backdrop="opaque"
            className="text-text-50 bg-bg-50 dark:dark dark:text-text-950 dark:bg-bg-950">
            
            <ModalContent>
                <ModalHeader className="pt-10 pb-6 text-4xl">
                    <h1 className="text-xl font-bold">Formulario de Inscripción</h1>
                    <ButtonX onPress={onClose}/>
                </ModalHeader>

                <ModalBody>
                    <div className="grid grid-cols-2 gap-4">
                        {/* Columna Izquierda - Datos del Evento */}
                        <div className="col-span-2 md:col-span-1 space-y-4">
                            <div className="flex items-center gap-2 mb-4">
                                <CalendarCheck className="w-6 h-6 text-primary-500"/>
                                <h2 className="text-lg font-semibold">{data.name}</h2>
                            </div>
                            
                            <div className="space-y-2">
                                <p><span className="font-semibold">Fechas:</span> {new Date(data.startDate).toLocaleDateString()} - {new Date(data.endDate).toLocaleDateString()}</p>
                                <p><span className="font-semibold">Ubicación:</span> {data.location}</p>
                            </div>
                        </div>

                        {/* Columna Derecha - Formulario */}
                        <div className="col-span-2 md:col-span-1 space-y-4">
                            <DatePicker
                                label="Fecha de Nacimiento*"
                                value={formData.birthDate}
                                onChange={(date) => setFormData({...formData, birthDate: date})}
                                errorMessage={errors.birthDate}
                                isInvalid={!!errors.birthDate}
                                maxDate={new Date()}
                            />

                            <Input
                                label="Residencia*"
                                value={formData.residence}
                                onValueChange={(value) => setFormData({...formData, residence: value})}
                                errorMessage={errors.residence}
                                isInvalid={!!errors.residence}
                            />

                            {loadingOptions ? (
                                <Spinner/>
                            ) : (
                                <>
                                    <Select
                                        label="Género*"
                                        selectedKeys={[formData.genderId]}
                                        onSelectionChange={(keys) => 
                                            setFormData({...formData, genderId: Array.from(keys)[0]})
                                        }
                                        errorMessage={errors.genderId}
                                        isInvalid={!!errors.genderId}
                                    >
                                        {genderOptions.map(gender => (
                                            <SelectItem key={gender.id} value={gender.id}>
                                                {gender.name}
                                            </SelectItem>
                                        ))}
                                    </Select>

                                    <Select
                                        label="Ocupación*"
                                        selectedKeys={[formData.occupationId]}
                                        onSelectionChange={(keys) => 
                                            setFormData({...formData, occupationId: Array.from(keys)[0]})
                                        }
                                        errorMessage={errors.occupationId}
                                        isInvalid={!!errors.occupationId}
                                    >
                                        {occupationOptions.map(occupation => (
                                            <SelectItem key={occupation.id} value={occupation.id}>
                                                {occupation.name}
                                            </SelectItem>
                                        ))}
                                    </Select>
                                </>
                            )}

                            <Input
                                label="Contraseña*"
                                type={showPassword ? "text" : "password"}
                                value={formData.password}
                                onValueChange={(value) => setFormData({...formData, password: value})}
                                errorMessage={errors.password}
                                isInvalid={!!errors.password}
                                endContent={
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="focus:outline-none"
                                    >
                                        {showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
                                    </button>
                                }
                            />
                        </div>
                    </div>
                </ModalBody>

                <ModalFooter className="flex justify-end gap-4 mt-6">
                    <Button 
                        variant="light" 
                        onPress={onClose}
                        startContent={<X size={18}/>}
                    >
                        Cancelar
                    </Button>
                    
                    <Button 
                        color="success"
                        isLoading={isSubmitting}
                        onPress={handleInscription}
                        startContent={<UserCheck size={18}/>}
                        isDisabled={isSubmitting || loadingOptions}
                    >
                        Completar Registro
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default EventsModal;