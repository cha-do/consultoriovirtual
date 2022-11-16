var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ProfesionalSchema = Schema(
  {
    _id: Number, //{ type: Number, required: true, unique: true },
    password: { type: String, required: true, trim: true },
    estado: { type: Boolean, default: true },
    nombres: { type: String, required: true, trim: true },
    apellidos: { type: String, required: true, trim: true },
    genero: { type: String, required:true, trim: true },
    fechaNacimiento: { type: Date }, //, required: true }
    edad: { type: Number, min: 0, max: 115, required: true },
    especialidad: { type: String, required: true, trim: true },
    email: { type: String, trim: true, unique: true, required: true },
    //residenciaDir: String,
    personalTel: { type: Number, required: true, unique: true, required: true },
    },
  { versionKey: false }
);

const Profesional = mongoose.model("Profesional", ProfesionalSchema);
module.exports = Profesional;

//db.usuarios.updateOne({"id":"ss"},{"$":{"tratFarmacológicos.cantidadTotal":12,}}) operaciones de mongodb
