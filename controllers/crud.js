const connection= require('../basedatos/bd');
const Request= require('tedious').Request;
const fecha= new Date();
const hoy=new Date(fecha);
const ocficial=hoy.toLocaleString();

exports.login=(req, res)=>{
    const cedu =req.body.id_usuario;
    const are= req.body.area1.toString().toUpperCase();
    const usuario = [];
    const request = new Request("SELECT cedula, user_nombre, area, cargo FROM usuario WHERE cedula='"+cedu+"' AND area='"+are+"' ", function (err, rowCount, rows) {
        if (err) {
            console.error('error al ejecutar la consulta: ' + err.message);
        } else if(rowCount>>0){
            rows.forEach(function (columns) {
                 columns.forEach(function (column) {
                         row[column.metadata.colName]=column.value;   
                        });
                    usuario.push(row);
                    });
                    if (usuario[0].area=="LOGISTICA") {
                        excecuteStatement(function (request2) {
                            res.render('logistica.ejs', {
                                datos:request2,
                                usuar:usuario[0]
                            });
                        });
                    }
                    else if (usuario[0].area=="DESEMPAQUE") {
                        excecuteStatement(function (request2) {
                            res.render('desempaque.ejs', {
                                datos:request2,
                                usuar:usuario[0]
                            });
                        });
                    }
                    else if (usuario[0].area=="PINTURA") {
                        excecuteStatement(function (request2) {
                            res.render('pintura.ejs', {
                                datos:request2,
                                usuar:usuario[0]
                            });
                        });
                    }
               } 
               else{res.send('<script> window.location.href = "/controlmetal"; alert("USUARIO INCORRETO"); </script>');                   
            }
            });
            request.on('row',function(columns){
                const row={};
                columns.forEach(function (column) {
                    row[column.metadata.colName]=column.value;  
                });
                usuario.push(row);
                
               
            });
            connection.execSql(request);

}  ;

function excecuteStatement(callback) {
    const request2 = [];
    const request = new Request("SELECT TOP 20 referencia, lote, pieza, responsable_desem, cantidad_entre_desem, recibe_logis, cantidad_recibi_logis, entrega_logis,cantidad_entre_logis,recibe_pint,cantidad_recibi_pint,comentarios, modelo,fecha,id FROM entrega_metal", function (err, rowCount, rows) {
        if (err) {
        console.error('error al ejecutar la consulta:' + err.message);
        } else {
                rows.forEach(function (columns) { //llaves
                    columns.forEach(function (column) {
                        row[column.metadata.colName]=column.value;
                    });
                  request2.push(row);
                });
           callback(request2);
            }
        });
        request.on('row',function(columns){
            const row={};
            columns.forEach(function (column) {
                row[column.metadata.colName]=column.value;  
            });
            request2.push(row);
        });
        connection.execSql(request);
    };

exports.nuevo=(req,res)=>{
    const refer = req.body.referen.toString().toUpperCase();
    const lot = req.body.lote1.toString().toUpperCase();
    const model = req.body.modelo.toString().toUpperCase();
    const cantid = req.body.cantidad;
    const respon = req.body.responsable.toString().toUpperCase();
    const comen = req.body.comentarios.toString().toUpperCase();
    const piez = req.body.pieza1.toString().toUpperCase();
    const fecha=ocficial
    const request = new Request("INSERT INTO entrega_metal( referencia, lote, pieza, modelo, responsable_desem, cantidad_entre_desem, comentarios, fecha )values('"+refer+"','"+lot+"','"+piez+"','"+model+"','"+respon+"','"+cantid+"','"+comen+"','"+fecha+"')",
        function(err,rowCount){
            if(err){
                console.error("error al insertar registro:"+ err.message);
                res.status(500).send('<script> window.location.href = "javascript:history.go(-1)"; alert("error al insertado registro"); </script>');
            }else{
                res.send('<script> window.location.href = "javascript:history.go(-1)"; alert("registros insertado con exito"); </script>');                   
             }
                });
                connection.execSql(request);
            };

exports.editarlogis=(req,res)=>{
    const resultado=[];
    const lot = req.params.id;
        const request = new Request("SELECT id,cantidad_recibi_logis,lote, pieza, cantidad_entre_logis, comentarios FROM entrega_metal WHERE id ='"+lot+"' ", function (err, rowCount, rows) {
        if (err) {
            console.error('error al ejecutar la consulta: ' + err.message);
        } else {
            rows.forEach(function (columns) {
                 columns.forEach(function (column) {
                         row[column.metadata.colName]=column.value;   
                        });
                    resultado.push(row);
                    });
                 res.render('editlogis.ejs', {
                    user:resultado[0],
                });
               } 
            });
            request.on('row',function(columns){
                const row={};
                columns.forEach(function (column) {
                    row[column.metadata.colName]=column.value;  
                });
                resultado.push(row);
            });
            connection.execSql(request);
        };

