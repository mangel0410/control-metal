const Connection = require('tedious').Connection;

const config = {
    server: 'DESKTOP-TPIB4FO',  
    authentication: {
        type: 'default',
        options: {
            userName: 'angel', 
            password: '!Ycbasl123' 
        }
    },
    options: {
        port: 1433,
        database: 'logistica', 
        trustServerCertificate: true
    }
};
const connection = new Connection(config);
    connection.connect();
    connection.on('connect', function (err) {

        if(err){
            console.error('error al conectarse a la base de datos: ' + err.message);
        }else{
            console.log("Connected");
         
        }    
    });



module.exports=connection
    