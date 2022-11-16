const { Router } = require("express");
const { check } = require("express-validator");
const {
  autenticarUsuario,
  usuarioAutenticado
} = require("../controllers/authController");
const auth = require("../middleware/auth");

router = Router();

// Autentica un paciente
// api/auth
router.post(
  "/",
  [
    check("_id", "Número de identificaicón inválido").isInt(),
    check("password", "El password debe ser mínimo de 6 caracteres").isLength({
      min: 6,
    }),
  ],
  autenticarUsuario
);

router.get("/", auth, usuarioAutenticado);

module.exports = router;
