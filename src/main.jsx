// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { HeroUIProvider } from '@heroui/react';
import { ToastProvider } from '@heroui/toast';
import { BrowserRouter, Route, Routes } from 'react-router';
import About from './modules/events/pages/page.jsx';
import Login from './modules/auth/pages/Login.jsx';
import RecoveryPassword from './modules/auth/pages/RecoveryPassword.jsx';
import ResetPassword from './modules/auth/pages/ResetPassword.jsx';
import AdminEventRegister from './modules/auth/pages/AdminEventRegister.jsx';
import { CommonAdminForm } from './modules/auth/components/CommonAdminForm.jsx';
import { PersonalAdminForm } from './modules/auth/components/PersonalAdminForm.jsx';
import Succes from './modules/auth/pages/Success.jsx';
createRoot(document.getElementById('root')).render(
	<BrowserRouter>
		<HeroUIProvider>
			<ToastProvider />
			<Routes>
				<Route path="/" element={<App />} />
				<Route path="/about" element={<About />} />
				<Route path="/login" element={<Login />} />
				<Route path="/recovery-password" element={<RecoveryPassword />} />
				<Route path="/success" element={<Succes />} />
				<Route path="/reset-password" element={<ResetPassword />} />
				<Route path="/admin-register" element={<AdminEventRegister />}>
					<Route index element={<CommonAdminForm />} />
					<Route path="personal" element={<PersonalAdminForm />} />
				</Route>
			</Routes>
		</HeroUIProvider>
	</BrowserRouter>
);
