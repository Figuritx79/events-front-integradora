import React, {useEffect} from "react";
import { CircleUser, House, Users, MapPinned, LogOut, Search, ChevronDown, Plus, Ellipsis, CalendarPlus, X, Menu, Eye, CalendarCog, CalendarCheck2, CalendarX2, CircleArrowRight, ImageUp, UserCheck, UserPen, UserX, CircleArrowLeft, Info } from "lucide-react";
import { addToast } from "@heroui/toast";
import {parseDate, getLocalTimeZone, parseZonedDateTime, now} from "@internationalized/date";
import {useDateFormatter} from "@react-aria/i18n";
import { NumberInput } from "@heroui/number-input";
import {
    Textarea,
    DatePicker,
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
    },
    {
        id: 3,
        name: "Jane Fisher",
        role: "Sr. Dev",
        team: "Development",
        status: "active",
        age: "22",
        avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
        email: "jane.fisher@example.com",
    },
    {
        id: 4,
        name: "William Howard",
        role: "C.M.",
        team: "Marketing",
        status: "paused",
        age: "28",
        avatar: "https://i.pravatar.cc/150?u=a048581f4e29026701d",
        email: "william.howard@example.com",
    },
    {
        id: 5,
        name: "Kristen Copper",
        role: "S. Manager",
        team: "Sales",
        status: "active",
        age: "24",
        avatar: "https://i.pravatar.cc/150?u=a092581d4ef9026700d",
        email: "kristen.cooper@example.com",
    },
    {
        id: 6,
        name: "Brian Kim",
        role: "P. Manager",
        team: "Management",
        age: "29",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
        email: "brian.kim@example.com",
        status: "active",
    },
    {
        id: 7,
        name: "Michael Hunt",
        role: "Designer",
        team: "Design",
        status: "paused",
        age: "27",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29027007d",
        email: "michael.hunt@example.com",
    },
    {
        id: 8,
        name: "Samantha Brooks",
        role: "HR Manager",
        team: "HR",
        status: "active",
        age: "31",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e27027008d",
        email: "samantha.brooks@example.com",
    },
    {
        id: 9,
        name: "Frank Harrison",
        role: "F. Manager",
        team: "Finance",
        status: "paused",
        age: "33",
        avatar: "https://i.pravatar.cc/150?img=4",
        email: "frank.harrison@example.com",
    },
    {
        id: 10,
        name: "Emma Adams",
        role: "Ops Manager",
        team: "Operations",
        status: "active",
        age: "35",
        avatar: "https://i.pravatar.cc/150?img=5",
        email: "emma.adams@example.com",
    },
    {
        id: 11,
        name: "Brandon Stevens",
        role: "Jr. Dev",
        team: "Development",
        status: "active",
        age: "22",
        avatar: "https://i.pravatar.cc/150?img=8",
        email: "brandon.stevens@example.com",
    },
    {
        id: 12,
        name: "Megan Richards",
        role: "P. Manager",
        team: "Product",
        status: "paused",
        age: "28",
        avatar: "https://i.pravatar.cc/150?img=10",
        email: "megan.richards@example.com",
    },
    {
        id: 13,
        name: "Oliver Scott",
        role: "S. Manager",
        team: "Security",
        status: "active",
        age: "37",
        avatar: "https://i.pravatar.cc/150?img=12",
        email: "oliver.scott@example.com",
    },
    {
        id: 14,
        name: "Grace Allen",
        role: "M. Specialist",
        team: "Marketing",
        status: "active",
        age: "30",
        avatar: "https://i.pravatar.cc/150?img=16",
        email: "grace.allen@example.com",
    },
    {
        id: 15,
        name: "Noah Carter",
        role: "IT Specialist",
        team: "I. Technology",
        status: "paused",
        age: "31",
        avatar: "https://i.pravatar.cc/150?img=15",
        email: "noah.carter@example.com",
    },
    {
        id: 16,
        name: "Ava Perez",
        role: "Manager",
        team: "Sales",
        status: "active",
        age: "29",
        avatar: "https://i.pravatar.cc/150?img=20",
        email: "ava.perez@example.com",
    },
    {
        id: 17,
        name: "Liam Johnson",
        role: "Data Analyst",
        team: "Analysis",
        status: "active",
        age: "28",
        avatar: "https://i.pravatar.cc/150?img=33",
        email: "liam.johnson@example.com",
    },
    {
        id: 18,
        name: "Sophia Taylor",
        role: "QA Analyst",
        team: "Testing",
        status: "active",
        age: "27",
        avatar: "https://i.pravatar.cc/150?img=29",
        email: "sophia.taylor@example.com",
    },
    {
        id: 19,
        name: "Lucas Harris",
        role: "Administrator",
        team: "Information Technology",
        status: "paused",
        age: "32",
        avatar: "https://i.pravatar.cc/150?img=50",
        email: "lucas.harris@example.com",
    },
    {
        id: 20,
        name: "Mia Robinson",
        role: "Coordinator",
        team: "Operations",
        status: "active",
        age: "26",
        avatar: "https://i.pravatar.cc/150?img=45",
        email: "mia.robinson@example.com",
    },
];

