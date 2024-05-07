var appServerName='zool-server'
var args = process.argv.slice(2);
var puertoApp = '8100'; //Puerto que recibe acciones
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
app.set('port', process.env.PORT || puertoApp);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var mongoose = require('mongoose');
require('./zoolusers')(app);
//require('./zoolparams')(app);
require('./zooldocs')(app);
require('./zoolappids')(app);
require('./zooldata')(app);
require('./zooldatasheets')(app);
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
    if(local)host=localhost
    app.listen(app.get('port'), host, function() {
        console.log('Servidor '+appServerName+' iniciado en '+host+':'+app.get('port'));
        console.log('Puertos: App=' + app.get('port') + '  Files='+ puertoStatico);
    });
})
