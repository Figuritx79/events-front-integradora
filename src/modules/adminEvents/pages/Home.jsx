import React, { useEffect, useState } from "react";
import { CirclePlus, ImageUp, UserCheck, Users, UserX, } from "lucide-react";
import { Link, useNavigate } from 'react-router';
import {
    Button,
    Image,
    CardHeader,
    CardBody,
    CardFooter,
    Card,
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Pagination,
    getKeyValue,
    Chip,
} from "@heroui/react";
import { getCheckersByEvent, getEventByName, getEvents, getLandingByEvent } from "../service/Events.service";
import { Toast } from "../../global/components/Toast";
import { useAuth } from '../../auth/providers/AuthProvider';

export default function Event() {
    const { credentials } = useAuth();
    const navigate = useNavigate(); // Agregar hook de navegación
    const [loading, setLoading] = useState(true);
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getEvents(credentials.email);
                console.log(credentials.email)
                console.log(data)
                if (data) {
                    setEvents(data.result);
                    console.log(data.result)
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

    console.log(events)

    const classNames = React.useMemo(
        () => ({
            th: "font-bold text-sm text-text-50 bg-bg-100 dark:dark dark:text-text-950 dark:bg-bg-900",
            td: [
            // changing the rows border radius
            // first
            "group-data-[first=true]/tr:first:before:rounded-none",
            "group-data-[first=true]/tr:last:before:rounded-none",
            // middle
            "group-data-[middle=true]/tr:before:rounded-none",
            // last
            "group-data-[last=true]/tr:first:before:rounded-none",
            "group-data-[last=true]/tr:last:before:rounded-none",
            ],
            wrapper: "max-h-full overflow-y-auto px-2 text-text-50 bg-bg-50 dark:text-text-950 dark:bg-bg-950", // Ajuste principal
            table: "min-w-full text-text-50 bg-bg-50 dark:text-text-950 dark:bg-bg-950",
        }), [],
    );

    return (
        <>
        <div className="h-full flex flex-1 lg:ml-12 xl:mx-20 flex-col py-6 rounded-3xl justify-between shadow-xl text-text-50 bg-bg-50 dark:text-text-950 dark:bg-bg-950">
            <div className="flex-1 min-h-0 overflow-hidden">
                <div className="h-full overflow-y-auto px-12 py-6">
                   
                    <h1 className="text-5xl font-bold break-words pb-4 text-center">Bienvenido administrador</h1>
                    <h1 className="break-words pb-6 text-center">{events.length === 0 ? "Aún no tienes eventos creados" : "Algunos de tus eventos:"}</h1>

                    {events.length === 0 && (
                      <>
                        <h1 className="break-words pb-6 text-center">¡Empieza creando uno ahora mismo!</h1>
                        <div className="justify-center flex items-center">
                        <Button 
                            aria-label="Button registrar"
                            as={Link}
                            to="/AdminEvents/CreateEvent"
                            className="font-bold"
                            size="md"
                            radius="md"
                            variant="ghost"
                            color="primary"
                            startContent={<CirclePlus strokeWidth={2} className="w-5 h-5"/>}>
                            Registrar evento
                        </Button>
                        </div>
                      </>
                    )}

                    {events.length !== 0 && (
                      <>
                        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-4 gap-6 py-6">
                            {events.slice(0, 12).map((event) => (
                                <Card isPressable onPress={() => navigate(`/AdminEvents/Event/${event.name}`)} isFooterBlurred className="border-none max-w-full" radius="lg" shadow="lg">
                                <Image
                                    alt={event.name}
                                    className="object-cover"
                                    src={event.frontPage}
                                    radius="lg"
                                    shadow="md"
                                    width={300}
                                    height={300}
                                />
                                
                                <CardHeader className="justify-start before:bg-white/10 py-1 absolute before:rounded-xl rounded-large w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                                    <h1 className="font-bold mt-2">{event.status ? "🟢 " : "🔴 " }{event.name}</h1>
                                </CardHeader>

                                <CardFooter className="justify-start before:bg-white/10 py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                                    <div className="flex flex-col gap-1">
                                        <div className="grid grid-cols-1">
                                            <div>
                                                <p className="text-sm">Inicia: {event.startDate}</p> 
                                                <p className="text-sm">Termina: {event.startDate}</p> 
                                            </div>
                                        </div>
                                    </div>
                                </CardFooter>
                              </Card>
                            ))}
                        </div>
                      </>
                    )}
                </div>
            </div>
        </div>
        </>
    );
}