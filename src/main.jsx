// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { HeroUIProvider } from '@heroui/react'
import { BrowserRouter, Route, Routes } from 'react-router'
import About from './modules/events/pages/page.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <HeroUIProvider>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/about' element={<About />} />
      </Routes>
    </HeroUIProvider>
  </BrowserRouter>,
)