exports.editar=(req,res)=>{
    const resultado=[];
    const lot = req.params.id;
        const request = new Request("SELECT id,fecha, referencia, lote, pieza, modelo, responsable_desem, cantidad_entre_desem, recibe_logis, comentarios FROM entrega_metal WHERE id ='"+lot+"' ", function (err, rowCount, rows) {
        if (err) {
            console.error('error al ejecutar la consulta: ' + err.message);
        } else {
            console.log(rowCount + ' filas recuperadas');
            rows.forEach(function (columns) {
                 columns.forEach(function (column) {
                         row[column.metadata.colName]=column.value;   
                        });
                    resultado.push(row);
                    });
                 res.render('edit', {
                    user:resultado[0],
                });
               } 
            });
            request.on('row',function(columns){
                const row={};
                columns.forEach(function (column) {
                    row[column.metadata.colName]=column.value;  
                });
                resultado.push(row);
                
               
            });
            connection.execSql(request);
        };

exports.update=(req,res)=>{
    const lote_id=req.body.id1
    const refer = req.body.referen.toString().toUpperCase();
    const lot = req.body.lote1.toString().toUpperCase();
    const model = req.body.modelo.toString().toUpperCase();
    const cantid = req.body.cantidad;
    const respon = req.body.responsable.toString().toUpperCase();
    const comen = req.body.comentarios.toString().toUpperCase();
    const piez = req.body.pieza.toString().toUpperCase();
    const request = new Request("UPDATE entrega_metal SET referencia='"+refer+"', lote='"+lot+"', pieza='"+piez+"', modelo='"+model+"', responsable_desem='"+respon+"', cantidad_entre_desem='"+cantid+"', comentarios='"+comen+"' WHERE id='"+lote_id+"' ",
                function(err,rowCount){
                    if(err){
                        console.error("error al insertar registro:"+ err.message);
                        res.status(500).send("error al insertar registro");
                    }else{
                        console.log(lote_id,refer,lot,model,cantid,respon,comen,piez)
                        res.send('<script> window.location.href = "javascript:history.go(-2)"; alert("registros insertado con exito"); </script>');                   
                    }
                        });
                        connection.execSql(request);
                    };

exports.updatelogis=(req,res)=>{
    const lote_id=req.body.id1
    const cantidentr = req.body.cantida_entr;
    const cantidrecib = req.body.cantidad_recib;
    const comen = req.body.comentarios.toString().toUpperCase();
    const request = new Request("UPDATE entrega_metal SET cantidad_recibi_logis='"+cantidrecib+"', cantidad_entre_logis='"+cantidentr+"', comentarios='"+comen+"' WHERE id='"+lote_id+"' ",
                function(err,rowCount){
                    if(err){
                        console.error("error al insertar registro:"+ err.message);
                        res.status(500).send("error al insertar registro");
                    }else{
                        res.send('<script> window.location.href = "javascript:history.go(-2)"; alert("registros insertado con exito"); </script>');                   
                    }
                        });
                        connection.execSql(request);
                    };

exports.desempaque=(req, res)=>{
    const request2 = []
    const request = new Request("SELECT fecha, referencia, lote, piesa, modelo, responsable_desem, cantidad_entr_desem, recibe_logis, comentarios FROM entrega_metal ", function (err, rowCount, rows) {
        if (err) {
            console.error('error al ejecutar la consulta: ' + err.message);
        } else {
            rows.forEach(function (columns) {
                 columns.forEach(function (column) {
                         row[column.metadata.colName]=column.value;   
                        });
                    request2.push(row);
                    });
                 res.redirect('/login');
               } 
            });
            request.on('row',function(columns){
                const row={};
                columns.forEach(function (column) {
                    row[column.metadata.colName]=column.value;  
                });
                request2.push(row);
                
               
            });
            connection.execSql(request);
        };

exports.vista=(req, res)=>{
             vista(function (request2) {
              res.render('vista.ejs', {
                datos:request2,
                    });
                    });
        
        };

exports.cantidadlogis=(req,res)=>{
    const cantid = req.body.cantida;
    const recib = req.body.recibe.toString().toUpperCase();
    const idlogist = req.body.id1;
    const request = new Request("UPDATE entrega_metal SET cantidad_recibi_logis='"+cantid+"', recibe_logis='"+recib+"'  WHERE id='"+idlogist+"' ",
                function(err,rowCount){
                    if(err){
                        console.error("error al insertar registro:"+ err.message);
                        res.status(500).send("error al insertar registro");
                    }else{
                        res.send('<script> history.back(-3) </script>');                   
                    }
                        });
                        connection.execSql(request);
                    };


