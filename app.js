const path = require('path')
const express = require('express');
const app=express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

app.use(express.static(__dirname+ '/publica'));

app.use('/', require('./router'));

app.use('/vista', require('./router'));

app.use('/nuevousuario', require('./router'));

app.listen(3000, ()=>{
    console.log("servidor escuchando por el puerto 3000")
  
});
module.exports=app