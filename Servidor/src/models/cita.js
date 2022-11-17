var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CitaSchema = Schema(
  {
    idProfesional: {
      type: Number,
      ref: "Profesional",
      required: true,
    },
    tipo: { type: String, trim: true },
    idPaciente: {
      type: Number,
      ref: "Paciente"
    },
    fechaHora: { type: Date, required: true },
    futura: { type: Boolean, default: true },
    asistencia: { type: Boolean, default: false },
    motivoConsulta: { type: String, trim: true },
    hallazgosPotitivos: { type: String, trim: true },
    impresionesDiag: { type: String, trim: true },
    remision: { type: String, trim: true },
    disponible: { type: Boolean, default: true },
    modalidad: { type: String, required: true, trim: true },
    lugar: { type: String, required: true, trim: true }
  },
  { versionKey: false }
);

const Cita = mongoose.model("Cita", CitaSchema);
module.exports = Cita;

//db.usuarios.updateOne({"id":"ss"},{"$":{"tratFarmacológicos.cantidadTotal":12,}}) operaciones de mongodb
