const { Router } = require("express");
const {
  prueba,
  savePaciente,
  findPaciente,
  allPacientes,
  updatePaciente,
  deletePaciente
} = require("../controllers/paciente");

router = Router();

router.get('/prueba',  prueba);
router.post('/', savePaciente);
router.get('/:id', findPaciente);
router.get('/', allPacientes);
router.put('/:id', updatePaciente);
router.delete('/:id', deletePaciente);
//router.get('/:id/:idCita', findCitas);


module.exports = router;
