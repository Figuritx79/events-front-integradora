import React, { useState, useEffect } from "react";
import { getEvents } from '../../adminEvents/service/Events.service';
import logo from '/icon.svg'
import { User, House, Users, MapPinned } from "lucide-react";
import { Link, useLocation, useNavigate } from 'react-router';
import {
  Tooltip,
  Listbox, 
  ListboxItem,
  ListboxSection,
  Divider,
  Image,
  Button
} from "@heroui/react";
import { useAuth } from '../../auth/providers/AuthProvider';
import { getUser } from "../../auth/service/user.service";
import { Logout, Profile } from "../../global/components/Components";
import ProfileDrawer from "../../adminEvents/components/ProfileDrawer";

export default function Sidebar() {
    const navigate = useNavigate(); // Agregar hook de navegación
    const location = useLocation(); 
    const { credentials } = useAuth();
    const [events, setEvents] = useState([]);
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [refreshTrigger, setRefreshTrigger] = useState(false);

    const handleDrawerConfirm = ({ data }) => {
        setUser(prev => ({ ...prev, ...data }));
        setRefreshTrigger(prev => !prev); // ¡Invierte el valor para disparar el efecto!
        setIsDrawerOpen(false);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getEvents(sessionStorage.getItem("email"));
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
    }, [refreshTrigger]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getUser(sessionStorage.getItem("email"));
                if (data) {
                    setUser(data.result);
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
    }, [refreshTrigger]);

    return (
        <>
            <div className="hidden rounded-r-3xl lg:flex w-[220px] h-full flex flex-col justify-between shadow-xl text-text-50 bg-bg-50 dark:text-text-950 dark:bg-bg-950 dark:dark dark:border-bg-900 dark:border ">
                <div>
                    <div className="flex items-center p-4">
                        <img src={logo} alt="" className="w-8 h-8"/>
                        <p className="pl-2 text-xl font-bold">UpEvent</p>
                    </div>

                    <div className="px-4 pt-2 text-text-500 dark:text-text-500">
                        <p className="text-xs">Tus páginas</p>
                    </div>

                    <Listbox aria-label="Menu" className="px-2">
                        <ListboxSection>
                            <ListboxItem
                            as={Link}
                            to="/AdminEvents" viewTransition
                            key="Inicio"
                            href=""
                            className=""
                            color="light"
                            >
                                

                                <div className="flex items-center ">
                                    <Button
                                        isIconOnly
                                        fullWidth
                                        aria-label="Button Inicio"
                                        size="sm"
                                        radius="sm"
                                        variant="flat"
                                        color={location.pathname === "/AdminEvents" ? "primary" : ""}
                                        className={location.pathname === "/AdminEvents" ? "" : "text-text-50 bg-bg-100 dark:text-text-950 dark:bg-bg-900"}>
                                        <House strokeWidth={2} className="w-5 h-5"/>                                    
                                    </Button>
                                    <p className={`font-bold pl-2 ${location.pathname === "/AdminEvents" ? "text-primary" : "" }`}>Inicio</p>
                                </div>

                            </ListboxItem>
                            <ListboxItem
                            key="Eventos"
                            as={Link}
                            to="/AdminEvents/Events" viewTransition
                            className=""
                            color="light"
                            >
                                <div className="flex items-center ">
                                    <Button
                                        isIconOnly
                                        fullWidth
                                        aria-label="Button Inicio"
                                        size="sm"
                                        radius="sm"
                                        variant="flat"
                                        color={location.pathname.startsWith("/AdminEvents/Events") || location.pathname.startsWith("/AdminEvents/CreateEvent") ? "primary" : ""}
                                        className={location.pathname.startsWith("/AdminEvents/Events") || location.pathname.startsWith("/AdminEvents/CreateEvent") ? "" : "text-text-50 bg-bg-100 dark:text-text-950 dark:bg-bg-900"}>
                                        <MapPinned strokeWidth={2} className="w-5 h-5"/>                                    
                                    </Button>
                                    <p className={`font-bold pl-2 ${location.pathname.startsWith("/AdminEvents/Events") || location.pathname.startsWith("/AdminEvents/CreateEvent") ? "text-primary" : "" }`}>Eventos</p>
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
                                <div className="flex items-center ">
                                    <Button
                                        isIconOnly
                                        fullWidth
                                        aria-label="Button Inicio"
                                        size="sm"
                                        radius="sm"
                                        variant="flat"
                                        color={location.pathname.startsWith("/AdminEvents/Checkers") ? "primary" : ""}
                                        className={location.pathname.startsWith("/AdminEvents/Checkers") ? "" : "text-text-50 bg-bg-100 dark:text-text-950 dark:bg-bg-900"}>
                                        <Users strokeWidth={2} className="w-5 h-5"/>                                    
                                    </Button>
                                    <p className={`font-bold pl-2 ${location.pathname.startsWith("/AdminEvents/Checkers") ? "text-primary" : "" }`}>Checadores</p>
                                </div>
                            </ListboxItem>
                        </ListboxSection>
                    </Listbox>

                    <div className="px-4 pt-2 text-text-500 dark:text-text-500">
                        <p className="text-xs">Tus eventos</p>
                    </div>
                </div>

                <div className="flex-1 min-h-0 overflow-hidden"> {/* Espacio restante */}
                    <div className="h-full overflow-y-auto px-1">
                        {
                            events.length === 0 ? 
                            <div className="px-4 pt-2">
                                <p className="text-xs">No tienes eventos por ahora</p>
                            </div> :

                            <Listbox 
                            aria-label="Eventos" 
                            //onAction={(key) => alert(key)} 
                            className="">
                                <ListboxSection title="">
                                {
                                events.map((event) => (
                                    <ListboxItem
                                    onPress={() => navigate(`/AdminEvents/Event/${event.name}`)}
                                    key={event.id} // Usa un key único para cada elemento
                                    className="text-sm"
                                    color="light"
                                    >
                                        <Tooltip
                                        placement="top" delay={1000} radius="md" size="md" className="text-text-50 bg-bg-100 dark:text-text-950 dark:bg-bg-900 dark:dark"
                                        content={
                                            <div className="p-2 w-48 flex items-center">
                                                <div className="w-12">
                                                <Image
                                                    src={event.frontPage}
                                                    alt="Vista previa"
                                                    isZoomed
                                                    isBlurred
                                                    radius="none"
                                                    className="object-cover w-12 h-full"
                                                />
                                                </div>
                                                <div className="w-36">
                                                <p className="text-xs pl-2 break-words text-text-50 dark:text-text-950">
                                                {event.name}
                                                </p>
                                                </div>
                                            </div>
                                        }>
                                            <div className="flex items-center">
                                                <div className="w-10">
                                                <Image
                                                    isBlurred
                                                    src={event.frontPage}
                                                    alt="Vista previa"
                                                    width={32}
                                                    height={32}
                                                    radius="none"
                                                    className="object-cover rounded-md shadow-xl"
                                                />
                                                </div>
                                                <p className="font-bold line-clamp-1 break-words w-[150px]">
                                                {event.name}
                                                </p>
                                            </div>
                                        </Tooltip>
                                    </ListboxItem>
                                ))}
                                </ListboxSection>
                            </Listbox>
                        }
                    </div>
                </div>
                <div className="pt-6 pb-5 px-4 text-text-50 dark:text-text-950">
                    <p className="text-base font-bold pb-1">{user.name + " " + user.lastname}</p>
                    <p className="text-xs break-words w-[200px]">{credentials.email}</p>
                    <Divider className="my-4"/>
                    <div className="space-x-3 flex">
                    <Profile isIconO={false} onPress={() => setIsDrawerOpen(true)}/>
                    <Logout isIconO/>
                    </div>
                </div>
            </div>

            <ProfileDrawer
                data={user}
                isOpen={isDrawerOpen}
                onOpenChange={setIsDrawerOpen}
                onConfirm={handleDrawerConfirm}
            />
        </>
    ); 
}
