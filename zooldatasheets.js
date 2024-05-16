module.exports=function(app, local){
    const { exec } = require('child_process');
    var stringFileFolderPath=''
    if(!local)stringFileFolderPath='/root/zool-server/'


    var stringSWEFolderPath='/home/ns/nsp/zool-server'
    if(!local)stringSWEFolderPath='/root/zool-server'



    var aSigns= ['Aries', 'Tauro', 'Géminis', 'Cáncer', 'Leo', 'Virgo', 'Libra', 'Escorpio', 'Sagitario', 'Capricornio', 'Acuario', 'Piscis']
    var aSignsLowerStyle= ['aries', 'tauro', 'geminis', 'cancer', 'leo', 'virgo', 'libra', 'escorpio', 'sagitario', 'capricornio', 'acuario', 'piscis']
    var aBodies= ['Sol', 'Luna', 'Mercurio', 'Venus', 'Marte', 'Júpiter', 'Saturno', 'Urano', 'Neptuno', 'Plutón', 'N.Norte', 'N.Sur', 'Quirón', 'Selena', 'Lilith', 'Pholus', 'Ceres', 'Pallas', 'Juno', 'Vesta']
    var aBodiesFiles= ['sol', 'luna', 'mercurio', 'venus', 'marte', 'jupiter', 'saturno', 'urano', 'neptuno', 'pluton', 'nodo_norte', 'nodo_sur', 'quiron', 'selena', 'lilith', 'pholus', 'ceres', 'pallas', 'juno', 'vesta']


    inicio = function(req, res){
        res.status(200).send(setHtml(getIndexHtml(), 'Zool - Inicio'));
        return
    }
    app.get('/', inicio);
    contacto = function(req, res){
        res.status(200).send(setHtml(getContact(), 'Zool - Inicio'));
        return
    }
    app.get('/contacto', contacto);

    listAll = function(req, res){
        //console.log('setHtml()... ');
        res.status(200).send(setHtml(getListAllV2(), 'Zool - Lista General'));
        return
    }
    app.get('/listAll', listAll);

    const fs = require('fs');
    getData = function(req, res){
        let filePath=stringFileFolderPath+'data/'+req.query.bodie+'.json'
        //console.log('setHtml()... ');
        fs.readFile(filePath, 'utf8', (err, data) => {
                        if (err) {
                            res.status(200).send('Error al leer el dato de '+req.query.bodie);
                            return;
                        }
                        let title=''+parseMan(req.query.bodie)+'/'+aSigns[req.query.sign]+'/Casa '+parseInt(req.query.house)
                        let json=JSON.parse(data)
                        let key1=req.query.bodie+'_en_'+aSignsLowerStyle[parseInt(req.query.sign)]
                        let man=json[key1].manifestaciones
                        let manLength=Object.keys(man).length
                        //let s='<a class="boton2" href="/">Inicio</a> <a class="boton2" href="/listAll">Volvel a la lista</a>'
                        let s=''
                        s+='<h1>'+parseMan(key1)+'</h1>'
                        s+='<div class="divData">';
                        s+='<h2>Manifestaciones</h2>';
                        for(var i=0;i<manLength;i++){
                            s+='<p><b>'+parseMan(Object.keys(man)[i])+': </b>';
                            s+=''+man[Object.keys(man)[i]]+'</p><br>';
                        }
                        s+='</div>';

                        man=json[key1].manifestaciones_negativas
                        if(man){
                            manLength=Object.keys(man).length
                            s+='<div class="divData">';
                            s+='<h2>Manifestaciones Negativas</h2>';
                            for(i=0;i<manLength;i++){
                                s+='<p><b>'+parseMan(Object.keys(man)[i])+': </b>';
                                s+=''+man[Object.keys(man)[i]]+'</p><br>';
                            }
                            s+='</div>';
                        }

                        //Casa
                        key1=req.query.bodie+'_en_casa_'+req.query.house
                        man=json[key1].manifestaciones
                        manLength=Object.keys(man).length
                        s+='<h1>'+parseMan(key1)+'</h1>'
                        s+='<div class="divData">';
                        s+='<h2>Manifestaciones</h2>';
                        for(var i=0;i<manLength;i++){
                            s+='<p><b>'+parseMan(Object.keys(man)[i])+': </b>';
                            s+=''+man[Object.keys(man)[i]]+'</p><br>';
                        }
                        s+='</div>';

                        man=json[key1].manifestaciones_negativas
                        if(man){
                            manLength=Object.keys(man).length
                            s+='<h1>'+parseMan(key1)+'</h1>'
                            s+='<div class="divData">';
                            s+='<h2>Manifestaciones Negativas</h2>';
                            for(var i=0;i<manLength;i++){
                                s+='<p><b>'+parseMan(Object.keys(man)[i])+': </b>';
                                s+=''+man[Object.keys(man)[i]]+'</p><br>';
                            }
                            s+='</div>';
                        }
                        //s+='<a class="boton2" href="/">Inicio</a> <a class="boton2" href="/listAll">Volvel a la lista</a>'
                        if(req.query.onlyData){
                            res.status(200).send(setHtmlData(s, 'Zool - '+title));
                        }else{
                            res.status(200).send(setHtml(s, 'Zool - '+title));
                        }

                        return
                    });

        return
    }
    app.get('/getData', getData);



    //--> Get Zool Data Map
    getDataMapCoords = function(req, res){
        const lugar = req.query.lugar;
        const command = 'python3 '+stringFileFolderPath+'py/geoloc.py "'+lugar+'"';

        exec(command, (error, stdout, stderr) => {
                 if (error) {
                     console.error(`Error al ejecutar el script de Python: ${error}`);
                     res.status(500).send('Error al obtener las coordenadas.');
                     return;
                 }

                 if (stderr) {
                     console.error(`Error en la salida estándar del script de Python: ${stderr}`);
                     res.status(500).send('Error al obtener las coordenadas.');
                     return;
                 }

                 // Suponiendo que el script de Python devuelve las coordenadas en formato JSON
                 const coordenadas = JSON.parse(stdout);

                 // Enviar las coordenadas como respuesta
                 res.json(coordenadas);
             });
        //return
    }
    app.get('/getDataMapCoords', getDataMapCoords);

    getZoolDataMap = function(req, res){
        console.log('getZoolDataMap... ');
        console.log('Dia: '+req.query.d);
        //res.redirect('/res-add-producto.html?res=no'+mensajes.length)
        //Registra el ZoolUser porque no existe ninguno con ese nombre
        let jsonRes={isData:false}
        const exec = require('child_process').exec;
        exec('python3 "'+stringFileFolderPath+'py/astrologica_swe_v4.py" '+req.query.d+' '+req.query.m+' '+req.query.a+' '+req.query.h+' '+req.query.min+' '+req.query.gmt+' '+req.query.lat+' '+req.query.lon+' T '+stringSWEFolderPath+' '+req.query.alt, (err, stdout, stderr) => {
                 if (err) {
                     console.error(err);
                     jsonRes={isData:false, isError:true, error: err}
                     res.status(200).send(jsonRes);
                     return;
                 }
                 jsonRes={isData:true, isError:false, data: JSON.parse(stdout)}
                 //jsonRes=JSON.parse(stdout);
                 //console.log(JSON.stringify(jsonRes, null, 2));
                 res.status(200).send(setHtml(getJsonDataMapToHtml(jsonRes), 'Zool Carta Natal'));
             });
        //res.status(200).send(jsonRes)
        return
    }
    app.get('/getZoolDataMap', getZoolDataMap);
    function getJsonDataMapToHtml(j){
        let h=''
        for(var i=0;i<14;i++){
            //"c0": { "nom": "Sol", "is": 2, "gdec": 89.11073764729207, "gdeg": 89, "rsgdeg": 29, "mdeg": 6, "sdeg": 38, "ih": 5, "dh": 5.084865033626556, "retro": 1 }
            let strRetro=''
            if(parseInt(j.data.pc['c'+i].retro)===0 && i!==11)strRetro=' <b>Retrógrado</b>'
            h+='<div id="rowBodie">'
            h+='    <p>'+j.data.pc['c'+i].nom+strRetro+' en '+aSigns[j.data.pc['c'+i].is]+' en el grado °'+j.data.pc['c'+i].rsgdeg+' \''+j.data.pc['c'+i].mdeg+' \'\''+j.data.pc['c'+i].sdeg+' en la Casa '+j.data.pc['c'+i].ih+'</p>'
            h+='</div>'
        }
        return h
    }
    ZoolMapForm = function(req, res){
        let h='<div>\n'
        //h+='</div>\n'
        let filePath=stringFileFolderPath+'pgd.html'
        //if(!local)filePath=stringFileFolderPath+'/pgd.html'
        //console.log('setHtml()... ');
        fs.readFile(filePath, 'utf8', (err, data) => {
                        if (err) {
                            res.status(200).send('Error al leer el dato de '+filePath);
                            return;
                        }
                        let s=''
                        let sep1='<!-- In Form -->'
                        let sep2='<!-- Out Form -->'
                        let d1=data.split(sep1)[1]
                        let d2=d1.split(sep2)[0]

                        res.status(200).send(setHtmlData(d2, 'Zool - Carta Natal'));
                        return
                    });
        return
    }
    app.get('/ZoolMapForm', ZoolMapForm);
    //<-- Get Zool Data Map

    function setHtml(c, t){
        let h='<DOCTYPE html>\n'
        h+='<html lang="es">\n'
        h+='    <head>\n'
        h+='        <meta charset="utf-8">\n'
        h+='        <title>'+t+'</title>\n'
        h+='        <link rel="stylesheet" href="/style.css">\n'
        h+='    </head>\n'
        h+='    <body>\n'
        h+='        '+getMenu()+'\n'
        h+='        '+c+'\n'
        h+=getPie()
        h+='    </body>\n'
        h+='</html>\n'
        return h
    }
    function setHtmlData(c, t){
        let h='<DOCTYPE html>\n'
        h+='<html lang="es">\n'
        h+='    <head>\n'
        h+='        <meta charset="utf-8">\n'
        h+='        <title>'+t+'</title>\n'
        h+='        <link rel="stylesheet" href="/style.css">\n'
        h+='    </head>\n'
        h+='    <body>\n'
        h+='        '+c+'\n'
        h+='    </body>\n'
        h+='</html>\n'
        return h
    }
    function getListAll(){
        let limit = aBodies.length-7 // Hasta Quirón
        let h='<div>\n'
        for(var i=0;i<limit;i++){
            h+='    <h1 class="li1">'+aBodies[i]+'</h1>\n'
            h+='        <div>\n'
            //h+='        <ul>\n'
            h+='        <div class="div1">\n'
            h+='            <ul>\n'
            for(var i2=0;i2<aSigns.length-6;i2++){
                h+='    <li class="li2">\n'
                //Comineza divs casas
                h+='<div><ul>\n'
                for(var i3=0;i3<12;i3++){
                    h+='    <li><a class="boton" href="/getData?bodie='+aBodiesFiles[i]+'&sign='+i2+'&house='+parseInt(i3 + 1)+'">'+aBodies[i]+' en '+aSigns[i2]+' en casa '+parseInt(i3 + 1)+'</a></li>\n'
                }
                h+='</ul></div><br>\n'
                //Finaliza divs casas
                h+='    </li>\n'
            }
            h+='            </ul>\n'
            h+='        </div>\n'
            h+='        <div class="div2">\n'
            h+='            <ul>\n'
            for(i2=6;i2<aSigns.length;i2++){
                h+='    <li class="li2">\n'
                //Comineza divs casas
                h+='<div><ul>\n'
                for(i3=0;i3<12;i3++){
                    h+='    <li><a class="boton" href="/getData?bodie='+aBodiesFiles[i]+'&sign='+i2+'&house='+parseInt(i3 + 1)+'">'+aBodies[i]+' en '+aSigns[i2]+' en casa '+parseInt(i3 + 1)+'</a></li>\n'
                }
                h+='</ul></div><br>\n'
                //Finaliza divs casas
                h+='    </li>\n'
            }
            //h+='            </ul>\n'
            h+='        </div>\n'

            //h+='        </ul></div>\n</li>'

        }
        h+='</div>\n'
        return h
    }
    function getListAllV2(){
        let limit = aBodies.length-7 // Hasta Quirón
        let h='<div>\n'
        for(var i=0;i<limit;i++){
            h+='    <h1>'+aBodies[i]+'</h1>\n'
            h+='<div>\n'
            for(var i2=0;i2<aSigns.length-6;i2++){
                for(var i3=0;i3<12;i3++){
                    h+='    <a class="boton" href="/getData?bodie='+aBodiesFiles[i]+'&sign='+i2+'&house='+parseInt(i3 + 1)+'">'+aBodies[i]+' en '+aSigns[i2]+' en casa '+parseInt(i3 + 1)+'</a>\n'
                }
                h+='    </li>\n'
            }
            h+='</div>\n'
            h+='<div>\n'
            for(i2=6;i2<aSigns.length;i2++){
                for(i3=0;i3<12;i3++){
                    h+='<a class="boton" href="/getData?bodie='+aBodiesFiles[i]+'&sign='+i2+'&house='+parseInt(i3 + 1)+'">'+aBodies[i]+' en '+aSigns[i2]+' en casa '+parseInt(i3 + 1)+'</a>\n'
                }
                h+='</div>\n'
            }
            h+='        </div>\n'

            //h+='        </ul></div>\n</li>'

        }
        h+='</div>\n'
        return h
    }
    function parseMan(str) {
        if (typeof str !== 'string' || str.length === 0) {
            return str; // Devuelve la cadena sin cambios si no es válida
        }
        let s = str.charAt(0).toUpperCase() + str.slice(1);
        return s.replace(/_/g, ' ')
    }
    function createForm() {
        // Inicializar el string con el formulario
        var formHTML = '<form id="miFormulario" method="GET" action="/getData">';

        // Agregar el campo de selección para 'bodie' al string del formulario
        formHTML += '<div class="form-group">';
        formHTML += '<label for="bodie">Planeta:</label>';
        formHTML += '<select name="bodie" id="bodie">';
        for (var i = 0; i < aBodies.length; i++) {
            formHTML += '<option value="' + aBodiesFiles[i] + '">' + aBodies[i] + '</option>';
        }
        formHTML += '</select>';
        formHTML += '</div>';

        // Agregar el campo de selección para 'sign' al string del formulario
        formHTML += '<div class="form-group">';
        formHTML += '<label for="sign">Signo:</label>';
        formHTML += '<select name="sign" id="sign">';
        for (var i = 0; i < aSigns.length; i++) {
            formHTML += '<option value="' + i + '">' + aSigns[i] + '</option>';
        }
        formHTML += '</select>';
        formHTML += '</div>';

        // Agregar el campo de selección para 'home' al string del formulario
        formHTML += '<div class="form-group">';
        formHTML += '<label for="house">Casa:</label>';
        formHTML += '<select name="house" id="house">';
        for (var i = 1; i <= 12; i++) {
            formHTML += '<option value="' + i + '">Casa ' + i + '</option>';
        }
        formHTML += '</select>';
        formHTML += '</div>';

        formHTML += '<input type="submit" value="Ver Significado"></form>';
        //http://127.0.0.1:8100/getData?bodie=venus&sign=3&home=3

        return formHTML;
    }
    function getIndexHtml(){
        let h=''
        h+='<h1>www.Zool.ar</h1>'
        h+='<h2>Página de Astrología</h2><br>'
        h+='<h4>Formulario para buscar significados</h4>'
        h+=createForm()
        h+='<br>'
        //h+='<a class="boton2" href="/listAll">Ver lista completa</a>'
        return h
    }
    function getContact(){
        let h=''
        h+='<div>'
        h+='    <h1>Contacto</h1>'
        h+='    <h3>Vías de contacto</h3>'
        h+='        <ul>'
        h+='            <li><b>Correo Electrónico:</b> qtpizarro@gmail.com</li>'
        h+='            <li><b>Whatsapp:</b> +549 11 3802 4370</li>'
        h+='            <li><b>Instagram:</b> <a href="https://www.instagram.com/ricardomartinpizarro">@ricardomartinpizarro</a><</li>'
        h+='            <li><b>Facebook:</b> <a href="https://www.facebook.com/unik.nextsigner">Ricardo Martin Pizarro</a></li>'
        h+='            <li><b>YouTube:</b> <a href="https://www.youtube.com/channel/UCG6vwq-Z8IZgUDHuCwhLa5A">Astrologo Ricardo Martin Pizarro</a></li>'
        h+='            <li><b>Twitch:</b> <a href="https://twitch.tv/ricardomartinpizarro">Ricardo Martin Pizarro</a></li>'
        h+='            <li><b>Kick:</b> <a href="https://kick.com/AstrologoRicardoMartin">AstrologoRicardoMartin</a></li>'
        h+='        </ul>'
        h+='</div>'
        return h
    }
    function getMenu(){
        let h=''
        h+='<div id="menu">'
        h+='    <a class="boton" href="/">Inicio</a>'
        h+='    <a class="boton" href="/ZoolMapForm">Crear Carta</a>'
        h+='    <a class="boton" href="/listAll">Lista Completa</a>'
        h+='    <a class="boton" href="/contacto">Contacto</a>'
        h+='</div>'
        return h
    }
    function getPie(){
        let h=''
        h+='<div id="pie">\n'
        h+='    <h6>Zool - Datos de Astrología creado por Ricardo Martín Pizarro 2024</h6>\n'
        h+='</div>\n'
        return h
    }

}

