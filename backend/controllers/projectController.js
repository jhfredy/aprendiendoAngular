'use strict'
var Project=require('../models/project');
var fs=require('fs');

var controller={
    home:function(req,res){
        return res.status(200).send({
            message:'soy la home'
        })
    },
    test:function(req,res){
        return res.status(200).send({
            message:'soy el test del controlador'
        })
    },  
    saveProject:function(req,res){
        var project=new Project();
        var params=req.body;
        project.name=params.name;
        project.description=params.description;
        project.category=params.category;
        project.year=params.year;
        project.langs=params.langs;
        project.image=null;
        
        project.save(function (err, projectStored){
            if(err) return res.status(500).send({
                message:'Error al realizar guardado'+err
            })
            if(!projectStored)return res.status(404).send({
                message:'No se ha podido guardar el proyecto'
            })
            return res.status(200).send({
                project:projectStored
            })
        })


    },
    getProject:function(req,res){
        var project_id=req.params.id;
        if(project_id==null)return res.status(404).send({
            message:'proyecto no exitente'
        })
        Project.findById(project_id,function(err,project) {
            if(err) return res.status(500).send({
                message:'Error al devolver el objeto'+err
            })
            if(!project)return res.status(404).send({
                message:'proyecto no existente'
            })
            return res.status(200).send({
                project
            })
        })
    },
    getProjects:function(req,res){
        //con where
        // Project.find({
        //     year:2020
        // })
        Project.find({}).exec(function(err,projects){
            if(err) return res.status(500).send({
                message:'error al devolver los datos'
            })
            if(!projects) return res.status(404).send({
                message:'no hay proyectos para mostrar'
            })
            return res.status(200).send({
                projects
            })
        })
    },
    updateProject:function(req,res){
        var project_id=req.params.id;
        var update=req.body;
        Project.findByIdAndUpdate(project_id,update,{new:true},function(err,projectUpdated) {
            if(err) return res.status(500).send({
                message:'error al actualizar'
            })
            if(!projectUpdated) return res.status(404).send({
                message:'no hay proyecto para actualizar'
            })
            return res.status(200).send({
                project:projectUpdated
            })
        })
    },
    deleteProject:function(req,res){
        var project_id=req.params.id;
        Project.findByIdAndRemove(project_id,(err,projectRemoved)=>{
            if(err) return res.status(500).send({
                message:'No se ha podido borrar el projecto'
            })
            if(!projectRemoved) return res.status(404).send({
                message:'no hay proyecto para Eliminar'
            })
            return res.status(200).send({
                project:projectRemoved
            })

            
        })
    },
    uploadImage:function(req,res){
        var project_id=req.params.id;
        var fileName='Imagen No Subida';
        if(req.files){
            
           
            var filePath=req.files.image.path;
            var fileSplit=filePath.split('\\');
            var fileName=fileSplit[1];
            var extension=fileName.split('\.');
            extension=extension[1];
            if(extension=='png'||extension=='jpg'||extension=='jpeg'||extension=='gif'){
                Project.findByIdAndUpdate(project_id,{image:fileName},{new:true},(err,projectUpdated)=>{
                    if(err) return res.status(500).send({
                        message:'Imagen No Subida'
                    })
                    if(!projectUpdated) return res.status(404).send({
                        message:'no hay proyecto para actualizar'
                    })
                    return res.status(200).send({
                        project:projectUpdated
                    })
                })
            }else{
                fs.unlink(filePath,(err)=>{
                    return res.status(200).send({
                        message:'Extension no valida'
                    })
                })
            }

          
            
        }else{
            return res.status(200).send({
                message:fileName
            })
        }
    }
}
module.exports=controller;