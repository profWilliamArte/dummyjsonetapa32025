import React, { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Inicio from './pages/Inicio'
import Error405 from './pages/Error405'
import Movil from './pages/Movil'
import Laptop from './pages/Laptop'
import Tienda from './pages/Tienda'
import Detalle from './pages/Detalle'
import Categorias from './pages/Categorias'
import Busquedas from './pages/Busquedas'
import CarritoProvider from './contexts/CarritoProvider';
import TopHeader from './components/TopHeader'

import DolarProvider from './contexts/DolarProvider';

const App = () => {
  const [darkMode, setDarkMode] = useState('dark')

  const toggleTheme = () => {
    setDarkMode(!darkMode)
    document.body.setAttribute('data-bs-theme', !darkMode ? 'dark' : 'light')
  }
  return (
     <DolarProvider>
     <CarritoProvider>
      <BrowserRouter>
        <div className="app">
          <TopHeader/>
          <Header darkMode={darkMode} toggleTheme={toggleTheme} />
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/inicio" element={<Inicio />} />

            <Route path="/movil" element={<Movil />} />
            <Route path="/laptop" element={<Laptop />} />
            <Route path="/tienda" element={<Tienda />} />
            <Route path="/busquedas" element={<Busquedas />} />
            <Route path="/detalle/:id/:nombre" element={<Detalle />} />
            <Route path="/categoria/:id" element={<Categorias />} />

            <Route path="*" element={<Inicio />} />

          </Routes>

          <Footer />
        </div>
      </BrowserRouter>
    </CarritoProvider>
    </DolarProvider>
  )
}

export default App