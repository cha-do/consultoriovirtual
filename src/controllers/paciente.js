//const mongoose = require("../conexDB/conn");
const bcryptjs = require("bcryptjs");
const Paciente = require("../models/paciente");
//const Profesional = require("../models/profesional");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

function validateKeyDuplicate(error) {
  var myRegexp = new RegExp(
    'E11000 duplicate key error collection: consultoriovirtual2.pacientes index: [a-zA-Z0-9_]* dup key: { ([a-zA-Z0-9_]*): [a-zA-Z0-9.&%$@_"]* }',
    "g"
  );
  var match = myRegexp.exec(error);
  return match;
}

function prueba(req, res) {
  res.status(200).send({
    menssage: "Probando una solicitud al servidor",
  });
}

/*function savePaciente(req, res) {
  const newPaciente = new Paciente(req.body);
  newPaciente.save((err, result) => {
    if (err) {
      throw err;
    } else {
      res.status(200).send({ message: result });
    }
  });
}*/

const savePaciente = async (req, res) => {
  //revisar si hay errores
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  const { email, password } = req.body;

  //Revisar que el usuario registrado sea único

  /*let pacientex = await Paciente.findOne({ _id });
  if (pacientex) {
    return res.status(400).json({
      menssage: `Ya existe un usuario con ese número de intificación`,
    });
  }

  if (email) {
    pacientex = await Paciente.findOne({ email });
    if (pacientex) {
      return res.status(400).json({
        menssage: `Ya existe un usuario con el email ${email}, debe usar un emal no registrado`,
      });
    }
  }*/

  //crear el nuevo paciente
  let paciente = new Paciente(req.body);
  paciente.password = await bcryptjs.hash(password, 10);

  //Guardar usuario en la bd
  const error = await paciente.save().catch((error) => error.message);
  if (typeof error == "string") {
    let key = validateKeyDuplicate(error);
    console.log(error);
    console.log(key);
    if (key != null) {
      if (key[1] == "email") {
        return res.status(400).json({
          msg: `Ya existe un usuario con el email ${email}, debe usar un email no registrado`,
        });
      }
      if (key[1] == "_id") {
        return res.status(400).json({
          msg: `Ya existe un usuario con ese número de identificación`,
        });
      }
    }
    return res.status(400).json({ message: error });
  }
  //Firmar el JWT
  const payload = {
    paciente: { _id: paciente._id },
  };

  jwt.sign(
    payload,
    process.env.SECRETA,
    {
      expiresIn: 3600, //1 hora
    },
    (error, token) => {
      if (error) throw error;

      //Mensaje de confirmación
      res.json({
        token,
        payload
      });
    }
  );
};

function findPaciente(req, res) {
  var idPaciente = req.params.id;
  console.log(idPaciente);
  Paciente.findById(idPaciente).exec((err, result) => {
    if (err) {
      res
        .status(500)
        .send({ message: "Error al momento de ejecutar la solicitud" }); // error 500 error de sevidor
    } else {
      if (!result) {
        res.status(404).send({ message: "No hay pacientes reguistrados." }); // error 404 es un error de que no se encuentra
      } else {
        res.status(200).send({ result });
      }
    }
  });
}

function allPacientes(req, res) {
  //var idCarrera=req.params.id;//porque idb?
  //console.log(idCarrera);
  var result = Paciente.find({}).sort("_id");

  result.exec(function (err, result) {
    if (err) {
      res
        .status(500)
        .send({ message: "Error al momento de ejecutar la solicitud" });
    } else {
      if (!result) {
        res
          .status(404)
          .send({ message: "El registro a buscar no se encuentra disponible" });
      } else {
        res.status(200).send({ result });
      }
    }
  });
}

/*function updatePaciente(req, res) {
  //var averid = mongoose.Types.ObjectId(req.query.productId);
  //console.log(req.query._id);
  var idPaciente = req.params.id;
  //console.log(idCarrera);
  Paciente.findOneAndUpdate(
    { _id: idPaciente },
    req.body,
    { new: true },
    function (err, Paciente) {
      if (err) {
        res.send(err);
      } else {
        res.json(Paciente);
      }
    }
  );
}*/

