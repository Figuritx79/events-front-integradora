import React, { useState, useEffect } from "react";
import { getCheckers } from '../service/Checkers.service';
import { Search, X, CalendarArrowUp, Eye, Pen, CalendarCheck2, CalendarX2, CircleArrowRight, CircleArrowLeft, } from "lucide-react";
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
    Progress,
    Skeleton,
    useDisclosure,
    useDraggable,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from "@heroui/react";
import { Link, useNavigate } from "react-router";
import CheckersDrawer from "../components/CheckersDrawer";
import { useAuth } from '../../auth/providers/AuthProvider';
import CheckersModal from "../components/CheckersModal"
import { Spinner, ButtonX } from "../../global/components/Components";
import { Toast } from "../../global/components/Toast";
import { assignChecker } from "../service/Events.service";
import WorkshopDrawer from "../components/WorkshopDrawer";
import WorkshopModal from "../components/WorkshopModal";
import { getWorkshops } from "../service/Workshop.service";

export default function CreateEventStep4 () {
  const navigate = useNavigate(); // Agregar hook de navegación
      const {isOpen, onOpen, onClose} = useDisclosure();
      const { credentials } = useAuth();
      const [isDrawerOpen, setIsDrawerOpen] = useState(false);
      const [isModalOpen, setIsModalOpen] = useState(false);
      const [drawerAction, setDrawerAction] = useState("create"); // "create", "update", "read"
      const [selectedWorkshop, setSelectedWorkshop] = useState({});
      const [workshops, setWorkshops] = useState([]);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);
      const [refreshTrigger, setRefreshTrigger] = useState(false);
      const targetRef = React.useRef(null);
      const {moveProps} = useDraggable({targetRef, isDisabled: !isOpen});
      const [isSubmitting, setIsSubmitting] = useState(false);
  
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
  
      useEffect(() => {
          const fetchData = async () => {
              try {
                  const data = await getWorkshops(sessionStorage.getItem('event'));
                  if (data) {
                    console.log("talleres:" +data)
                      const dataCount = data.result.map((workshop, index) => ({
                          ...workshop,
                          indice: index + 1,
                          status: workshop.status ? "activo" : "inactivo"
                      }));
                      setWorkshops(dataCount);
                      console.log(dataCount)
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

      const handleAction = async () => {
                Toast({
                  onConfirm:() => handleModalConfirm,
                  color: "success",
                  title: "Se asignaron los talleres",
                  description: "Se han asignado los talleres asignados correctamente"
                });
              onClose();
              window.location.reload();
              navigate('/AdminEvents/Events', { replace: true });
            
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
            <div className="flex flex-col gap-4 pb-1 pt-6">
                <div className="flex justify-between gap-3 items-start">
                    <div>
                    <h1 className="text-4xl font-bold">Registrar talleres</h1>
                    
                    </div>
                    <div className="flex gap-3 justify-between items-start">
                    
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
                <Progress
                      aria-label="Downloading..."
                      className="w-full"
                      color="primary"
                      size="sm"
                      value={100}
                    />
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
                <div className="flex justify-between items-center space-x-3">
                <div className="flex flex-col justify-end items-end">
                                          <span className="text-text-500 text-xs">
                                          {selectedKeys === "all"
                                            ? "Todos seleccionados"
                                            : `${selectedKeys.size} de ${items.length} seleccionados`}
                                            </span> 
                                            <span className="text-text-500 text-sm">Total: {workshops.length} talleres</span>
                                        </div>
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
                    <Button 
                            isDisabled={workshops.length === 0}
                            onPress={onOpen}
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
            th: "font-bold text-sm text-text-50 bg-bg-100 dark:dark dark:text-text-950 dark:bg-bg-900",
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
            </div>

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
                  <h1 className="text-xl font-bold">¿Desea terminar con la creación del evento?</h1>
                  <ButtonX onPress={onClose}></ButtonX>
                </ModalHeader>
                
                <ModalBody>
                    <div className="text-sm space-y-3 pb-6 text-start">
                        <p>Al continuar, los talleres serán asignados inmediatamente al evento que acaba de crear. Así mismo, será redirigido a sus eventos</p>
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
                    color="primary"
                    variant="ghost"
                    onPress={handleAction}
                    className="font-bold"
                    startContent={
                      isSubmitting ? null : 
                      <CircleArrowRight strokeWidth={2} className="w-5 h-5" />
                    }>
                    Confirmar
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
        </>
    ); 
}

