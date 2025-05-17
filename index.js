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

const https = require('https');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
const options = {
  key: fs.readFileSync(path.join(__dirname, 'key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'cert.pem'))
};

/*https.createServer(options, (req, res) => {
  res.writeHead(200);
  res.end('Hello Secure World!\n');
}).listen(443, () => {
  console.log('Server running at https://localhost:443/');
});*/
//const server = https.createServer(httpsOptions, app);



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
let host='zool.ar'
if(local){
    host=localhost
}
require('./zooldatasheets')(app, local, host);

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
    app.listen(app.get('port'), host, function() {
        console.log('app Servidor '+appServerName+' iniciado en '+host+':'+app.get('port'));
        console.log('app Puertos: App=' + app.get('port') + '  Files='+ puertoStatico);
    });

    /*https.createServer(options, app).listen(app.get('port'), host, () => {
      console.log('HTTPS Server running at https://'+host+':'+app.get('port')+'/');
    });*/
})

/*// server.js
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors'); // Para permitir solicitudes desde tu frontend

const app = express();
const port = 3000;

app.use(cors()); // Habilita CORS para tu frontend

app.get('/getContent', async (req, res) => {
  try {
    const response = await fetch('https://www.zool.loca.lt');
    if (!response.ok) {
      throw new Error(`Error al cargar la URL: ${response.status}`);
    }
    const htmlContent = await response.text();
    res.send(htmlContent);
  } catch (error) {
    console.error('Error en el servidor:', error);
    res.status(500).send('Error al obtener el contenido.');
  }
});

app.listen(port, () => {
  console.log(`Servidor intermediario escuchando en http://localhost:${port}`);
});*/
