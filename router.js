const express = require('express');
const router = express.Router();
const crud= require('./controllers/crud.js');


router.get('/', (req, res)=>{ 
    res.render('index')
});

router.get('/login', (req, res)=>{ 
    res.send('<script> window.location.href = "javascript:document.location.reload(history.go(0)) "</script>');                   
});

router.get('/nuevousuario',(req,res)=>{
    res.render('nuevo_usuario')
});

router.get('/vista',crud.vista);

router.get('/editdesem/:id',crud.editar);

router.get('/editlogis/:id',crud.editarlogis);

router.get('/editpint/:id',crud.editarlogis);

//rutas 
router.post('/login', crud.login);

router.post('/nuevo', crud.nuevo);

router.post('/update', crud.update);

router.post('/updatelogis', crud.updatelogis);

router.post('/cantidadlogis', crud.cantidadlogis);

router.post('/cantidadentrelogis', crud.cantidadentrelogis);

router.post('/updatepint', crud.updatepint);

router.post('/cantidadpint', crud.cantidadpint);

router.post('/new_user', crud.newuser);



module.exports=router;