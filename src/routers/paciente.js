const { Router } = require("express");
const {
  prueba,
  savePaciente,
  findPaciente,
  allPacientes,
  updatePaciente,
  deletePaciente,
} = require("../controllers/paciente");
const { check , oneOf } = require("express-validator");
const auth = require("../middleware/auth");

router = Router();

router.get("/prueba", prueba);
router.post(
  "/",
  [
    check("_id", "El número de identificaión es obligatorio").isInt(),
    check("nombres", "El nombre es obligatorio").not().isEmpty(),
    check("apellidos", "Los apellidos son obligatorio").not().isEmpty(),
    check("genero", "Debe especificar su genero").not().isEmpty(),
    check("eps", "Debe especificar la eps a la que está afiliado").not().isEmpty(),
    check("fechaNacimiento", "Fecha inválida").isDate(),
    check("personalTel", "Número de contacto inválido").isMobilePhone(),
    oneOf([check('email').isEmpty(), check('email').isEmail()], "Agrega un email válido"),
    check("password", "El password debe ser mínimo de 6 caracteres").isLength({
      min: 6,
    }),
  ],
  savePaciente
);
router.get("/:id", findPaciente);
router.get("/", allPacientes);
router.put("/:id", auth, updatePaciente);
router.delete("/:id", deletePaciente);

module.exports = router;
