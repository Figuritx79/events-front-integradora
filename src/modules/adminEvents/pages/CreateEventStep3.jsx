import React, {useEffect} from "react";
import { CircleUser, House, Users, MapPinned, LogOut, Search, ChevronDown, Plus, Ellipsis, UserPlus, X, Menu, Eye, UserPen, UserCheck, UserX, CircleArrowRight, CircleArrowLeft, Info } from "lucide-react";
import { addToast } from "@heroui/toast";
import {
    Tab,
    Tabs,
  Select, 
  SelectSection, 
  SelectItem,
  Alert,
  Tooltip,
  Listbox, 
  ListboxItem,
  ListboxSection,
  Divider,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  Pagination,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  useDisclosure,
} from "@heroui/react";
import { th, thead } from "framer-motion/client";
import { Link } from "react-router";

export const columns = [
    {name: "ID", uid: "id", sortable: true},
    {name: "NAME", uid: "name", sortable: true},
    {name: "AGE", uid: "age", sortable: true},
    {name: "ROLE", uid: "role", sortable: true},
    {name: "TEAM", uid: "team"},
    {name: "EMAIL", uid: "email"},
    {name: "STATUS", uid: "status", sortable: true},
    {name: "ACTIONS", uid: "actions"},
];

export const statusOptions = [
    {name: "Active", uid: "active"},
    {name: "Paused", uid: "paused"},
    {name: "paused", uid: "paused"},
];

export const users = [
    {
        id: 1,
        name: "Tony Reichert",
        role: "CEO",
        team: "Management",
        status: "active",
        age: "29",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
        email: "tony.reichert@example.com",
    },
    {
        id: 2,
        name: "Zoey Lang",
        role: "Tech Lead",
        team: "Development",
        status: "paused",
        age: "25",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
        email: "zoey.lang@example.com",
    }
];

export function capitalize(s) {
    return s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : "";
}

const statusColorMap = {
    active: "secondary",
    paused: "danger",
};

const INITIAL_VISIBLE_COLUMNS = ["email", "name", "age", "status", "actions"];

