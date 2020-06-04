'use strict'
var mongoose=require('mongoose');
var app=require('./app');
var port=3700;
mongoose.Promise=global.Promise;
mongoose.connect('mongodb://localhost:27017/portafolio').then(response=>{
    

//se crea el servidor
app.listen(port,()=>{
    console.log('servidor corriendo correctamente url')
})

}).catch(error=>{
    console.log(error)
})