const updatePaciente = async (req, res) => {
  const { estado, password, nombres, apellidos, eps, email, personalTel } =
    req.body;

  console.log(req.body, estado);
  try {
    //validar si el id del la entidad relacionada existe.
    /*const proyectoEncontrado = await Proyecto.findById(proyecto);
    if (!proyectoEncontrado) {
      return res.status(404).json({ msg: "Proyecto no encontrado" });
    }*/

    //verificar que el usuario actual pueda editar esa entidad
    /*if (proyectoEncontrado.creador.toString() !== req.usuario.id) {
      return res.status(400).json({ msg: "No autorizado" });
    }*/

    const pacienteExiste = await Paciente.findById(req.params.id);
    if (!pacienteExiste) {
      return res.status(404).json({
        msg: "No existe paciente registrado con ese número de identificación.",
      });
    }
    if (email) {
      const pacienteCorreo = await Paciente.findOne({ email });
      //console.log(pacienteCorreo)
      if (pacienteCorreo != null) {
        if (pacienteCorreo._id.toString() != pacienteExiste._id.toString()) {
          return res
            .status(400)
            .json({ msg: "Existe un usuario con ese email." });
        }
      }
    }

    const newPaciente = {};
    if (nombres) {
      newPaciente.nombres = nombres;
    }
    if (estado != null) {
      newPaciente.estado = estado;
    }
    if (password) {
      newPaciente.password = await bcryptjs.hash(password, 10);
    }
    if (apellidos) {
      newPaciente.apellidos = apellidos;
    }
    if (email) {
      newPaciente.email = email;
    }
    if (eps) {
      newPaciente.eps = eps;
    }
    if (personalTel) {
      newPaciente.personalTel = personalTel;
    }

    console.log(newPaciente);

    var paciente = await Paciente.findOneAndUpdate(
      { _id: req.params.id },
      { $set: newPaciente },
      { new: true }
    );
    res.json({ paciente });
  } catch (error) {
    console.log("Hubo un error");
    console.log(error);
    res.status(400).send("Hubo un error");
  }
};

function deletePaciente(req, res) {
  var idPaciente = req.params.id;
  Paciente.findByIdAndRemove(idPaciente, function (err, Paciente) {
    if (err) {
      return res.json(500, {
        message: "No hemos encontrado el paciente.",
      });
    }
    return res.json(Paciente);
  });
}

function findCitas(req, res) {
  var idPaciente = req.params.id;
  var idCita = req.params.idCita;
  //console.log(idCita);

  var Citares = Paciente.findOne({
    _id: idPaciente,
    Citas: { _id: idCita },
  }).exec((err, result) => {
    if (err) {
      console.log(err);
      res
        .status(500)
        .send({ message: "Error al momento de ejecutar la solicitud" }); // error 500 error de sevidor
    } else {
      if (!result) {
        res
          .status(404)
          .send({ message: "No se encuentran pacientes con ese id cita." }); // error 404 es un error de que no se encuentra
      } else {
        //var i = result.Citas;
        res.status(200).send({ result });

        console.log(i);
        //Citares.remove();
      }
    }
  });
  //var i=Citares.Citas;
  //console.log(i);
} // return {i};

function deleteCita(req, res, i) {
  var idPaciente = req.params.id;
  var idCita = req.params.idCita;
  console.log(idCita);

  var Citares = Paciente.findById(idPaciente).exec((err, result) => {
    if (err) {
      console.log(err);
      res
        .status(500)
        .send({ message: "Error al momento de ejecutar la solicitud" }); // error 500 error de sevidor
    } else {
      if (!result) {
        res
          .status(404)
          .send({ message: "No se encuentran pacientes con ese id." }); // error 404 es un error de que no se encuentra
      } else {
        var { i } = result.Citas;
        res.status(200).send({ i });

        console.log(i);
        //Citares.remove();
      }
    }
  });
  //var i=Citares.Citas;
  //console.log(i);
}

module.exports = {
  prueba,
  savePaciente,
  findPaciente,
  allPacientes,
  updatePaciente,
  deletePaciente,
};
