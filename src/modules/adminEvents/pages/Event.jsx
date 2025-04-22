import React, { useEffect, useState } from "react";
import { CircleCheck, CircleX, ImageUp, Pen, Search, UserCheck, Users, UserX, } from "lucide-react";
import { useParams, useNavigate } from 'react-router';
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
    Tooltip,
    Tabs,
    Tab,
    Input,
    Select,
    SelectItem,
} from "@heroui/react";
import { getCheckersByEvent, getEventByName, getLandingByEvent, getUsersListByEvent } from "../service/Events.service";
import { Toast } from "../../global/components/Toast";
import EventsModal from "../components/EventsModal";
import { Spinner } from "../../global/components/Components";

export default function Event() {
    const navigate = useNavigate(); // Agregar hook de navegación
    const { eventName } = useParams();
    const [refreshTrigger, setRefreshTrigger] = useState(false);
    const [loading, setLoading] = useState(true);
    const [ event, setEvent ] = useState({});
    const [ landing, setLanding ] = useState({});
    const [ checkers, setCheckers ] = useState([]);
    const [ workshops, setWorkshops ] = useState([]);
    const [ users, setUsers ] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const INITIAL_VISIBLE_COLUMNS = ["indice", "name", "lastname", "phone", "status", "email"];
    const INITIAL_VISIBLE_COLUMNS2 = ["indice", "name", "lastname", "phone", "status", "email"];

    const columns = [
        {name: "Índice", uid: "indice", sortable: true},
        {name: "Correo", uid: "email", sortable: true},
        {name: "Nombre", uid: "name", sortable: true},
        {name: "Apellido", uid: "lastname", sortable: true},
        {name: "Teléfono", uid: "phone", sortable: true},
        {name: "Status", uid: "status"},
    ];    
    
    const columns2 = [
        {name: "Índice", uid: "indice", sortable: true},
        {name: "Correo", uid: "email", sortable: true},
        {name: "Nombre", uid: "name", sortable: true},
        {name: "Apellido", uid: "lastname", sortable: true},
        {name: "Teléfono", uid: "phone", sortable: true},
        {name: "Status", uid: "status"},
    ];    

    const statusOptions = [
        {name: "Asistió", uid: "activo"},
        {name: "No asistió", uid: "inactivo"},
    ];

    const statusOptions2 = [
        {name: "Activo", uid: "activo"},
        {name: "Inactivo", uid: "inactivo"},
    ];
    
    function capitalize(s) {
        return s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : "";
    }

    const [filterValue, setFilterValue] = React.useState("");
    const [filterValue2, setFilterValue2] = React.useState("");

    const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
    const [selectedKeys2, setSelectedKeys2] = React.useState(new Set([]));

    const [visibleColumns, setVisibleColumns] = React.useState(new Set(INITIAL_VISIBLE_COLUMNS));
    const [visibleColumns2, setVisibleColumns2] = React.useState(new Set(INITIAL_VISIBLE_COLUMNS));

    const [statusFilter, setStatusFilter] = React.useState("all");
    const [statusFilter2, setStatusFilter2] = React.useState("all");

    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [rowsPerPage2, setRowsPerPage2] = React.useState(5);

    const [sortDescriptor, setSortDescriptor] = React.useState({
        column: "indice",
        direction: "ascending",
    });

    const [sortDescriptor2, setSortDescriptor2] = React.useState({
        column: "indice",
        direction: "ascending",
    });
    
    const [page, setPage] = React.useState(1);
    const [page2, setPage2] = React.useState(1);

    const hasSearchFilter = Boolean(filterValue);

    const hasSearchFilter2 = Boolean(filterValue2);

    const headerColumns = React.useMemo(() => {
        if (visibleColumns === "all") return columns;
        
        return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
    }, [visibleColumns]);
    
    const headerColumns2 = React.useMemo(() => {
        if (visibleColumns2 === "all") return columns;
        
        return columns.filter((column) => Array.from(visibleColumns2).includes(column.uid));
    }, [visibleColumns2]);

    const filteredItems = React.useMemo(() => {
        let filteredUsers = [...users];
    
        if (hasSearchFilter) {
          filteredUsers = filteredUsers.filter((user) =>
            user.name.toLowerCase().includes(filterValue.toLowerCase()),
          );
        }
        if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
          filteredUsers = filteredUsers.filter((user) =>
            Array.from(statusFilter).includes(user.status),
          );
        }
    
        return filteredUsers;
    }, [users, filterValue, statusFilter]);
    
    const filteredItems2 = React.useMemo(() => {
        let filteredUsers = [...checkers];
    
        if (hasSearchFilter2) {
          filteredUsers = filteredUsers.filter((user) =>
            user.name.toLowerCase().includes(filterValue2.toLowerCase()),
          );
        }
        if (statusFilter2 !== "all" && Array.from(statusFilter2).length !== statusOptions2.length) {
          filteredUsers = filteredUsers.filter((user) =>
            Array.from(statusFilter2).includes(user.status),
          );
        }
    
        return filteredUsers;
    }, [checkers, filterValue2, statusFilter2]);

    const pages = Math.ceil(filteredItems.length / rowsPerPage);

    const pages2 = Math.ceil(filteredItems2.length / rowsPerPage2);
    
    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return filteredItems.slice(start, end);
    }, [page, filteredItems, rowsPerPage]);

    const items2 = React.useMemo(() => {
        const start = (page2 - 1) * rowsPerPage2;
        const end = start + rowsPerPage2;

        return filteredItems2.slice(start, end);
    }, [page2, filteredItems2, rowsPerPage2]);
    
    const sortedItems = React.useMemo(() => {
        return [...items].sort((a, b) => {
            const first = a[sortDescriptor.column];
            const second = b[sortDescriptor.column];
            const cmp = first < second ? -1 : first > second ? 1 : 0;
        
            return sortDescriptor.direction === "descending" ? -cmp : cmp;
        });
    }, [sortDescriptor, items]);
    console.log(sortedItems)
        
    const sortedItems2 = React.useMemo(() => {
        return [...items2].sort((a, b) => {
            const first = a[sortDescriptor2.column];
            const second = b[sortDescriptor2.column];
            const cmp = first < second ? -1 : first > second ? 1 : 0;
        
            return sortDescriptor2.direction === "descending" ? -cmp : cmp;
        });
    }, [sortDescriptor2, items2]);
    console.log(sortedItems2)

    const renderCell = React.useCallback((user, columnKey) => {
        const cellValue = user[columnKey];

        switch (columnKey) {
            case "email":
                return (
                    <p className="line-clamp-1 break-words xl:max-w-[300px] md:max-w-[150px] sm:max-w-[50px]">{cellValue}</p>
                );
            case "status":
                return (
                    <Chip
                    aria-label="Button status"
                    className="text-sm"
                    size="sm"
                    variant="light"
                    color={user.status === "activo" ? "success" : "danger" }
                    startContent={user.status === "activo" ? (
                        <UserCheck aria-label="Checker icon activo" strokeWidth={2} className="w-5 h-5"/>
                            ) : (
                        <UserX aria-label="Checker icon inactivo" strokeWidth={2} className="w-5 h-5"/>
                    )}>
                        {user.status === "activo" ? "Asistió" : "No asistió"}
                    </Chip>
                );
            default:
                return cellValue;
        }
    }, []);
        
    const renderCell2 = React.useCallback((user, columnKey) => {
        const cellValue = user[columnKey];

        switch (columnKey) {
            case "email":
                return (
                    <p className="line-clamp-1 break-words xl:max-w-[300px] md:max-w-[150px] sm:max-w-[50px]">{cellValue}</p>
                );
            case "status":
                return (
                    <Chip
                    aria-label="Button status"
                    className="text-sm"
                    size="sm"
                    variant="light"
                    color={user.status === "activo" ? "success" : "danger" }
                    startContent={user.status === "activo" ? (
                        <UserCheck aria-label="Checker icon activo" strokeWidth={2} className="w-5 h-5"/>
                            ) : (
                        <UserX aria-label="Checker icon inactivo" strokeWidth={2} className="w-5 h-5"/>
                    )}>
                        {user.status === "activo" ? "Activo" : "Inactivo"}
                    </Chip>
                );
            default:
                return cellValue;
        }
    }, []);

    const onRowsPerPageChange = React.useCallback((e) => {
        setRowsPerPage(Number(e.target.value));
        setPage(1);
    }, []);
    
    const onRowsPerPageChange2 = React.useCallback((e) => {
        setRowsPerPage2(Number(e.target.value));
        setPage2(1);
    }, []);

    const onSearchChange = React.useCallback((value) => {
        if (value) {
            setFilterValue(value);
            setPage(1);
        } else {
            setFilterValue("");
        }
    }, []);

    const onSearchChange2 = React.useCallback((value) => {
        if (value) {
            setFilterValue2(value);
            setPage2(1);
        } else {
            setFilterValue2("");
        }
    }, []);

    const handleModalConfirm = () => {
        setRefreshTrigger(prev => !prev); // ¡Invierte el valor para disparar el efecto!
        setIsModalOpen(false);
    };

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
                    const data = data1.result.workshops.map((item, index) => ({
                        ...item,
                        indice: index + 1,
                        status: item.status ? "activo" : "inactivo"
                    }));
                    setWorkshops(data)
                    setLanding(data2.result)
                    console.log(data3.result)
                    const dataCount = data3.result.map((item, index) => ({
                        ...item.checker,
                        indice: index + 1,
                        status: item.checker.status ? "activo" : "inactivo"
                    }));
                    setCheckers(dataCount)
                    if (data4){
                        const dataCount = data4.result.map((item, index) => ({
                            ...item.user,
                            indice: index + 1,
                            status: item.user.status ? "activo" : "inactivo"
                        }));
                        setUsers(dataCount)
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
    }, [eventName, refreshTrigger]);

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
            base: "h-full",
            table: "min-w-full text-text-50 bg-bg-50 dark:text-text-950 dark:bg-bg-950",
        }), [],
    );

    const topContent = React.useMemo(() => {
        return (
            <div className="flex flex-col gap-4 pb-6 pt-4">
                <div className="flex justify-between gap-3 items-end">
                    <h1 className="text-4xl font-bold">Participantes</h1>
                    <div className="flex gap-3">
                        <Input
                            aria-label="Input busqueda"
                            className="w-[220px]"
                            size="md"
                            radius="md"
                            variant="bordered"
                            placeholder="Buscar por nombre..."
                            isClearable
                            value={filterValue}
                            onClear={() => setFilterValue("")}
                            onValueChange={onSearchChange}
                            startContent={<Search className="text-default-300" />}
                        />

                        <Select
                            aria-label="Select filas"
                            disallowEmptySelection
                            className="w-[110px]"
                            defaultSelectedKeys={["5"]}
                            labelPlacement="outside-left"
                            variant="bordered"
                            onChange={onRowsPerPageChange}
                            renderValue={(items) => {
                                const selectedKey = items.values().next().value?.key;
                                return <p>Filas: {selectedKey}</p>;}
                            }
                            classNames={{
                                popoverContent: "text-text-50 bg-bg-50 dark:dark dark:text-text-950 dark:bg-bg-950", // Estilo para el popover
                                //value: "text-primario-500 font-bold" // Estilo para el valor seleccionado
                            }}>
                            <SelectItem key="5" value="5"  className="text-text-50 bg-bg-50 capitalize dark:dark dark:text-text-950 dark:bg-bg-950">5</SelectItem >
                            <SelectItem key="10" value="10"  className="text-text-50 bg-bg-50 capitalize dark:dark dark:text-text-950 dark:bg-bg-950">10</SelectItem>
                            <SelectItem key="15" value="15" className="text-text-50 bg-bg-50 capitalize dark:dark dark:text-text-950 dark:bg-bg-950">15</SelectItem >
                            <SelectItem key="20" value="20" className="text-text-50 bg-bg-50 capitalize dark:dark dark:text-text-950 dark:bg-bg-950">20</SelectItem >
                        </Select>

                        <Select
                            aria-label="Select filtro por status"
                            disallowEmptySelection
                            className="w-[110px]"
                            selectionMode="multiple"
                            closeOnSelect={false}
                            selectedKeys={statusFilter}
                            renderValue={() => <p>Status</p>}
                            variant="bordered"
                            onSelectionChange={setStatusFilter} 
                            classNames={{
                                popoverContent: "text-text-50 bg-bg-50 dark:dark dark:text-text-950 dark:bg-bg-950", // Estilo para el popover
                                //value: "text-primario-500 font-bold" // Estilo para el valor seleccionado
                            }}>
                            {statusOptions.map((status) => (
                                <SelectItem key={status.uid}  className="text-text-50 bg-bg-50 capitalize dark:dark dark:text-text-950 dark:bg-bg-950">
                                    {capitalize(status.name)}
                                </SelectItem>
                            ))}
                        </Select>

                        <Select
                            aria-label="Select columnas"
                            disallowEmptySelection
                            className="w-[120px]"
                            selectionMode="multiple"
                            closeOnSelect={false}
                            defaultSelectedKeys={visibleColumns}
                            renderValue={() => <p>Columnas</p>}
                            variant="bordered"
                            onSelectionChange={setVisibleColumns}
                            classNames={{
                                popoverContent: "text-text-50 bg-bg-50 dark:dark dark:text-text-950 dark:bg-bg-950", // Estilo para el popover
                                //value: "text-primario-500 font-bold" // Estilo para el valor seleccionado
                            }}>
                            {columns.map((column) => (
                                <SelectItem key={column.uid} className="text-text-50 bg-bg-50 capitalize dark:dark dark:text-text-950 dark:bg-bg-950" value={column.uid}>
                                    {capitalize(column.name)}
                                </SelectItem>
                            ))}
                        </Select>
                    </div>
                </div>
            </div>
        );
    }, [
        filterValue,
        statusFilter,
        visibleColumns,
        onSearchChange,
        onRowsPerPageChange,
        users.length,
        hasSearchFilter,
    ]);

    const topContent2 = React.useMemo(() => {
        return (
            <div className="flex flex-col gap-4 pb-6 pt-4">
                <div className="flex justify-between gap-3 items-end">
                    <h1 className="text-4xl font-bold">Checadores</h1>
                    <div className="flex gap-3">
                        <Input
                            aria-label="Input busqueda"
                            className="w-[220px]"
                            size="md"
                            radius="md"
                            variant="bordered"
                            placeholder="Buscar por nombre..."
                            isClearable
                            value={filterValue2}
                            onClear={() => setFilterValue2("")}
                            onValueChange={onSearchChange2}
                            startContent={<Search className="text-default-300" />}
                        />

                        <Select
                            aria-label="Select filas"
                            disallowEmptySelection
                            className="w-[110px]"
                            defaultSelectedKeys={["5"]}
                            labelPlacement="outside-left"
                            variant="bordered"
                            onChange={onRowsPerPageChange2}
                            renderValue={(items2) => {
                                const selectedKey = items2.values().next().value?.key;
                                return <p>Filas: {selectedKey}</p>;}
                            }
                            classNames={{
                                popoverContent: "text-text-50 bg-bg-50 dark:dark dark:text-text-950 dark:bg-bg-950", // Estilo para el popover
                                //value: "text-primario-500 font-bold" // Estilo para el valor seleccionado
                            }}>
                            <SelectItem key="5" value="5"  className="text-text-50 bg-bg-50 capitalize dark:dark dark:text-text-950 dark:bg-bg-950">5</SelectItem >
                            <SelectItem key="10" value="10"  className="text-text-50 bg-bg-50 capitalize dark:dark dark:text-text-950 dark:bg-bg-950">10</SelectItem>
                            <SelectItem key="15" value="15" className="text-text-50 bg-bg-50 capitalize dark:dark dark:text-text-950 dark:bg-bg-950">15</SelectItem >
                            <SelectItem key="20" value="20" className="text-text-50 bg-bg-50 capitalize dark:dark dark:text-text-950 dark:bg-bg-950">20</SelectItem >
                        </Select>

                        <Select
                            aria-label="Select filtro por status"
                            disallowEmptySelection
                            className="w-[110px]"
                            selectionMode="multiple"
                            closeOnSelect={false}
                            selectedKeys={statusFilter2}
                            renderValue={() => <p>Status</p>}
                            variant="bordered"
                            onSelectionChange={setStatusFilter2} 
                            classNames={{
                                popoverContent: "text-text-50 bg-bg-50 dark:dark dark:text-text-950 dark:bg-bg-950", // Estilo para el popover
                                //value: "text-primario-500 font-bold" // Estilo para el valor seleccionado
                            }}>
                            {statusOptions2.map((status) => (
                                <SelectItem key={status.uid}  className="text-text-50 bg-bg-50 capitalize dark:dark dark:text-text-950 dark:bg-bg-950">
                                    {capitalize(status.name)}
                                </SelectItem>
                            ))}
                        </Select>

                        <Select
                            aria-label="Select columnas"
                            disallowEmptySelection
                            className="w-[120px]"
                            selectionMode="multiple"
                            closeOnSelect={false}
                            defaultSelectedKeys={visibleColumns2}
                            renderValue={() => <p>Columnas</p>}
                            variant="bordered"
                            onSelectionChange={setVisibleColumns2}
                            classNames={{
                                popoverContent: "text-text-50 bg-bg-50 dark:dark dark:text-text-950 dark:bg-bg-950", // Estilo para el popover
                                //value: "text-primario-500 font-bold" // Estilo para el valor seleccionado
                            }}>
                            {columns2.map((column) => (
                                <SelectItem key={column.uid} className="text-text-50 bg-bg-50 capitalize dark:dark dark:text-text-950 dark:bg-bg-950" value={column.uid}>
                                    {capitalize(column.name)}
                                </SelectItem>
                            ))}
                        </Select>
                    </div>
                </div>
            </div>
        );
    }, [
        filterValue2,
        statusFilter2,
        visibleColumns2,
        onSearchChange2,
        onRowsPerPageChange2,
        checkers.length,
        hasSearchFilter2,
    ]);

    const bottomContent = React.useMemo(() => {
        return (
            <div className="flex justify-between items-center pb-6 text-text-50 bg-bg-50 dark:text-text-950 dark:bg-bg-950">
                <Pagination
                    aria-label="Pagination tabla"
                    showControls
                    showShadow
                    classNames={{ cursor: "font-bold" }}
                    color="primary"
                    isDisabled={hasSearchFilter}
                    page={page}
                    total={pages || 1}
                    variant="light"
                    onChange={setPage}
                />
                <div className="flex flex-col justify-end items-end">
                    <span className="text-text-500 text-sm pr-6">Total: {users.length} participantes</span>
                </div>
            </div>
        );
    }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

    const bottomContent2 = React.useMemo(() => {
        return (
            <div className="flex justify-between items-center pb-6 text-text-50 bg-bg-50 dark:text-text-950 dark:bg-bg-950">
                <Pagination
                    aria-label="Pagination tabla"
                    showControls
                    showShadow
                    classNames={{ cursor: "font-bold" }}
                    color="primary"
                    isDisabled={hasSearchFilter2}
                    page={page2}
                    total={pages2 || 1}
                    variant="light"
                    onChange={setPage2}
                />
                <div className="flex flex-col justify-end items-end">
                    <span className="text-text-500 text-sm pr-6">Total: {checkers.length} checadores</span>
                </div>
            </div>
        );
    }, [selectedKeys2, items2.length, page2, pages2, hasSearchFilter2]);






    const INITIAL_VISIBLE_COLUMNS3 = ["name"];

    const columns3 = [
        {name: "Nombre", uid: "name", sortable: true},
    ];    

    const [sortDescriptor3, setSortDescriptor3] = React.useState({
        column: "name",
        direction: "ascending",
    });

    const statusOptions3 = [
        {name: "Activo", uid: "activo"},
        {name: "Inactivo", uid: "inactivo"},
    ];
    const [visibleColumns3, setVisibleColumns3] = React.useState(new Set(INITIAL_VISIBLE_COLUMNS3));
    const [statusFilter3, setStatusFilter3] = React.useState("all");
    const [rowsPerPage3, setRowsPerPage3] = React.useState(4);
    const [filterValue3, setFilterValue3] = useState("");
    const [page3, setPage3] = React.useState(1);
    const pages3 = Math.ceil(workshops.length / rowsPerPage3);
    const hasSearchFilter3 = Boolean(filterValue3);

    const filteredItems3 = React.useMemo(() => {
        let data = [...workshops];
        if (filterValue3) data = data.filter(w => w.name.toLowerCase().includes(filterValue3.toLowerCase()));
        if (statusFilter3.size > 0 && statusFilter3.size !== statusOptions3.length)
          data = data.filter(w => statusFilter3.has(w.status));
        return data;
      }, [workshops, filterValue3, statusFilter3]);
      

    const items3 = React.useMemo(() => {
        const start = (page3 - 1) * rowsPerPage3;
        const end = start + rowsPerPage3;
    
        return filteredItems3.slice(start, end);
    }, [page3, filteredItems3, rowsPerPage3]);
      
    const sortedItems3 = React.useMemo(() => {
        return [...items3].sort((a, b) => {
        const first = a[sortDescriptor3.column];
        const second = b[sortDescriptor3.column];
        const cmp = first < second ? -1 : first > second ? 1 : 0;

    return sortDescriptor3.direction === "descending" ? -cmp : cmp;
        });
    }, [sortDescriptor3, items3]);


    const onRowsPerPageChange3 = React.useCallback((e) => {
        setRowsPerPage3(Number(e.target.value));
        setPage3(1);
    }, []);

    const onSearchChange3 = React.useCallback((value) => {
    if (value) {
        setFilterValue3(value);
        setPage3(1);
    } else {
        setFilterValue3("");
    }
    }, []);


    const topContent3 = React.useMemo(() => {
        return (
            <div className="flex flex-col gap-4 pb-6 pt-4">
                <div className="flex justify-between gap-3 items-end">
                    <h1 className="text-4xl font-bold">Talleres</h1>
                    <div className="flex gap-3">
                        <Input
                            aria-label="Input busqueda"
                            className="w-[220px]"
                            size="md"
                            radius="md"
                            variant="bordered"
                            placeholder="Buscar por nombre..."
                            isClearable
                            value={filterValue3}
                            onClear={() => setFilterValue3("")}
                            onValueChange={onSearchChange3}
                            startContent={<Search className="text-default-300" />}
                        />

                        <Select
                            aria-label="Select filas"
                            disallowEmptySelection
                            className="w-[110px]"
                            defaultSelectedKeys={["4"]}
                            labelPlacement="outside-left"
                            variant="bordered"
                            onChange={onRowsPerPageChange3}
                            renderValue={(items3) => {
                                const selectedKey = items3.values().next().value?.key;
                                return <p>Filas: {selectedKey}</p>;}
                            }
                            classNames={{
                                popoverContent: "text-text-50 bg-bg-50 dark:dark dark:text-text-950 dark:bg-bg-950", // Estilo para el popover
                                //value: "text-primario-500 font-bold" // Estilo para el valor seleccionado
                            }}>
                            <SelectItem key="4" value="4"  className="text-text-50 bg-bg-50 capitalize dark:dark dark:text-text-950 dark:bg-bg-950">4</SelectItem >
                            <SelectItem key="8" value="8"  className="text-text-50 bg-bg-50 capitalize dark:dark dark:text-text-950 dark:bg-bg-950">8</SelectItem>
                            <SelectItem key="12" value="12" className="text-text-50 bg-bg-50 capitalize dark:dark dark:text-text-950 dark:bg-bg-950">12</SelectItem >
                            <SelectItem key="20" value="20" className="text-text-50 bg-bg-50 capitalize dark:dark dark:text-text-950 dark:bg-bg-950">20</SelectItem >
                        </Select>

                        <Select
                            aria-label="Select filtro por status"
                            disallowEmptySelection
                            className="w-[110px]"
                            selectionMode="multiple"
                            closeOnSelect={false}
                            selectedKeys={statusFilter3}
                            renderValue={() => <p>Status</p>}
                            variant="bordered"
                            onSelectionChange={setStatusFilter3} 
                            classNames={{
                                popoverContent: "text-text-50 bg-bg-50 dark:dark dark:text-text-950 dark:bg-bg-950", // Estilo para el popover
                                //value: "text-primario-500 font-bold" // Estilo para el valor seleccionado
                            }}>
                            {statusOptions3.map((status) => (
                                <SelectItem key={status.uid}  className="text-text-50 bg-bg-50 capitalize dark:dark dark:text-text-950 dark:bg-bg-950">
                                    {capitalize(status.name)}
                                </SelectItem>
                            ))}
                        </Select>
                    </div>
                </div>
            </div>
        );
    }, [
        filterValue3,
        statusFilter3,
        onSearchChange3,
        visibleColumns3,
        onRowsPerPageChange3,
        workshops.length,
        hasSearchFilter3,
    ]);

    const bottomContent3 = React.useMemo(() => {
        return (
            <div className="flex justify-between items-center pb-6 text-text-50 bg-bg-50 dark:text-text-950 dark:bg-bg-950">
                <Pagination
                    aria-label="Pagination tabla"
                    showControls
                    showShadow
                    classNames={{ cursor: "font-bold" }}
                    color="primary"
                    isDisabled={hasSearchFilter3}
                    page={page3}
                    total={pages3 || 1}
                    variant="light"
                    onChange={setPage3}
                />
                <div className="flex flex-col justify-end items-end">
                    <span className="text-text-500 text-sm pr-6">Total: {workshops.length} talleres</span>
                </div>
            </div>
        );
    }, [items3.length, page3, pages3, hasSearchFilter3]);
            
    return (
        <>
        <div className="h-full flex flex-1 lg:ml-12 xl:mx-20 flex-col py-6 rounded-3xl justify-between shadow-xl text-text-50 bg-bg-50 dark:text-text-950 dark:bg-bg-950">
            <div className="flex-1 min-h-0 overflow-hidden">
                <div className="h-full overflow-y-auto px-12">
                    <div className="flex justify-end items-center">
                        <div className="w-full">
                            <Tabs aria-label="Options" variant="underlined" color="primary" className="font-bold pt-4" size="md">
                                <Tab key="Evento" title="Evento">
                                    <div className="justify-between">
                                        <div className="flex justify-between items-start">
                                            <div className="flex space-x-4">
                                                <div className="pt-2">
                                                    <Image
                                                        isBlurred
                                                        isZoomed
                                                        alt={eventName}
                                                        className="object-cover"
                                                        width={70}
                                                        height={70}
                                                        src={event.frontPage}
                                                        radius="lg"
                                                        shadow="lg"
                                                    />
                                                </div>
                                            <h1 className="text-5xl font-bold break-words pb-12 text-center pt-4">{eventName}</h1>
                                            </div>

                                            <div className="space-x-4 pt-4">
                                                <Button
                                                aria-label="Button status"
                                                size="md"
                                                variant="bordered"
                                                isIconOnly
                                                className="text-sm"
                                                color={event.status ? "success" : "danger" }
                                                onPress={() => setIsModalOpen(true)}>
                                                    {event.status ? (
                                                    <CircleCheck aria-label="Event icon activo" strokeWidth={2} className="w-5 h-5"/>
                                                        ) : (
                                                    <CircleX aria-label="Event icon inactivo" strokeWidth={2} className="w-5 h-5"/>
                                                )}
                                                </Button>
                                                <Button
                                                aria-label="Button registrar"
                                                size="md"
                                                variant="bordered"
                                                className="text-sm font-bold"
                                                color="primary"
                                                startContent={<Pen strokeWidth={2} className="w-5 h-5"/>}
                                                onPress={() => navigate(`/AdminEvents/EditEvent/${event.name}`)}>
                                                    Actualizar
                                                </Button>
                                            </div>
                                        </div>
                                        <h1 className="break-words pb-6 text-start">{event.description}</h1>
                                        <h1 className="font-bold break-words pb-6 text-start">
                                            {new Date(event.startDate).toLocaleDateString()} - {" "}
                                            {new Date(event.endDate).toLocaleDateString()} 
                                        </h1>

                                        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-5 gap-4">
                                            <div className="col-span-2">
                                                <Image
                                                    isBlurred
                                                    isZoomed
                                                    alt={eventName}
                                                    className="object-cover"
                                                    width="100%"
                                                    height={350}
                                                    src={event.frontPage}
                                                    radius="lg"
                                                    shadow="lg"
                                                />
                                            </div>
                                            <Image
                                                isBlurred
                                                isZoomed
                                                alt={eventName}
                                                className="object-cover"
                                                width="100%"
                                                height={350}
                                                src={landing.galleryJson?.gallery1}
                                                radius="lg"
                                                shadow="lg"
                                            />
                                            <Image
                                                isBlurred
                                                isZoomed
                                                alt={eventName}
                                                className="object-cover"
                                                width="100%"
                                                height={350}
                                                src={landing.galleryJson?.gallery2}
                                                radius="lg"
                                                shadow="lg"
                                            />
                                            <Image
                                                isBlurred
                                                isZoomed
                                                alt={eventName}
                                                className="object-cover"
                                                width="100%"
                                                height={350}
                                                src={landing.galleryJson?.gallery3}
                                                radius="lg"
                                                shadow="lg"
                                            />                            
                                        </div>
                                    </div>
                                </Tab>    

                                <Tab key="Talleres" title="Talleres">
                                    <div className="justify-between">
                                        {topContent3}

                                        {sortedItems3.length === 0 && ( 
                                            <div className="text-center py-12">
                                                <p className="text-text-400 dark:text-text-600">{ workshops.length === 0 ? "No tienes talleres en este evento por ahora" : "No se encontraron talleres :("}</p>
                                            </div>
                                        )}

                                        <div className="grid grid-cols-2 sm:grid-cols-1 lg:grid-cols-4 gap-6 py-6">
                                            {sortedItems3.map((workshop) => (
                                            <Card key={workshop.id} isFooterBlurred className="border-none max-w-full" radius="lg" shadow="lg">
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
                                                                <h1 className="font-bold">{workshop.status === "activo" ? "🟢 " : "🔴 " }{workshop.name}</h1>
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

                                        {bottomContent3}
                                    </div>
                                </Tab>

                                <Tab key="Checadores" title="Checadores">
                                    <div className="justify-between">
                                        <Table 
                                            isHeaderSticky
                                            aria-label="Table participantes"
                                            bottomContent={bottomContent2}
                                            bottomContentPlacement="outside"
                                            topContent={topContent2}
                                            topContentPlacement="outside"
                                            classNames={ classNames }
                                            selectedKeys={selectedKeys2}
                                            sortDescriptor={sortDescriptor2}
                                            onSelectionChange={setSelectedKeys2}
                                            onSortChange={setSortDescriptor2}>
                                    
                                            <TableHeader columns={headerColumns2} className="bg-transparent">
                                                {(column) => (
                                                    <TableColumn
                                                    key={column.uid}
                                                    align={column.uid === "actions" ? "center" : "start"}
                                                    allowsSorting={column.sortable}
                                                    >
                                                    {column.name}
                                                    </TableColumn>
                                                )}
                                            </TableHeader>
                                    
                                            <TableBody 
                                                isLoading={loading}
                                                loadingContent={<Spinner/>}
                                                className="bg-transparent" 
                                                emptyContent={ checkers.length === 0 ? "No tienes checadores asignados por ahora" : "No se encontraron checadores :("} 
                                                items={sortedItems2}>
                                                {(item) => (
                                                    <TableRow aria-label={item.indice} key={item.email}>
                                                    {(columnKey) => <TableCell>{renderCell2(item, columnKey)}</TableCell>}
                                                    </TableRow>
                                                )}
                                            </TableBody>
                                        </Table>
                                    </div>
                                </Tab>

                                <Tab key="Participantes" title="Participantes">
                                    <div className="justify-between">
                                        <Table 
                                            isHeaderSticky
                                            aria-label="Table participantes"
                                            bottomContent={bottomContent}
                                            bottomContentPlacement="outside"
                                            topContent={topContent}
                                            topContentPlacement="outside"
                                            classNames={ classNames }
                                            selectedKeys={selectedKeys}
                                            sortDescriptor={sortDescriptor}
                                            onSelectionChange={setSelectedKeys}
                                            onSortChange={setSortDescriptor}>
                                    
                                            <TableHeader columns={headerColumns} className="bg-transparent">
                                                {(column) => (
                                                    <TableColumn
                                                    key={column.uid}
                                                    align={column.uid === "actions" ? "center" : "start"}
                                                    allowsSorting={column.sortable}
                                                    >
                                                    {column.name}
                                                    </TableColumn>
                                                )}
                                            </TableHeader>
                                    
                                            <TableBody 
                                                isLoading={loading}
                                                loadingContent={<Spinner/>}
                                                className="bg-transparent" 
                                                emptyContent={ users.length === 0 ? "No tienes participantes inscritos por ahora" : "No se encontraron participantes :("} 
                                                items={sortedItems}>
                                                {(item) => (
                                                    <TableRow aria-label={item.indice} key={item.email}>
                                                    {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                                                    </TableRow>
                                                )}
                                            </TableBody>
                                        </Table>
                                    </div>
                                </Tab>  
                            </Tabs>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <EventsModal
            action="status"
            status={event.status}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onConfirm={handleModalConfirm}
            data={event}
        />
        </>
    );
}