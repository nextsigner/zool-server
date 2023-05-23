module.exports=function(app){
    var ZoolParams = require('./models/ZoolParams')

    getZoolData = function(req, res){
        console.log('getZoolData... ');
        console.log('Dia: '+req.query.d);
        //res.redirect('/res-add-producto.html?res=no'+mensajes.length)
        //Registra el ZoolUser porque no existe ninguno con ese nombre
        let jsonRes={isData:false}
        const exec = require('child_process').exec;
        exec('python3 "/root/zool-server/py/astrologica_swe_v2.py" '+req.query.d+' '+req.query.m+' '+req.query.a+' '+req.query.h+' '+req.query.min+' '+req.query.gmt+' '+req.query.lat+' '+req.query.lon+' T /root/zool-server', (err, stdout, stderr) => {
                 if (err) {
                     console.error(err);
                     jsonRes={isData:false, isError:true, error: err}
                     res.status(200).send(jsonRes);
                     return;
                 }
                 jsonRes={isData:true, isError:false, data: JSON.parse(stdout)}
                 //jsonRes=JSON.parse(stdout);
                 //console.log(JSON.stringify(jsonRes, null, 2));
                 res.status(200).send(jsonRes);
             });
        //res.status(200).send(jsonRes)
        return
    }
    getUZoolandVersion = function(req, res){
        console.log('getUZoolandVersion... ');
        let jsonRes={isData:false}
        const exec = require('child_process').exec;
        exec('ls /root/zool-server/files/*.zip', (err, stdout, stderr) => {
                 if (err) {
                     console.error(err);
                     jsonRes={isData:false, isError:true, error: err}
                     res.status(200).send(jsonRes);
                     return;
                 }
                 let v=0;
                 let m0=stdout.split('\n')
                 let m1=(''+m0[0]).split('/')
                 let zipFileName=m1[m1.length-1]
                 jsonRes={isData:true, isError:false, data: zipFileName}
                 //jsonRes=JSON.parse(stdout);
                 //console.log(JSON.stringify(jsonRes, null, 2));
                 res.status(200).send(jsonRes);
             });
        //res.status(200).send(jsonRes)
        return
    }
    getUZoolandControlVersion = function(req, res){
        console.log('getUZoolandControlVersion... ');
        let jsonRes={isData:false}
        const exec = require('child_process').exec;
        exec('ls /root/zool-server/files/zooland-control/zooland-control-main*.zip', (err, stdout, stderr) => {
                 if (err) {
                     console.error(err);
                     jsonRes={isData:false, isError:true, error: err}
                     res.status(200).send(jsonRes);
                     return;
                 }
                 let v=0;
                 let m0=stdout.split('\n')
                 let m1=(''+m0[0]).split('/')
                 let zipFileName=m1[m1.length-1]
                 jsonRes={isData:true, isError:false, data: zipFileName}
                 //jsonRes=JSON.parse(stdout);
                 //console.log(JSON.stringify(jsonRes, null, 2));
                 res.status(200).send(jsonRes);
             });
        //res.status(200).send(jsonRes)
        return
    }
    app.get('/zool/getZoolData', getZoolData);
    app.get('/zool/getUZoolandVersion', getUZoolandVersion);
    app.get('/zool/getUZoolandControlVersion', getUZoolandControlVersion);

    //Retorna un JSON con un array lista de Params
    getZoolandParamsList = function(req, res){
        console.log('Buscando ZoolParamsList con adminId: ['+req.query.adminId+'].')
        let jsonRes={isData:false}
        var regExp= new RegExp(''+(''+req.query.adminId).toUpperCase()+'|'+(''+req.query.adminId).toLocaleLowerCase())
        console.log('Buscando ZoolParamsList regExp:['+regExp+'].')
        ZoolParams.find({ $or: [ { adminId: regExp } ]},
                        ['params'], // Columns to Return
                        {
                            skip:0, // Starting Row
                            //limit:1, // Ending Row
                            sort:{
                                fechaRegistro: 1 //Sort by Date Added DESC
                            }
                        },
                        function(err, resultados){
                            if(err){
                                jsonRes={isData:false, isError:true, error: err}
                                res.status(200).send(JSON.stringify(jsonRes, null, 2));
                            }else{
                                jsonRes={isData:true, isError:false, data: resultados}
                                res.status(200).send(JSON.stringify(jsonRes, null, 2));
                            }
                        })
    }
    app.get('/zool/getZoolandParamsList', getZoolandParamsList);

    //Retorna coords de ciudad
    getZoolandCoords = function(req, res){
        console.log('getZoolandCoords... ');
        console.log('Ciudad: '+req.query.ciudad);
        //res.redirect('/res-add-producto.html?res=no'+mensajes.length)
        //Registra el ZoolUser porque no existe ninguno con ese nombre
        let jsonRes={isData:false}
        const exec = require('child_process').exec;
        exec('python3 "/root/zool-server/py/geoloc.py" "'+req.query.ciudad+'" /root/zool-server', (err, stdout, stderr) => {
                 if (err) {
                     console.error(err);
                     jsonRes={isData:false, isError:true, error: err}
                     res.status(200).send(jsonRes);
                     return;
                 }
                 jsonRes={isData:true, isError:false, ciudad: req.query.ciudad, data: JSON.parse(stdout)}
                 //jsonRes=JSON.parse(stdout);
                 //console.log(JSON.stringify(jsonRes, null, 2));
                 res.status(200).send(jsonRes);
             });
        //res.status(200).send(jsonRes)
        return
    }
    app.get('/zool/getZoolandCoords', getZoolandCoords);
}

