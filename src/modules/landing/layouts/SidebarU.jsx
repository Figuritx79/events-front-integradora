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
  Image
} from "@heroui/react";
import { useAuth } from '../../auth/providers/AuthProvider';
import { getUser } from "../../auth/service/user.service";
import { Logout } from "../../global/components/Components";
import ProfileDrawer from "../../adminEvents/components/ProfileDrawer";

export default function Sidebar() {
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
            <div className="hidden rounded-r-3xl lg:flex w-[80px] h-full flex flex-col justify-between shadow-xl text-text-50 bg-bg-50 dark:text-text-950 dark:bg-bg-950 dark:dark dark:border-bg-900 dark:border ">
                <div className="justify-center flex">
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
                                                    </div>
                    
                                                </ListboxItem>
                                            </ListboxSection>
                                            <ListboxSection title="" className="text-xs px-2 pt-2 text-text-50 dark:text-text-950">
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
                                                    </div>
                                                </ListboxItem>
                                                <ListboxItem
                                                onPress={() => setIsDrawerOpen(true)}
                                                key="Perfil"
                                                href=""
                                                className=""
                                                color="light"
                                                >
                                                    <div className="flex items-center py-[2px]">
                                                        <CircleUser strokeWidth={2.5} className="w-5 h-5"/>
                                                    </div>
                                                </ListboxItem>
                                                </ListboxSection>
                                                </Listbox>
                </div>
                <div className="pt-6 pb-5 px-4 text-text-50 dark:text-text-950">
                    <Divider className="my-4"/>
                    <Logout isIconO={true}/>
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