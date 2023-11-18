import { MongoClient } from "mongodb"
import  config  from '../config.js'

export default class CnxMongoDB {
    static client = null
    static conection = false
    static db = null

    static conectar = async () =>{
        try{
            console.log("Conectando a la BD...")
            CnxMongoDB.client = new MongoClient(config.STRCNX)
            await CnxMongoDB.client.connect()
            console.log("BD conectada.")

            CnxMongoDB.db = CnxMongoDB.client.db(config.BASE)
            CnxMongoDB.conection = true
        } 
        catch (error){
            console.log(`Error en la conexion de BD: ${error.message()}`)
        }    
    }

    static desconectar = () => {

    }
}