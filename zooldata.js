module.exports=function(app){

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
        exec('ls /home/ns/nsp/zool-server/files/*.zip', (err, stdout, stderr) => {
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
        exec('ls /home/ns/nsp/zool-server/files/zooland-control-*.zip', (err, stdout, stderr) => {
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
}

