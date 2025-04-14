// import { StrictMode } from 'react'

import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { ToastProvider } from '@heroui/toast';
import { BrowserRouter, Route, Routes } from 'react-router';
import Login from './modules/auth/pages/Login.jsx';
import RecoveryPassword from './modules/auth/pages/RecoveryPassword.jsx';
import ResetPassword from './modules/auth/pages/ResetPassword.jsx';
import AdminEventRegister from './modules/auth/pages/AdminEventRegister.jsx';
import { CommonAdminForm } from './modules/auth/components/CommonAdminForm.jsx';
import { PersonalAdminForm } from './modules/auth/components/PersonalAdminForm.jsx';
import Succes from './modules/auth/pages/Success.jsx';
import { AuthProvider } from './modules/auth/providers/AuthProvider.jsx';
import EventLandingPage from './modules/events/pages/Landing.jsx';
import RegisterEvent from './modules/events/pages/RegisterEvent.jsx';
import { PersonalForm } from './modules/events/components/PersonalForm.jsx';
import { CommonForm } from './modules/events/components/CommonForm.jsx';
import { FinalForm } from './modules/events/components/FinalForm.jsx';
import Success from './modules/events/pages/Succes.jsx';

import { X } from "lucide-react";
import { HeroUIProvider, Tooltip } from '@heroui/react';





import AdminEvents from './modules/adminEvents/pages/AdminEvents.jsx';
import CreateEventPage from './modules/adminEvents/pages/CreateEventPage.jsx';
import HomeAdminEvents from './modules/adminEvents/pages/Home.jsx';
import EventsAdminEvents from './modules/adminEvents/pages/Events.jsx';
import CreateEventStep1 from './modules/adminEvents/pages/CreateEventStep1.jsx';
import CreateEventStep2 from './modules/adminEvents/pages/CreateEventStep2.jsx';
import CreateEventStep3 from './modules/adminEvents/pages/CreateEventStep3.jsx';
import CreateEventStep4 from './modules/adminEvents/pages/CreateEventStep4.jsx';
import CheckersAdminEvents from './modules/adminEvents/pages/Checkers.jsx';

import AdminPage from './modules/admin/pages/AdminPage.jsx';
import HomeAdmin from './modules/admin/pages/Home.jsx';
import UsersAdmin from './modules/admin/pages/Users.jsx';

import UserPage from './modules/user/pages/UserPage.jsx';
import HomeUser from './modules/user/pages/Home.jsx';
import ProfileUser from './modules/user/pages/Profile.jsx';

createRoot(document.getElementById('root')).render(
	<BrowserRouter>
		<HeroUIProvider  locale="es-ES">
		<main className='dark:dark text-foreground bg-background'>
			<ToastProvider
			placement="bottom-left"
			toastOffset={80}
			toastProps={{
				classNames: {
					closeButton: "opacity-100 absolute right-4 top-1/2 -translate-y-1/2 bg-transparent border-none shadow-none",
					base: "bg-bg-50 dark:bg-bg-950", // Cambia esto al color de fondo que desees
					title: "font-bold"
				},
				closeIcon: 
					<Tooltip content="Cerrar" placement="right" className='text-text-50 bg-bg-100 dark:text-text-950 dark:bg-bg-900 dark:dark'>
						<X strokeWidth={2} className="w-5 h-5"/>
					</Tooltip>,
				variant: "bordered",
				radius: "md",
				timeout: 10000,
				shouldShowTimeoutProgress: true,
			}}/>

			<AuthProvider>
				<Routes>
					<Route path="/" element={<App />} />
					<Route path="/login" element={<Login />} />
					<Route path="/recovery-password" element={<RecoveryPassword />} />
					<Route path="/success" element={<Succes />} />
					<Route path="/reset-password" element={<ResetPassword />} />
					{/* Para registro rutas */}
					<Route path="/admin-register" element={<AdminEventRegister />}>
						<Route index element={<CommonAdminForm />} />
						<Route path="personal" element={<PersonalAdminForm />} />
					</Route>
					{/* Para la landing */}
					<Route path="/landing">
						<Route path=":event" element={<EventLandingPage />} />
						<Route path="register/:id" element={<RegisterEvent />}>
							<Route index element={<PersonalForm />} />
							<Route path="common" element={<CommonForm />} />
							<Route path="final" element={<FinalForm />} />
							<Route path="good" element={<Success />} />
						</Route>
					</Route>

					




					<Route path="/AdminEvents" element={<AdminEvents/>}>
						<Route index element={<HomeAdminEvents/>} />
						<Route path="CreateEvent" element={<CreateEventPage/>}>
							<Route index element={<CreateEventStep1/>} />  {/* Paso inicial */}
							<Route path="Images" element={<CreateEventStep2/>} />
							<Route path="Checkers" element={<CreateEventStep3/>} />
							<Route path="Workshops" element={<CreateEventStep4/>} />
						</Route>
						<Route path="Events" element={<EventsAdminEvents/>} />
						<Route path="Checkers" element={<CheckersAdminEvents/>} />
					</Route>

					<Route path="/Admin" element={ <AdminPage/> } > {/* Falta ruta para admins (creo) */}
						<Route index element={ <HomeAdmin/> } />
						<Route path="Users" element={ <UsersAdmin/> } />
					</Route>

					<Route path="/User" element={ <UserPage/> } >
						<Route index element={ <HomeUser/> } />
					</Route>	
				</Routes>
			</AuthProvider>
			</main>
		</HeroUIProvider>
	</BrowserRouter>
);

