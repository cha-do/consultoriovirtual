import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
//import {insertarPaciente} from '../../services/pacientes';
import swal from "sweetalert"; //dependencia para generar alertas estéticas
import APIInvoke from "../../utils/APIIncoke";

const CrearProfesional = () => {
  const [usuario, setUsuario] = useState({
    _id: "",
    nombres: "",
    apellidos: "",
    fechaNacimiento: "",
    edad: "",
    genero: "",
    especialidad: "",
    personalTel: "",
    password: "",
    passwordConfirm: "",
    email: "",
    //response: "",
  });

  const {
    _id,
    nombres,
    apellidos,
    password,
    passwordConfirm,
    fechaNacimiento,
    genero,
    especialidad,
    personalTel,
    email,
  } = usuario;

  const onChange = (e) => {
    //recibir por teclado (evento)
    setUsuario({
      //cambiar atributosr de usuario
      ...usuario, //copia de "usuario"
      [e.target.name]: e.target.value, //actualización de los parámetros de usuario
    });
  };

  useEffect(() => {
    document.getElementById("_id").focus();
  }, []);

  const creaProfesional = async () => {
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
    if (password.length < 6) {
      mensaje = "La contraseñas deben terner más de 6 caracteres.";
      if (password !== passwordConfirm) {
        mensaje = "Las contraseñas deben coincidir.";
      }
      alert.title = "Error";
      alert.icon = "error";
      /*swal({
        title: "Error",
        text: mensaje,
        icon: "error",
        buttons: {
          confirm: {
            text: "Ok",
            value: true,
            visible: true,
            className: "btn btn-danger",
            closeModal: true,
          },
        },
      });*/
    } else {
      const data = {
        _id: usuario._id,
        nombres: usuario.nombres,
        apellidos: usuario.apellidos,
        fechaNacimiento: usuario.fechaNacimiento,
        edad: 30,
        genero: usuario.genero,
        especialidad: usuario.especialidad,
        personalTel: usuario.personalTel,
        email: usuario.email,
        password: usuario.password,
      };
      const response = await APIInvoke.invokePOST(`/profesional/`, data);
      mensaje = response.msg;
      const { errores } = response;
      console.log(response)
      if (errores) {
        alert.title = "Error";
        alert.icon = "error";
        mensaje = errores[0].msg;
      } else {
        if (
          mensaje ===
            `Ya existe un usuario con el email ${email}, debe usar un email no registrado` ||
          mensaje ===
            `Ya existe un profesional con ese número de identificación`
        ) {
          alert.title = "Error";
          alert.icon = "error";
        } else {
          alert.title = "Registrado";
          alert.icon = "success";
        }
      }
      /*setUsuario({
        _id: "",
        nombres: "",
        apellidos: "",
        fechaNacimiento: "",
        edad: "",
        genero: "",
        especialidad: "",
        personalTel: "",
        password: "",
        passwordConfirm: "",
        email: "",
      });*/
    }
    alert.text = mensaje;
    swal(alert);
    /*
    const response1 = await insertarPaciente(data);
    console.log("Respuesta del backend:")
    console.log(response1.data);
    console.log(response1.status);
    console.log(response1.text);
    //this.usuario.response= response1;
    setUsuario({//cambiar atributosr de usuario
      ...usuario,//copia de "usuario" 
      response: response1.data.msg//actualización de los parámetros de usuario
    })*/
  };

  const onSubmit = (e) => {
    e.preventDefault();
    creaProfesional();
  };

  return (
    <div className="hold-transition login-page">
      <div className="login-box">
        <div className="login-logo">
          <Link to={"#"}>
            <b>Nuevo</b> Usuario
          </Link>
        </div>
        <div className="card">
          <div className="card-body login-card-body">
            <p className="login-box-msg">Ingrese los datos del nuevo usuario</p>
            <form onSubmit={onSubmit}>
              <div className="input-group mb-3">
                <div className="input-group mb-3">
                  {/*HTML <input> type Attribute:
                https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input
                https://www.w3schools.com/tags/att_input_type.asp
                */}
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Documento de identidad"
                    id="_id"
                    name="_id"
                    value={_id}
                    onChange={onChange}
                    required
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-id-card" />
                    </div>
                  </div>
                </div>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Nombres"
                  id="nombres"
                  name="nombres"
                  value={nombres}
                  onChange={onChange}
                  required
                />
                <div className="input-group-append">
                  {/* Sección encargada del ícono */}
                  <div className="input-group-text">
                    <span className="fas fa-user" />
                    {/*Lista de ícinos "font awesome free" disponible en: https://fontawesome.com/icons*/}
                  </div>
                </div>
              </div>

              <div className="input-group mb-3">
                {/*types https://www.w3schools.com/tags/att_input_type.asp*/}
                <input
                  type="text"
                  className="form-control"
                  placeholder="Apellidos"
                  id="apellidos"
                  name="apellidos"
                  value={apellidos}
                  onChange={onChange}
                  required
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-user" />
                  </div>
                </div>
              </div>

              <div className="input-group mb-3">
                <input
                  type="date"
                  className="form-control"
                  placeholder="Fecha de  Nacimiento"
                  id="fechaNacimiento"
                  name="fechaNacimiento"
                  value={fechaNacimiento}
                  onChange={onChange}
                  required
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-calendar-days" />
                  </div>
                </div>
              </div>

              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Género"
                  id="genero"
                  name="genero"
                  value={genero}
                  onChange={onChange}
                  required
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-user" />
                  </div>
                </div>
              </div>

              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Especialidad"
                  id="especialidad"
                  name="especialidad"
                  value={especialidad}
                  onChange={onChange}
                  required
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-notes-medical" />
                  </div>
                </div>
              </div>

              <div className="input-group mb-3">
                <div className="input-group mb-3">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Teléfono de contacto"
                    id="personalTel"
                    name="personalTel"
                    value={personalTel}
                    onChange={onChange}
                    required
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-phone-volume" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="input-group mb-3">
                <div className="input-group mb-3">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={onChange}
                    required
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-envelope" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="input-group mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Contraseña"
                  id="password"
                  name="password"
                  value={password}
                  onChange={onChange}
                  required
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock" />
                  </div>
                </div>
              </div>

              <div className="input-group mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Confirmar contraseña"
                  id="passwordConfirm"
                  name="passwordConfirm"
                  value={passwordConfirm}
                  onChange={onChange}
                  required
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock" />
                  </div>
                </div>
              </div>
              {/*Ejemplo usos de columnas y filas Bootstrap
                <div className="row">
                  <div className="col-8">
                    
                  </div>
                  {/* /.col /}
                  <div className="col-4">
                    <button type="submit" className="btn btn-primary btn-block">
                      Sign In
                    </button>
                  </div>
                  {/* /.col /}
                </div>*/}
              <div className="social-auth-links text-center mb-3">
                <button type="submit" className="btn btn-block btn-primary">
                  Registrar Usuario
                </button>
                {/*<Link to={"/user/crear"} className="btn btn-block btn-danger">
                      Crear Usuario
                  </Link>*/}
              </div>
            </form>

            {/* /.social-auth-links */}
            <p className="mb-1">
              <Link to={"#"}>I forgot my password</Link>
            </p>
            <p className="mb-0">
              <Link to={"#"} className="text-center">
                Register a new membership
              </Link>
            </p>
          </div>
          {/* /.login-card-body */}
        </div>
      </div>
      {/* /.login-box */}
      <h2>{usuario.response}</h2>
    </div>
  );
};

export default CrearProfesional;
