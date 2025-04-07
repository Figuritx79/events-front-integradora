import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link } from 'react-router-dom'; // Solo una importación
import { CircleUser, House, Users, MapPinned, LogOut, Search, ChevronDown, Plus, Ellipsis, CalendarPlus, X, Menu, Eye, CalendarCog, CalendarCheck2, CalendarX2, CircleArrowRight, ImageUp, UserCheck, UserPen, UserX, CircleArrowLeft, Info } from "lucide-react";
import { addToast } from "@heroui/toast";
import { parseDate, getLocalTimeZone, parseZonedDateTime, now } from "@internationalized/date";
import { useDateFormatter } from "@react-aria/i18n";
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
  Image,
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

// Configuración de la API
const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  }
});

export const columns = [
  { name: "ID", uid: "id", sortable: true },
  { name: "Nombre", uid: "name", sortable: true }
];

const statusOptions = [
  { name: "Activo", uid: "active" },
  { name: "Inactivo", uid: "inactive" }
];

export function capitalize(s) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : "";
}

const statusColorMap = {
  active: "success",
  inactive: "danger",
};

const INITIAL_VISIBLE_COLUMNS = ["name", "speakerName", "capacity", "hour", "actions"];

export default function CreateEventStep4() {
  const [workshops, setWorkshops] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [previewSpeakerUrl, setPreviewSpeakerUrl] = useState(null);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [filterValue, setFilterValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = useState(new Set(INITIAL_VISIBLE_COLUMNS));
  const [statusFilter, setStatusFilter] = useState("all");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortDescriptor, setSortDescriptor] = useState({
    column: "name",
    direction: "ascending",
  });
  const [page, setPage] = useState(1);
  
  const {
    isOpen: isSaveOpen,
    onOpen: onSaveOpen,
    onOpenChange: onSaveOpenChange
  } = useDisclosure();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
    watch
  } = useForm();

  useEffect(() => {
    const fetchWorkshops = async () => {
      try {
        const response = await api.get('/workshop/workshops');
        setWorkshops(response.data.data || []);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching workshops:', error);
        setIsLoading(false);
      }
    };

    fetchWorkshops();
  }, []);


  let formatter = useDateFormatter({ dateStyle: "long", timeStyle: "short", hour12: true });
  
  const showToastInfo = () => {
    addToast({
      color: "primary",
      icon: <Info strokeWidth={2} className="w-5 h-5"/>,
      title: "Etapa 3: Registrar talleres",
      description: "Registre los talleres que existirán en el evento",
      timeout: 60000,
    });
  };  


  const showToastSuccess = () => {
    addToast({
      color: "success",
      icon: <CalendarCheck2 strokeWidth={2} className="w-5 h-5"/>,
      title: "Taller registrado",
      description: "Se registró el taller exitosamente",
    });
  };

  const onSubmit = async (data) => {
    if (!selectedEventId) {
      addToast({
        color: "danger",
        icon: <Info strokeWidth={2} className="w-5 h-5"/>,
        title: "Error",
        description: "Debe seleccionar un evento",
      });
      return;
    }

    const formData = new FormData();
    
    formData.append('workshop', JSON.stringify({
      name: data.name,
      speakerName: data.speakerName,
      event: selectedEventId,
      capacity: data.capacity,
      description: data.description,
      hour: data.hour
    }));
    
    if (data.speakerImage) formData.append('speakerImage', data.speakerImage[0]);
    if (data.workshopImage) formData.append('workshopImage', data.workshopImage[0]);
    
    try {
      const response = await api.post('/workshop/workshops/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.type === "SUCCESS") {
        const updatedWorkshops = await api.get('/workshop/workshops');
        setWorkshops(updatedWorkshops.data.data || []);
        
        showToastSuccess();
        onSaveOpenChange(false);
        reset();
        setPreviewUrl(null);
        setPreviewSpeakerUrl(null);
      }
    } catch (error) {
      console.error('Error creating workshop:', error);
      addToast({
        color: "danger",
        icon: <Info strokeWidth={2} className="w-5 h-5"/>,
        title: "Error",
        description: "No se pudo registrar el taller",
      });
    }
  };

  const handleWorkshopImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileType = file.type;
      if (!fileType.match('image/jpeg') && !fileType.match('image/png')) {
        console.error("Formato de archivo no válido");
        e.target.value = null;
        setPreviewUrl(null);
      } else {
        const objectUrl = URL.createObjectURL(file);
        setPreviewUrl(objectUrl);
      }
    }
  };

  const handleSpeakerImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileType = file.type;
      if (!fileType.match('image/jpeg') && !fileType.match('image/png')) {
        console.error("Formato de archivo no válido");
        e.target.value = null;
        setPreviewSpeakerUrl(null);
      } else {
        const objectUrl = URL.createObjectURL(file);
        setPreviewSpeakerUrl(objectUrl);
      }
    }
  };

  const pages = Math.ceil(workshops.length / rowsPerPage);
  const hasSearchFilter = Boolean(filterValue);

  const filteredItems = React.useMemo(() => {
    let filteredWorkshops = [...workshops];

    if (hasSearchFilter) {
      filteredWorkshops = filteredWorkshops.filter((workshop) =>
        workshop.name.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }

    return filteredWorkshops;
  }, [workshops, filterValue]);

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
    switch (columnKey) {
      case "name":
        return (
          <Tooltip
            showArrow
            placement="left"
            content={
              <div className="p-2">
                <Image
                  src={workshop.imageWorkShop}
                  alt={workshop.name}
                  width={200}
                  height={120}
                  radius="sm"
                />
                <p className="mt-2 font-semibold">{workshop.description}</p>
              </div>
            }
          >
            {workshop.name}
          </Tooltip>
        );
      case "speakerName":
        return (
          <User
            name={workshop.speaker.speaker_name}
            avatarProps={{ src: workshop.speaker.speaker_image }}
            description={`Capacidad: ${workshop.capacity}`}
          />
        );
      case "capacity":
        return workshop.capacity;
      case "hour":
        return workshop.hour;
      case "actions":
        return (
          <div className="flex gap-2">
            <Tooltip content="Detalles">
              <Button isIconOnly size="sm" variant="light" onPress={() => {}}>
                <Eye className="text-primary-500" />
              </Button>
            </Tooltip>
            <Tooltip content="Editar">
              <Button isIconOnly size="sm" variant="light" onPress={() => {}}>
                <UserPen className="text-primary-500" />
              </Button>
            </Tooltip>
          </div>
        );
      default:
        return workshop[columnKey];
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
              onValueChange={setFilterValue}
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
                popoverContent: "text-text-50 bg-bg-50 dark:dark dark:text-text-950 dark:bg-bg-950",
              }}
            >
              {columns.map((column) => (
                <SelectItem key={column.uid} className="text-text-50 bg-bg-50 capitalize dark:dark dark:text-text-950 dark:bg-bg-950">
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
              startContent={<CalendarPlus strokeWidth={2} className="w-5 h-5"/>}
            >
              Registrar taller
            </Button>
          </div>
        </div>
      </div>
    );
  }, [filterValue, visibleColumns, workshops.length]);

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
            <span className="text-text-500 text-sm">Total: {workshops.length} talleres</span>
          </div>
          <Select
            disallowEmptySelection
            className="w-[110px] ml-2"
            defaultSelectedKeys={["5"]}
            labelPlacement="outside-left"
            variant="bordered"
            renderValue={(items) => {
              const selectedKey = items.values().next().value?.key;
              return <p>Filas: {selectedKey}</p>;
            }}
            classNames={{
              popoverContent: "text-text-50 bg-bg-50 dark:dark dark:text-text-950 dark:bg-bg-950",
            }}
            onChange={(e) => setRowsPerPage(Number(e.target.value))}
          >
            <SelectItem key={5} value="5" className="text-text-50 bg-bg-50 capitalize dark:dark dark:text-text-950 dark:bg-bg-950">5</SelectItem>
            <SelectItem key={10} value="10" className="text-text-50 bg-bg-50 capitalize dark:dark dark:text-text-950 dark:bg-bg-950">10</SelectItem>
            <SelectItem key={15} value="15" className="text-text-50 bg-bg-50 capitalize dark:dark dark:text-text-950 dark:bg-bg-950">15</SelectItem>
            <SelectItem key={20} value="20" className="text-text-50 bg-bg-50 capitalize dark:dark dark:text-text-950 dark:bg-bg-950">20</SelectItem>
          </Select>
          
          <Button 
          as={Link}
          to="/AdminEvents/CreateEvent/Checkers"
          className="font-bold"
          size="md"
          radius="md"
          variant="light"
          color="primary"
          startContent={<CircleArrowLeft strokeWidth={2} className="w-5 h-5"/>}
        >
          Regresar
        </Button>
          <Button 
            as={Link}
            className="font-bold"
            size="md"
            radius="md"
            variant="solid"
            color="primary"
            startContent={<CircleArrowRight strokeWidth={2} className="w-5 h-5"/>}
          >
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
        "group-data-[first=true]/tr:first:before:rounded-none",
        "group-data-[first=true]/tr:last:before:rounded-none",
        "group-data-[middle=true]/tr:before:rounded-none",
        "group-data-[last=true]/tr:first:before:rounded-none",
        "group-data-[last=true]/tr:last:before:rounded-none",
      ],
      wrapper: "max-h-full overflow-y-auto px-2 text-text-50 bg-bg-50 dark:text-text-950 dark:bg-bg-950",
      base: "h-full",
      table: "min-w-full text-text-50 bg-bg-50 dark:text-text-950 dark:bg-bg-950",
    }),
    [],
  );

  useEffect(() => {
    showToastInfo();
  }, []);

  return (
    <>
      <div className="h-full flex-1 lg:ml-12 xl:mx-20 py-6 flex flex-col text-text-50 bg-bg-50 dark:text-text-950 dark:bg-bg-950">
        <div className="flex-1 min-h-0 overflow-hidden px-2">
          <Table
            isHeaderSticky
            aria-label="Tabla de talleres"
            bottomContent={bottomContent}
            bottomContentPlacement="outside"
            classNames={classNames}
            selectedKeys={selectedKeys}
            selectionMode="multiple"
            sortDescriptor={sortDescriptor}
            topContent={topContent}
            topContentPlacement="outside"
            onSelectionChange={setSelectedKeys}
            onSortChange={setSortDescriptor}
          >
            <TableHeader columns={columns}>
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
              emptyContent={isLoading ? "Cargando talleres..." : "No se encontraron talleres"}
              items={sortedItems}
            >
              {(item) => (
                <TableRow key={item.id}>
                  {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <Drawer 
        isOpen={isSaveOpen} 
        onOpenChange={onSaveOpenChange} 
        size="sm" 
        backdrop="opaque" 
        placement="right" 
        hideCloseButton 
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
        }}
      >
        <DrawerContent>
          <DrawerHeader className="place-content-between pt-10 pb-6 text-4xl">
            <h1 className="text-4xl font-bold">Registrar taller</h1>
            <Tooltip content="Cerrar" placement="left">
              <Button
                isIconOnly
                size="sm"
                variant="light"
                onPress={() => onSaveOpenChange(false)}
              >
                <X strokeWidth={2} className="w-5 h-5"/>
              </Button>
            </Tooltip>
          </DrawerHeader>
          <DrawerBody>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Input
                {...register("name", { required: "Nombre es requerido" })}
                className="w-full py-3"
                size="md"
                radius="md"
                variant="bordered"
                type="text"
                placeholder="Ingresa el nombre del taller"
                label="Nombre"
                labelPlacement="outside"
                isRequired
                isInvalid={!!errors.name}
                errorMessage={errors.name?.message}
              />

              <Input
                {...register("speakerName", { required: "Nombre del ponente es requerido" })}
                className="w-full py-3"
                size="md"
                radius="md"
                variant="bordered"
                type="text"
                placeholder="Ingresa el nombre del ponente"
                label="Ponente"
                labelPlacement="outside"
                isRequired
                isInvalid={!!errors.speakerName}
                errorMessage={errors.speakerName?.message}
              />

              <NumberInput
                {...register("capacity", { 
                  required: "Capacidad es requerida",
                  min: { value: 1, message: "Mínimo 1 persona" }
                })}
                variant="bordered"
                className="py-3"
                label="Capacidad de personas"
                labelPlacement="outside"
                placeholder="Cupo"
                isRequired
                isClearable
                fullWidth
                minValue={1}
                isInvalid={!!errors.capacity}
                errorMessage={errors.capacity?.message}
              />

              <Input
                {...register("hour", { required: "Hora es requerida" })}
                type="time"
                className="w-full py-3"
                size="md"
                radius="md"
                variant="bordered"
                label="Hora del taller"
                labelPlacement="outside"
                isRequired
                isInvalid={!!errors.hour}
                errorMessage={errors.hour?.message}
              />

              <Textarea
                {...register("description")}
                isClearable
                className="w-full py-3"
                label="Descripción"
                placeholder="Descripción del taller"
                variant="bordered"
                labelPlacement="outside"
                onClear={() => console.log("textarea cleared")}
              />

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Imagen del Ponente</label>
                  <input
                    {...register("speakerImage")}
                    type="file"
                    accept=".jpg, .jpeg, .png, image/jpeg, image/png"
                    onChange={handleSpeakerImageChange}
                    className="hidden"
                    id="speakerImage"
                  />
                  <label
                    htmlFor="speakerImage"
                    className="flex flex-col items-center justify-center w-full p-4 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    {previewSpeakerUrl ? (
                      <Image
                        src={previewSpeakerUrl}
                        alt="Preview"
                        width={120}
                        height={120}
                        radius="sm"
                        className="mb-2"
                      />
                    ) : (
                      <UserCheck className="w-10 h-10 mb-2 text-gray-400" />
                    )}
                    <p className="text-sm text-gray-500">
                      {previewSpeakerUrl ? "Cambiar imagen" : "Subir imagen del ponente"}
                    </p>
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Imagen del Taller</label>
                  <input
                    {...register("workshopImage")}
                    type="file"
                    accept=".jpg, .jpeg, .png, image/jpeg, image/png"
                    onChange={handleWorkshopImageChange}
                    className="hidden"
                    id="workshopImage"
                  />
                  <label
                    htmlFor="workshopImage"
                    className="flex flex-col items-center justify-center w-full p-4 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    {previewUrl ? (
                      <Image
                        src={previewUrl}
                        alt="Preview"
                        width={120}
                        height={120}
                        radius="sm"
                        className="mb-2"
                      />
                    ) : (
                      <ImageUp className="w-10 h-10 mb-2 text-gray-400" />
                    )}
                    <p className="text-sm text-gray-500">
                      {previewUrl ? "Cambiar imagen" : "Subir imagen del taller"}
                    </p>
                  </label>
                </div>
              </div>

              <DrawerFooter>
                <div className="flex justify-between w-full items-center">
                  <div className="flex-1 pr-2">
                    <Button 
                      onPress={() => onSaveOpenChange(false)}
                      className="font-bold w-full"
                      size="md"
                      radius="md"
                      variant="light"
                      color="danger"
                      startContent={<X strokeWidth={2} className="w-5 h-5"/>}
                    >
                      Cancelar
                    </Button>
                  </div>
                  <div className="flex-1 pl-2">
                    <Button 
                      type="submit"
                      className="font-bold w-full"
                      size="md"
                      radius="md"
                      variant="ghost"
                      color="secondary"
                      startContent={<CalendarPlus strokeWidth={2} className="w-5 h-5"/>}
                    >
                      Registrar
                    </Button>
                  </div>
                </div>
              </DrawerFooter>
            </form>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}