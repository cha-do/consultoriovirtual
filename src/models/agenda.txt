var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var AgendaSchema = Schema(
  {
    disponible: { type: Boolean, default: true },
    modalidad: { type: String, required: true, trim: true },
    lugar: { type: String, required: true, trim: true },
    impresionesDiag: { type: String, trim: true },
    fechaHora: { type: Date, required: true },
    idProfesional: { type: mongoose.Types.ObjectId, ref: Profesional, required: true},
},
  { versionKey: false }
);

const Agenda = mongoose.model("Agenda", AgendaSchema);
module.exports = Agenda;