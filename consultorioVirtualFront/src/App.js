//Administrador de la rutas
import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CreaUser from "./paginas/authen/CreaUser";
import Login from "./paginas/authen/Login";
import Home from "./paginas/Home";
import CitasPaciente from "./paginas/citas/CitasPaciente";

function App() {
  return (
    // acá se maquetá, lenguaje ->JSX extensión de sintaxis de JavaScript que nos permite mezclar JS y HTML (XML), de ahí su nombre JavaScript XML.
    <Fragment>
      <Router>
        <Routes>
          <Route path="/" exact element={<Login />} />{" "}
          {/*Comentario: exact element busca el elemento dado entre llaves*/}
          <Route path="/user/crear" exact element={<CreaUser />} />
          <Route path="/paciente/home" exact element={<Home />} />
          <Route path="/paciente/citas" exact element={<CitasPaciente />} />
        </Routes>
      </Router>
    </Fragment>
  );
}

export default App;
