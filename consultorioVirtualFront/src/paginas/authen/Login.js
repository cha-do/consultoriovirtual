import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert"; //dependencia para generar alertas estéticas
import APIIncoke from "../../utils/APIIncoke";

//Declaración de un componented e React
const Login = () => {
  //para redireccionar de un componente a otro
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState({
    _id: "",
    password: "",
  });

  const { _id, password } = usuario;

  const onChange = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    document.getElementById("_id").focus(); //pone el cursos en ese item al entrara a la página
  }, []);

  const iniciarSesion = async () => {
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
      mensaje = "La contraseñas debe terner más de 6 caracteres.";
      alert.title = "Error";
      alert.icon = "error";
    } else {
      const data = {
        _id: usuario._id,
        password: usuario.password,
      };
      const response = await APIIncoke.invokePOST(`auth/`, data);
      mensaje = response.msg;
      if (
        mensaje ===
          "No hay usuarios regitrados con ese número de identificación" ||
        mensaje === "Contraseña incorrecta"
      ) {
        alert.title = "Error";
        alert.icon = "error";
      } else {
        alert.title = "Bienvenido";
        alert.icon = "success";
        alert.text = mensaje;
        swal(alert);
        //Se obtiene el token de acceso jwt
        const jwt = response.token;
        //Se guarda en el localstorage (gardar info en el navegador)
        localStorage.setItem("token", jwt);
        //redireccionamos a Home
        navigate(`/${response.tipo}/home`);
      }
      /*setUsuario({
        _id: "",
        password: ""
      });*/
    }
    alert.text = mensaje;
    swal(alert);
  };

  const onSubmit = (e) => {
    e.preventDefault(); //los datos ingresados por el formulario ya no se envian por la url
    iniciarSesion();
  };

  return (
    <div className="hold-transition login-page">
      <div className="login-box">
        <div className="login-logo">
          <Link to={"#"}>
            <b>Iniciar</b>Sesión
          </Link>
        </div>
        <div className="card">
          <div className="card-body login-card-body">
            <p className="login-box-msg">
              Bienvenido, ingrese sus credenciales.
            </p>
            <form onSubmit={onSubmit}>
              <div className="input-group mb-3">
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
                  Ingresar
                </button>
                <Link
                  to={"/paciente/crear"}
                  className="btn btn-block btn-danger"
                >
                  Registrar Paciente
                </Link>
                <Link
                  to={"/profesional/crear"}
                  className="btn btn-block btn-danger"
                >
                  Registrar profesional
                </Link>
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
      
    </div>
  );
};

export default Login;
