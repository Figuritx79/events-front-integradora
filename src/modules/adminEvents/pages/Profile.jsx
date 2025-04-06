import { 
    Button,
    Input 
} from "@heroui/react";
import { CircleArrowDown, KeyRound, UserPen } from "lucide-react";
import { Spinner } from "../../global/components/Components";

export default function Profile () {

    return (
    <>
            
    <div className="h-full flex-1 lg:ml-12 xl:mx-60 py-6 flex flex-col shadow-xl rounded-3xl text-text-50 bg-bg-50 dark:text-text-950 dark:bg-bg-950">
        <div className="flex-1 min-h-0 flex flex-col px-24 pt-6">
            {/* Encabezado */}
            <div className="text-center">
                <h1 className="text-4xl font-bold pb-8">Tu perfil</h1>
            </div>

            <div className="flex-1 min-h-0 overflow-hidden mt-6 pb-6 "> {/* Espacio restante */}
                <div className="h-full overflow-y-auto">
                    <div className="justify-between">  
                        <div className="flex space-x-6">
                        <Input
                            className="w-full pb-6"
                            size="md"
                            radius="md"
                            variant="bordered"
                            type="text"
                            placeholder="nombre"
                            label="Nombre"
                            value="nombre"
                            labelPlacement="outside"
                            classNames={{ label: "font-bold" }}
                        /> 
                        <Input
                            className="w-full pb-6"
                            size="md"
                            radius="md"
                            variant="bordered"
                            type="text"
                            placeholder="nombre"
                            label="Nombre"
                            value="nombre"
                            labelPlacement="outside"
                            classNames={{ label: "font-bold" }}
                        /> 
                        </div>
                        <Input
                            className="w-full pb-6"
                            size="md"
                            radius="md"
                            variant="bordered"
                            type="text"
                            placeholder="nombre"
                            label="Nombre"
                            value="nombre"
                            labelPlacement="outside"
                            classNames={{ label: "font-bold" }}
                        /> 
                        <Input
                            className="w-full pb-6"
                            size="md"
                            radius="md"
                            variant="bordered"
                            type="text"
                            placeholder="nombre"
                            label="Nombre"
                            value="nombre"
                            labelPlacement="outside"
                            classNames={{ label: "font-bold" }}
                        /> 
                        <Input
                            className="w-full pb-12"
                            size="md"
                            radius="md"
                            variant="bordered"
                            type="text"
                            placeholder="nombre"
                            label="Nombre"
                            value="nombre"
                            labelPlacement="outside"
                            classNames={{ label: "font-bold" }}
                        /> 

                        <div className="flex justify-between">
                        <Button 
                    aria-label="Button password"
                    className="font-bold"
                    size="md"
                    radius="md"
                    variant="bordered"
                    color="primary"
                    startContent={<KeyRound strokeWidth={2} className="w-5 h-5"/>}>
                    Actualizar contraseña
                </Button>

                            <Button 
                                //isLoading={isSubmitting}
                                spinner={<Spinner/>}
                                color="secondary"
                                variant="bordered"
                                //onPress={handleSubmit}
                                className="font-bold"
                                //startContent={isSubmitting ? "" : icon}
                                startContent={ <CircleArrowDown strokeWidth={2} className="w-5 h-5"/>}
                                >
                                Guardar cambios
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
    );
}
