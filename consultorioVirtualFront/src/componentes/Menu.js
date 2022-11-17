import React from "react";
import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <nav className="mt-2">
      <ul
        className="nav nav-pills nav-sidebar flex-column"
        data-widget="treeview"
        role="menu"
        data-accordion="false"
      >
        <li className="nav-item">
          <Link to={"/paciente/home"} className="nav-link">
            <i className="nav-icon fas fa-home" />
            <p>Inicio</p>
          </Link>
        </li>

        <li className="nav-item">
          <Link to={"/paciente/citas"} className="nav-link">
            <i className="nav-icon fas fa-book" />
            <p>Citas agendadas</p>
          </Link>
        </li>

        <li className="nav-item">
          <Link to={"/paciente/citas/agendar"} className="nav-link">
            <i className="nav-icon fas fa-edit" />
            <p>Agendar citas</p>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;
