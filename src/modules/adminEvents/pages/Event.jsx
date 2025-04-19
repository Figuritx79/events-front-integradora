import React, { useEffect, useState } from "react";
import { ImageUp, UserCheck, Users, UserX, } from "lucide-react";
import { useParams } from 'react-router';
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
import { getCheckersByEvent, getEventByName, getLandingByEvent, getUsersListByEvent } from "../service/Events.service";
import { Toast } from "../../global/components/Toast";

export default function Event() {
    const { eventName } = useParams();
    const [refreshTrigger, setRefreshTrigger] = useState(false);
    const [loading, setLoading] = useState(true);
    const [ event, setEvent ] = useState({});
    const [ landing, setLanding ] = useState({});
    const [ checkers, setCheckers ] = useState([]);
    const [ workshops, setWorkshops ] = useState([]);
    const [ users, setUsers ] = useState([]);

    const [page2, setPage2] = React.useState(1);
    const rowsPerPage2 = 5;
  
    const pages2 = Math.ceil(users.length / rowsPerPage2);
  
    const items2 = React.useMemo(() => {
        const start = (page2 - 1) * rowsPerPage2;
        const end = start + rowsPerPage2;
    
        return users.slice(start, end);
    }, [page2, users]);

    const [page, setPage] = React.useState(1);
    const rowsPerPage = 5;
  
    const pages = Math.ceil(checkers.length / rowsPerPage);
  
    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
    
        return checkers.slice(start, end);
    }, [page, checkers]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data1 = await getEventByName(eventName);
                const data2 = await getLandingByEvent(data1.result.id);
                const data3 = await getCheckersByEvent(data1.result.id);
                const data4 = await getUsersListByEvent(data1.result.id);
                console.log(data1.result.id)
                console.log(data4)
                if (data1 && data2 && data3) {
                    setEvent(data1.result);
                    setWorkshops(data1.result.workshops)
                    setLanding(data2.result)
                    setCheckers(data3.result)
                    if (data4){
                        setUsers(data4.result)
                    }else {
                        setUsers([null])
                    }
                } else {
                    Toast({
                        color: "danger",
                        title: "No se pudieron obtener los datos del evento",
                        description: ""
                    });
                }
            } catch (err) {
                Toast({
                    color: "danger",
                    title: "No se pudieron obtener los datos del evento",
                    description: err.message
                });
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [eventName]);

    console.log(event)
    console.log(landing)
    console.log(workshops)
    console.log(checkers)
    console.log(users)

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
                   
                    <h1 className="text-5xl font-bold break-words pb-12 text-center">{eventName}</h1>
                    <h1 className="break-words pb-6 text-center">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</h1>
                    <h1 className="font-bold break-words pb-6 text-center">
                        {event.status ? "🟢" : "🔴" }
                        {new Date(event.startDate).toLocaleDateString()} - {" "}
                        {new Date(event.endDate).toLocaleDateString()} 
                    </h1>

                    <div className="grid grid-cols-5 gap-4 pt-12">

                        <div className="col-span-3">
                            <Image
                                isBlurred
                                alt={eventName}
                                className="object-cover"
                                width="100%"
                                height={500}
                                src={event.frontPage}
                                radius="lg"
                                shadow="lg"
                            />
                        </div>

                        <div className="grid gap-4 col-span-2">
                            <div>
                                <Image
                                    isBlurred
                                    isZoomed
                                    alt={eventName}
                                    className="object-cover"
                                    width="100%"
                                    height={300}
                                    src={landing.galleryJson?.gallery1}
                                    radius="lg"
                                    shadow="lg"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Image
                                        isBlurred
                                        isZoomed
                                        alt={eventName}
                                        className="object-cover"
                                        width="100%"
                                        height={185}
                                        src={landing.galleryJson?.gallery2}
                                        radius="lg"
                                        shadow="lg"
                                    />
                                </div>
                                <div>
                                    <Image
                                        isBlurred
                                        isZoomed
                                        alt={eventName}
                                        className="object-cover"
                                        width="100%"
                                        height={185}
                                        src={landing.galleryJson?.gallery3}
                                        radius="lg"
                                        shadow="lg"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <h1 className="text-5xl font-bold break-words pb-12 text-center pt-20">Talleres</h1>

                    <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-4 gap-6 py-6">
                        {workshops.map((workshop) => (
                            <Card isFooterBlurred className="border-none max-w-full" radius="lg" shadow="lg">
                            <Image
                                alt={workshop.name}
                                className="object-cover"
                                src={workshop.image}
                                radius="lg"
                                shadow="md"
                                width="100%"
                                height={300}
                            />

                            <CardFooter className="justify-start before:bg-white/10 py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                                <div className="flex flex-col gap-1">
                                    <div className="grid grid-cols-6 justify-between flex">
                                        <div className="col-span-5">
                                            <h1 className="font-bold">{workshop.status ? "🟢 " : "🔴 " }{workshop.name}</h1>
                                            <p className="text-sm">Por: {workshop.speakerInfo?.speaker_name}</p> 
                                            <p className="text-sm">Hora: {new Date(`2000-01-01T${workshop.hour}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                        </div>

                                        <div className="col-span-1 flex items-center space-x-1">
                                            <Users strokeWidth={2} className="w-4 h-4" /> 
                                            <p className="text-xs">{workshop.capacity}</p> 
                                        </div>
                                    </div>
                                </div>
                            </CardFooter>
                          </Card>
                        ))}
                    </div>
                    
                    <h1 className="text-5xl font-bold break-words pb-12 text-center pt-20">Checadores</h1>

                    <Table
                    aria-label="Example table with client side pagination"
                    bottomContent={
                        <div className="flex w-full justify-center">
                        <Pagination
                            aria-label="Pagination tabla"
                            showControls
                            showShadow
                            classNames={{ cursor: "font-bold" }}
                            color="primary"
                            page={page}
                            total={pages}
                            variant="light"
                            onChange={(page) => setPage(page)}
                        />
                        </div>
                    }
                    classNames={classNames}
                    >
                    <TableHeader>
                        <TableColumn key="email">Correo</TableColumn>
                        <TableColumn key="name">Nombre</TableColumn>
                        <TableColumn key="lastname">Apellido</TableColumn>
                        <TableColumn key="phone">Teléfono</TableColumn>
                        <TableColumn key="status">Status</TableColumn>
                    </TableHeader>
                    <TableBody items={items}>
                        {(item) => (
                        <TableRow key={item.checker.name}>
                        {(columnKey) => (
                            <TableCell>
                                {columnKey === "status" ? (
                                    <Chip
                                    aria-label="Button status"
                                    className="text-sm"
                                    size="sm"
                                    variant="light"
                                    color={item.checker.status ? "success" : "danger" }
                                    startContent={item.checker.status ? (
                                        <UserCheck aria-label="Checker icon activo" strokeWidth={2} className="w-5 h-5"/>
                                            ) : (
                                        <UserX aria-label="Checker icon inactivo" strokeWidth={2} className="w-5 h-5"/>
                                    )}>
                                        {item.checker.status ? "Activo" : "Inactivo"}
                                    </Chip>
                                ) : (
                                    getKeyValue(item.checker, columnKey)
                                )}
                            </TableCell>
                        )}
                    </TableRow>
                        )}
                    </TableBody>
                    </Table>
                    
                    <h1 className="text-5xl font-bold break-words pb-12 text-center pt-20">Participantes</h1>

                    <Table
                    aria-label="Example table with client side pagination"
                    bottomContent={
                        <div className="flex w-full justify-center">
                        <Pagination
                            aria-label="Pagination tabla"
                            showControls
                            showShadow
                            classNames={{ cursor: "font-bold" }}
                            color="primary"
                            page={page2}
                            total={pages2}
                            variant="light"
                            onChange={(page2) => setPage2(page2)}
                        />
                        </div>
                    }
                    classNames={classNames}
                    >
                    <TableHeader>
                        <TableColumn key="email">Correo</TableColumn>
                        <TableColumn key="name">Nombre</TableColumn>
                        <TableColumn key="lastname">Apellido</TableColumn>
                        <TableColumn key="phone">Teléfono</TableColumn>
                        <TableColumn key="status">Status</TableColumn>
                    </TableHeader>
                    <TableBody items={items2}>
                        {(item) => (
                        <TableRow key={item.user.name}>
                        {(columnKey) => (
                            <TableCell>
                                {columnKey === "status" ? (
                                    <Chip
                                    aria-label="Button status"
                                    className="text-sm"
                                    size="sm"
                                    variant="light"
                                    color={item.user.status ? "success" : "danger" }
                                    startContent={item.user.status ? (
                                        <UserCheck aria-label="Checker icon activo" strokeWidth={2} className="w-5 h-5"/>
                                            ) : (
                                        <UserX aria-label="Checker icon inactivo" strokeWidth={2} className="w-5 h-5"/>
                                    )}>
                                        {item.user.status ? "Asistió" : "No asistió"}
                                    </Chip>
                                ) : (
                                    getKeyValue(item.user, columnKey)
                                )}
                            </TableCell>
                        )}
                    </TableRow>
                        )}
                    </TableBody>
                    </Table>
                </div>
            </div>
        </div>
        </>
    );
}