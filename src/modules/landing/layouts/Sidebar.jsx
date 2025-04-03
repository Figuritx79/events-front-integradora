import React, { useState, useEffect } from "react";
import { getEvents } from '../../adminEvents/service/Events.service';
import logo from '/icon.svg'
import { CircleUser, House, Users, MapPinned } from "lucide-react";
import { Link } from 'react-router';
import {
  Tooltip,
  Listbox, 
  ListboxItem,
  ListboxSection,
  Divider,
} from "@heroui/react";
import { useAuth } from '../../auth/providers/AuthProvider';

export default function Sidebar() {
    const { credentials } = useAuth();
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getEvents(credentials.email);
                if (data) {
                    setEvents(data.result);
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

    return (
        <>
            <div className="hidden lg:flex w-[220px] h-full flex flex-col justify-between rounded-r-2xl border border-bg-200 text-text-50 bg-bg-50 dark:text-text-950 dark:bg-bg-950 dark:dark dark:border-bg-900">
                <div className="">
                    <Listbox aria-label="Menu" className="">
                        <ListboxSection className="px-2 text-text-50 dark:text-text-950">
                            <ListboxItem
                            as={Link}
                            to="/" viewTransition
                            key="UpEvent"
                            href=""
                            className=""
                            color="light"
                            >
                                <div className="flex items-center pt-4">
                                    <img src={logo} alt="" className="w-7 h-7"/>
                                    <p className="pl-2 text-xl font-bold">UpEvent</p>
                                </div>
                            </ListboxItem>
                        </ListboxSection>
                        <ListboxSection title="Tus páginas" className="text-xs px-2 pt-2 text-text-50 dark:text-text-950">
                            <ListboxItem
                            as={Link}
                            to="/AdminEvents" viewTransition
                            key="Inicio"
                            href=""
                            className=""
                            color="light"
                            >
                                <div className="flex items-center py-[2px]">
                                    <House strokeWidth={2.5} className="w-5 h-5"/>
                                    <p className="pl-2 font-bold">Inicio</p>
                                </div>
                            </ListboxItem>
                            <ListboxItem
                            as={Link}
                            to="/AdminEvents/Profile" viewTransition
                            key="Perfil"
                            href=""
                            className=""
                            color="light"
                            >
                                <div className="flex items-center py-[2px]">
                                    <CircleUser strokeWidth={2.5} className="w-5 h-5"/>
                                    <p className="pl-2 font-bold">Perfil</p>
                                </div>
                            </ListboxItem>
                            <ListboxItem
                            key="Eventos"
                            as={Link}
                            to="/AdminEvents/Events" viewTransition
                            className=""
                            color="light"
                            >
                                <div className="flex items-center py-[2px]">
                                    <MapPinned strokeWidth={2.5} className="w-5 h-5"/>
                                    <p className="pl-2 font-bold">Eventos</p>
                                </div>
                            </ListboxItem>
                            <ListboxItem
                            as={Link}
                            to="/AdminEvents/Checkers" viewTransition
                            key="Checadores"
                            href=""
                            className=""
                            color="light"
                            >
                                <div className="flex items-center py-[2px]">
                                    <Users strokeWidth={2.5} className="w-5 h-5"/>
                                    <p className="pl-2 font-bold">Checadores</p>
                                </div>
                            </ListboxItem>
                        </ListboxSection>
                    </Listbox>

                    <div className="px-4 pt-2 text-text-500 dark:text-text-500">
                        <p className="text-xs">Tus eventos</p>
                    </div>
                </div>

                <div className="flex-1 min-h-0 overflow-hidden"> {/* Espacio restante */}
                    <div className="h-full overflow-y-auto px-2">
                        <Listbox 
                        aria-label="Eventos" 
                        //onAction={(key) => alert(key)} 
                        className="">
                            <ListboxSection title="">
                            {events.length === 0 ? 
                            <ListboxItem
                                className="text-sm"
                                color="light"
                                > 
                                <p className="text-xs">No tienes eventos por ahora</p> 
                            </ListboxItem>:
                            events.map((event, index) => (
                                <ListboxItem
                                key={event.name} // Usa un key único para cada elemento
                                className="text-sm"
                                color="light"
                                >
                                    <Tooltip
                                    placement="top" delay={1000} radius="md" size="md" className="text-text-50 bg-bg-100 dark:text-text-950 dark:bg-bg-900 dark:dark"
                                    content={
                                        <div className="p-2 w-48">
                                            <div className="text-xs">
                                                {event.name}
                                            </div>
                                        </div>
                                    }>
                                        <div className="flex items-center py-[2px]">
                                            <img src={logo} className="w-5 h-5" alt="Logo" />
                                            <p className="pl-2 line-clamp-1 break-words w-[185px] text-text-50 dark:text-text-950">
                                            {event.name}
                                            </p>
                                        </div>
                                    </Tooltip>
                                </ListboxItem>
                            ))}
                            </ListboxSection>
                        </Listbox>
                    </div>
                </div>
                <div className="pt-4 pb-5 px-4 text-text-50 dark:text-text-950">
                    <Divider className="my-2"/>
                    <p className="text-xl font-bold"></p>
                    <p className="text-xs">{credentials.email}</p>
                </div>
            </div>
        </>
    ); 
}