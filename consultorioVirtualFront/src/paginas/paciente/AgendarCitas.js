import React from "react";
import { useState, useEffect } from "react";
import ContentHeader from "../../componentes/ContentHeader";
import Footer from "../../componentes/Footer";
import Navbar from "../../componentes/NavBar";
import Sidebar from "../../componentes/Sidebar";
//import { Link } from "react-router-dom";
import APIInvoke from "../../utils/APIIncoke";
import swal from "sweetalert";

const CitasDisponibles = () => {
  const [citas, setCitas] = useState([]);

  const cargarCitas = async () => {
    const response = await APIInvoke.invokeGET(`/cita/buscar`);
    console.log(response);
    setCitas(response.citas);
  };

  useEffect(() => {
    cargarCitas();
  }, []);

  const agendarCita = async (e, idCita) => {
    e.preventDefault(); //evitar el comportamiento por defecto al oprimir un botón
    const response = await APIInvoke.invokePUT(`/cita/agendar/${idCita}`);
    swal({
      title: "Cíta agendada",
      text: "Se agendó la cita indicada",
      icon: "sucsess",
      buttons: {
        confirm: {
          text: "Ok",
          value: true,
          visible: true,
          className: "btn btn-danger",
          closeModal: true,
        },
      },
    });
    console.log(response);
    cargarCitas();
  };

  return (
    <div className="wrapper">
      <Navbar></Navbar>
      <Sidebar tipoUsuario={"paciente"}></Sidebar>
      <div className="content-wrapper">
        <ContentHeader
          titulo={"Citas disponibles, escoja la cita que desea agendar"}
          breadCrumb1={"Inicio"}
          breadCrumb2={"Consultorio"}
          ruta1={"paciente/home"}
        />
        <section className="content">
          {citas.map((item) => (
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Código cita: {item._id}</h3>
                <div className="card-tools">
                  <button
                    type="button"
                    className="btn btn-tool"
                    data-card-widget="collapse"
                    title="Minimizar"
                  >
                    <i className="fas fa-minus" />
                  </button>
                  <button
                    onClick={(e) => agendarCita(e, item._id)}//Todo
                    type="button"
                    className="btn btn-sm btn-primary"
                    title="Agendar cita"
                  >
                    Agendar cita
                  </button>
                </div>
              </div>
              <div className="card-body">
                <div>
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th style={{ width: "50%" }}></th>
                        <th style={{ width: "50%" }}></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Fecha y Hora</td>
                        <td>{item.fechaHora}</td>
                      </tr>
                      <tr>
                        <td>Tipo</td>
                        <td>{item.tipo}</td>
                      </tr>
                      <tr>
                        <td>Médico</td>
                        <td>{item.idProfesional}</td>
                      </tr>
                      <tr>
                        <td>Modalidad</td>
                        <td>{item.modalidad}</td>
                      </tr>
                      <tr>
                        <td>Lugar</td>
                        <td>{item.lugar}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default CitasDisponibles;
