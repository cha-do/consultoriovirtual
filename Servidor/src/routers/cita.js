const { Router } = require("express");
const auth = require("../middleware/auth");
const {
  prueba,
  saveCita,
  obtenerCitas,
  obtenerCitasPacienteId,
  obtenerCitasDisponibles,
  actualizarCita,
  agendarCita,
  cancelarCita,
  eliminarCita
} = require("../controllers/cita");
const { check } = require("express-validator");

router = Router();

router.get("/prueba", prueba);
router.post(
  "/",
  auth,
  [
    check("fechaHora", "Fecha no válida").isDate(),
    check("modalidad", "Es necesario espeficicar la modalidad de la cita").not().isEmpty(),
    check("lugar", "Es necesario espeficicar donde se realizará la cita").not().isEmpty()
  ],
  saveCita
);

router.get("/", auth, obtenerCitas);
router.get("/obtener/:id", auth, obtenerCitasPacienteId);
router.get("/buscar/", auth, obtenerCitasDisponibles);
router.put("/:id", auth, actualizarCita);
router.put("/agendar/:id", auth, agendarCita);
router.put("/cancelar/:id", auth, cancelarCita);
router.delete("/:id", auth, eliminarCita);

module.exports = router;