export function capitalize(s) {
    return s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : "";
}

const statusColorMap = {
  active: "secondary",
  paused: "danger",
};


const INITIAL_VISIBLE_COLUMNS = ["email", "name", "age", "status", "actions"];

export default function CreateEventStep4 () {
    const showToastInfo = (addToast) => {
      addToast({
          color: "primary",
          icon: <Info strokeWidth={2} className="w-5 h-5"/>,
          title: "Etapa 3: Registrar talleres",
          description: "Registre los talleres que existirán en el evento",
          timeout: 60000,
      });
  };  
  
    useEffect(() => {
      // Tu código aquí se ejecutará después del montaje del componente
      console.log("El componente se ha cargado");
      showToastInfo(addToast);
    }, []); 

    const [dateValue, setDateValue] = React.useState(now(getLocalTimeZone()));
      
let formatter = useDateFormatter({dateStyle: "long", timeStyle: "short", hour12: true});
   

    const showToast = (addToast) => {
        addToast({
            color: "secondary",
            icon: <CalendarCheck2 strokeWidth={2} className="text-blue-500 w-5 h-5"/>,
            title: "Taller registrado",
            description: "Se registró el taller exitosamente",
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
            <Tooltip
            showArrow
            placement="left"
            content={
                <User
                    avatarProps={{radius: "lg", src: user.avatar}}
                    description={user.email}
                    name={cellValue}
                >
                    {user.email}
                </User>
            }>
            {cellValue}
            </Tooltip>
            
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
              <Tooltip content="Detalles" placement="left"  className="text-text-50 bg-bg-100 dark:text-text-950 dark:bg-bg-900 dark:dark">
                            <Button
                              isIconOnly
                              size="sm"
                              variant="light"
                              onPress={onSaveOpen}>
                              <Eye strokeWidth={2} className="w-5 h-5 text-primario-500"/>
                            </Button>
                          </Tooltip>
                          <Tooltip content="Editar" placement="right"  className="text-text-50 bg-bg-100 dark:text-text-950 dark:bg-bg-900 dark:dark">
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
                    <p className="text-sm">Registrar talleres del evento</p>
                    </div>
                    <div className="flex gap-3 justify-between items-start">
                    <Tabs key="md" aria-label="Tabs sizes" size="sm" radius="md" variant="bordered">
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
                          }}
                        >
                            {columns.map((column) => (
                                <SelectItem key={column.uid} className="text-text-50 bg-bg-50 capitalize dark:dark dark:text-text-950 dark:bg-bg-950" value={column.uid}>
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
                        startContent={<CalendarPlus strokeWidth={2} className="w-5 h-5"/>}>
                        Registrar taller
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
                <div className="flex justify-between items-center space-x-3">
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
                
                </div>
                
                <div className="flex justify-between items-center space-x-3">
                <div className="flex flex-col justify-end items-end">
                          <span className="text-text-500 text-xs">
                          {selectedKeys === "all"
                            ? "Todos seleccionados"
                            : `${selectedKeys.size} de ${items.length} seleccionados`}
                            </span> 
                            <span className="text-text-500 text-sm">Total: {users.length} talleres</span>
                        </div>
                <Select
                    disallowEmptySelection
                    className="w-[110px] ml-2"
                    defaultSelectedKeys={["5"]}
                    labelPlacement="outside-left"
                    variant="bordered"
                    renderValue={(items) => {
                    const selectedKey = items.values().next().value?.key;
                    return <p>Filas: {selectedKey}</p>;}
                    }
                    classNames={{
                                    popoverContent: "text-text-50 bg-bg-50 dark:dark dark:text-text-950 dark:bg-bg-950", // Estilo para el popover
                                    //value: "text-primario-500 font-bold" // Estilo para el valor seleccionado
                                }}
                                  onChange={onRowsPerPageChange}
                                >
                                  <SelectItem key={5} value="5"  className="text-text-50 bg-bg-50 capitalize dark:dark dark:text-text-950 dark:bg-bg-950">5</SelectItem >
                                  <SelectItem key={10} value="10"  className="text-text-50 bg-bg-50 capitalize dark:dark dark:text-text-950 dark:bg-bg-950">10</SelectItem>
                                  <SelectItem key={15} value="15" className="text-text-50 bg-bg-50 capitalize dark:dark dark:text-text-950 dark:bg-bg-950">15</SelectItem >
                                  <SelectItem key={20} value="20" className="text-text-50 bg-bg-50 capitalize dark:dark dark:text-text-950 dark:bg-bg-950">20</SelectItem >
                                </Select>
                    
                                <Button 
                  as={Link}
                   to="/AdminEvents/CreateEvent/Checkers"
                  className="font-bold"
                  size="md"
                  radius="md"
                  variant="light"
                  color="primary"
                    startContent={<CircleArrowLeft strokeWidth={2} className="w-5 h-5"/>}>
                    
                    Regresar
                  </Button> 
                                <Button 
                  className="font-bold"
                  size="md"
                  radius="md"
                  variant="solid"
                  color="primary"
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
                      wrapper: "after:bg-foreground after:text-background text-background",
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
                    <TableHeader columns={headerColumns}  className="bg-transparent">
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

            <Drawer isOpen={isSaveOpen} onOpenChange={onSaveOpenChange} size="sm" backdrop="opaque" placement="right" hideCloseButton className="text-text-50 bg-bg-50 capitalize dark:dark dark:text-text-950 dark:bg-bg-950"
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
              <h1 className="text-4xl font-bold">Registrar taller</h1>
                <Tooltip content="Cerrar" placement="left">
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
                    <DatePicker
                        hourCycle={12}
                        key="inicio"
                        className="pb-2"
                        hideTimeZone
                        showMonthAndYearPickers
                        defaultValue={dateValue}
                        label="Fecha del taller"
                        labelPlacement="outside"
                        variant="bordered"
                        value={dateValue}
                        onChange={setDateValue}
                        isRequired
                        granularity="minute" 
                        calendarWidth={280} 
                  classNames={{
                    popoverContent: "text-text-50 bg-bg-50 dark:text-text-950 dark:bg-bg-950 dark:dark",
                    calendar: "text-text-50 bg-bg-50 dark:text-text-950 dark:bg-bg-950 dark:dark",
                    calendarContent: "text-text-50 bg-bg-50 dark:text-text-950 dark:bg-bg-950 dark:dark",
                  }}
                    />

                    <p className="text-default-500 text-xs pb-4">
                        Fecha seleccionada:{" "}
                        {dateValue
                            ? formatter.format(dateValue.toDate(getLocalTimeZone()))
                        : "--"}
                    </p>
                    <Input
                      className="w-full py-3"
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
                      placeholder="Ingresa el nombre del ponente"
                      label="Ponente"
                      labelPlacement="outside"
                      isRequired
                    />
                    <NumberInput
                  variant="bordered"
                  className="py-3"
                  key="cupo"
                  label="Capacidad de personas"
                  labelPlacement="outside"
                  placeholder="Cupo"
                  isRequired
                  isClearable
                  fullWidth
                  minValue={5}
                />

                <Textarea
                  isClearable
                  className="w-full py-3"
                  label="Descripción"
                  placeholder="Descripción de tu evento"
                  variant="bordered"
                  labelPlacement="outside"
                  isRequired
                  onClear={() => console.log("textarea cleared")}
                />

                <Input
                className="w-full pb-2 pt-3"
                size="md"
                radius="md"
                variant="bordered"
                type="file"
                label="Imagen de portada"
                labelPlacement="outside"
                isRequired
                classNames={{
                  input: "cursor-pointer file:text-text-50 file:bg-bg-50 dark:file:text-text-950 dark:file:bg-bg-950",
                  inputWrapper: "border-dashed",
              }}
                startContent={
                    <ImageUp strokeWidth={2} className="w-5 h-5"/>
                }
                />

                <p className="text-default-500 text-xs pb-4">
                  Esta imagen se mostrará como principal
                </p>

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
                  startContent={<CalendarPlus strokeWidth={2} className="w-5 h-5"/>}>
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


