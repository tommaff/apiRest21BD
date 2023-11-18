import express from 'express'
import Router from './router/productos.js'
import config from './config.js'
import CnxMongoDB from './model/DBMongo.js'

const app= express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(express.static('public'))

//-------------------------------------------------------------
//----------------- API RESTFUL: PRODUCTOS      ---------------
//-------------------------------------------------------------

app.use('/api/productos', new Router().start())

//-------------------------------------------------------------
//----------------- LISTEN DEL SERVIDOR EXPRESS ---------------
//-------------------------------------------------------------
if(config.MODO_PERSISTENCIA=='MONGODB'){
    await CnxMongoDB.conectar()
}

const PORT = config.PORT
const server = app.listen(PORT, ()=> console.log(`Servidor express escuchando en http://localhost:${PORT}`))
server.on('error', error=>console.log(`Error en el servidor:${error.message }`))
