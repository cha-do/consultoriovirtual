const express = require("express");
const cors = require("cors");
const conn = require("./conexDB/conn");

//importación de rutas
const auth = require("./routers/auth");
const pacienteRoutes = require("./routers/paciente");
const profecionalRoutes = require("./routers/profesional");
const citaRoutes = require("./routers/cita");
const app = express();

app.use(cors());
app.use(express.json());

//rutas
app.use("/auth", auth);
app.use("/paciente", pacienteRoutes);
app.use("/profesional", profesionalRoutes);
app.use("/cita", citaRoutes);

module.exports = app;
