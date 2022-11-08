var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PacienteSchema = Schema({
    idPaciente: ,
    password: ,
    estado: ,
    nombres: ,
    apellidos: ,
    eps: ,
    ocupacion: ,
    mailDir: ,
    residenciaDir: ,
    personalTel: ,
    fechaNacimiento: ,
    antecedentesFamiliares: ,
    antecedentesPersonales: ,
    alergias: ,
    trat_farmacológicos: [
      {
        codTratFarmacologico: ,
        dosis: ,
        cantidadTotal: ,
        recomendaciones: ,
        duracion: ,
        fechaReceta: ,
        codMedicamento: ,
        idProfesional: 
      }
    ],
    Citas: [
      {
        password:,
        codCita: ,
        futura: ,
        tipo: Medicina ,
        motivoConsulta: ,
        asistencia: ,
        hallazgosPotitivos: ,
        impresionesDiag: ,
        remision: ,
        codAgenda: ,
        idProfesional: 
      }
    ]
})

const Paciente = mongoose.model('Paciente', PacienteSchema);
module.exports = Paciente;