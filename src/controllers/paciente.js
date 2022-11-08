var mongoose = require('../conexDB/conn');
var Paciente = require('../models/paciente');


function prueba(req,res){
    res.status(200).send({
        menssage:'Probando una acción'
    });
};


function savePaciente(req,res){
    const newPaciente = new Paciente(req.body);
    newPaciente.save((err,result)=>{
        if(err){
            throw err;
        } else{
            res.status(200).send({message: result});
        }
    });
}

function findPaciente(req,res){
    var idPaciente=req.params.id;
    console.log(idPaciente);
    Paciente.findById(idPaciente).exec((err,result)=>{
        if(err){
            res.status(500).send({message:'Error al momento de ejecutar la solicitud'});// error 500 error de sevidor
        } else{
            if(!result){
                res.status(404).send({message :'No se encuentran pacientes con ese id.'});// error 404 es un error de que no se encuentra
            }else{
                res.status(200).send({result});
            }
        }
    });
}

function allPacientes(req,res){
    //var idCarrera=req.params.id;//porque idb?
    //console.log(idCarrera);
    var result = Paciente.find({});
    result.exec(function(err,result){
        if(err){
            res.status(500).send({message:'Error al momento de ejecutar la solicitud'});
        }else{
            if(!result){
                res.status(404).send({message:'El registro a buscar no se encuentra disponible'});
            }else{
                res.status(200).send({result});
            }
        }
    })
}

function updatePaciente(req,res){
    //var averid = mongoose.Types.ObjectId(req.query.productId);
    //console.log(req.query._id);
    var idPaciente=req.params.id;
    //console.log(idCarrera);
    Paciente.findOneAndUpdate({_id: idPaciente}, req.body,{new: true}, function(err, Paciente){
        if(err){
            res.send(err);
        } else{
            res.json(Paciente);
        }
    });
}

function deletePaciente(req,res){
    var idPaciente = req.params.id;
    Paciente.findByIdAndRemove(idPaciente, function(err, Paciente){
        if(err){
            return res.json(500,{
                message: 'No hemos encontrado el paciente'
            })
    }
    return res.json(Paciente);
    });
}

module.exports = {
    prueba,
    savePaciente,
    findPaciente,
    allPacientes,
    updatePaciente,
    deletePaciente
};