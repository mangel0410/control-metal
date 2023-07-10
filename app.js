const path = require('path')
const express = require('express');
const app=express();
const bodyParser = require('body-parser');
const port=process.env.PORT || 3030;
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

app.use(express.static(__dirname+ '/publica'));

app.use('/', require('./router'));


app.listen(80, ()=>{
    console.log("servidor escuchando por el puerto", 80)
  
});
module.exports=app