const mongoose = require('mongoose');
require("dotenv").config({ path: "variables.env" });

mongoose
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
    
module.exports = mongoose;