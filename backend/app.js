'use strict'
var express=require('express');
var bodyParser=require('body-parser');

var app=express();


//aqui se configuran las rutas en forma de archivo
var projectRoute=require('./routes/projectRoute');

//aqui se ejecutan los middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());//cualquier tipo de peticion lo convierte a json

//CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


//rutas

app.use('/api',projectRoute);


//exportar 
module.exports=app
