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
import { HomeAdminEvent } from './modules/adminEvents/components/HomeDashboardEvent.jsx';
import { Checkers } from './modules/adminEvents/components/Checkers.jsx';
import EventLandingPage from './modules/events/pages/Landing.jsx';
import RegisterEvent from './modules/events/pages/RegisterEvent.jsx';
import { PersonalForm } from './modules/events/components/PersonalForm.jsx';
import { CommonForm } from './modules/events/components/CommonForm.jsx';
import { FinalForm } from './modules/events/components/FinalForm.jsx';
createRoot(document.getElementById('root')).render(
	<BrowserRouter>
		<HeroUIProvider  locale="es-ES">
			<main className='dark:dark text-foreground bg-background'>
			<ToastProvider
			placement="bottom-left"
			toastOffset={75}
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
					{/* Para El ADMIN EVENT */}
					<Route path="/dashboard-admin-event" element={<DashboardAdminEvent />}>
						<Route index element={<HomeAdminEvent />} />
						<Route path="checker" element={<Checkers />} />
					</Route>
					{/* Para la landing */}
					<Route path="/landing">
						<Route path=":event" element={<EventLandingPage />} />
						<Route path="register/:id" element={<RegisterEvent />}>
							<Route index element={<PersonalForm />} />
							<Route path="common" element={<CommonForm />} />
							<Route path="final" element={<FinalForm />} />
						</Route>
					</Route>
				</Routes>
			</AuthProvider>
			</main>
		</HeroUIProvider>
	</BrowserRouter>
);
