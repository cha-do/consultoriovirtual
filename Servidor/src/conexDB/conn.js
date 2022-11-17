const mongoose = require('mongoose');
require("dotenv").config({ path: "variables.env" });


const conectarDB = async () => {
    try {
      await mongoose.connect(process.env.DB_MONGO, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("DB Conectada");
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  };
  
  module.exports = conectarDB;

/*mongoose
    .connect("mongodb://0.0.0.0:27017/consultoriovirtual2",
    (err,res)=>{
        if(err){
            console.log("No se pudo conectar a la base de datos, se presentó el siguiente error: "+err);
            throw err;
        }else{
            console.log("Conexión a la base de datos exitosa.");
        }
        //db.close();
    });
    
module.exports = mongoose;*/