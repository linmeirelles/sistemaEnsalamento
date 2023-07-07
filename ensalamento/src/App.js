import { useState, useEffect } from 'react';
import './styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './pages/layout.js';
import Home from './pages/home';
import Professor from './pages/Lists/Professor.List';
import Desafio from './pages/Lists/Desafio.list'
import NoPage from './pages/noPage'
import Curso from './pages/Lists/Curso.List.js';
import Periodo from './pages/Lists/Periodo.List.js';
import Horario from './pages/Lists/Horario.List';
import Sala from './pages/Lists/Sala.List';


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="professor" element={<Professor />} />
          <Route path='periodo' element={<Periodo />} />
          <Route path='curso' element={<Curso />} />
          <Route path='sala' element={<Sala />} />
          <Route path='horario' element={<Horario />} />
          <Route path="desafio" element={<Desafio />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
