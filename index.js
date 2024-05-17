//Instrucciones

//Para iniciar servidor en el dominio. Por ejemplo zool.ar:80
//npm start

//Para probar de un modo local/desarrollo en ip 127.0.0.1:8100
//npm start localhost

//Para probar de un modo red local/desarrollo en ip diferente a 127.0.0.1:8100
//npm start localhost host=192.168.1.40


var appServerName='zool-server'
var args = process.argv.slice(2);
var puertoApp = '80'; //Puerto que recibe acciones
var puertoStatico = '8101'; //Puerto para descargar archivos
var folderFiles = 'files/';
var serverEmail=process.env.EMAIL
var serverEmailPass=process.env.EMAILPASS
var serverEmailService=process.env.EMAILSERVICE

var local=false
var localhost='localhost'
var argumentos=process.argv
console.log('Argumentos: '+argumentos)
for(var i=0;i<argumentos.length;i++){
    let arg=argumentos[i]
    console.log('Arg '+i+': '+arg)
    if(arg.indexOf('localhost')>=0){
        local=true
        console.log('Ejecutando en modo localhost. NO en zool.ar')
    }
    if(arg.indexOf('host=')>=0){
        let m0=arg.split('host=')
        localhost=m0[1]
        console.log('Ip: '+localhost)
    }
    if(arg.indexOf('port=')>=0){
        let m0=arg.split('port=')
        puertoApp=m0[1]
        console.log('Puerto: '+puertoApp)
    }
}


var connect = require('connect');
var serveStatic = require('serve-static');
connect().use(serveStatic(__dirname)).listen(puertoStatico);

var fs = require('fs');
var path = require('path');

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
if(local){
    puertoApp='8100'
}
app.set('port', process.env.PORT || puertoApp);

var mongoose = require('mongoose');
require('./zoolusers')(app);
//require('./zoolparams')(app);
require('./zooldocs')(app);
require('./zoolappids')(app);
require('./zooldata')(app, local);
//require('./zooldatasheets')(app, local);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('db conectada!');
    // we're connected!
});
var urlMongoDatabase='mongodb://127.0.0.1:27017/'+appServerName
mongoose.connect(urlMongoDatabase, { useNewUrlParser: true }, function (err, res){
    if(err){
        return console.log(`Error al conectar a ${urlMongoDatabase} ${err}`)
    }
    console.log(`Conectado a ${urlMongoDatabase}`)
    let host='zool.ar'
    if(local){
        host=localhost
    }
    require('./zooldatasheets')(app, local, host);
    app.listen(app.get('port'), host, function() {
        console.log('Servidor '+appServerName+' iniciado en '+host+':'+app.get('port'));
        console.log('Puertos: App=' + app.get('port') + '  Files='+ puertoStatico);
    });
})
