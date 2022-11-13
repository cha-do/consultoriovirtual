const Paciente = require("../models/Paciente");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.autenticarPaciente = async (req, res) => {
  //Revisar si hay errores

  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  const { _id, password } = req.body;

  try {
    //revisar que sea un Paciente registrado
    let paciente = await Paciente.findOne({ _id });
    if (!paciente) {
      return res.status(400).json({ msg: "El paciente no está reguistrado" });
    }

    //revisar la password
    const passCorrecto = await bcryptjs.compare(password, paciente.password);
    if (!passCorrecto) {
      return res.status(400).json({ msg: "Contraseña incorrecta" });
    }

    //Si todo es correcto, crear y firmar el token

    const payload = {
      paciente: { _id: paciente._id },
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
        res.json({ token });
      }
    );
  } catch (error) {
    console.log("Hubo un error");
    console.log(error);
    res.status(400).send("Hubo un error");
  }
};

exports.pacienteAutenticado = async (req, res) => {
  try {
    const paciente = await Paciente.findById(req.paciente._id);
    res.json({ paciente });
  } catch (error) {
    res.status(500).json({ msg: "Hubo un error" });
  }
};
