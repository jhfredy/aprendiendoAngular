'use strict'
 var express=require('express');
 var projectController=require('../controllers/projectController');
 
 var router=express.Router();
 var multipart=require('connect-multiparty');
 var multipartMiddleware=multipart({uploadDir:'./uploads'})

 router.get('/home',projectController.home)
 router.post('/test',projectController.test)
 router.post('/saveProject',projectController.saveProject)
 router.get('/project/:id?',projectController.getProject)
 router.get('/projects',projectController.getProjects)
 router.put('/updateProject/:id',projectController.updateProject)
 router.delete('/deleteProject/:id',projectController.deleteProject)
 router.post('/uploadImage/:id',multipartMiddleware,projectController.uploadImage)
 module.exports=router;
