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

createRoot(document.getElementById('root')).render(
	<BrowserRouter>
		<HeroUIProvider>
			<ToastProvider />
			<Routes>
				<Route path="/" element={<App />} />
				<Route path="/about" element={<About />} />
				<Route path="/login" element={<Login />} />
				<Route path="/recovery-password" element={<RecoveryPassword />} />
			</Routes>
		</HeroUIProvider>
	</BrowserRouter>
);
