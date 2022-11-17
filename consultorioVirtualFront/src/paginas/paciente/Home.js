import React from "react";
import ContentHeader from "../../componentes/ContentHeader";
import Footer from "../../componentes/Footer";
import Navbar from "../../componentes/NavBar";
import Sidebar from "../../componentes/Sidebar";
import { Link } from "react-router-dom";

const HomePaciente = () => {
  return (
    <div className="wrapper">
      <Navbar></Navbar>
      <Sidebar tipoUsuario={"paciente"}></Sidebar>
      <div className="content-wrapper">
        <ContentHeader
          titulo={"Consultorio"}
          breadCrumb1={"Inicio"}
          breadCrumb2={"Consultorio"}
          ruta1={"/paciente/home"}
        />
        <section className="content">
          <div calssName="container-fluid">
            <div className="row">
              <div className="col-lg-3 col-6">
                <div className="small-box bg-info">
                  <div className="inner">
                    <h3>Citas</h3>
                    <p>&nbsp;</p>
                  </div>
                  <div className="icon">
                    <i className="fa fa-edit" />
                  </div>
                  <Link to={"/paciente/citas"} className="small-box-footer">
                    Ver citas agendadas{" "}
                    <i className="fas fa-arrow-circle-right" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default HomePaciente;
