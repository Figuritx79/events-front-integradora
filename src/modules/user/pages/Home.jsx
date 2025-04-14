
import React, { useState, useEffect } from "react";
import { getAllEvents } from '../../adminEvents/service/Events.service';
import { Search, CirclePlus, Eye, Pen, CircleCheck, CircleX, LogIn } from "lucide-react";
import {
  Select, 
  SelectItem,
  Tooltip,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  Pagination,
  Skeleton
} from "@heroui/react";
import EventsRegistrationModal from "../../adminEvents/components/EventsRegistrationModal"
import { useAuth } from '../../auth/providers/AuthProvider';
import { Link } from "react-router";
import { Spinner } from "../../global/components/Components";

export default function Home () {
    const { credentials } = useAuth();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [drawerAction, setDrawerAction] = useState("create"); // "create", "update", "read"
    const [selectedEvent, setSelectedEvent] = useState({});
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [refreshTrigger, setRefreshTrigger] = useState(false);

    const INITIAL_VISIBLE_COLUMNS = ["name", "startDate", "endDate", "actions"];

    const columns = [
        {name: "Índice", uid: "indice", sortable: true},
        {name: "Nombre", uid: "name", sortable: true},
        {name: "Inicio", uid: "startDate"},
        {name: "Fin", uid: "endDate"},
        {name: "Status", uid: "status"},
        {name: "Acciones", uid: "actions"},
    ];    
    
    const statusOptions = [
        {name: "Activo", uid: "activo"},
        {name: "Inactivo", uid: "inactivo"},
    ];
    
    function capitalize(s) {
        return s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : "";
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAllEvents();
                if (data) {
                    const dataCount = data.result.map((event, index) => ({
                        ...event,
                        indice: index + 1,
                        status: event.status ? "activo" : "inactivo"
                    }));
                    setEvents(dataCount);
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

    const handleModalConfirm = () => {
        setIsModalOpen(false);
    };

    const [filterValue, setFilterValue] = React.useState("");

    const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));

    const [visibleColumns, setVisibleColumns] = React.useState(new Set(INITIAL_VISIBLE_COLUMNS));

    const [statusFilter, setStatusFilter] = React.useState("all");

    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const [sortDescriptor, setSortDescriptor] = React.useState({
        column: "indice",
        direction: "ascending",
    });
    
    const [page, setPage] = React.useState(1);

    const hasSearchFilter = Boolean(filterValue);

    const headerColumns = React.useMemo(() => {
        if (visibleColumns === "all") return columns;
        
        return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
    }, [visibleColumns]);
    
    const filteredItems = React.useMemo(() => {
        let filteredEvents = [...events];
    
        if (hasSearchFilter) {
          filteredEvents = filteredEvents.filter((event) =>
            event.name.toLowerCase().includes(filterValue.toLowerCase()),
          );
        }
        if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
          filteredEvents = filteredEvents.filter((event) =>
            Array.from(statusFilter).includes(event.status),
          );
        }
    
        return filteredEvents;
    }, [events, filterValue, statusFilter]);

    const pages = Math.ceil(filteredItems.length / rowsPerPage);
    
    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return filteredItems.slice(start, end);
    }, [page, filteredItems, rowsPerPage]);
    
    const sortedItems = React.useMemo(() => {
        return [...items].sort((a, b) => {
            const first = a[sortDescriptor.column];
            const second = b[sortDescriptor.column];
            const cmp = first < second ? -1 : first > second ? 1 : 0;
        
            return sortDescriptor.direction === "descending" ? -cmp : cmp;
        });
    }, [sortDescriptor, items]);
    
    const renderCell = React.useCallback((event, columnKey) => {
        const cellValue = event[columnKey];

        switch (columnKey) {
            case "indice": 
                return (
                    cellValue
                );
            case "name":
                return (
                    <p className="line-clamp-1 break-words xl:max-w-[550px] md:max-w-[200px] sm:max-w-[100px]">{cellValue}</p>
                );
            case "actions":
                return (
                <div>
                <Tooltip content="Inscribirme" placement="top" className="text-text-50 bg-bg-100 dark:text-text-950 dark:bg-bg-900 dark:dark" aria-label="Tooltip detalles">
                    <Button
                    aria-label="Button detalles"
                    size="sm"
                    variant="light"
                    color="primary"
                    onPress={() => setIsModalOpen(true)}>
                    <LogIn aria-label="Event icon detalles" strokeWidth={2} className="w-5 h-5"/>
                    Inscribirme
                    </Button>
                </Tooltip>
                </div>
                );
            default:
                return cellValue;
        }
    }, []);
    
    const onRowsPerPageChange = React.useCallback((e) => {
        setRowsPerPage(Number(e.target.value));
        setPage(1);
    }, []);
    
    const onSearchChange = React.useCallback((value) => {
        if (value) {
            setFilterValue(value);
            setPage(1);
        } else {
            setFilterValue("");
        }
    }, []);
    
    const topContent = React.useMemo(() => {
        return (
            <div className="flex flex-col gap-4 pb-6 pt-6">
                <div className="flex justify-between gap-3 items-end">
                    <h1 className="text-4xl font-bold">Eventos</h1>
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
        events.length,
        hasSearchFilter,
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
                    {/**<span className="text-text-500 text-xs pb-2">
                    {selectedKeys === "all"
                        ? "Todos seleccionados"
                        : `${selectedKeys.size} de ${items.length} seleccionados`}
                    </span> */}
                </div>
            </div>
        );
    }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

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

    return (
        <>
        
        <div className="h-full flex-1 lg:ml-12 xl:mx-20 py-6 shadow-xl rounded-3xl flex flex-col text-text-50 bg-bg-50 dark:text-text-950 dark:bg-bg-950">
            <div className="flex-1 min-h-0 overflow-hidden px-12">
                <Table
                    isHeaderSticky
                    aria-label="Table checkers"
                    bottomContent={bottomContent}
                    bottomContentPlacement="outside"
                    classNames={ classNames }
                    selectedKeys={selectedKeys}
                    sortDescriptor={sortDescriptor}
                    topContent={topContent}
                    topContentPlacement="outside"
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
                        emptyContent={ events.length === 0 ? "No tienes eventos por ahora" : "No se encontraron eventos :("} 
                        items={sortedItems}>
                        {(item) => (
                            <TableRow aria-label={item.indice} key={item.email}>
                            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>

        <EventsRegistrationModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onConfirm={handleModalConfirm}
            data={selectedEvent}
            genderOptions={[
                { id: 1, name: 'Masculino' },
                { id: 2, name: 'Femenino' },
            ]}
            occupationOptions={[
                { id: 1, name: 'Estudiante' },
                { id: 2, name: 'Profesionista' },
                { id: 3, name: 'Emprendedor' }
            ]}
        />

        </>
    );
}