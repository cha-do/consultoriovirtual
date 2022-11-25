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
  const [newCita, setNewCita] = useState({
    fechaHora: "",
    modalidad: "",
    lugar: "",
  });

  const { fechaHora, modalidad, lugar } = newCita;

  const onChange = (e) => {
    //recibir por teclado (evento)
    setNewCita({
      //cambiar atributosr de usuario
      ...newCita, //copia de "usuario"
      [e.target.name]: e.target.value, //actualización de los parámetros de usuario
    });
  };

  useEffect(() => {
    document.getElementById("fechaHora").focus();
  }, []);

  const crearCita = async () => {
    let mensaje;
    let alert = {};
    alert.buttons = {};
    alert.buttons.confirm = {
      text: "Ok",
      value: true,
      visible: true,
      className: "btn btn-danger",
      closeModal: true,
    };

    const data = {
      fechaHora: newCita.fechaHora,
      modalidad: newCita.modalidad,
      lugar: newCita.lugar,
    };
    const response = await APIInvoke.invokePOST(`cita/`, data);
    mensaje = response.msg;
    const { errores } = response;
    console.log(response);
    if (errores) {
      alert.title = "Error";
      alert.icon = "error";
      mensaje = errores[0].msg;
    } else {
      alert.title = "Registrada";
      alert.icon = "success";
      mensaje = "Cita registrada exitosamente.";
      setNewCita({
        fechaHora: "",
        modalidad: "",
        lugar: "",
      });
    }
    alert.text = mensaje;
    swal(alert);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    crearCita();
  };

  return (
    <div className="wrapper">
      <Navbar></Navbar>
      <Sidebar tipoUsuario={"profesional"}></Sidebar>
      <div className="content-wrapper">
        <ContentHeader
          titulo={"Crear cita"}
          breadCrumb1={"Inicio"}
          breadCrumb2={"Consultorio"}
          ruta1={"profesional/home"}
        />
        <section classname="content">
          <div classname="card">
            <div classname="card-header">
              <h3 classname="card-title">Inserte los siguientes datos</h3>
              <div classname="card-tools">&nbsp;</div>
            </div>
            <div classname="card-body">
              <form onSubmit={onSubmit}>
                <div className="card-body">
                  <div className="form-group">
                    <label htmlFor="Fecha">Fecha de la Cita</label>
                    <input
                      type="date"
                      className="form-control"
                      id="fechaHora"
                      name="fechaHora"
                      placeholder="Ingrese fecha de la cita"
                      value={fechaHora}
                      onChange={onChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="Modalidad">Modalidad de la Cita</label>
                    <input
                      type="text"
                      className="form-control"
                      id="modalidad"
                      name="modalidad"
                      placeholder="Ingrese modalidad de la cita"
                      value={modalidad}
                      onChange={onChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="Lugar">Lugar de la Cita</label>
                    <input
                      type="text"
                      className="form-control"
                      id="lugar"
                      name="lugar"
                      placeholder="Ingrese lugar de la cita"
                      value={lugar}
                      onChange={onChange}
                      required
                    />
                  </div>
                </div>
                <div className="card-footer">
                  <button type="submit" className="btn btn-primary">
                    Crear cita
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default CitasProfesional;
