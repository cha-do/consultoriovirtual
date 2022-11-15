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

router = Router();

router.get("/prueba", prueba);
router.post(
  "/",
  [
    check("nombres", "El nombre es obligatorio").not().isEmpty(),
    oneOf([check('email').isEmpty(), check('email').isEmail()], "Agrega un email válido"),
    check("password", "El password debe ser mínimo de 6 caracteres").isLength({
      min: 6,
    }),
  ],
  savePaciente
);
router.get("/:id", findPaciente);
router.get("/", allPacientes);
router.put("/:id", updatePaciente);
router.delete("/:id", deletePaciente);
//router.get('/:id/:idCita', findCitas);

module.exports = router;
