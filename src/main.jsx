// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { HeroUIProvider } from '@heroui/react';
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
import DashboardAdminEvent from './modules/adminEvents/pages/dashboard.jsx';
import { HomeAdminEvent } from './modules/adminEvents/components/HomeDashboardEvent.jsx';
import { Checkers } from './modules/adminEvents/components/Checkers.jsx';
import EventLandingPage from './modules/events/pages/Landing.jsx';
import RegisterEvent from './modules/events/pages/RegisterEvent.jsx';
import { PersonalForm } from './modules/events/components/PersonalForm.jsx';
import { CommonForm } from './modules/events/components/CommonForm.jsx';
import { FinalForm } from './modules/events/components/FinalForm.jsx';
createRoot(document.getElementById('root')).render(
	<BrowserRouter>
		<HeroUIProvider>
			<ToastProvider />
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
		</HeroUIProvider>
	</BrowserRouter>
);