export default function CreateEventStep3 () {
  const showToastInfo = (addToast) => {
    addToast({
        color: "primary",
        icon: <Info strokeWidth={2} className="w-5 h-5"/>,
        title: "Etapa 2: Asignar checadores",
        description: "Seleccione los checadores que validarán las asistencias a su evento",
        timeout: 60000,
    });
};  

  useEffect(() => {
    // Tu código aquí se ejecutará después del montaje del componente
    console.log("El componente se ha cargado");
    showToastInfo(addToast);
  }, []); 

    const showToast = (addToast) => {
        addToast({
            color: "secondary",
            icon: <UserCheck strokeWidth={2} className="text-blue-500 w-5 h-5"/>,
            title: "Checador registrado",
            description: "Se registró el checador exitosamente",
        });
    };  
    
    const {
        isOpen: isSaveOpen,
        onOpen: onSaveOpen,
        onOpenChange: onSaveOpenChange
    } = useDisclosure();
    
    const [filterValue, setFilterValue] = React.useState("");
    const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
    const [visibleColumns, setVisibleColumns] = React.useState(new Set(INITIAL_VISIBLE_COLUMNS));
    const [statusFilter, setStatusFilter] = React.useState("all");
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [sortDescriptor, setSortDescriptor] = React.useState({
      column: "name",
      direction: "ascending",
    });
    const [page, setPage] = React.useState(1);
    
    const pages = Math.ceil(users.length / rowsPerPage);
    
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
        case "name":
          return (
            cellValue
          );
        case "role":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small capitalize">{cellValue}</p>
              <p className="text-bold text-tiny capitalize text-default-500">{user.team}</p>
            </div>
          );
        case "status":
          return (
            <Tooltip className="text-text-50 bg-bg-100 dark:text-text-950 dark:bg-bg-900 dark:dark"
            content={user.status === 'active' ? (
              "Inhabilitar"
            ) : (
              "Habilitar"
            )}
            placement="right">
            <Button
              size="sm"
              variant="light"
              onPress={onSaveOpen}
              className={`text-${statusColorMap[user.status]}-500 text-sm`}
              startContent={user.status === 'active' ? (
                <UserCheck strokeWidth={2} className={`text-green-500 w-5 h-5`}/>
              ) : (
                <UserX strokeWidth={2} className="text-danger-500 w-5 h-5"/>
              )}
            >
            {cellValue}
            </Button>
          </Tooltip>
          );
        case "actions":
          return (
            <div>
              <Tooltip content="Detalles" placement="bottom"  className="text-text-50 bg-bg-100 dark:text-text-950 dark:bg-bg-900 dark:dark">
                <Button
                  isIconOnly
                  size="sm"
                  variant="light"
                  onPress={onSaveOpen}>
                  <Eye strokeWidth={2} className="w-5 h-5 text-primario-500"/>
                </Button>
              </Tooltip>
              <Tooltip content="Editar" placement="bottom"  className="text-text-50 bg-bg-100 dark:text-text-950 dark:bg-bg-900 dark:dark">
                <Button
                  isIconOnly
                  size="sm"
                  variant="light"
                  onPress={onSaveOpen}>
                  <UserPen strokeWidth={2} className="w-5 h-5 text-primario-500"/>
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
            <div className="flex flex-col gap-4 pb-2 pt-6">
                <div className="flex justify-between gap-3 items-start">
                    <div>
                    <h1 className="text-4xl font-bold pb-2">Registrar evento</h1>
                    <p className="text-sm">Asignar checadores a su evento</p>
                    </div>
                    <div className="flex gap-3 flex justify-between items-start">
                    <Tabs key="md" aria-label="Tabs sizes" size="sm" radius="md" variant="bordered" defaultSelectedKey={"checadores"}>
                            <Tab key="evento" title="Evento" />
                            <Tab key="checadores" title="Checadores" />
                            <Tab key="talleres" title="Talleres" />
                        </Tabs>
                        <Input
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
                            disallowEmptySelection
                            className="w-[120px] "
                            selectionMode="multiple"
                            closeOnSelect={false}
                            defaultSelectedKeys={visibleColumns}
                            renderValue={() => <p>Columnas</p>}
                            variant="bordered"
                            onSelectionChange={setVisibleColumns}
                            classNames={{
                              popoverContent: "text-text-50 bg-bg-50 dark:dark dark:text-text-950 dark:bg-bg-950", // Estilo para el popover
                              //value: "text-primario-500 font-bold" // Estilo para el valor seleccionado
                          }}
                        >
                            {columns.map((column) => (
                                <SelectItem key={column.uid} className="text-text-50 bg-bg-50 capitalize dark:dark dark:text-text-950 dark:bg-bg-950" value={column.uid} >
                                {capitalize(column.name)}
                                </SelectItem>
                            ))}
                        </Select>
                        
                        
                        <Button 
                        onPress={onSaveOpen}
                        className="font-bold"
                        size="md"
                        radius="md"
                        variant="ghost"
                        color="primary"
                        startContent={<UserPlus strokeWidth={2} className="w-5 h-5"/>}>
                        Registrar checador
                    </Button>
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
                    showControls
                    classNames={{
                    cursor: "font-bold text-text-950 bg-primario-500 dark:text-text-50",
                    }}
                    color="default"
                    isDisabled={hasSearchFilter}
                    page={page}
                    total={pages}
                    variant="light"
                    onChange={setPage}
                />
                <div className="flex justify-between items-center space-x-3">
                <div className="flex flex-col justify-end items-end">
                                          <span className="text-text-500 text-xs">
                                          {selectedKeys === "all"
                                            ? "Todos seleccionados"
                                            : `${selectedKeys.size} de ${items.length} seleccionados`}
                                            </span> 
                                            <span className="text-text-500 text-sm">Total: {users.length} checadores</span>
                                        </div>
                <Select
                    disallowEmptySelection
                    className="w-[110px] ml-4"
                    defaultSelectedKeys={["5"]}
                    labelPlacement="outside-left"
                    variant="bordered"
                    renderValue={(items) => {
                    const selectedKey = items.values().next().value?.key;
                    return <p>Filas: {selectedKey}</p>;}
                    }
                    onChange={onRowsPerPageChange}
                    classNames={{
                      popoverContent: "text-text-50 bg-bg-50 dark:dark dark:text-text-950 dark:bg-bg-950", 
                  }}
                >
                    <SelectItem key={5} value="5" className="text-text-50 bg-bg-50 capitalize dark:dark dark:text-text-950 dark:bg-bg-950">5</SelectItem >
                    <SelectItem key={10} value="10" className="text-text-50 bg-bg-50 capitalize dark:dark dark:text-text-950 dark:bg-bg-950">10</SelectItem>
                    <SelectItem key={15} value="15" className="text-text-50 bg-bg-50 capitalize dark:dark dark:text-text-950 dark:bg-bg-950">15</SelectItem >
                    <SelectItem key={20} value="20" className="text-text-50 bg-bg-50 capitalize dark:dark dark:text-text-950 dark:bg-bg-950">20</SelectItem >
                </Select>
                <Button 
                  as={Link}
                   to="/AdminEvents/CreateEvent/Images"
                  className="font-bold"
                  size="md"
                  radius="md"
                  variant="light"
                  color="primary"
                    startContent={<CircleArrowLeft strokeWidth={2} className="w-5 h-5"/>}>
                    
                    Regresar
                  </Button> 
                    <Button 
                    as={Link}
                                  to="/AdminEvents/CreateEvent/Workshops"
                            className="font-bold text-text-950 bg-primario-500 dark:text-text-50"
                            size="md"
                            radius="md"
                            variant="solid"
                            startContent={<CircleArrowRight strokeWidth={2} className="w-5 h-5"/>}>
                            Continuar
                        </Button>

                    
                </div>
            </div>
        );
    }, [selectedKeys, items.length, page, pages, hasSearchFilter]);
    
    const classNames = React.useMemo(
        () => ({
          th: "font-bold text-text-50 bg-bg-100 dark:dark dark:text-text-950 dark:bg-bg-900",
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
        }),
        [],
    );      

    return (
        <>
            <div className="h-full flex-1 lg:ml-12 xl:mx-20 py-6 flex flex-col text-text-50 bg-bg-50 dark:text-text-950 dark:bg-bg-950">
                <div className="flex-1 min-h-0 overflow-hidden px-2">
                    <Table
                    isHeaderSticky
                    aria-label=""
                    bottomContent={bottomContent}
                    bottomContentPlacement="outside"
                    classNames={ classNames }
                    checkboxesProps={{
                    classNames: {
                        wrapper: "after:bg-primario-500 after:text-background text-background",
                    },
                    }}
                    selectedKeys={selectedKeys}
                    selectionMode="multiple"
                    sortDescriptor={sortDescriptor}
                    topContent={topContent}
                    topContentPlacement="outside"
                    onSelectionChange={setSelectedKeys}
                    onSortChange={setSortDescriptor}
                >
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
                    <TableBody className="bg-transparent" emptyContent={"No se encontraron checadores :("} items={sortedItems}>
                    {(item) => (
                        <TableRow key={item.id}>
                        {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                        </TableRow>
                    )}
                    </TableBody>
                </Table>
                </div>
            </div>

            <Drawer isOpen={isSaveOpen} onOpenChange={onSaveOpenChange} size="sm" backdrop="opaque" placement="right" hideCloseButton
            className="text-text-50 bg-bg-50 capitalize dark:dark dark:text-text-950 dark:bg-bg-950"
      motionProps={{
        variants: {
          enter: {
            opacity: 1,
            x: 0,
            duration: 0.3,
          },
          exit: {
            x: 100,
            opacity: 0,
            duration: 0.3,
          },
        },
      }}>
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader className="place-content-between pt-10 pb-6 text-4xl">
              <h1 className="text-4xl font-bold">Registrar checador</h1>
                <Tooltip content="Cerrar" placement="left" className="text-text-50 bg-bg-100 dark:text-text-950 dark:bg-bg-900 dark:dark">
                  <Button
                    isIconOnly
                    size="sm"
                    variant="light"
                    onPress={onClose}>
                    <X strokeWidth={2} className="w-5 h-5"/>
                  </Button>
                </Tooltip>
              </DrawerHeader>
              <DrawerBody>
                <div className="flex-col items-center justify-center">
                    <Input
                      className="w-full pb-3"
                      size="md"
                      radius="md"
                      variant="bordered"
                      type="text"
                      placeholder="Ingresa su nombre"
                      label="Nombre"
                      labelPlacement="outside"
                      isRequired
                    />
                    <Input
                      className="w-full py-3"
                      size="md"
                      radius="md"
                      variant="bordered"
                      color="default"
                      type="text"
                      placeholder="Ingresa su apellido"
                      label="Apellido"
                      labelPlacement="outside"
                      isRequired
                    />
                    <Input
                      className="w-full py-3"
                      size="md"
                      radius="md"
                      variant="bordered"
                      color="default"
                      type="email"
                      placeholder="Ingresa su correo electrónico"
                      label="Correo electrónico"
                      labelPlacement="outside"
                      isRequired
                    />
                    <Input
                      className="w-full py-3"
                      size="md"
                      radius="md"
                      variant="bordered"
                      color="default"
                      type="tel"
                      placeholder="Ingresa su teléfono"
                      label="Teléfono"
                      labelPlacement="outside"
                      isRequired
                    />
                </div>
              </DrawerBody>
              <DrawerFooter>
                
                <div className="flex justify-between w-full items-center">
                  <div className="flex-1 pr-2"> {/* Contenedor izquierdo */}
                    <Button 
                      onPress={onClose}
                      className="font-bold w-full"
                      size="md"
                      radius="md"
                      variant="light"
                      color="danger"
                      startContent={<X strokeWidth={2} className="w-5 h-5"/>}>
                      Cancelar
                    </Button>
                  </div>
                  <div className="flex-1 pl-2"> {/* Contenedor derecho */}
                  <Button 
                  onPress={() => {
                    showToast(addToast); // Muestra el Toast
                    onClose(); // Cierra el Drawer
                  }}
                  className="font-bold w-full font-bold"
                  size="md"
                  radius="md"
                  variant="ghost"
                  color="secondary"
                  startContent={<UserPlus strokeWidth={2} className="w-5 h-5"/>}>
                  Registrar
                </Button>
                  </div>
                </div>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
        </>
    ); 
}






