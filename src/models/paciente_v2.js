var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PacienteSchema = Schema({
    _id: Number,
    password: String,
    estado: String,
    nombres: String,
    apellidos: String,
    edad: { type: Number, min: 0, max: 115 },
    eps: String,
    ocupacion: String,
    mailDir: String,
    residenciaDir: String,
    personalTel: Number,
    fechaNacimiento: { type: Date, default: Date.now },
    antecedentesFamiliares: String,
    antecedentesPersonales: String,
    alergias: String,
    trat_farmacologicos: [
      {
        codTratFarmacologico: Schema.Types.ObjectId,
        dosis: String,
        cantidadTotal: String,
        recomendaciones: String,
        duracion: String,
        fechaReceta: { type: Date, default: Date.now },
        codMedicamento: String,//{type: ObjectId, ref: 'Medicamento'},
        idProfesional: Number,//{type: ObjectId, ref: 'Profesional'}
      }
    ],
    Citas: [
      {
        codCita: Schema.Types.ObjectId,
        futura: Boolean,
        tipo: String ,
        motivoConsulta: String,
        asistencia: Boolean,
        hallazgosPotitivos: String,
        impresionesDiag: String,
        remision: String,
        codAgenda: String,//{type: ObjectId, ref: 'Agenda'},
        idProfesional: Number,//{type: ObjectId, ref: 'Profesional'}
      }
    ]
})

const Paciente = mongoose.model('Paciente', PacienteSchema);
module.exports = Paciente;

//db.usuarios.updateOne({"id":"ss"},{"$":{"tratFarmacológicos.cantidadTotal":12,}}) operaciones de mongodb
