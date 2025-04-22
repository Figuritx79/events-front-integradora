import React, { useEffect, useState } from "react";
import { CircleArrowDown, CalendarArrowUp, CalendarCheck2, Eye, CircleCheck, CircleX, ImageUp, Pen, Search, UserCheck, Users, UserX, X, CalendarX2, UserPlus, UserPen, } from "lucide-react";
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
    DateRangePicker,
    Textarea,
    Input,
    useDisclosure,
    useDraggable,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Select,
    SelectItem
} from "@heroui/react";
import { getCheckersByEvent, getEventByName, getLandingByEvent, getUsersListByEvent, reassignChecker, updateEvent, updateLanding } from "../service/Events.service";
import { Toast } from "../../global/components/Toast";
import EventsModal from "../components/EventsModal";

import {getLocalTimeZone, today, parseDate} from "@internationalized/date";
import {useDateFormatter} from "@react-aria/i18n";
import { ButtonX, Spinner } from "../../global/components/Components";
import { getWorkshops } from "../service/Workshop.service";
import WorkshopModal from "../components/WorkshopModal";
import WorkshopDrawer from "../components/WorkshopDrawer";
import { getCheckers } from "../service/Checkers.service";
import CheckersDrawer from "../components/CheckersDrawer";
import CheckersModal from "../components/CheckersModal";

