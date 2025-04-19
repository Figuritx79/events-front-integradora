import React, { useState, useEffect } from "react";
import { Search, UserPlus, Eye, UserPen, UserCheck, UserX } from "lucide-react";
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
import UsersDrawer from "./UsersDrawer";
import { useAuth } from '../../auth/providers/AuthProvider';
import UsersModal from "./UsersModal"
import { Spinner } from "../../global/components/Components";
import { getEventsAdmin } from "../../auth/service/user.service";

export default function UsersTable () {
    const { credentials } = useAuth();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [drawerAction, setDrawerAction] = useState("create"); // "create", "update", "read"
    const [selectedUser, setSelectedUser] = useState({});
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [refreshTrigger, setRefreshTrigger] = useState(false);

    const INITIAL_VISIBLE_COLUMNS = ["indice", "name", "companyName", "lastname", "phone", "status", "email", "actions"];

    const columns = [
        {name: "Índice", uid: "indice", sortable: true},
        {name: "Correo", uid: "email", sortable: true},
        {name: "Nombre", uid: "name", sortable: true},
        {name: "Apellido", uid: "lastname", sortable: true},
        {name: "Teléfono", uid: "phone", sortable: true},
        {name: "Empresa", uid: "companyName", sortable: true},
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
                const data = await getEventsAdmin();
                if (data) {
                    const dataCount = data.result.map((user, index) => ({
                        ...user,
                        indice: index + 1,
                        status: user.status ? "activo" : "inactivo"
                    }));
                    setUsers(dataCount);
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

    // Manejadores para abrir el drawer con diferentes acciones
    const handleOpenCreate = () => {
        setDrawerAction("create");
        setSelectedUser({});
        setIsDrawerOpen(true);
    };

    const handleOpenUpdate = (user) => {
        setDrawerAction("update");
        setSelectedUser(user);
        setIsDrawerOpen(true);
    };

    const handleOpenRead = (user) => {
        setDrawerAction("read");
        setSelectedUser(user);
        setIsDrawerOpen(true);
    };

    const handleOpen = (user) => {
        console.log("Acción confirmada");
        setSelectedUser(user);
        setIsModalOpen(true); 
    };

    const handleModalConfirm = () => {
        setRefreshTrigger(prev => !prev); // ¡Invierte el valor para disparar el efecto!
        setIsModalOpen(false);
    };

    // Manejador para confirmar acciones en el drawer
    const handleDrawerConfirm = ({ action, data }) => {
        if (action === "create") {
            // Lógica para crear un nuevo usuario
            console.log("Crear usuario:", data);
        } else if (action === "update") {
            // Lógica para actualizar un usuario existente
            console.log("Actualizar usuario:", data);
        }
        // Cerrar el drawer después de la acción
        setRefreshTrigger(prev => !prev); // ¡Invierte el valor para disparar el efecto!
        setIsDrawerOpen(false);
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
    
    const renderCell = React.useCallback((user, columnKey) => {
        const cellValue = user[columnKey];

        switch (columnKey) {
            case "indice": 
                return (
                    cellValue
                );
            case "name":
                return (
                    cellValue
                );
            case "email":
                return (
                    <p className="line-clamp-1 break-words xl:max-w-[300px] md:max-w-[150px] sm:max-w-[50px]">{cellValue}</p>
                );
            case "status":
                return (
                    <Tooltip 
                        aria-label="Tooltip status"
                        className="text-text-50 bg-bg-100 dark:text-text-950 dark:bg-bg-900 dark:dark"
                        content={user.status === "activo" ? "¿Inhabilitar?" : "¿Habilitar?" }
                        placement="top">
                        <Button
                        aria-label="Button status"
                        className="text-sm"
                        size="sm"
                        variant="light"
                        color={user.status === "activo" ? "success" : "danger" }
                        startContent={user.status === "activo" ? (
                            <UserCheck aria-label="Checker icon activo" strokeWidth={2} className="w-5 h-5"/>
                                ) : (
                            <UserX aria-label="Checker icon inactivo" strokeWidth={2} className="w-5 h-5"/>
                        )}
                        onPress={() => handleOpen(user)}>
                            {user.status}
                        </Button>
                    </Tooltip>
                );
            case "actions":
                return (
                <div>
                <Tooltip content="Detalles" placement="top" className="text-text-50 bg-bg-100 dark:text-text-950 dark:bg-bg-900 dark:dark" aria-label="Tooltip detalles">
                    <Button
                    aria-label="Button detalles"
                    isIconOnly
                    size="sm"
                    variant="light"
                    color="primary"
                    onPress={() => handleOpenRead(user)}>
                    <Eye aria-label="Checker icon detalles" strokeWidth={2} className="w-5 h-5"/>
                    </Button>
                </Tooltip>
                <Tooltip content="Actualizar" placement="top" className="text-text-50 bg-bg-100 dark:text-text-950 dark:bg-bg-900 dark:dark" aria-label="Tooltip editar">
                    <Button
                    aria-label="Button actualizar"
                    isIconOnly
                    size="sm"
                    variant="light"
                    color="primary"
                    onPress={() => handleOpenUpdate(user)}>
                    <UserPen aria-label="Checker icon actualizar" strokeWidth={2} className="w-5 h-5"/>
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
                    <h1 className="text-4xl font-bold">Administradores</h1>
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

                        {/**<Button 
                            aria-label="Button registrar"
                            onPress={handleOpenCreate}
                            className="font-bold"
                            size="md"
                            radius="md"
                            variant="ghost"
                            color="primary"
                            startContent={<UserPlus strokeWidth={2} className="w-5 h-5"/>}>
                            Registrar administrador
                        </Button> */}
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
                    <span className="text-text-500 text-sm pr-6">Total: {users.length} administradores de eventos</span>
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
                        emptyContent={ users.length === 0 ? "No hay administradores existentes por ahora" : "No se encontraron administradores :("} 
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

        <UsersDrawer
            action={drawerAction}
            data={selectedUser}
            isOpen={isDrawerOpen}
            onOpenChange={setIsDrawerOpen}
            onConfirm={handleDrawerConfirm}
        />

        <UsersModal
            action="status"
            status={selectedUser.status === "activo"}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onConfirm={handleModalConfirm}
            data={selectedUser}
            email={selectedUser.email}
        />

        </>
    );
}