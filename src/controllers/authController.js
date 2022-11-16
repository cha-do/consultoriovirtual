const Paciente = require("../models/paciente");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const Profesional = require("../models/profesional");

const autenticarUsuario = async (req, res) => {
  //Revisar si hay errores

  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  const { _id, password } = req.body;

  try {
    //revisar que sea un Paciente registrado
    let usuario = await Paciente.findOne({ _id });
    let tipe = "paciente";
    if (!usuario) {
      usuario = await Profesional.findOne({ _id });
      if (!usuario) {
        return res.status(400).json({ msg: "El paciente no está reguistrado" });
      }
      tipe = "profesional";
    }

    //revisar la password
    const passCorrecto = await bcryptjs.compare(password, usuario.password);
    if (!passCorrecto) {
      return res.status(400).json({ msg: "Contraseña incorrecta" });
    }

    //Si todo es correcto, crear y firmar el token

    const payload = {
      usuario: { _id: usuario._id, tipo: tipe },
    };

    jwt.sign(
      payload,
      process.env.SECRETA,
      {
        expiresIn: 43200, //1 hora
      },
      (error, token) => {
        if (error) throw error;

        //Mensaje de confirmación
        return res.status(200).json({ tipo: tipe, token });
      }
    );
  } catch (error) {
    console.log("Hubo un error");
    console.log(error);
    res.status(400).send("Hubo un error");
  }
};

const usuarioAutenticado = async (req, res) => {
  try {
    if (req.usuario.tipo == "profesional") {
      const usuario = await Profesional.findOne({ _id });
      const tipe = "profesional";
    } else {
      const usuario = await Paciente.findOne({ _id });
      const tipe = "paciente";
    }
    res.json({ tipo: tipe, usuario });
  } catch (error) {
    res.status(500).json({ msg: "Hubo un error" });
  }
};

module.exports ={
  autenticarUsuario,
  usuarioAutenticado
}