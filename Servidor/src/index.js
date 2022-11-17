const app = require("./app");
const conectarDB = require("./conexDB/conn");

//conectar a la base de datos
conectarDB();

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`El servidor está funcionando en el puerto ${PORT} `);
});
