module.exports=function(app){

    const ZoolUser = require('./models/ZoolUsers')
    /*
                descripcion
                codigo
                precioinstalacion
                precioabono
                adicionalriesgo
                observaciones
    */
    nuevoZoolUser = function(req, res){
        console.log('Insertando ZoolUser con nombre '+req.query.nombre)
        ZoolUser.find({
                          //date: {$gt: h }
                          //date: {$gte: "2019-06-12T00:00:00+01:00", $lte: "2019-12-12T23:00:00+01:00" }
                          //date: {$gte: h, $lte: hf }
                          n:req.query.n // Search Filters
                      },
                      ['n'], // Columns to Return
                      {
                          skip:0, // Starting Row
                          limit:1, // Ending Row
                          sort:{
                              n: 1 //Sort by Date Added DESC
                          }
                      },
                      function(err, resultados){
                          if(err) res.status(500).send({mensaje: `Error al buscar mensajes: ${err}`})
                          if(resultados.length===0){
                              console.log('Registrando el dato del ZoolUser '+req.query.nombre);
                              //res.redirect('/res-add-producto.html?res=no'+mensajes.length)
                              //Registra el ZoolUser porque no existe ninguno con ese nombre

                              var zoolUser = new ZoolUser()
                              zoolUser.tipo = req.query.tipo
                              zoolUser.ms = req.query.ms
                              zoolUser.msmod = req.query.msmod
                              zoolUser.n  = req.query.n
                              zoolUser.d = req.query.d
                              zoolUser.m = req.query.m
                              zoolUser.a = req.query.a
                              zoolUser.h = req.query.h
                              zoolUser.min = req.query.min
                              zoolUser.gmt = req.query.gmt
                              zoolUser.lat = req.query.lat
                              zoolUser.lon = req.query.lon
                              zoolUser.ciudad = req.query.ciudad
                              zoolUser.admin = req.query.admin
                              zoolUser.fechaRegistro = new Date(Date.now())
                              console.log('Creando un nuevo ZoolUser nombre: Tipo:'+zoolUser.tipo+'\nMs: '+zoolUser.ms+'\nMsMod: '+zoolUser.msmod+'\nNombre: '+zoolUser.n+'\nDía: '+zoolUser.d+'\nMes: '+zoolUser.m+'\nAño: '+zoolUser.a+'\nHora: '+zoolUser.h+'\nMinuto: '+zoolUser.min+'\nGMT: '+zoolUser.gmt+'\nLatitud: '+zoolUser.lat+'\nLongitud: '+zoolUser.lon+'\nLugar: '+zoolUser.ciudad+'\nAdministrador: '+zoolUser.admin+'\nFecha de Registro: '+zoolUser.fechaRegistro)
                              zoolUser.save(function(err, userRegistered){
                                  if(err){
                                      res.status(500).send(`Error when user register: ${err}`)
                                      return
                                  }
                                  res.redirect('/res-add-producto.html?res=El+producto+se+ha+agregado+correctamente&pid='+userRegistered._id)
                                  //res.status(200).send({producto: userRegistered})
                              })
                              return
                          }else{
                              console.log('Se intenta repetir el registro del ZoolUser '+req.query.n);
                              var msg='No+se+ha+registrado+el+productoYa+existe+un+producto+con+el+nombre+'+(''+req.query.n).replace(/ /g, '%20')
                              res.redirect('/res-add-producto.html?res='+msg)
                          }
                      })
    }
    searchZoolUser = function(req, res){
        console.log('Buscando ZoolUser con nombre '+req.query.consulta)
        var regExp= new RegExp(''+(''+req.query.consulta).toUpperCase()+'|'+(''+req.query.consulta).toLocaleLowerCase())
        /*ZoolUser.find({
                          //date: {$gt: h }
                          //date: {$gte: "2019-06-12T00:00:00+01:00", $lte: "2019-12-12T23:00:00+01:00" }
                          //date: {$gte: h, $lte: hf }
                          codigo: regExp,
                          descripcion: regExp // Search Filters
                      },*/
        ZoolUser.find({ $or: [ { codigo: regExp }, { descripcion: regExp } ] },
                      ['descripcion', 'codigo', 'precioinstalacion', 'precioabono', 'adicionalriesgo', 'observaciones'], // Columns to Return
                      {
                          skip:0, // Starting Row
                          //limit:1, // Ending Row
                          sort:{
                              codigo: 1 //Sort by Date Added DESC
                          }
                      },
                      function(err, resultados){
                          if(err) res.status(500).send({mensaje: `Error al buscar ZoolUsers: ${err}`})
                          if(resultados.length===0){
                              console.log('No se encontró ningún ZoolUser '+req.query.consulta);
                              res.status(200).send({zoolUsers: false})
                          }else{
                              console.log('Se devolverán datos de ZoolUsers a la consulta: '+req.query.consulta);
                              res.status(200).send({zoolUsers: resultados})
                          }
                      })
    }
    setChatUser = function(req, res){
        var userId = req.query.userId
        var update = req.body
        ZoolUser.findByIdAndUpdate(userId, update, function(err, userUpdated){
            if(err) res.status(500).send(`Error when user register: ${err}`)
            console.log('setChatUser: '+userUpdated)
            res.status(200).send({'user':userUpdated})
        })
    }
    getChatUser = function(req, res){
        console.log('Receiving get '+req.query.userId)
        var userid= req.query.userId
        ZoolUser.findById(userid, function(err, user){
            if(err){
                res.status(500).send({user: `Error al buscar usuario: ${err}`})
                return
            }
            if(!user){
                res.status(200).send({'user': false})
                return
            }
            res.status(200).send({'user': user})
        })
    }

    app.post('/zool/nuevoZoolUser', nuevoZoolUser);
    app.get('/zool/searchuser', searchZoolUser);
    app.get('/chat/set/user', setChatUser);
    app.get('/chat/get/user', getChatUser);
}

