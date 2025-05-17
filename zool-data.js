module.exports=function(app){

    listAll = function(req, res){
        console.log('setHtml()... ');
        res.status(200).send('aaaa');
        //return
    }

    app.get('/zooldata', listAll);


    /*function setHtml(){
        let h='<DOCTYPE html>'
        h+='<html lang="es">'
        h+='<head>'
        h+='<meta charset="utf-8">'
        h+='<title>Zool Server</title>'
        h+='</head>'
        h+='<body>'
        h+='<h1>Zool Users</h1>'
        h+='</body>'
        h+='</html>'
        return h
    }*/
}

