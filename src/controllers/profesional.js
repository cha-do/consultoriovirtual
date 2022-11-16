const bcryptjs = require("bcryptjs");
const Profesional = require("../models/profesional");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

function validateKeyDuplicate(error) {
  var myRegexp = new RegExp(
    'E11000 duplicate key error collection: consultoriovirtual2.profesionals index: [a-zA-Z0-9_]* dup key: { ([a-zA-Z0-9_]*): [a-zA-Z0-9.&%$@_"]* }',
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

const saveProfesional = async (req, res) => {
  //revisar si hay errores
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  const { email, password } = req.body;

  //crear el nuevo profesional
  let profesional = new Profesional(req.body);
  profesional.password = await bcryptjs.hash(password, 10);

  //Guardar usuario en la bd
  const error = await profesional.save().catch((error) => error.message);
  if (typeof error == "string") {
    let key = validateKeyDuplicate(error);
    if (key != null) {
      if (key[1] == "email") {
        console.log(
          `Ya existe un usuario con el email ${email}, debe usar un email no registrado`
        );
        return res.status(400).json({
          msg: `Ya existe un usuario con el email ${email}, debe usar un email no registrado`,
        });
      }
      if (key[1] == "_id") {
        HTMLFormControlsCollection.log(
          `Ya existe un profesional con ese número de identificación`
        );
        return res.status(400).json({
          msg: `Ya existe un profesional con ese número de identificación`,
        });
      }
    }
    return res.status(400).json({ message: error });
  }
  //Firmar el JWT
  const payload = {
    usuario: { _id: profesional._id, tipo: "profesional" },
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
        payload,
      });
    }
  );
};

function findProfesional(req, res) {
  var idProfesional = req.params.id;
  Profesional.findById(idProfesional).exec((err, result) => {
    if (err) {
      res
        .status(500)
        .send({ message: "Error al momento de ejecutar la solicitud" }); // error 500 error de sevidor
    } else {
      if (!result) {
        res.status(404).send({ message: `No hay profesionales reguistrados con número de identificación ${idProfesional}.` }); // error 404 es un error de que no se encuentra
      } else {
        res.status(200).send({ result });
      }
    }
  });
}

function allProfesionales(req, res) {
  const { especialidad } = req.query;
  var result = Profesional.find({ especialidad: especialidad }).sort("_id");
  result.exec(function (err, result) {
    if (err) {
      res
        .status(500)
        .send({ message: "Error al momento de ejecutar la solicitud" });
    } else {
      if (!result) {
        res
          .status(404)
          .send({ message: "No hay profesionales en esa especialidad" });
      } else {
        res.status(200).send({ result });
      }
    }
  });
}

const updateProfesional = async (req, res) => {
  const { password, email, personalTel } = req.body;
  const idProfesional = req.params.id;
  try {
    const profesionalExiste = await Profesional.findById(idProfesional);
    //verificar que el usuario actual pueda editar esa entidad
    if (!profesionalExiste) {
      return res.status(404).json({
        msg: `No hay profesionales reguistrados con número de identificación ${idProfesional}.`,
      });
    }

    if (idProfesional != req.usuario._id) {
      return res.status(400).json({ msg: "No autorizado" });
    }

    if (email && profesionalExiste.email != email) {
      const profesionalCorreo = await Profesional.findOne({ email });
      if (profesionalCorreo != null) {
        return res
          .status(400)
          .json({ msg: "Existe un usuario con ese email." });
      }
    }

    const newProfesional = {};
    if (password) {
      newProfesional.password = await bcryptjs.hash(password, 10);
    }
    if (email) {
      newProfesional.email = email;
    }
    if (personalTel) {
      newProfesional.personalTel = personalTel;
    }

    //console.log(newProfesional);

    var profesional = await Profesional.findOneAndUpdate(
      { _id: idProfesional },
      { $set: newProfesional },
      { new: true }
    );
    return res.status(200).json({ profesional });
  } catch (error) {
    console.log("Hubo un error");
    console.log(error);
    return res.status(400).send("Hubo un error");
  }
};

function deleteProfesional(req, res) {
  var idProfesional = req.params.id;
  Profesional.findByIdAndRemove(idProfesional, function (err, profesional) {
    if (err) {
      return res.json(500, {
        message: `No hay profesionales reguistrados con número de identificación ${idProfesional}.`,
      });
    }
    return res.json(profesional);
  });
}

module.exports = {
  prueba,
  saveProfesional,
  findProfesional,
  allProfesionales,
  updateProfesional,
  deleteProfesional,
};
