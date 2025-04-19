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
            <div className="hidden rounded-r-3xl lg:flex w-[75px] h-full flex flex-col justify-between shadow-xl text-text-50 bg-bg-50 dark:text-text-950 dark:bg-bg-950 dark:dark dark:border-bg-900 dark:border ">
                <div className="items-center flex flex-col">
                    <div className="flex items-center p-4">
                        <img src={logo} alt="" className="w-8 h-8"/>
                    </div>

                    <div className="flex items-center">
                    <Listbox aria-label="Menu" className="px-2">
                        <ListboxSection>
                            <ListboxItem
                            as={Link}
                            to="/User" viewTransition
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
                                        size="md"
                                        radius="sm"
                                        variant="flat"
                                        color={location.pathname === "/User" ? "primary" : ""}
                                        className={location.pathname === "/User" ? "" : "text-text-50 bg-bg-100 dark:text-text-950 dark:bg-bg-900"}>
                                        <House strokeWidth={2} className="w-5 h-5"/>                                    
                                    </Button>
                                </div>
                            </ListboxItem>
                        </ListboxSection>
                    </Listbox>
                    </div>
                </div>

                <div className="pt-6 pb-5 px-4 text-text-50 dark:text-text-950">
                    <Divider className="my-4"/>
                    <div className="flex-col flex gap-4">
                    <Profile isIconO onPress={() => setIsDrawerOpen(true)}/>
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
