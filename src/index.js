const app = require('./app');
const mongoose = require('./conexDB/conn');
const port = 4000; //cualquier puerto disponible
app.listen(port, ()=> {
    console.log(`Leyendo puerto ${port}`);
});