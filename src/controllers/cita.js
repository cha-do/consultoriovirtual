//const mongoose = require("../conexDB/conn");
const bcryptjs = require("bcryptjs");
const Cita = require("../models/cita");
const Agenda = require("../models/agenda");
//const Profesional = require("../models/profesional");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

function prueba(req, res) {
  res.status(200).send({
    menssage: "Probando una solicitud al servidor",
  });
}

const saveCita = async (req, res) => {
  //revisar si hay errores
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  if (rec.usuario.tipo == "paciente") {
    return res.status(400).json({ msg: "No autorizado" });
  }

  try {
    const { idPaciente } = req.body;
    if (idPaciente) {
      let paciente = await Paciente.findById(idPaciente);
      if (!paciente) {
        return res.status(404).json({ msg: "Paciente no encontrado" });
      }
    }
    //crear una nueva cita
    const cita = new Cita(req.body);
    cita.idProfesional = req.usuario._id;
    cita.tipo = req.profesional.especialidad;
    if (idPaciente) {
      cita.idPaciente = idPaciente;
      cita.disponible = false;
    }
    cita.save();
    return res.status(200).json(cita);
  } catch (error) {
    console.log("Hubo un error");
    console.log(error);
    return res.status(400).send("Hubo un error");
  }
};

const obtenerCitas = async (req, res) => {
  try {
    if (req.usuario.tipo == "paciente") {
      const citas = await Cita.find({ idPaciente: req.usuario._id }).sort({
        fechaHora: -1,
      });
      return res.status(200).json({ citas });
    }
    const citas = await Cita.find({ idProfesional: req.usuario._id }).sort({
      fechaHora: -1,
    });
    return res.status(200).json({ citas });
  } catch (error) {
    console.log("Hubo un error");
    console.log(error);
    res.status(400).send("Hubo un error");
  }
};

const obtenerCitasPacienteId = async (req, res) => {
  try {
    idPaciente = req.params.id;
    const citas = await Cita.find({ idPaciente: idPaciente }).sort({
      fechaHora: -1,
    });
    res.json({ citas });
  } catch (error) {
    console.log("Hubo un error");
    console.log(error);
    res.status(400).send("Hubo un error");
  }
};

const obtenerCitasDisponibles = async (req, res) => {
  try {
    const { idProfesional, tipo } = req.query;
    const citas = await Cita.find({
      idProfesional: idProfesional,
      tipo: tipo,
    }).sort({
      fechaHora: -1,
    });
    res.json({ citas });
  } catch (error) {
    console.log("Hubo un error");
    console.log(error);
    res.status(400).send("Hubo un error");
  }
};

const actualizarCita = async (req, res) => {
  //revisar si hay errores
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(401).json({ errores: errores.array() });
  }

  try {
    const idCita = req.params.id;
    let cita = await Cita.findById(idCita);
    if (!cita) {
      return res.status(400).json({ msg: "Cita no encontrada" });
    }

    if (
      rec.usuario.tipo != "profesional" ||
      cita.idProfesional.toString() !== req.usuario._id
    ) {
      return res.status(400).json({ msg: "No autorizado" });
    }

    const {
      asistencia,
      motivoConsulta,
      hallazgosPotitivos,
      impresionesDiag,
      remision,
    } = req.body;
    const actualCita = {};
    if ((asistencia = !null)) {
      actualCita.asistencia = asistencia;
    }
    if (motivoConsulta) {
      actualCita.motivoConsulta = motivoConsulta;
    }
    if (hallazgosPotitivos) {
      actualCita.hallazgosPotitivos = hallazgosPotitivos;
    }
    if (impresionesDiag) {
      actualCita.impresionesDiag = impresionesDiag;
    }
    if (remision) {
      actualCita.remision = remision;
    }
    actualCita.futural = false;

    cita = await Cita.findByIdAndUpdate(
      { _id: idCita },
      { $set: actualCita },
      { new: true }
    );

    return res.status(200).json({ cita });
  } catch (error) {
    console.log("Hubo un error");
    console.log(error);
    res.status(400).send("Hubo un error");
  }
};

const agendarCita = async (req, res) => {
  //revisar si hay errores
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(401).json({ errores: errores.array() });
  }

  try {
    if (rec.usuario.tipo != "paciente") {
      return res.status(400).json({ msg: "No autorizado" });
    }
    const idCita = req.params.id;
    let cita = await Cita.findById(idCita);
    if (!cita) {
      return res.status(404).json({ msg: "Cita no encontrada" });
    }
    if (!cita.disponible || !cita.futura) {
      return res.status(400).json({ msg: "Cita no disponible" });
    }

    const { motivoConsulta } = req.body;
    const actualCita = {};
    if (motivoConsulta) {
      actualCita.motivoConsulta = motivoConsulta;
    }
    actualCita.disponible = false;
    actualCita.idPaciente = req.usuario._id;

    cita = await Cita.findByIdAndUpdate(
      { _id: idCita },
      { $set: actualCita },
      { new: true }
    );

    return res.status(200).json({ cita });
  } catch (error) {
    console.log("Hubo un error");
    console.log(error);
    res.status(400).send("Hubo un error");
  }
};

const cancelarCita = async (req, res) => {
  //revisar si hay errores
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(401).json({ errores: errores.array() });
  }

  try {
    const idCita = req.params.id;
    let cita = await Cita.findById(idCita);
    if (!cita) {
      return res.status(404).json({ msg: "Cita no encontrada" });
    }
    if (cita.idPaciente.toString() !== req.usuario._id || !cita.futura) {
      return res.status(400).json({ msg: "No autorizado" });
    }

    actualCita.motivoConsulta = "";
    actualCita.disponible = true;
    actualCita.idPaciente = null;
    cita = await Cita.findByIdAndUpdate(
      { _id: idCita },
      { $set: actualCita },
      { new: true }
    );

    return res.status(200).json({ cita });
  } catch (error) {
    console.log("Hubo un error");
    console.log(error);
    res.status(400).send("Hubo un error");
  }
};

const eliminarCita = async (req, res) => {
  try {
    const idCita = req.params.id;
    let cita = await Cita.findById(idCita);
    if (!cita) {
      return res.status(404).json({ msg: "Cita no encontrada" });
    }

    if (cita.idProfesional.toString() !== req.usuario._id || !cita.futura) {
      return res.status(400).json({ msg: "No autorizado" });
    }

    await Proyecto.remove({ _id: idCita });
    return res.status(200).json({ msg: "Cita eliminada" });
  } catch (error) {
    console.log("Hubo un error");
    console.log(error);
    return res.status(400).send("Hubo un error");
  }
};

module.exports = {
  prueba,
  saveCita,
  obtenerCitas,
  obtenerCitasPacienteId,
  obtenerCitasDisponibles,
  actualizarCita,
  agendarCita,
  cancelarCita,
  eliminarCita
};
