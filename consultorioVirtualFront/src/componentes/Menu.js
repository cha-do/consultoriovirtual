import React from "react";
import { Link } from "react-router-dom";

const Menu = ({ tipoUsuario }) => {
  let modificar = "Crear citas";
  let URIconsultar = "/profesional/citas/";
  let URImodificar = "/profesional/citas/crear";
  if (tipoUsuario === "paciente") {
    modificar = "Agendar citas";
    URIconsultar = "/paciente/citas/";
    URImodificar = "/paciente/citas/agendar";
  }

  return (
    <nav className="mt-2">
      <ul
        className="nav nav-pills nav-sidebar flex-column"
        data-widget="treeview"
        role="menu"
        data-accordion="false"
      >
        <li className="nav-item">
          <Link to={`/${tipoUsuario}/home`} className="nav-link">
            <i className="nav-icon fas fa-home" />
            <p>Inicio</p>
          </Link>
        </li>

        <li className="nav-item">
          <Link to={URIconsultar} className="nav-link">
            <i className="nav-icon fas fa-book" />
            <p>Citas agendadas</p>
          </Link>
        </li>

        <li className="nav-item">
          <Link to={URImodificar} className="nav-link">
            <i className="nav-icon fas fa-edit" />
            <p>{modificar}</p>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;
