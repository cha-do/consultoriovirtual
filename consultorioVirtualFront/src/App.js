//Administrador de la rutas
import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CreaPaciente from "./paginas/authen/CrearPaciente";
import CreaProfesional from "./paginas/authen/CrearProfesional";
import Login from "./paginas/authen/Login";
import HomePaciente from "./paginas/paciente/Home";
import CitasPaciente from "./paginas/paciente/CitasAgendadas";
import AgendarCitas from "./paginas/paciente/AgendarCitas";
import HomeProfesional from "./paginas/profesional/Home";
import CitasProfesional from "./paginas/profesional/CitasAgendadas";
import CrearCita from "./paginas/profesional/CrearCita";

function App() {
  return (
    // acá se maquetá, lenguaje ->JSX extensión de sintaxis de JavaScript que nos permite mezclar JS y HTML (XML), de ahí su nombre JavaScript XML.
    <Fragment>
      <Router>
        <Routes>
          <Route path="/" exact element={<Login />} />{" "}
          {/*Comentario: exact element busca el elemento dado entre llaves*/}
          <Route path="/paciente/crear" exact element={<CreaPaciente />} />
          <Route path="/paciente/home" exact element={<HomePaciente />} />
          <Route path="/paciente/citas" exact element={<CitasPaciente />} />
          <Route path="/paciente/citas/agendar" exact element={<AgendarCitas />} />
          <Route path="/profesional/crear" exact element={<CreaProfesional />} />
          <Route path="/profesional/home" exact element={<HomeProfesional />} />
          <Route path="/profesional/citas" exact element={<CitasProfesional />} />
          <Route path="/profesional/citas/crear" exact element={<CrearCita />} />
        </Routes>
      </Router>
    </Fragment>
  );
}

export default App;
