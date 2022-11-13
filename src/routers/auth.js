//Rutas para autenticar paciente
const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const authController = require("../controllers/authController");
const auth = require("../middleware/auth");

// Autentica un paciente
// api/auth
router.post(
  "/",
  [
    check("_id", "Agrega número de identificaicón válido").isInt(),
    check("password", "El password debe ser mínimo de 6 caracteres").isLength({
      min: 6,
    }),
  ],
  authController.autenticarPaciente
);

router.get('/',auth,authController.pacienteAutenticado)

module.exports = router;
