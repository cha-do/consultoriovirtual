const { Router } = require("express");
const {
  prueba,
  saveProfesional,
  findProfesional,
  allProfesionales,
  updateProfesional,
  deleteProfesional
} = require("../controllers/profesional");
const { check , oneOf } = require("express-validator");
const auth = require("../middleware/auth");

router = Router();

router.get("/prueba", prueba);
router.post(
  "/",
  [
    check("_id", "El número de identificaión es obligatorio").isIdentityCard(),
    check("nombres", "El nombre es obligatorio").not().isEmpty(),
    check("apellidos", "Los apellidos son obligatorio").not().isEmpty(),
    check("genero", "Debe especificar su genero").not().isEmpty(),
    check("fechaNacimiento", "Fecha inválida").isDate(),
    check("email", "Agrega un email válido").isEmail(),
    check("especialidad", "Debe especificar su especialidad").not().isEmpty(),
    check("personalTel", "Número de contacto inválido").isMobilePhone(),
    check("password", "El password debe ser mínimo de 6 caracteres").isLength({
      min: 6,
    }),
  ],
  saveProfesional
);
router.get("/:id", findProfesional);
router.get("/", allProfesionales);
router.put("/:id", auth, updateProfesional);
router.delete("/:id", deleteProfesional);

module.exports = router;
