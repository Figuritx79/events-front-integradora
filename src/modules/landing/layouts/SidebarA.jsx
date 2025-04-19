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

export default function SidebarA() {
    const navigate = useNavigate(); // Agregar hook de navegación
    const location = useLocation(); 
    const { credentials } = useAuth();
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
                            to="/Admin" viewTransition
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
                                        color={location.pathname === "/Admin" ? "primary" : ""}
                                        className={location.pathname === "/Admin" ? "" : "text-text-50 bg-bg-100 dark:text-text-950 dark:bg-bg-900"}>
                                        <House strokeWidth={2} className="w-5 h-5"/>                                    
                                    </Button>
                                    <p className={`font-bold pl-2 ${location.pathname === "/Admin" ? "text-primary" : "" }`}>Inicio</p>
                                </div>

                            </ListboxItem>
                            <ListboxItem
                            key="Users"
                            as={Link}
                            to="/Admin/Users" viewTransition
                            className=""
                            color="light"
                            >
                                <div className="flex items-center ">
                                    <Button
                                        isIconOnly
                                        fullWidth
                                        aria-label="Button users"
                                        size="sm"
                                        radius="sm"
                                        variant="flat"
                                        color={location.pathname.startsWith("/Admin/Users") || location.pathname.startsWith("/Admin/Users") ? "primary" : ""}
                                        className={location.pathname.startsWith("/Admin/Users") || location.pathname.startsWith("/Admin/Users") ? "" : "text-text-50 bg-bg-100 dark:text-text-950 dark:bg-bg-900"}>
                                        <Users strokeWidth={2} className="w-5 h-5"/>                                    
                                    </Button>
                                    <p className={`font-bold pl-2 ${location.pathname.startsWith("/Admin/Users") || location.pathname.startsWith("/Admin/Users") ? "text-primary" : "" }`}>Usuarios</p>
                                </div>
                            </ListboxItem>
                        </ListboxSection>
                    </Listbox>
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
