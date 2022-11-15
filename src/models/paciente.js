var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var PacienteSchema = Schema(
  {
    _id: Number, //{ type: Number, required: true, unique: true },
    password: { type: String, required: true, trim: true },
    estado: { type: Boolean, default: true },
    nombres: { type: String, required: true, trim: true },
    apellidos: { type: String, required: true, trim: true },
    edad: { type: Number, min: 0, max: 115, required: true },
    eps: { type: String, required: true, trim: true },
    //ocupacion: String,
    email: { type: String, trim: true, unique: true, sparse: true },
    //residenciaDir: String,
    personalTel: { type: Number, required: true },
    fechaNacimiento: { type: Date }, //, required: true }
  },
  { versionKey: false }
);

const Paciente = mongoose.model("Paciente", PacienteSchema);
module.exports = Paciente;

//db.usuarios.updateOne({"id":"ss"},{"$":{"tratFarmacológicos.cantidadTotal":12,}}) operaciones de mongodb