export default function EditEvent() {
    const navigate = useNavigate(); // Agregar hook de navegación
    const { eventName } = useParams();
    const [refreshTrigger, setRefreshTrigger] = useState(false);
    const [loading, setLoading] = useState(true);
    const [ event, setEvent ] = useState({});
    const [ landing, setLanding ] = useState({});
    const [ checkers, setCheckers ] = useState([]);
    const [ allCheckers, setAllCheckers ] = useState([]);
    const [ workshops, setWorkshops ] = useState([]);
    const [ users, setUsers ] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const targetRef = React.useRef(null);
    const {moveProps} = useDraggable({targetRef, isDisabled: !isOpen});
    const title = ""
    const description = ""
    

    const [previewUrl, setPreviewUrl] = useState(null);
    const [selectedImageFile, setSelectedImageFile] = useState(null);

    const [logoFile, setLogoFile] = useState(null);
    const [galleryFiles, setGalleryFiles] = useState([]);
    const [previewUrlLogo, setPreviewUrlLogo] = useState(null);
    const [previewUrls, setPreviewUrls] = useState([]);
    const [previewUrlsPlaceholder, setPreviewUrlsPlaceholder] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    const [modalConfig, setModalConfig] = useState({
        title: "",
        description: "",
        type: ""
    });

    const handleOpenModal = (title, description, type) => {
        setModalConfig({
            title: title,
            description: description,
            type: type
        });
        onOpen();
    };

    const handleLogoChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
    
        if (!file.type.match('image/(jpeg|png)')) {
            console.error("Formato no válido");
            e.target.value = null;
            setPreviewUrlLogo(null);
            setLogoFile(null);
            return;
        }
    
        const objectUrl = URL.createObjectURL(file);
        setPreviewUrlLogo(objectUrl);
        setLogoFile(file);
    };

    const handleGalleryChange = (e) => {
        const files = Array.from(e.target.files);
        
        const validFiles = files.filter(file => 
            file.type.match('image/(jpeg|png)')   
        );
        
        setGalleryFiles(prev => [...prev, ...validFiles]);
        setPreviewUrls(prev => [
            ...prev, 
            ...validFiles.map(file => URL.createObjectURL(file))
        ]);
    };
    
    const removeImage = (index) => {
        setGalleryFiles(prev => prev.filter((_, i) => i !== index));
        setPreviewUrls(prev => {
            const newUrls = [...prev];
            URL.revokeObjectURL(newUrls[index]);
            return newUrls.filter((_, i) => i !== index);
        });
    };

    let formatter = useDateFormatter({ dateStyle: "long", hour12: true });

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const fileType = file.type;
            if (!fileType.match('image/jpeg') && !fileType.match('image/png')) {
                console.error("Formato de archivo no válido");
                e.target.value = null;
                setPreviewUrl(null);
                setSelectedImageFile(null);
            } else {
                const objectUrl = URL.createObjectURL(file);
                setPreviewUrl(objectUrl);
                setSelectedImageFile(file); // Guardar archivo
            }
        }
    };

    const handleInputChange = (field, value) => {
        setEvent(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleAction = async (type) => {
        const formData = new FormData ();
        setIsSubmitting(true);
    
        try {
            let result;
            let successMessage; 
            let errorMessage;
            let description;
    
            if (type === "evento") {
                // Validación de formato si hay imagen
                if (selectedImageFile && !selectedImageFile.type.match(/image\/(jpeg|png)/)) {
                    throw new Error("Formato de imagen no válido (solo JPG/PNG)");
                }
        
                const startDate = rangeValue.start.toDate(getLocalTimeZone()).toISOString();
                const endDate = rangeValue.end.toDate(getLocalTimeZone()).toISOString();

                const eventDto = {
                    id: event.id,
                    name: event.name,
                    description: event.description,
                    startDate: startDate,
                    endDate: endDate,
                };

                console.log("DTO a enviar:", {
                    id: event.id,
                    name: event.name,
                    description: event.description,
                    startDate: startDate,
                    endDate: endDate,
                });
            
                const dtoBlob = new Blob([JSON.stringify(eventDto)], {
                    type: 'application/json'
                });

                formData.append('eventDto', dtoBlob);
        
                if (selectedImageFile) {
                    formData.append("frontPage", selectedImageFile);
                }
                console.log("Contenido de FormData:");
                formData.forEach((value, key) => console.log(key, value));
                
                result = await updateEvent(formData);
                successMessage = "Se actualizó el evento";
                description = "Se ha actualizado el evento correctamente"
                errorMessage = "No se pudo actualizar el evento";

            } else if (type === "landing page") {
                // Validación de formato si hay imagen
                if (logoFile && !logoFile.type.match(/image\/(jpeg|png)/)) {
                    throw new Error("Formato de imagen no válido (solo JPG/PNG)");
                }
        
                if (galleryFiles.length > 0) {
                    const invalidFiles = galleryFiles.filter(
                        (file) => !file.type.match(/image\/(jpeg|png)/)
                    );
                  
                    if (invalidFiles.length > 0) {
                        throw new Error("Uno o más archivos tienen un formato no válido (solo JPG/PNG)");
                    }
                }
        
                if (logoFile) {
                    formData.append("logo", logoFile);
                }
                if (galleryFiles.length > 0){
                    galleryFiles.forEach((file, index) => {
                        formData.append(`gallery${index + 1}`, file);
                        console.log(file)
                    });
                }

                formData.append("id", landing.id)
                formData.append("eventName", landing.event.name)

                console.log("Contenido de FormData:");
                formData.forEach((value, key) => console.log(key, value));
                
                result = await updateLanding(formData);
                successMessage = "Se actualizó la landing page";
                description = "Se ha actualizado la landing page correctamente"
                errorMessage = "No se pudo actualizar la landing page";

            } else if (type === "checadores") {
                let selectedArray = Array.from(selectedKeys2);
                if(selectedArray[0] === "a" && selectedArray[1] === "l" && selectedArray[2] === "l") {
                    selectedArray = allCheckers.map(c => c.id);
                }

                const objectsArray = selectedArray.map(idChecker => ({
                    assignedBy: event.admin.email,        // constante
                    idEvent: event.id,           // constante
                    idChecker: idChecker            // variable desde el arreglo
                }));                  

                result = await reassignChecker(objectsArray);
                successMessage = "Se actuakizó la asignación de los checadores";
                description = "Se han actualizado los checadores asignados correctamente"
                errorMessage = "No se pudo actualizar la asignación de los checadores";
            }
            if (result) {
                Toast({
                    color: "success",
                    title: successMessage,
                    description: description
                });

                if (type === "evento"){
                    navigate(`/AdminEvents/EditEvent/${event.name}`, { replace: true });
                    window.location.reload(); // recarga forzada
                }
            } else {
                Toast({
                    color: "danger",
                    title: errorMessage,
                    description: "Revise que haya mandado los datos correctamente"
                });
            }
        } catch (error) {
            Toast({
                color: "danger",
                title: `Error al actualizar el ${type}`,
                description: error.message
            });
            console.error(error);
        } finally {
            setIsSubmitting(false);
            onClose();
            setRefreshTrigger(prev => !prev); // ¡Invierte el valor para disparar el efecto!
        }
    };

    /*const handleModalConfirm = () => {
        setRefreshTrigger(prev => !prev); // ¡Invierte el valor para disparar el efecto!
        setIsModalOpen(false);
    };

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
    }, [page, checkers]);*/

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data1 = await getEventByName(event?.name || eventName);
                const data2 = await getLandingByEvent(data1.result.id);
                const data3 = await getCheckersByEvent(data1.result.id);
                const data4 = await getUsersListByEvent(data1.result.id);
                const data5 = await getCheckers(sessionStorage.getItem('email'));
                console.log(data1.result.id)
                console.log(data4)
                if (data1 && data2 && data3) {
                    setEvent(data1.result);
                    sessionStorage.setItem('event', data1.result.id);

                    const processedWorkshops = data1.result.workshops.map((workshop, index) => ({
                        ...workshop,
                        indice: index + 1,
                        status: workshop.status ? "activo" : "inactivo"
                    }));
                    setWorkshops(processedWorkshops);
                    setLanding(data2.result)
                    const processedCheckers = data3.result.map((item, index) => ({
                        ...item.checker,
                        indice: index + 1,
                        status: item.checker.status ? "activo" : "inactivo"
                    }));
                    setCheckers(processedCheckers)
                    const processedAllCheckers = data5.result.map((item, index) => ({
                        ...item.checker,
                        indice: index + 1,
                        status: item.checker.status ? "activo" : "inactivo"
                    }));
                    setAllCheckers(processedAllCheckers)

                    // Inicializar selectedKeys2 con IDs o claves únicas
                    const initialKeys = new Set(
                        processedCheckers.map((checker) => checker.id) // usa el campo único aquí
                    );
                    setSelectedKeys2(initialKeys);

                    setPreviewUrl(data1.result.frontPage)
                    setPreviewUrlLogo(data2.result.logo)
                    setPreviewUrlsPlaceholder(Object.values(data2.result.galleryJson))
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
    }, [eventName, refreshTrigger]);

    console.log(event)
    console.log(landing)
    console.log(workshops)
    console.log(checkers)
    console.log(allCheckers)
    console.log(users)
    console.log(previewUrlLogo)
    console.log(previewUrls)

    const [rangeValue, setRangeValue] = useState({
        start: parseDate(event.startDate || today(getLocalTimeZone()).toString()),
        end: parseDate(event.endDate || today(getLocalTimeZone()).add({ days: 7 }).toString())
    });

    useEffect(() => {
        if (event.startDate && event.endDate) {
            setRangeValue({
                start: parseDate(event.startDate),
                end: parseDate(event.endDate)
            });
        }
    }, [event]);

    const handleDateChange = (newRange) => {
        setRangeValue(newRange);
        setEvent(prev => ({
            ...prev,
            startDate: newRange.start.toString(),
            endDate: newRange.end.toString()
        }));
    };

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



{/*//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/}

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [drawerAction, setDrawerAction] = useState("create"); // "create", "update", "read"
    const [selectedWorkshop, setSelectedWorkshop] = useState({});

    const INITIAL_VISIBLE_COLUMNS = ["indice", "name", "speaker", "capacity", "hour", "status", "actions"];

    const columns = [
        {name: "Índice", uid: "indice", sortable: true},
        {name: "Nombre", uid: "name", sortable: true},
        {name: "Ponente", uid: "speaker", sortable: true},
        {name: "Capacidad", uid: "capacity", sortable: true},
        {name: "Hora", uid: "hour"},
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

    // Manejadores para abrir el drawer con diferentes acciones
    const handleOpenCreate = () => {
        setDrawerAction("create");
        setSelectedWorkshop({});
        setIsDrawerOpen(true);
    };

    const handleOpenUpdate = (workshop) => {
        setDrawerAction("update");
        setSelectedWorkshop(workshop);
        setIsDrawerOpen(true);
    };

    const handleOpenRead = (workshop) => {
        setDrawerAction("read");
        setSelectedWorkshop(workshop);
        setIsDrawerOpen(true);
    };

    const handleOpen = (workshop) => {
        console.log("Acción confirmada");
        setSelectedWorkshop(workshop);
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
        let filteredUsers = [...workshops];
    
        if (hasSearchFilter) {
          filteredUsers = filteredUsers.filter((workshop) =>
            workshop.name.toLowerCase().includes(filterValue.toLowerCase()),
          );
        }
        if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
          filteredUsers = filteredUsers.filter((workshop) =>
            Array.from(statusFilter).includes(workshop.status),
          );
        }
    
        return filteredUsers;
    }, [workshops, filterValue, statusFilter]);

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
    
    const renderCell = React.useCallback((workshop, columnKey) => {
        const cellValue = workshop[columnKey];

        switch (columnKey) {
            case "indice": 
                return (
                    cellValue
                );
            case "speaker":
                return (
                      workshop.speakerInfo.speaker_name
                );
            case "status":
                return (
                    <Tooltip 
                        aria-label="Tooltip status"
                        className="text-text-50 bg-bg-100 dark:text-text-950 dark:bg-bg-900 dark:dark"
                        content={workshop.status === "activo" ? "¿Inhabilitar?" : "¿Habilitar?" }
                        placement="top">
                        <Button
                        aria-label="Button status"
                        className="text-sm"
                        size="sm"
                        variant="light"
                        color={workshop.status === "activo" ? "success" : "danger" }
                        startContent={workshop.status === "activo" ? (
                            <CalendarCheck2 aria-label="Checker icon activo" strokeWidth={2} className="w-5 h-5"/>
                                ) : (
                            <CalendarX2 aria-label="Checker icon inactivo" strokeWidth={2} className="w-5 h-5"/>
                        )}
                        onPress={() => handleOpen(workshop)}>
                            {workshop.status}
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
                    onPress={() => handleOpenRead(workshop)}>
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
                    onPress={() => handleOpenUpdate(workshop)}>
                    <Pen aria-label="Checker icon actualizar" strokeWidth={2} className="w-5 h-5"/>
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
                      <Button 
                          aria-label="Button registrar"
                          onPress={handleOpenCreate}
                          className="font-bold"
                          size="md"
                          radius="md"
                          variant="ghost"
                          color="primary"
                          startContent={<CalendarArrowUp strokeWidth={2} className="w-5 h-5"/>}>
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
    workshops.length,
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
                <span className="text-text-500 text-sm pr-6">Total: {workshops.length} talleres</span>
            </div>
        </div>
      );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

    {/*//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/}

    const {isOpen: isSecondModalOpen, onOpen: onSecondModalOpen, onClose: onSecondModalClose} = useDisclosure();
    const [drawerAction2, setDrawerAction2] = useState("create"); // "create", "update", "read"
    const [selectedChecker, setSelectedChecker] = useState({});
    const [isDrawerOpen2, setIsDrawerOpen2] = useState(false);
    const [isModalOpen2, setIsModalOpen2] = useState(false);
    const targetRef2 = React.useRef(null);
    const {moveProps2} = useDraggable({targetRef2, isDisabled: !isSecondModalOpen});
    const [isSubmitting2, setIsSubmitting2] = useState(false);

    const INITIAL_VISIBLE_COLUMNS2 = ["indice", "name", "lastname", "phone", "status", "email", "actions"];
  
    const columns2 = [
        {name: "Índice", uid: "indice", sortable: true},
        {name: "Correo", uid: "email", sortable: true},
        {name: "Nombre", uid: "name", sortable: true},
        {name: "Apellido", uid: "lastname", sortable: true},
        {name: "Teléfono", uid: "phone", sortable: true},
        {name: "Status", uid: "status"},
        {name: "Acciones", uid: "actions"},
    ];    
    
    const statusOptions2 = [
        {name: "Activo", uid: "activo"},
        {name: "Inactivo", uid: "inactivo"},
    ];

    // Manejadores para abrir el drawer con diferentes acciones
    const handleOpenCreate2 = () => {
        setDrawerAction2("create");
        setSelectedChecker({});
        setIsDrawerOpen2(true);
    };

    const handleOpenUpdate2 = (user) => {
        setDrawerAction2("update");
        setSelectedChecker(user);
        setIsDrawerOpen2(true);
    };

    const handleOpenRead2 = (user) => {
        setDrawerAction2("read");
        setSelectedChecker(user);
        setIsDrawerOpen2(true);
    };

    const handleOpen2 = (user) => {
        console.log("Acción confirmada");
        setSelectedChecker(user);
        setIsModalOpen2(true); 
    };

    const handleModalConfirm2 = () => {
        setRefreshTrigger(prev => !prev); // ¡Invierte el valor para disparar el efecto!
        setIsModalOpen2(false);
    };
    
    const handleAction2 = async () => {
        setIsSubmitting(true);
        try {
            let result;
            let successMessage; 
            let errorMessage;
            let description;
            const selectedArray = Array.from(selectedKeys);
                result = await assignChecker(credentials.email, selectedArray, sessionStorage.getItem('event'));
                successMessage = "Se asignaron los checadores";
                description = "Se han asignado los checadores asignados correctamente"
                errorMessage = "No se pudieron asignar los checadores";
    
              if (result) {
                Toast({
                  onConfirm:() => handleModalConfirm,
                  color: "success",
                  title: successMessage,
                  description: description
                });
              } else {
                Toast({
                  onConfirm: () => handleModalConfirm,
                  color: "danger",
                  title: errorMessage,
                  description: "Revise que haya mandado los datos correctamente"
                });
              }
        } catch (error) {
              Toast({
                onConfirm: () => handleModalConfirm,
                color: "danger",
                title: `Error al asignar los checadores`,
                description: error.message
              });
              console.error(error);
        } finally {
              setIsSubmitting(false);
              onClose();
        }
    };

    // Manejador para confirmar acciones en el drawer
    const handleDrawerConfirm2 = ({ action, data }) => {
        if (action === "create") {
            // Lógica para crear un nuevo usuario
            console.log("Crear usuario:", data);
        } else if (action === "update") {
            // Lógica para actualizar un usuario existente
            console.log("Actualizar usuario:", data);
        }
        // Cerrar el drawer después de la acción
        setRefreshTrigger(prev => !prev); // ¡Invierte el valor para disparar el efecto!
        setIsDrawerOpen2(false);
    };

      
    const [filterValue2, setFilterValue2] = React.useState("");
  
    const [selectedKeys2, setSelectedKeys2] = React.useState(new Set([]));
  
    const [visibleColumns2, setVisibleColumns2] = React.useState(new Set(INITIAL_VISIBLE_COLUMNS2));
  
    const [statusFilter2, setStatusFilter2] = React.useState("all");
  
    const [rowsPerPage2, setRowsPerPage2] = React.useState(5);
  
    const [sortDescriptor2, setSortDescriptor2] = React.useState({
        column: "indice",
        direction: "ascending",
    });
    
    const [page2, setPage2] = React.useState(1);
  
    const hasSearchFilter2 = Boolean(filterValue2);

    const headerColumns2 = React.useMemo(() => {
              if (visibleColumns2 === "all") return columns2;
              
              return columns2.filter((column) => Array.from(visibleColumns2).includes(column.uid));
          }, [visibleColumns2]);
          
          const filteredItems2 = React.useMemo(() => {
              let filteredUsers = [...allCheckers];
          
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
          }, [allCheckers, filterValue2, statusFilter2]);

    const pages2 = Math.ceil(filteredItems2.length / rowsPerPage2);
          
          const items2 = React.useMemo(() => {
              const start = (page2 - 1) * rowsPerPage2;
              const end = start + rowsPerPage2;
      
              return filteredItems2.slice(start, end);
          }, [page2, filteredItems2, rowsPerPage2]);
          
          const sortedItems2 = React.useMemo(() => {
              return [...items2].sort((a, b) => {
                  const first = a[sortDescriptor2.column];
                  const second = b[sortDescriptor2.column];
                  const cmp = first < second ? -1 : first > second ? 1 : 0;
              
                  return sortDescriptor2.direction === "descending" ? -cmp : cmp;
              });
          }, [sortDescriptor2, items2]);
      
          const renderCell2 = React.useCallback((user, columnKey) => {
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
                            onPress={() => handleOpen2(user)}>
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
                        onPress={() => handleOpenRead2(user)}>
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
                        onPress={() => handleOpenUpdate2(user)}>
                        <UserPen aria-label="Checker icon actualizar" strokeWidth={2} className="w-5 h-5"/>
                        </Button>
                    </Tooltip>
                    </div>
                    );
                default:
                    return cellValue;
            }
        }, []);

      
      const onRowsPerPageChange2 = React.useCallback((e) => {
          setRowsPerPage2(Number(e.target.value));
          setPage2(1);
      }, []);
      
      const onSearchChange2 = React.useCallback((value) => {
          if (value) {
              setFilterValue2(value);
              setPage2(1);
          } else {
              setFilterValue2("");
          }
      }, []);

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

                        <Button 
                            aria-label="Button registrar"
                            onPress={handleOpenCreate2}
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
        filterValue2,
        statusFilter2,
        visibleColumns2,
        onSearchChange2,
        onRowsPerPageChange2,
        allCheckers.length,
        hasSearchFilter2,
    ]);
    
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
                <div className="flex justify-between items-center space-x-3">
                <div className="flex flex-col justify-end items-end">
                                          <span className="text-text-500 text-xs">
                                          {selectedKeys2 === "all"
                                            ? "Todos seleccionados"
                                            : `${selectedKeys2.size} de ${items2.length} seleccionados`}
                                            </span> 
                                            <span className="text-text-500 text-sm">Total: {allCheckers.length} checadores</span>
                                        </div>
                        
                        <Button 
                            aria-label="Button registrar"
                            className="font-bold"
                            size="md"
                            radius="md"
                            isDisabled={selectedKeys2.size === 0}
                            variant="ghost"
                            color="secondary"
                            onPress={() => handleOpenModal(
                                "¿Desea actualizar la asignación de los checadores al evento?", 
                                "Una vez confirmado, los nuevas checadores se reflejarán en su evento.",
                                "checadores"
                            )}
                            startContent={<CircleArrowDown strokeWidth={2} className="w-5 h-5"/>}>
                            Guardar cambios
                        </Button>
                    
                </div>
            </div>
        );
    }, [selectedKeys2, items2.length, page2, pages2, hasSearchFilter2]);


    {/*//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/}

    return (
        <>
        <div className="h-full flex flex-1 lg:ml-12 xl:mx-20 flex-col py-6 rounded-3xl justify-between shadow-xl text-text-50 bg-bg-50 dark:text-text-950 dark:bg-bg-950">
            <div className="flex-1 min-h-0 overflow-hidden">
                <div className="h-full overflow-y-auto px-12">
                    <div className="flex justify-between items-center">
                        <div className="flex flex-col w-full">
                            <Tabs aria-label="Options" variant="underlined" color="primary" className="font-bold pt-4" size="md">
                                <Tab key="Evento" title="Evento">
                                    <div>
                                        <h1 className="text-4xl font-bold pb-8 pt-4">Información general</h1>
                                        <div>
                                            <Input
                                                classNames={{ label: "font-bold" }}
                                                className="w-full pb-6"
                                                size="md"
                                                radius="md"
                                                variant="bordered"
                                                type="text"
                                                placeholder={event.name || "Ingrese el nombre de su evento"}
                                                value={event.name}
                                                onValueChange={(value) => handleInputChange('name', value)}
                                                label="Nombre"
                                                labelPlacement="outside"
                                                isRequired
                                                isClearable
                                            />

                                            <Textarea
                                                classNames={{ label: "font-bold" }}
                                                isClearable
                                                className="w-full pb-6"
                                                label="Descripción"
                                                placeholder={event.description || "Descripción de tu evento"}
                                                value={event.description}
                                                onValueChange={(value) => handleInputChange('description', value)}
                                                variant="bordered"
                                                labelPlacement="outside"
                                                isRequired
                                            />
                                        </div>
                                        
                                        <div className="flex justify-between items-start text-text-50 bg-bg-50 dark:text-text-950 dark:bg-bg-950">
                                            <div className="grid grid-cols-3 gap-12">
                                                <div className="col-span-1">
                                                    <div className="flex flex-col">
                                                        <DateRangePicker
                                                            hourCycle={12}
                                                            key="inicio"
                                                            className="pb-2 dark:dark"
                                                            hideTimeZone
                                                            showMonthAndYearPickers
                                                            label="Duración del evento"
                                                            labelPlacement="outside"
                                                            variant="bordered"
                                                            value={rangeValue}
                                                            onChange={handleDateChange}
                                                            isRequired
                                                            granularity="day" 
                                                            aria-label="Seleccionar rango de fechas"
                                                            calendarWidth={300}
                                                            popoverProps={{
                                                                placement: "right",
                                                            }}
                                                            classNames={{
                                                                label: "font-bold",
                                                                popoverContent: "text-text-50 bg-bg-50 dark:text-text-950 dark:bg-bg-950 dark:dark",
                                                                calendar: "text-text-50 bg-bg-50 dark:text-text-950 dark:bg-bg-950 dark:dark",
                                                                calendarContent: "text-text-50 bg-bg-50 dark:text-text-950 dark:bg-bg-950 dark:dark",
                                                            }}
                                                        />

                                                        <p className="text-default-500 text-xs pb-6">
                                                            {formatter.formatRange(
                                                                rangeValue.start.toDate(getLocalTimeZone()),
                                                                rangeValue.end.toDate(getLocalTimeZone())
                                                            )}
                                                        </p>

                                                        <Input
                                                            id="eventImage"
                                                            name="frontPage"
                                                            autoComplete="off"
                                                            type="file"
                                                            className="w-full pb-6"
                                                            variant="bordered"
                                                            label="Subir imagen"
                                                            labelPlacement="outside"
                                                            size="md"
                                                            radius="md"
                                                            description="Formatos aceptados: jpg, jpeg, png"
                                                            accept=".jpg, .jpeg, .png, image/jpeg, image/png"
                                                            isRequired
                                                            classNames={{
                                                                label: "font-bold",
                                                                input: "cursor-pointer file:text-text-50 file:bg-bg-50 dark:file:text-text-950 dark:file:bg-bg-950",
                                                                inputWrapper: "border-dashed",
                                                            }}
                                                            startContent={<ImageUp strokeWidth={2} className="w-5 h-5" />}
                                                            onChange={handleFileChange}
                                                        />
                                                        <Button 
                                                            aria-label="Button registrar"
                                                            className="font-bold w-48"
                                                            size="md"
                                                            radius="md"
                                                            variant="ghost"
                                                            color="secondary"
                                                            onPress={() => handleOpenModal(
                                                                "¿Desea actualizar la información del evento?", 
                                                                "Asegúrese de que los datos sean correctos antes de continuar. Una vez confirmado, los nuevas datos se reflejarán en su evento.",
                                                                "evento"
                                                            )}
                                                            startContent={<CircleArrowDown strokeWidth={2} className="w-5 h-5"/>}>
                                                            Guardar cambios
                                                        </Button>
                                                    </div>
                                                </div>
                                                
                                                <div className="col-span-1">
                                                    {previewUrl && (
                                                        <div className="">
                                                            <div>
                                                                <p className="text-sm mb-2 font-bold">Vista previa de la portada:</p>
                                                                <Image
                                                                    isBlurred
                                                                    isZoomed
                                                                    alt={previewUrl}
                                                                    className="object-cover"
                                                                    width="100%"
                                                                    height={250}
                                                                    src={previewUrl}
                                                                    radius="lg"
                                                                    shadow="lg"
                                                                />
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Tab>        
                                <Tab key="Landing" title="Landing">
                                    <div>
                                        <h1 className="text-4xl font-bold pb-8 pt-4">Landing page</h1>
                                        
                                        <div className="flex justify-between items-start text-text-50 bg-bg-50 dark:text-text-950 dark:bg-bg-950">
                                            <div>
                                                <div>
                                                    <div className="grid grid-cols-3 gap-12">
                                                        <Input
                                                            type="file"
                                                            className="w-full pb-6"
                                                            variant="bordered"
                                                            label="Logo"
                                                            labelPlacement="outside"
                                                            size="md"
                                                            radius="md"
                                                            description="Formatos aceptados: jpg, jpeg, png"
                                                            accept=".jpg, .jpeg, .png, image/jpeg, image/png"
                                                            isRequired
                                                            classNames={{
                                                                label: "font-bold",
                                                                input: "cursor-pointer file:text-text-50 file:bg-bg-50 dark:file:text-text-950 dark:file:bg-bg-950",
                                                                inputWrapper: "border-dashed",
                                                            }}
                                                            startContent={<ImageUp strokeWidth={2} className="w-5 h-5" />}
                                                            onChange={handleLogoChange}
                                                        />

                                                        <Input
                                                            type="file"
                                                            className="w-full pb-6"
                                                            variant="bordered"
                                                            label="Galería (3 imágenes)"
                                                            labelPlacement="outside"
                                                            size="md"
                                                            radius="md"
                                                            description="Formatos aceptados: jpg, jpeg, png"
                                                            accept="image/*"
                                                            isRequired
                                                            multiple
                                                            isInvalid={!!errorMessage}
                                                            errorMessage={errorMessage}
                                                            onChange={handleGalleryChange}
                                                            classNames={{
                                                                label: "font-bold",
                                                                input: "cursor-pointer file:text-text-50 file:bg-bg-50 dark:file:text-text-950 dark:file:bg-bg-950",
                                                                inputWrapper: "border-dashed",
                                                            }}
                                                            startContent={<ImageUp strokeWidth={2} className="w-5 h-5" />}
                                                        />

                                                        <div className="pt-6">
                                                            <Button 
                                                                aria-label="Button registrar"
                                                                className="font-bold w-48"
                                                                size="md"
                                                                radius="md"
                                                                variant="ghost"
                                                                color="secondary"
                                                                onPress={() => handleOpenModal(
                                                                    "¿Desea actualizar la landing page?", 
                                                                    "Asegúrese de que las imágenes sean correctas antes de continuar. Una vez confirmado, las nuevas imágenes se reflejarán en su evento.",
                                                                    "landing page"
                                                                )}
                                                                startContent={<CircleArrowDown strokeWidth={2} className="w-5 h-5"/>}>
                                                                Guardar cambios
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <div>
                                                    <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-12">
                                                        {previewUrlLogo && (
                                                            <div>
                                                                <p className="text-sm mb-2 font-bold">Logo:</p>
                                                                <Image
                                                                    isBlurred
                                                                    isZoomed
                                                                    alt="Previsualización"
                                                                    className="object-cover"
                                                                    width="100%"
                                                                    height={350}
                                                                    src={previewUrlLogo}
                                                                    radius="lg"
                                                                    shadow="lg"
                                                                />
                                                            </div>
                                                        )}
                                    
                                                        <div className="col-span-2 relative">
                                                            <p className="text-sm mb-2 font-bold">Galería:</p>

                                                            {/* 1) Grid de placeholders en el fondo */}
                                                            {previewUrlsPlaceholder.length > 0 && (
                                                                <div
                                                                className="absolute inset-0 grid grid-cols-3 gap-6 pt-7"
                                                                style={{ zIndex: 0 }}
                                                                >
                                                                {previewUrlsPlaceholder.map((url, idx) => (
                                                                    <div key={`old-${idx}`} className="overflow-hidden rounded-lg">
                                                                    <Image
                                                                        alt={`Placeholder ${idx + 1}`}
                                                                        className="object-cover"
                                                                        classNames={{
                                                                            img: "brightness-50", // Oscurece la imagen al 75% de su brillo original
                                                                            // Otras opciones: "brightness-50", "brightness-25" para más oscuridad
                                                                        }}                                                                        
                                                                        width="100%"
                                                                        height={350}
                                                                        src={url}
                                                                        radius="lg"
                                                                        shadow="lg"
                                                                    />
                                                                    </div>
                                                                ))}
                                                                </div>
                                                            )}

                                                            {/* 2) Grid de imágenes nuevas encima */}
                                                            {previewUrls.length > 0 && (
                                                                <div
                                                                className="grid grid-cols-3 gap-6 relative"
                                                                style={{ zIndex: 10 }}
                                                                >
                                                                {previewUrls.map((url, idx) => (
                                                                    <div key={`new-${idx}`} className="relative overflow-hidden rounded-lg">
                                                                    <Image
                                                                        isBlurred
                                                                        isZoomed
                                                                        alt={`Previsualización ${idx + 1}`}
                                                                        className="object-cover"
                                                                        width="100%"
                                                                        height={350}
                                                                        src={url}
                                                                        radius="lg"
                                                                        shadow="lg"
                                                                    />
                                                                    <div className="absolute top-2 right-2 z-20">
                                                                        <Tooltip
                                                                        content="Eliminar"
                                                                        placement="top"
                                                                        className="text-text-50 bg-bg-100 dark:text-text-950 dark:bg-bg-900"
                                                                        >
                                                                        <Button
                                                                            isIconOnly
                                                                            size="sm"
                                                                            variant="flat"
                                                                            onPress={() => removeImage(idx)}
                                                                        >
                                                                            <X strokeWidth={2} className="w-5 h-5" />
                                                                        </Button>
                                                                        </Tooltip>
                                                                    </div>
                                                                    </div>
                                                                ))}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Tab>
                                <Tab key="Talleres" title="Talleres">
                                    <div className="flex-1">
                                    <Table
                                        color="default"
                                        checkboxesProps={{
                                        classNames: {
                                            wrapper: "after:bg-primario-500 after:text-background text-background",
                                        },
                                        }}
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
                                            emptyContent={ workshops.length === 0 ? "No tienes talleres por ahora" : "No se encontraron talleres :("} 
                                            items={sortedItems}>
                                            {(item) => (
                                                <TableRow aria-label={item.indice} key={item.id}>
                                                {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                                                </TableRow>
                                            )}
                                        </TableBody>
                                    </Table>
                                    </div>
                                </Tab>
                                <Tab key="Checadores" title="Checadores">
                                    <Table
                                    color="default"
                                    checkboxesProps={{
                                    classNames: {
                                        wrapper: "after:bg-primario-500 after:text-background text-background",
                                    },
                                    }}
                                    selectionMode="multiple"
                                    isHeaderSticky
                                    aria-label="Table checkers"
                                    bottomContent={bottomContent2}
                                    bottomContentPlacement="outside"
                                    classNames={ classNames }
                                    selectedKeys={selectedKeys2}
                                    sortDescriptor={sortDescriptor2}
                                    topContent={topContent2}
                                    topContentPlacement="outside"
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
                                        emptyContent={ allCheckers.length === 0 ? "No tienes checadores por ahora" : "No se encontraron checadores :("} 
                                        items={sortedItems2}>
                                        {(item) => (
                                            <TableRow aria-label={item.indice} key={item.id}>
                                            {(columnKey) => <TableCell>{renderCell2(item, columnKey)}</TableCell>}
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                                </Tab>
                            </Tabs>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <Modal 
            ref={targetRef} 
            isOpen={isOpen} 
            onClose={onClose} 
            size="md" 
            backdrop="opaque" 
            hideCloseButton
            className="text-text-50 bg-bg-50 dark:dark dark:text-text-950 dark:bg-bg-950">
            <ModalContent>
                <ModalHeader {...moveProps} className="place-content-between pt-10 pb-6 text-4xl">
                    <h1 className="text-xl font-bold">{modalConfig.title}</h1>
                    <ButtonX onPress={onClose}></ButtonX>
                </ModalHeader>
                
                <ModalBody>
                    <div className="text-sm space-y-3 pb-6 text-center">
                        <p>{modalConfig.description}</p>
                    </div>
                </ModalBody>
                
                <ModalFooter className="flex justify-center gap-4">
                    <Button 
                        fullWidth
                        variant="light"
                        color="default"
                        onPress={onClose}
                        startContent={<X strokeWidth={2} className="w-5 h-5"/>}>
                        Cancelar
                    </Button>
                    <Button 
                        isLoading={isSubmitting}
                        spinner={<Spinner/>}
                        fullWidth
                        color="secondary"
                        variant="ghost"
                        onPress={() => handleAction(modalConfig.type)}
                        className="font-bold"
                        startContent={isSubmitting ? "" : <CircleArrowDown strokeWidth={2} className="w-5 h-5" /> 
                        }>
                        Guardar
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>

        <WorkshopDrawer
            action={drawerAction}
            data={selectedWorkshop}
            isOpen={isDrawerOpen}
            onOpenChange={setIsDrawerOpen}
            onConfirm={handleDrawerConfirm}
        />
        
        <WorkshopModal
            action="status"
            status={selectedWorkshop.status === "activo"}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onConfirm={handleModalConfirm}
            data={selectedWorkshop}
        />

        <CheckersDrawer
            action={drawerAction2}
            data={selectedChecker}
            isOpen={isDrawerOpen2}
            onOpenChange={setIsDrawerOpen2}
            onConfirm={handleDrawerConfirm2}
        />
        
        <CheckersModal
            action="status"
            status={selectedChecker.status === "activo"}
            isOpen={isModalOpen2}
            onClose={() => setIsModalOpen2(false)}
            onConfirm={handleModalConfirm2}
            data={selectedChecker}
            email={selectedChecker.email}
        />
        </>
    );
}