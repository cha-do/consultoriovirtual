const express = require('express');
const cors = require('cors');
const conn = require('./conexDB/conn');


//importación de rutas
const pacienteRoutes = require('./routers/paciente');
//const auth = require("./routers/auth");
const app = express();

app.use(cors());
app.use(express.json());

//rutas
app.use('/paciente', pacienteRoutes);
//app.use("/auth", auth);


module.exports = app;
