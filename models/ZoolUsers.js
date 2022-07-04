'user strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const zoolUserSchema = Schema({
                                  tipo: String,
                                  ms: Number,
                                  msmod: Number,
                                  n: String,
                                  d: Number,
                                  m: Number,
                                  a: Number,
                                  h:Number,
                                  min:Number,
                                  gmt: Number,
                                  lat: Number,
                                  lon: Number,
                                  ciudad: String,
                                  admin: String,
                                  fechaRegistro: Date
                              }, { versionKey: false })

var collectionName='ZoolUsers'
module.exports=mongoose.model(collectionName, zoolUserSchema)