exports.cantidadentrelogis=(req,res)=>{
    const cantid = req.body.cantida;
    const recib = req.body.user_entre.toString().toUpperCase();
    const idlogist = req.body.id1;
    const request = new Request("UPDATE entrega_metal SET cantidad_entre_logis='"+cantid+"', entrega_logis='"+recib+"'  WHERE id='"+idlogist+"' ",
                function(err,rowCount){
                    if(err){
                        console.error("error al insertar registro:"+ err.message);
                        res.status(500).send("error al insertar registro");
                    }else{
                        console.log(recib,cantid,idlogist)
                        res.send('<script> window.location.href = "javascript:document.location.reload(history.go(-1)) "; alert("cantida cargada"); </script>');                   
                    }
                        });
                        connection.execSql(request);
                    };

exports.cantidadpint=(req,res)=>{
    const cantid = req.body.cantida;
    const recib = req.body.recibe.toString().toUpperCase();
    const idlogist = req.body.id1;
    const request = new Request("UPDATE entrega_metal SET cantidad_recibi_pint='"+cantid+"', recibe_pint='"+recib+"'  WHERE id='"+idlogist+"' ",
                function(err,rowCount){
                    if(err){
                        console.error("error al insertar registro:"+ err.message);
                        res.status(500).send("error al insertar registro");
                    }else{
                        console.log(recib,cantid,idlogist)
                        res.send('<script> window.location.href = "javascript:document.location.reload(history.go(-1)) "; alert("cantida cargada"); </script>');                   
                    }
                        });
                        connection.execSql(request);
                    };

exports.updatepint=(req,res)=>{
    const lote_id=req.body.id1
    const cantidentr = req.body.cantida_entr;
    const comen = req.body.comentarios.toString().toUpperCase();
    const request = new Request("UPDATE entrega_metal SET cantidad_recibi_pint='"+cantidrecib+"', comentarios='"+comen+"' WHERE id='"+lote_id+"' ",
                function(err,rowCount){
                    if(err){
                        console.error("error al insertar registro:"+ err.message);
                        res.status(500).send("error al insertar registro");
                    }else{
                        res.send('<script> window.location.href = "javascript:history.go(-2)"; alert("registros insertado con exito"); </script>');                   
                    }
                        });
                        connection.execSql(request);
                    };

exports.editarpint=(req,res)=>{
    const resultado=[];
    const lot = req.params.id;
        const request = new Request("SELECT id,cantidad_recibi_logis,lote, pieza, cantidad_entre_logis, comentarios FROM entrega_metal WHERE id ='"+lot+"' ", function (err, rowCount, rows) {
        if (err) {
            console.error('error al ejecutar la consulta: ' + err.message);
        } else {
            rows.forEach(function (columns) {
                 columns.forEach(function (column) {
                         row[column.metadata.colName]=column.value;   
                        });
                    resultado.push(row);
                    });
                 res.render('editpint.ejs', {
                    user:resultado[0],
                });
               } 
            });
            request.on('row',function(columns){
                const row={};
                columns.forEach(function (column) {
                    row[column.metadata.colName]=column.value;  
                });
                resultado.push(row);
            });
            connection.execSql(request);
        };

exports.newuser=(req,res)=>{
    const user = req.body.name_user.toString().toUpperCase();
    const dni = req.body.id_user
    const carg = req.body.cargo.toString().toUpperCase();
    const are = req.body.area1.toString().toUpperCase();
    const request = new Request("INSERT INTO usuario( cedula, user_nombre, area, cargo)values('"+dni+"','"+user+"','"+are+"','"+carg+"')",
        function(err,rowCount){
            if(err){
                console.error("error al insertar registro:"+ err.message);
                res.status(500).send('<script> window.location.href = "javascript:history.go(-1)"; alert("error al insertado nuevo usuario"); </script>');
            }else{
                res.send('<script> window.location.href = "javascript:history.go(-1)"; alert("nuevo usario insertado conrretamente"); </script>');                   
             }
                });
                connection.execSql(request);
            };


                    
function vista(callback) {
    const request2 = [];
    const request = new Request("SELECT id, referencia, lote, pieza, responsable_desem, cantidad_entre_desem, recibe_logis, cantidad_recibi_logis, entrega_logis,cantidad_entre_logis,recibe_pint,cantidad_recibi_pint,comentarios, modelo,fecha,id FROM entrega_metal ", function (err, rowCount, rows) {
        if (err) {
        console.error('error al ejecutar la consulta:' + err.message);
        } else {
            console.log(rowCount + 'filas recuperadas');
                rows.forEach(function (columns) {
                    columns.forEach(function (column) {
                        row[column.metadata.colName]=column.value;
                    });
                  request2.push(row);
                });
           callback(request2);
            }
        });
        request.on('row',function(columns){
            const row={};
            columns.forEach(function (column) {
                row[column.metadata.colName]=column.value;  
            });
            request2.push(row);
        });
        connection.execSql(request);
    };
