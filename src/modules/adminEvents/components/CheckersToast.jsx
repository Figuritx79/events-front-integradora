import { addToast } from "@heroui/toast";
import { UserCheck, UserX } from "lucide-react";

export const CheckersToast = ({ 
    onConfirm, 
    action, 
    isSuccess,
    errorMessage 
}) => {
    // Mensajes según la acción
    const actionMessages = {
        enable: {
            success: 'habilitado',
            error: 'habilitar'
        },
        disable: {
            success: 'inhabilitado',
            error: 'inhabilitar'
        },
        create: {
            success: 'registrado',
            error: 'registrar'
        },
        update: {
            success: 'actualizado',
            error: 'actualizar'
        }
    };

    // Configuración del toast según éxito/error
    const toastConfig = isSuccess 
        ? {
            color: "success",
            icon: <UserCheck strokeWidth={2} className="w-5 h-5" />,
            title: `Checador ${actionMessages[action].success}`,
            description: `Se ${actionMessages[action].success} el checador exitosamente`
        }
        : {
            color: "danger",
            icon: <UserX strokeWidth={2} className="w-5 h-5" />,
            title: "Error en la operación",
            description: errorMessage || `No se pudo ${actionMessages[action].error} el checador`
        };

    // Mostrar el toast
    addToast(toastConfig);

    // Ejecutar callback de confirmación si existe
    if (onConfirm) onConfirm();
};