var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CitaSchema = Schema(
  {
    tipo: { type: String, required: true, trim: true },
    futura: { type: Boolean, default: true },
    asistencia: { type: Boolean, default: false },
    motivoConsulta: { type: String, trim: true },
    hallazgosPotitivos: { type: String, trim: true },
    impresionesDiag: { type: String, trim: true },
    remision: { type: String, trim: true },
    codAgenda: { type: mongoose.Types.ObjectId, ref: Agenda, required: true},
    idProfesional: { type: mongoose.Types.ObjectId, ref: Profesional, required: true},
    idPaciente: { type: mongoose.Types.ObjectId, ref: Paciente, required: true}
  },
  { versionKey: false }
);

const Cita = mongoose.model("Cita", CitaSchema);
module.exports = Cita;

//db.usuarios.updateOne({"id":"ss"},{"$":{"tratFarmacológicos.cantidadTotal":12,}}) operaciones de mongodb
