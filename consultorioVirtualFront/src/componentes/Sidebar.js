import React from "react";
import Menu from "./Menu";
import Logo from "./img/Logo.png";
import Icono from "./img/user_icon.png";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      <Link to={"../../index3.html"} className="brand-link">
        <img
          src={Logo}
          alt="User Logo"
          className="brand-image img-circle elevation-3"
          style={{ opacity: ".8" }}
        />
        <span className="brand-text font-weight-light">Paciente</span>
      </Link>
      <div className="sidebar">
        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
          <div className="image">
            <img
              src={Icono}
              className="img-circle elevation-2"
              alt="User Icono"
            />
          </div>
          <div className="info">
            <Link to={"#"} className="d-block">
              Nombre_Paciente
            </Link>
          </div>
        </div>
        <Menu></Menu>
      </div>
    </aside>
  );
};

export default Sidebar;
