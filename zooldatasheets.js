module.exports=function(app, local, host){
    const { exec } = require('child_process');
    var stringFileFolderPath=''
    if(!local)stringFileFolderPath='/root/zool-server/'


    var stringSWEFolderPath='/root/zool-server'
    if(!local)stringSWEFolderPath='/root/zool-server'



    var aSigns= ['Aries', 'Tauro', 'Géminis', 'Cáncer', 'Leo', 'Virgo', 'Libra', 'Escorpio', 'Sagitario', 'Capricornio', 'Acuario', 'Piscis']
    var aSignsLowerStyle= ['aries', 'tauro', 'geminis', 'cancer', 'leo', 'virgo', 'libra', 'escorpio', 'sagitario', 'capricornio', 'acuario', 'piscis']
    var aBodies= ['Sol', 'Luna', 'Mercurio', 'Venus', 'Marte', 'Júpiter', 'Saturno', 'Urano', 'Neptuno', 'Plutón', 'N.Norte', 'N.Sur', 'Quirón', 'Selena', 'Lilith', 'Pholus', 'Ceres', 'Pallas', 'Juno', 'Vesta']
    var aBodiesFiles= ['sol', 'luna', 'mercurio', 'venus', 'marte', 'jupiter', 'saturno', 'urano', 'neptuno', 'pluton', 'nodo_norte', 'nodo_sur', 'quiron', 'selena', 'lilith', 'pholus', 'ceres', 'pallas', 'juno', 'vesta']


    inicio = function(req, res){
        //res.status(200).send(setHtml(getIndexHtml(), 'Zool - Inicio'));
        res.status(200).send(setHtml(getZoolMapForm(), 'Zool - Inicio'));
        return
    }

    zoolDataMap = function(req, res){
        res.status(200).send(setHtml(getZoolMapForm(), 'Zool - Crear Carta'));
        return
    }

    formSearch = function(req, res){
        //res.status(200).send(setHtml(getIndexHtml(), 'Zool - Inicio'));
        res.status(200).send(setHtml(createForm(), 'Zool - Buscar'));
        return
    }

    contacto = function(req, res){
        res.status(200).send(setHtml(getContact(), 'Zool - Contacto'));
        return
    }

    listAll = function(req, res){
        //console.log('setHtml()... ');
        res.status(200).send(setHtml(getListAllV2(), 'Zool - Lista General'));
        return
    }

    const fs = require('fs');
    getData = function(req, res){
        //Ejemplo de solo datos
        //http://www.zool.ar/getData?bodie=sol&sign=0&house=1&onlyData=true

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


    /*
    getData = function(req, res){
        //Ejemplo de solo datos
        //http://www.zool.ar/getData?bodie=sol&sign=0&house=1&onlyData=true

        var filePath2=stringFileFolderPath+'data/gemini_1/'+req.query.bodie+'_en_'+aSignsLowerStyle[parseInt(req.query.sign)]+'_en_casa_'+req.query.house+'.json'
        var filePath=stringFileFolderPath+'data/'+req.query.bodie+'.json'
        //console.log('setHtml()... ');
        var json
        var key1
        var man
        var manLength
        var s=''

            fs2.readFile(filePath2, 'utf8', (err2, data2) => {
                             //console.log('Data 2:::'+data2)
                             if (err2) {

                             }else{
                                 json=JSON.parse(data2)
                                 key1=req.query.bodie+'_en_'+aSignsLowerStyle[parseInt(req.query.sign)]+'_en_casa_'+req.query.house
                                 s+='<h1>'+parseMan(key1)+'</h1>'
                                 s+='<div class="divData">';
                                 s+='<h2>Manifestaciones Positivas</h2>';
                                 man=json[key1].manifestaciones_positivas
                                 manLength=Object.keys(man).length
                                 for(var i=0;i<manLength;i++){
                                     //s+='<p><b>'+parseMan(Object.keys(man)[i])+': </b>';
                                     s+='<p>'+man[i]+'</p><br>';
                                 }
                                 s+='<h2>Manifestaciones Negativas</h2>';
                                 man=json[key1].manifestaciones_negativas
                                 manLength=Object.keys(man).length
                                 for(var i=0;i<manLength;i++){
                                     //s+='<p><b>'+parseMan(Object.keys(man)[i])+': </b>';
                                     s+='<p>'+man[i]+'</p><br>';
                                 }
                                 s+='</div>';
                                 console.log('s1:')
                                 fs.readFile(filePath, 'utf8', (err, data) => {
                                                 if (err) {
                                                     res.status(200).send('Error al leer el dato de '+req.query.bodie);
                                                     return;
                                                 }
                                                 let title=''+parseMan(req.query.bodie)+'/'+aSigns[req.query.sign]+'/Casa '+parseInt(req.query.house)
                                                 json=JSON.parse(data)
                                                 key1=req.query.bodie+'_en_'+aSignsLowerStyle[parseInt(req.query.sign)]
                                                 man=json[key1].manifestaciones
                                                 manLength=Object.keys(man).length
                                                 //let s='<a class="boton2" href="/">Inicio</a> <a class="boton2" href="/listAll">Volvel a la lista</a>'

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
                                                 console.log('s2:')
                                                 //s+='<a class="boton2" href="/">Inicio</a> <a class="boton2" href="/listAll">Volvel a la lista</a>'
                                                 if(req.query.onlyData){
                                                     res.status(200).send(setHtmlData(s, 'Zool - '+title));
                                                 }else{
                                                     res.status(200).send(setHtml(s, 'Zool - '+title));
                                                 }

                                                 return
                                             });
                             }

                         });



        return
    }
    */

    //--> Get Zool Data Map
    getDataMapCoords = function(req, res){
        const lugar = req.query.lugar;
        const command = 'python3 '+stringSWEFolderPath+'/py/geoloc.py "'+lugar+'"';

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

                 for(var i=0;i<Object.keys(jsonRes.data.pc).length; i++){
                    //console.log('jsonRes.pc[c+'+i+'].gdec:'+jsonRes.data.pc['c'+i].gdec)
                     //console.log('jsonRes.pc[c+'+i+'].gdec:'+jsonRes.data.pc['c'+i].ih)
                     //console.log('jsonRes.pc[c+'+i+'].gdec:'+jsonRes.data.pc['c'+i].ih)
                     jsonRes.data.pc['c'+i].ih=getIndexHouse(jsonRes.data.pc['c'+i].gdec, jsonRes.data)
                     //console.log('Corregido jsonRes.pc[c+'+i+'].gdec:'+jsonRes.data.pc['c'+i].ih)
                 }
                 if(req.query.onlyJson){
                     //Esto es para obtener en la web un json a secas
                     //Ejemplo Probado con http://192.168.1.40:8100/getZoolDataMap?n=Ricardo&d=20&m=6&a=1975&h=23&min=4&gmt=-3&lugarNacimiento=Malargue+Mendoza&lat=-35.4752134&lon=-69.585934&alt=0&ciudad=Malargue+Mendoza&ms=0&msReq=0&adminId=formwebzoolar&onlyJson=true
                     res.status(200).send(JSON.stringify(jsonRes, null, 2));
                 }else{
                    res.status(200).send(setHtml(getJsonDataMapToHtml(jsonRes, false), 'Zool Carta Natal'));
                 }
             });
        //res.status(200).send(jsonRes)
        //!352Gallardo352
        return
    }

    function getJsonDataMapToHtml(j, full){
        let h=''
        for(var i=0;i<14;i++){
            //"c0": { "nom": "Sol", "is": 2, "gdec": 89.11073764729207, "gdeg": 89, "rsgdeg": 29, "mdeg": 6, "sdeg": 38, "ih": 5, "dh": 5.084865033626556, "retro": 1 }
            let strRetro=''
            if(parseInt(j.data.pc['c'+i].retro)===0 && i!==11)strRetro=' <b>Retrógrado</b>'
            h+='<div id="rowBodie">'
            h+='    <p>'+j.data.pc['c'+i].nom+strRetro+' en '+aSigns[j.data.pc['c'+i].is]+' en el grado °'+j.data.pc['c'+i].rsgdeg+' \''+j.data.pc['c'+i].mdeg+' \'\''+j.data.pc['c'+i].sdeg+' en la Casa '+j.data.pc['c'+i].ih+'</p>'
            //h+='<iframe src="http://www.zool.ar/getData?bodie=sol&sign=0&house=1&onlyData=true" width="100%" height="600"></iframe>'
            if(i===0)h+=getDivPage()
            h+='</div>'
        }
        return h
    }

    getZoolDataMapFull = function(req, res){
        console.log('getZoolDataFull... ');
        let title=parseMan(req.query.n).replace(/ /g, '_')
        let tipo='cn'
        if(req.query.tipo)tipo=req.query.tipo
        let datos=''
        if(tipo==='cn'){
            title=parseMan('"Carta Natal de '+req.query.n+'"')//.replace(/ /g, '_')
            if(req.query.sexo==='masculino'){
                datos='"Nacido el día '
            }else{
                datos='"Nacida el día '
            }
            datos+=req.query.d+'/'+req.query.m+'/'+req.query.a+' a las '+req.query.h+':'+req.query.min+'hs en '+req.query.ciudad+'"'
        }

        //console.log('Dia: '+req.query.d);
        //res.redirect('/res-add-producto.html?res=no'+mensajes.length)
        const exec = require('child_process').exec;
        let nfileName=stringSWEFolderPath+'/htmls/p1.html'
        //let cmd='python3 /home/ns/nsp/zool-server/scripts/mkHtmlFullMap.py "http://192.168.1.40:8100/getZoolDataMap?n=Ricardo&d=20&m=6&a=1975&h=23&min=4&gmt=-3&lugarNacimiento=Malargue+Mendoza&lat=-35.4752134&lon=-69.585934&alt=0&ciudad=Malargue+Mendoza&ms=0&msReq=0&adminId=formwebzoolar&onlyJson=true" /home/ns/nsp/zool-server '+stringSWEFolderPath
        console.log('req.query.ciudad: '+req.query.ciudad)
        let strLN=req.query.ciudad.replace(/ /g,'+')
        console.log('req.query.ciudad corregido: '+strLN)
        let nomCorr=(''+req.query.n).replace(/ /g, '_')
        let hostFinal='zool.loca.lt'//'www.zool.ar'
        //let hostFinal='127.0.0.1:8100'
        let cmd='python3 '+stringSWEFolderPath+'/scripts/mkHtmlFullMap.py "http://'+hostFinal+'/getZoolDataMap?n='+nomCorr+'&d='+req.query.d+'&m='+req.query.m+'&a='+req.query.a+'&h='+req.query.h+'&min='+req.query.min+'&gmt='+req.query.gmt+'&lugarNacimiento='+strLN+'&lat='+req.query.lat+'&lon='+req.query.lon+'&alt='+req.query.alt+'&ciudad='+strLN+'&ms='+req.query.ms+'&msReq='+req.query.msReq+'&adminId='+req.query.adminId+'&onlyJson=true" '+stringSWEFolderPath+' '+stringSWEFolderPath+' '+req.query.sexo+' '+title+' '+datos
        cmd=cmd.replace(/\+/g,'%20')
        console.log('getZoolDataFull cmd: '+cmd)
        exec(cmd, (err, stdout, stderr) => {
                 if (err) {
                     console.error(err);
                     res.status(200).send('<h1>Error en getZoolDataFull</h1>');
                     return;
                 }
                 //res.status(200).send(stdout);

                 let htmlFinal=''
                 if(req.query.title){
                    title=parseMan(req.query.title)
                 }
                 if(req.query.lite){
                     htmlFinal=''
                     htmlFinal += stdout
                     res.status(200).send(htmlFinal);
                 }else{
                     //htmlFinal='<h1>Carta Natal Astral de '+parseMan(req.query.n)+'</h1>'
                     htmlFinal += stdout
                     //res.status(200).send(setHtml(htmlFinal, title));
                     let page=''+title+'.html'
                     page=page.replace(/"/g, '')
                     page=page.replace(/ /g, '_')
                     res.redirect('https://zool.loca.lt/files/'+page);
                 }

             });
        return
    }
    /*ZoolMapForm = function(req, res){
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
    }*/

    //<-- Get Zool Data Map

    //-->app.get(...)
    app.get('/', inicio);
    app.get('/ZoolMapForm', zoolDataMap);
    app.get('/formSearch', formSearch);
    app.get('/listAll', listAll);
    app.get('/contacto', contacto);

    app.get('/getData', getData);
    app.get('/getZoolDataMapFull', getZoolDataMapFull);
    app.get('/getDataMapCoords', getDataMapCoords);
    app.get('/getZoolDataMap', getZoolDataMap);


    //<--app.get(...)


    function setHtml(c, t){
        let h='<DOCTYPE html>\n'
        h+='<html lang="es">\n'
        h+='    <head>\n'
        h+='        <meta charset="utf-8">\n'
        h+='        <title>'+t+'</title>\n'
        //h+='        <link rel="stylesheet" href="/style.css">\n'
        h+='        <script src="js/funcs.js"></script>\n'
        h+='    </head>\n'
        h+='    <body>\n'
        h+='        '+getMenu()+'\n'
        h+='        '+c+'\n'
        h+=getApoyoLinks()
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
    function getZoolMapForm(){
        let h=''
        //getZoolDataMapFull
        //h+='<form id="formZoolMap" action="/getZoolDataMap" method="GET">\n'


         h+='<div id="carga" class="hidden">\n'
         h+='           <p>Creando la carta...</p>\n'
         h+='       </div>\n'

        h+='<form id="formZoolMap" action="/getZoolDataMapFull" method="GET">\n'
        //h+='<form id="formZoolMap" method="GET">\n'
        h+='<div class="form-group">\n'
        h+='    <label for="nombre">Nombre:</label>\n'
        h+='    <input type="text" id="nombre" name="n" required>\n'
        h+='</div>\n'

        h+='<div class="form-group">\n'
        h+='    <label for="dia">Día:</label>\n'
        h+='    <input type="number" id="dia" name="d" min="1" max="31" required>\n'

        h+='    <label for="mes">Mes:</label>\n'
        h+='    <input type="number" id="mes" name="m" min="1" max="12" required>\n'

        h+='    <label for="anio">Año:</label>\n'
        h+='    <input type="number" id="anio" name="a" min="1900" max="2100" required>\n'
        h+='</div>\n'

        h+='<div class="form-group">\n'
        h+='    <label for="hora">Hora:</label>\n'
        h+='    <input type="number" id="hora" name="h" min="0" max="24" required>\n'

        h+='    <label for="minutos">Minutos:</label>\n'
        h+='    <input type="number" id="minutos" name="min" min="0" max="59" required>\n'
        h+='</div>\n'

        h+='<div class="form-group">\n'
        h+='    <label for="sexoMasculino">Masculino:</label>\n'
        h+='    <input type="radio" id="sexoMasculino" name="sexo" value="masculino" checked>\n'
        h+='    <label for="sexoFemenino">Femenino:</label>\n'
        h+='    <input type="radio" id="sexoFemenino" name="sexo" value="femenino">\n'
        h+='    <br>\n'
        h+='</div>\n'

        h+='<label for="gmt">GMT (Ejemplo Argentina es -3):</label>\n'
        h+='<input type="number" id="gmt" name="gmt" min="-12" max="12" required><br><br>\n'

        h+='<div class="form-group">\n'
        h+='    <label for="lugarNacimiento">Lugar de Nacimiento:</label>\n'
        h+='    <input type="text" id="lugarNacimiento" name="lugarNacimiento" required>\n'
        h+='</div>\n'
        h+='<button type="button" id="obtenerCoordenadas">Obtener Coordenadas</button><br><br>\n'

        h+='<input type="hidden" id="lat" name="lat">\n'
        h+='<input type="hidden" id="lon" name="lon">\n'
        h+='<input type="hidden" id="alt" name="alt" value=0>\n'
        h+='<input type="hidden" id="ciudad" name="ciudad">\n'
        h+='<input type="hidden" id="ms" name="ms" value=0>\n'
        h+='<input type="hidden" id="msReq" name="msReq" value=0>\n'
        h+='<input type="hidden" id="adminId" name="adminId" value="formwebzoolar">\n'
        h+='<input type="hidden" id="showBtnShare" name="showBtnShare" value="true">\n'


        h+='<p id="salida"></p>\n'
        h+='<p id="nota1">Nota: Antes de Crear la Carta, primero hay que Obtener las Coordenadas del lugar de Nacimiento.</p>\n'
        //h+='<input id="enviar" type="submit" value="Crear Carta Natal">\n'

        //h+='<button type="submit" onclick="setFormAction(\'http://www.zool.ar/getZoolDataMap\')">Ver Solo Planetas</button>\n'
        h+='<button type="submit" onclick="runForm()">Crear Carta Natal</button>\n'
        h+='</form>\n'

        h+='<script src="js/gd.js"></script>\n'
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
        h+='<h1>Zool</h1>'
        h+='<h4>Página de Astrología</h4><br>'
        h+='<h6>Formulario para Crear Cartan Natal</h6>'
        h+=getZoolMapForm()
        h+=
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
        h+='    <a class="boton" href="/formSearch">Buscar</a>'
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
    function getApoyoLinks(){
        let h=''
        h+='<br><br>'
        h+='<div id="divApoyo">'
        h+='<p>Hola! Soy Ricardo, el creador de este sitio web. Te informo que este sitio web funcionará hasta el día 1/2/2025. En esa fecha se vence el pago del servidor que aloja este sitio. Si quieres que esta página siga exisiendo te pido por favor que me ayudes a mantenerla, mejorarla y actualizarla. Sin el apoyo de los usuarios esta página dejará de existir.</p>'
        h+='<p>Aquí debajo te dejo los enlaces o la información en donde puedes hacer tu aporte. Desde ya muchas gracias!</p>'
        h+='    <a class="linkDivApoyo" href="https://patreon.com/zoolar">Patreon.com/ZoolAr</a>'
        h+='    <a class="linkDivApoyo" href="https://paypal.me/lucentrica">PayPal.me/lucentrica</a>'
        h+='    MercadoPago Alias: astrologo.mp'
        h+='</div>'
        h+='<br><br>'
        return h
    }

    function getIndexHouse(gdec, json){
        let index=0
        let g=0.0
        for(var i=0;i<12;i++){
            let iseg=json.ph['h'+parseInt(i+1)].gdec
            let fseg
            if(i!==11){
                fseg=json.ph['h'+parseInt(i+2)].gdec
            }else{
                fseg=json.ph['h1'].gdec
            }
            if(fseg<iseg)fseg=fseg+360
            if(gdec>=iseg && gdec<=fseg){
                index=i
                break
            }
        }
        return parseInt(index + 1)
    }
}

