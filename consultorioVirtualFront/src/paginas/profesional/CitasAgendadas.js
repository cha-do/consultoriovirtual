import React from "react";
import { useState, useEffect } from "react";
import ContentHeader from "../../componentes/ContentHeader";
import Footer from "../../componentes/Footer";
import Navbar from "../../componentes/NavBar";
import Sidebar from "../../componentes/Sidebar";
//import { Link } from "react-router-dom";
import APIInvoke from "../../utils/APIIncoke";
import swal from "sweetalert";

const CitasProfesional = () => {
  const [citas, setCitas] = useState([]);

  const cargarCitas = async () => {
    const response = await APIInvoke.invokeGET(`cita`);
    console.log(response);
    setCitas(response.citas);
  };

  useEffect(() => {
    cargarCitas();
  }, []);

  const eliminarCita = async (e, idCita) => {
    e.preventDefault(); //evitar el comportamiento por defecto al oprimir un botón
    const response = await APIInvoke.invokeDELETE(`cita/${idCita}`);
    swal({
      title: "Cíta eliminada",
      text: "Se eliminó la cita indicada",
      icon: "warning",
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
      <Sidebar tipoUsuario={"profesional"}></Sidebar>
      <div className="content-wrapper">
        <ContentHeader
          titulo={"Citas agendadas"}
          breadCrumb1={"Inicio"}
          breadCrumb2={"Consultorio"}
          ruta1={"profesional/home"}
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
                    onClick={(e) => eliminarCita(e, item._id)}
                    type="button"
                    className="btn btn-sm btn-primary"
                    title="Eliminar cita"
                  >
                    Eliminar cita
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
                        <td>Paciente</td>
                        <td>{item.idPaciente}</td>
                      </tr>
                      <tr>
                        <td>Modalidad</td>
                        <td>{item.modalidad}</td>
                      </tr>
                      <tr>
                        <td>Lugar</td>
                        <td>{item.lugar}</td>
                      </tr>
                      <tr>
                        <td>Agendada</td>
                        <td>{!item.disponible ? "Sí" : "No"}</td>
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

export default CitasProfesional;
