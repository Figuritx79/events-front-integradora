/*import { addToast } from "@heroui/toast";
import { UserCheck, UserX } from "lucide-react";
// Importar tus funciones de API
import { 
  enableChecker,
  disableChecker,
  createChecker,
  updateChecker 
} from "../api/checkers"; // Ajusta la ruta según tu estructura

export const CheckersToast = async ({ 
    action, 
    data 
}) => {
    // Mapeo de acciones a funciones API
    const apiActions = {
        enable: enableChecker,
        disable: disableChecker,
        create: createChecker,
        update: updateChecker
    };

    // Mensajes de éxito
    const successMessages = {
        enable: 'habilitado',
        disable: 'inhabilitado',
        create: 'registrado',
        update: 'actualizado'
    };

    try {
        // Obtener la función correspondiente a la acción
        const apiFunction = apiActions[action];
        if (!apiFunction) throw new Error('Acción no válida');

        // Ejecutar la petición API
        const result = await apiFunction(data);

        // Mostrar toast de éxito
        addToast({
            color: "success",
            icon: <UserCheck strokeWidth={2} className="w-5 h-5"/>,
            description: `Se ${successMessages[action]} el checador exitosamente`,
            title: `Checador ${successMessages[action]}`
        });
        
    } catch (error) {
        // Mostrar toast de error
        addToast({
            color: "danger",
            icon: <UserX strokeWidth={2} className="w-5 h-5" />,
            description: `No se pudo ${successMessages[action]} el checador: ${error.message}`,
            title: 'Error en la operación'
        });
    }
};*/