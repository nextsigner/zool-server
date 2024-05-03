module.exports=function(app){

    var aSigns= ['Aries', 'Tauro', 'Géminis', 'Cáncer', 'Leo', 'Virgo', 'Libra', 'Escorpio', 'Sagitario', 'Capricornio', 'Acuario', 'Piscis']
    var aSignsLowerStyle= ['aries', 'tauro', 'geminis', 'cancer', 'leo', 'virgo', 'libra', 'escorpio', 'sagitario', 'capricornio', 'acuario', 'piscis']
    var aBodies= ['Sol', 'Luna', 'Mercurio', 'Venus', 'Marte', 'Júpiter', 'Saturno', 'Urano', 'Neptuno', 'Plutón', 'N.Norte', 'N.Sur', 'Quirón', 'Selena', 'Lilith', 'Pholus', 'Ceres', 'Pallas', 'Juno', 'Vesta']
    var aBodiesFiles= ['sol', 'luna', 'mercurio', 'venus', 'marte', 'jupiter', 'saturno', 'urano', 'neptuno', 'pluton', 'nodo_norte', 'nodo_sur', 'quiron', 'selena', 'lilith', 'pholus', 'ceres', 'pallas', 'juno', 'vesta']


    inicio = function(req, res){
        /*let s=''
        s+='<h1>Zool</h1>'
        s+='<h1>Zool</h1>'
        res.status(200).send(setHtml(s, 'Zool - Inicio'));*/
        res.status(200).send(setHtml(getListAll(), 'Zool - Lista General'));
        return
    }
    app.get('/', inicio);

    listAll = function(req, res){
        //console.log('setHtml()... ');
        res.status(200).send(setHtml(getListAll(), 'Zool - Lista General'));
        return
    }
    app.get('/listAll', listAll);

    const fs = require('fs');
    getData = function(req, res){
        let filePath='./data/'+req.query.bodie+'.json'
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
                        let s='<a class="boton2" href="/listAll">Volvel a la lista</a>'
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
                        s+='<a class="boton2" href="/listAll">Volvel a la lista</a>'
                        res.status(200).send(setHtml(s, 'Zool - '+title));
                        return
                    });

        return
    }
    app.get('/getData', getData);


    function setHtml(c, t){
        let h='<DOCTYPE html>\n'
        h+='<html lang="es">\n'
        h+='    <head>\n'
        h+='        <meta charset="utf-8">\n'
        h+='        <title>'+t+'</title>\n'
        h+='        <link rel="stylesheet" href="/style.css">\n'
        h+='    </head>\n'
        h+='    <body>\n'
        h+='        '+c+'\n'
        h+='    <br><h5>Zool - Datos de Astrología creado por Ricardo Martín Pizarro 2024</h5><br>\n'
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
    function parseMan(str) {
        if (typeof str !== 'string' || str.length === 0) {
            return str; // Devuelve la cadena sin cambios si no es válida
        }
        let s = str.charAt(0).toUpperCase() + str.slice(1);
        return s.replace(/_/g, ' ')
    }
}

